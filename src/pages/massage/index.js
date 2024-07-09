import { useEffect, useState, useRef } from "react";
import { GetMassage, GetSingleRoom, MessageSend } from "@/config/Axiosconfig/AxiosHandle/chat";
import { WEBRTCBASEURL } from "@/config/Axiosconfig";
import MeetingModal from "@/Component/meeting-modal";
import { Device } from "mediasoup-client";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import createSocket from "@/lib/promisified-io";
import MassageLayout from "@/layout/Massageloyout";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { BulletList } from "react-content-loader";

function Index({ socket }) {
    const router = useRouter();
    const [medata, serMedata] = useState({});
    const [room, setRoom] = useState({});
    const [loader, setLoader] = useState(true);
    const [sendmassage, setSendmassage] = useState("");
    const [rtcSocket, setRtcSocket] = useState(null);
    const [rtpCapabilities, setRtpCapabilities] = useState(null);
    const [producingTransport, setProducingTransport] = useState(null);
    const [consumingTransport, setConsumingTransport] = useState(null);
    const [producers, setProducers] = useState([]);
    const [data, setData] = useState([]);
    const [callModal, setCallModal] = useState({ open: false, type: "me" });
    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [localVideoProducer, setLocalVideoProducer] = useState({});
    const [localAudioProducer, setLocalAudioProducer] = useState({});
    const [peers, setPeers] = useState({});
    const [streams, setStreams] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const room_id = router.query.id;
    const otherMember = room.members?.find((member) => member._id !== medata._id);
    console.log("The Streams: ", streams)

    useEffect(() => {
        // Fetch user data
        (async () => {
            try {
                const cookies = document.cookie.split(";");
                let isLoggedIn = false;
                cookies.forEach((cookie) => {
                    const [name, value] = cookie.split("=");
                    if (name.trim() === "is_logged_in" && value.trim() === "true") isLoggedIn = true;
                });
                if (isLoggedIn) {
                    const response = await FetchMe();
                    if (response) serMedata(response.data.user);
                }
            } catch (error) { console.log(error) }
        })();

        // Connecting to the rtc socket server
        (async () => {
            try {
                const rtcSocketInstance = createSocket(WEBRTCBASEURL, localStorage.getItem("Sockettoken"));
                rtcSocketInstance.on("connect", () => {
                    console.log("RTC Socket connected successfully");

                    rtcSocketInstance.on("incoming-call", () => {
                        if (!callModal.open) setCallModal({
                            type: "you",
                            open: true
                        });
                    })
                    rtcSocketInstance.on('call-accepted', ({ socket_id }) => {
                        if (intervalId) clearInterval(intervalId);
                        setIntervalId(null);
                    })
                    rtcSocketInstance.on('call-rejected', ({ socket_id }) => {
                        if (intervalId) clearInterval(intervalId);
                        setIntervalId(null);
                        closeMeeting();
                        alert("You call was rejected.")
                    })
                    rtcSocketInstance.on('new-peer', ({ socket_id, user }) => {
                        setPeers(prev => ({ ...prev, [socket_id]: user }))
                    })
                    rtcSocketInstance.on('remove', ({ producer_id, socket_id }) => {
                        setStreams(prev => prev.filter(stream => (stream.producerID !== producer_id && stream.socket_id !== socket_id)))
                    })
                    rtcSocketInstance.on('new-producer', async (newProducer) => {
                        setProducers(prev => ([...prev, newProducer]));
                    })
                    rtcSocketInstance.on('leave', ({ socket_id }) => {
                        setProducers(prev => (prev.filter(producer => producer.socket_id !== socket_id)));
                        setPeers(prev => {
                            const newPeers = prev;
                            delete newPeers[socket_id];
                            return newPeers;
                        })
                    })
                    rtcSocketInstance.on('call-rejected', ({ socket_id }) => {
                        setCallModal({
                            type: "",
                            open: false
                        });
                        if (intervalId) clearInterval(intervalId);
                        setIntervalId(null);
                        alert("You call was rejected.")
                    })
                });
                setRtcSocket(rtcSocketInstance);
            } catch (e) { console.log("Error connecting to the RTC socket server: ", e) }
        })()

        return () => {
            rtcSocket?.disconnect();
            if (intervalId) clearInterval(intervalId);
            setIntervalId(null);
        }
    }, []);

    useEffect(() => {
        (async () => {
            for (const producer of producers) {
                if (producer.room_id === room_id) {
                    const stream = await consume(consumingTransport, producer, rtcSocket);
                    stream.producerID = producer.producerID;
                    stream.socket_id = producer.socket_id;
                    stream.user_id = producer.user_id;

                    rtcSocket.asyncEmit('resume', { producer_id: producer.producerID });
                    setStreams(prev => ([...prev, stream]))
                }
            }
        })()
    }, [producers])

    useEffect(() => {
        socket?.on("message", (v) => setData((prev) => [...prev, v.message]));
    }, [socket]);

    useEffect(() => {
        (async () => { // fetching all messages
            try {
                if (!room_id) return;
                const response = await GetMassage(room_id);
                if (response) {
                    setData([...response.data?.messages]);
                    setLoader(false);
                }
            } catch (error) { console.log(error) }
        })();
        (async () => { // fetching the room
            try {
                if (!room_id) return;
                const response = await GetSingleRoom(room_id);
                if (response) setRoom({ ...response.data.room });
            } catch (error) { console.log(error) }
        })();
    }, [room_id]);

    const handleMessageSend = async () => {
        if (!sendmassage) return;
        try {
            const response = await MessageSend(room_id, sendmassage);
            if (response) {
                setSendmassage("");
                fetchAllMessages();
            }
        } catch (error) { console.log(error) }
    };

    const produceAudio = async (deviceId = null) => {
        try {
            const audioStream = deviceId ? await navigator.mediaDevices.getUserMedia({
                audio: { deviceId: { exact: deviceId } },
            }) : await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioProducer = await producingTransport.produce({ track: audioStream.getAudioTracks()[0] });
            setLocalAudioProducer(audioProducer);
            setIsAudio(true);
        } catch (err) {
            console.log('getusermedia produce failed', err);
            setIsAudio(false);
        }
    };

    const produceVideo = async (deviceId = null) => {
        try {
            setIsVideo(true);
            const vidStream = deviceId ? await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: deviceId } },
            }) : await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = new MediaStream(vidStream);
            const params = { track: vidStream.getVideoTracks()[0], appData: { isScreen: false } };
            const videoProducer = await producingTransport.produce(params);
            setLocalVideoProducer(videoProducer);
        } catch (err) {
            console.log('Video production failed: ', err);
            setIsVideo(false);
        }
    };

    const stopVideo = async () => {
        try {
            if (videoRef.current) videoRef.current.srcObject = null
            rtcSocket.emit('remove', { producer_id: localVideoProducer.id, room_id });
            localVideoProducer.close();
            setLocalVideoProducer(null);
            setIsVideo(false);
        } catch (e) { console.log(e) }
    };

    const stopAudio = async () => {
        try {
            if (!producingTransport || producingTransport.closed) return console.error('Producing transport is not ready or closed');
            if (audioRef.current) audioRef.current.srcObject = null
            rtcSocket.emit('remove', { producer_id: localAudioProducer.id, room_id });
            localAudioProducer.close();
            setLocalAudioProducer(null);
            setIsAudio(false);
        } catch (e) { console.log(e) }
    };

    const subscribeConsumerTransport = async (device, transportParams) => {
        const transport = device.createRecvTransport(transportParams);

        transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
                await rtcSocket.asyncEmit('connect-consumer-transport', { dtlsParameters })
                callback()
            } catch (e) { errback(e) }
        });
        transport.on('connectionstatechange', async (state) => {
            switch (state) {
                case 'connecting':
                    break;
                case 'connected':
                    console.log("Consumer transport connected.")
                    for (const producer of producers) {
                        await rtcSocket.asyncEmit('resume', { producer_id: producer.producerID });
                    }
                    break;
                case 'failed':
                    transport.close();
                    console.log("The consumer transport is closed due to failure.");
                    break;
                default:
                    break;
            }
        });
        setConsumingTransport(transport);
    };

    const subscribeProducerTransport = async (device, transportParams) => {
        const transport = device.createSendTransport(transportParams);

        transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
                await rtcSocket.asyncEmit('connect-producer-transport', { dtlsParameters })
                callback()
            } catch (e) { errback(e) }
        });
        transport.on('produce', async ({ kind, rtpParameters, appData }, callback, errback) => {
            try {
                const { id } = await rtcSocket.asyncEmit('produce', {
                    kind,
                    rtpParameters,
                    room_id,
                    isScreen: appData && appData.isScreen,
                });
                callback({ id });
            } catch (e) { errback(e) }
        });

        transport.on('connectionstatechange', (state) => {
            switch (state) {
                case 'connecting':
                    break;
                case 'connected':
                    console.log("Producer transport connected.")
                    break;
                case 'failed':
                    transport.close();
                    console.log("The producer transport is closed due to failure.");
                    break;
                default:
                    break;
            }
        });
        setProducingTransport(transport);
    }

    const initiateMeeting = async (_, outgoing = true) => {
        try {
            if (outgoing) {
                setCallModal({
                    type: "me",
                    open: true
                });
                rtcSocket.asyncEmit('call-user', { room_id })
                // const intervalId = setInterval(() => {
                // }, 3000);
                setIntervalId(intervalId);
                setTimeout(() => clearInterval(intervalId), 45000);
            }
            else { rtcSocket.emit("accept-call", { room_id }) }

            const {
                producers,
                peers,
                routerRtpCapabilities,
                producerTransportParams,
                consumerTransportParams
            } = await rtcSocket.asyncEmit('join-meeting', { room_id });
            setPeers(peers);
            setProducers(producers);
            setRtpCapabilities(routerRtpCapabilities);
            console.log("Here's all the DATA: ", peers, producers)
            const device = new Device();
            await device.load({ routerRtpCapabilities });

            await subscribeProducerTransport(device, producerTransportParams);
            await subscribeConsumerTransport(device, consumerTransportParams);
        } catch (e) { console.log("Error in initializing the meeting: " + e) }
    };

    const consume = async (transport, producer, rtcSocketInstance) => {
        const { producerId, id, kind, rtpParameters } = await rtcSocketInstance.asyncEmit('consume', {
            rtpCapabilities,
            socket_id: producer.socket_id,
            producer_id: producer.producerID
        });

        const consumer = await transport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions: {},
        });
        consumer.on('close', () => console.log('consumer closed'));
        consumer.on('producerclose', () => console.log('associated producer closed so consumer closed'));
        const stream = new MediaStream();
        stream.addTrack(consumer.track);
        stream.isVideo = (kind === 'video');
        return stream;
    };

    const closeMeeting = () => {
        try {
            rtcSocket.asyncEmit('leave-meeting', { room_id });
            rtcSocket.asyncEmit('reject-call', { room_id });
            setCallModal({
                type: "",
                open: false,
            })
            producingTransport?.close();
            consumingTransport?.close();
            if (intervalId) clearInterval(intervalId);
            setStreams([]);
            setProducers([]);
            setIsAudio(false);
            setIsVideo(false);
            setPeers({});
            setProducingTransport([]);
            setConsumingTransport([]);
        } catch (e) { console.log(e) }
    };

    const otherPeers = Object.values(peers).filter(peer => peer.id !== medata._id).map(peer => ({
        ...peer,
        audioStream: streams.find(stream => (stream.socket_id == peer.session_id && !stream.isVideo)),
        vidStream: streams.find(stream => (stream.socket_id == peer.session_id && stream.isVideo))
    }));
    console.log("The other peers: ", otherPeers)

    return <div className="flex w-full">
        <MassageLayout />
        <div className="relative w-full h-screen bg-gray-100">
            {room_id ? (otherMember ?
                <div className="Header_Top">
                    <div className="d-flex gap-1 align-items-center">
                        <div className="circle_box">{otherMember?.firstname.charAt(0)}</div>
                        <div className="title_">{otherMember?.firstname}</div>
                    </div>
                    <div onClick={initiateMeeting} className="padingleft" style={{ cursor: "pointer" }}>
                        <Icon fontSize={35} icon="material-symbols:call" />
                    </div>
                </div>
                : <div className="Header_Top">
                    <div>
                        <div className="circle_box">Y</div>
                        <div className="title_">You</div>
                    </div>
                </div>) : null}

            {room_id ? <>
                {loader ? <div className="MassageBox d-flex justify-content-center align-items-center"><BulletList /></div>
                    : <div className="MassageBox">
                        <div
                            style={{
                                width: "100%",
                                backgroundColor: "",
                                height: "100%",
                                overflow: "auto",
                                padding: "25px",
                            }}>
                            {data.length > 0 &&
                                data.map((message, index, array) => {
                                    if (index === array.length - 1) return <div className="py-3 m-auto d-flex justify-content-center" key={index}>
                                        <span
                                            style={{
                                                margin: "auto",
                                                marginTop: "10px",
                                                marginBottom: "20px",
                                                backgroundColor: "#003a55",
                                                color: "white",
                                                padding: "10px",
                                            }}
                                            className="rounded">
                                            {message.content}
                                        </span>
                                    </div>
                                    else return <div
                                        style={{
                                            height: "45px",
                                            width: "100%",
                                            marginTop: "20px",
                                        }}
                                        key={index}>
                                        <p style={{
                                            fontSize: "15px",
                                            paddingLeft: "2px",
                                            lineHeight: "18px",
                                            backgroundColor: "transparent",
                                            textAlign: message.author._id == medata._id ? "right" : "left",
                                        }}>{message.author.firstname}</p>
                                        <div
                                            style={{
                                                width: "100%",
                                                marginTop: "-18px",
                                                height: "35px",
                                                backgroundColor: "transparent",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent:
                                                    message.author._id == medata._id
                                                        ? "flex-end"
                                                        : "flex-start",
                                            }}>
                                            <div style={{ backgroundColor: "#003a55" }}
                                                className={`rounded px-2 ${message.author._id == medata._id
                                                    ? " text-white"
                                                    : " text-white"
                                                    }`}>
                                                {message.content}
                                            </div>
                                        </div>
                                    </div>
                                }).reverse()}
                        </div>
                    </div>}
            </> : null}

            {room_id ? <div className="bottom gap-3">
                <input
                    placeholder="Enter A Message"
                    value={sendmassage}
                    onChange={(e) => setSendmassage(e.target.value)}
                    className="Input"
                />
                <button onClick={handleMessageSend} className="btn_Green">Send</button>
            </div> : null}
        </div>

        {Object.values(peers).length > 1 ? <MeetingModal
            userData={medata}
            otherPeers={otherPeers}
            isAudio={isAudio}
            isVideo={isVideo}
            videoRef={videoRef}
            stopAudio={stopAudio}
            produceAudio={produceAudio}
            stopVideo={stopVideo}
            produceVideo={produceVideo}
            closeMeeting={closeMeeting}
        /> :
            callModal?.open ?
                <div className="popup-overlay">
                    <div className="popup-content shadow">
                        <div style={{ width: "100%" }}>
                            <div className="box">S</div>
                            {callModal?.type === "me" ? <>
                                <div className="flex justify-center gap-2 items-center text-center my-4 text-2xl">Outgoing Call <Icon fontSize={34} icon="line-md:phone-call-loop" /></div>
                                <div style={{ display: 'flex', justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                                    <div
                                        onClick={() => (isVideo ? stopVideo() : produceVideo())}
                                        className={`${isVideo ? "activebutton" : "unactivebutton"}`}
                                        style={{ cursor: "pointer" }}>
                                        {isVideo ? <Icon icon="mdi:video" color="white" /> : <Icon icon="hugeicons:video-off" color="black" />}
                                    </div>
                                    <div onClick={() => isAudio ? stopAudio() : produceAudio()} className={`${isAudio === true ? "activebutton" : "unactivebutton"}`} style={{ cursor: "pointer" }}>
                                        {isAudio ? <svg focusable="false" width="24" height="22" viewBox="0 0 24 24">
                                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
                                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
                                        </svg> : <Icon icon="mdi:mute" />}
                                    </div>
                                    <div onClick={closeMeeting} className="CutCall" style={{ cursor: "pointer" }}>
                                        End Call
                                    </div>
                                </div>
                            </>
                                : callModal?.type === "you" ? <>
                                    <div className="flex justify-center gap-2 items-center my-4 text-2xl">Incoming Call <Icon fontSize={34} icon="line-md:phone-call-loop" /></div>
                                    <div style={{ display: 'flex', justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                                        <div onClick={() => initiateMeeting(null, false)} className="AcceptCall" style={{ cursor: "pointer" }}>Accept</div>
                                        <div onClick={closeMeeting} className="CutCall1" style={{ cursor: "pointer" }}>Reject</div>
                                    </div>
                                </> : null}
                            {/* <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "auto", display: isVideo ? "block" : "none" }} />
                            <audio ref={audioRef} autoPlay playsInline style={{ display: "none" }} /> */}
                        </div>
                    </div>
                </div> : null}
    </div>
}

export default Index;
