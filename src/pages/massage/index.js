import { useEffect, useState, useRef } from "react";
import { GetMassage, GetSingleRoom, MessageSend } from "@/config/Axiosconfig/AxiosHandle/chat";
import { WEBRTCBASEURL } from "@/config/Axiosconfig";
import { Device } from "mediasoup-client";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import createSocket from "@/lib/promisified-io";
import MassageLayout from "@/layout/Massageloyout";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { BulletList } from "react-content-loader";

const PeersMedia = (props) => {
    const { name, audioStream, vidStream } = props.peer;
    const audioRef = useRef(null);
    const videoRef = useRef(null);

    console.log("The individual peer: ", props.peer)

    useEffect(() => {
        if (audioStream && audioRef.current) {
            audioRef.current.srcObject = audioStream;
            audioRef.current.volume = 1.0
            console.log("The audio stream exists: ", audioStream.getAudioTracks())
        }
    }, [audioStream]);

    useEffect(() => {
        if (vidStream && videoRef.current) {
            videoRef.current.srcObject = vidStream;
            console.log("The video stream exists: ", vidStream.getVideoTracks())
        }
    }, [vidStream]);

    return <div key={props.index} className="pointer-events-none">
        {/* {audioStream &&  */}
        <audio
            ref={audioRef}
            onLoadedMetadata={() => audioRef.current.play()}
            onCanPlay={() => audioRef.current.play()}
            autoPlay
            controls={false}
            hidden
        />
        {/* {vidStream && */}
        <video
            ref={videoRef}
            onLoadedMetadata={() => videoRef.current.play()}
            onCanPlay={() => audioRef.current.play()}
            autoPlay
            playsInline
            controls={false}
        />
        {!vidStream && <div className="text-white font-semibold">
            <div className="name">{name}</div>
            <div className="status">{audioStream ? 'Audio Only' : 'Spectator'}</div>
        </div>}
    </div>
}

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
    const [consumersData, setConsumersData] = useState(null);
    const [producers, setProducers] = useState([]);
    const [data, setData] = useState([]);
    const [popupOpen, setPopupOpen] = useState({ open: false, type: "me" });
    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [localVideoProducer, setLocalVideoProducer] = useState({});
    const [localAudioProducer, setLocalAudioProducer] = useState({});
    const [localStream, setLocalStream] = useState({});
    const [peers, setPeers] = useState({});
    const [streams, setStreams] = useState([]);

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

                    // rtcSocketInstance.on("incoming-call", () => {
                    //     if (popupOpen.open) return;
                    //     setPopupOpen({
                    //         type: "you",
                    //         open: true
                    //     });
                    // })

                    rtcSocketInstance.on('new-peer', ({ socket_id, user }) => {
                        setPeers(prev => ({ ...prev, [socket_id]: user }))
                    })

                    rtcSocketInstance.on('new-producer', async (newProducer) => {
                        setProducers(prev => ([...prev, newProducer]));
                    })

                    rtcSocketInstance.on('consumers', (data) => {
                        if (consumersData?.timestamp && new Date(consumersData.timestamp) > new Date(data.timestamp)) return;
                        else setConsumersData(data)
                    });
                    rtcSocketInstance.on('leave', ({ socket_id }) => {
                        setProducers(prev => (prev.filter(producer => producer.socket_id !== socket_id)))
                    })

                });
                setRtcSocket(rtcSocketInstance);
            } catch (e) { console.log("Error connecting to the RTC socket server: ", e) }
        })()

        return () => { rtcSocket?.disconnect() }
    }, []);

    useEffect(() => {
        (async () => {
            for (const producer of producers) {
                if (!consumersData?.content?.length || !consumersData.content.includes(producer.producerID) && producer.room_id === room_id) {
                    setConsumersData(prev => ({
                        ...prev,
                        content: [...prev.content, producer.producerID]
                    }));

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

    const produceAudio = async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioProducer = await producingTransport.produce({ track: audioStream.getAudioTracks()[0] });
            setLocalAudioProducer(audioProducer);
            setIsAudio(true);
        } catch (err) {
            console.log('getusermedia produce failed', err);
            setIsAudio(false);
        }
    };

    const produceVideo = async () => {
        try {
            const vidStream = await navigator.mediaDevices.getUserMedia({ video: true })
            setLocalStream(vidStream);
            if (videoRef.current) videoRef.current.srcObject = vidStream;
            const params = { track: vidStream.getVideoTracks()[0], appData: { isScreen: false } };
            const videoProducer = await producingTransport.produce(params);
            setLocalVideoProducer(videoProducer);
            setIsVideo(true);
        } catch (err) {
            console.log('Video production failed: ', err);
            setIsVideo(false);
        }
    };

    const stopVideo = async () => {
        try {
            if (localStream) localStream.getVideoTracks()[0].stop();
            if (videoRef.current) videoRef.current.srcObject = null
            await rtcSocket.asyncEmit('remove', { producer_id: localVideoProducer.id, room_id });
            localVideoProducer.close();
            setLocalVideoProducer(null);
            setIsVideo(false);
        } catch (e) { console.log(e) }
    };

    const stopAudio = async () => {
        try {
            if (!producingTransport || producingTransport.closed) return console.error('Producing transport is not ready or closed');
            if (audioRef.current) audioRef.current.srcObject = null
            await rtcSocket.asyncEmit('remove', { producer_id: localAudioProducer.id, room_id });
            localAudioProducer.close();
            setLocalAudioProducer(null);
            setIsAudio(false);
        } catch (e) { console.log(e) }
    };

    const subscribeConsumerTransport = async (device) => {
        const transportParams = await rtcSocket.asyncEmit('create-consumer-transport');
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

    const subscribeProducerTransport = async (device) => {
        const transportParams = await rtcSocket.asyncEmit('create-producer-transport');
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
                rtcSocket.asyncEmit('call-user', { room_id })
                setPopupOpen({
                    type: "me",
                    open: true
                });
            }

            const { producers, consumers, peers } = await rtcSocket.asyncEmit('join-meeting', { room_id });
            setPeers(peers);
            setProducers(producers);
            setConsumersData(consumers);

            const routerRtpCapabilities = await rtcSocket.asyncEmit('get-router-rtp-capabilities');
            setRtpCapabilities(routerRtpCapabilities);
            const device = new Device();
            await device.load({ routerRtpCapabilities });

            await subscribeProducerTransport(device);
            await subscribeConsumerTransport(device);

            // await produceAudio();
            // await produceVideo();
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

    const closeMeeting = async () => {
        try {
            if (localStream?.getVideoTracks) localStream.getVideoTracks()[0].stop();
            producingTransport?.close();
            consumingTransport?.close();
            setPopupOpen({
                type: "",
                open: false,
            })
            await rtcSocket.asyncEmit('leave-meeting', { room_id });
            setStreams([]);
            setConsumersData(null);
            setProducers([]);
            setIsAudio(false);
            setIsVideo(false);
            setPeers({});
            setProducingTransport([]);
            setConsumingTransport([]);
        } catch (e) { console.log(e) }
    };

    const otherConsumers = Array.from(new Set(consumersData?.content.filter(consumer => consumer !== medata.session_id))) || [];
    const otherPeers = [];
    otherConsumers.forEach(consumer => {
        const peer = peers[consumer];
        if (!peer) return console.warn("No matching peer found.");
        otherPeers.push({
            id: peer.id,
            socket_id: peer.session_id,
            name: peer.username,
            email: peer.email,
            audioStream: streams.find(stream => (stream.socket_id == peer.session_id && !stream.isVideo)),
            vidStream: streams.find(stream => (stream.socket_id == peer.session_id && stream.isVideo))
        });
    })
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

            {room_id ? (
                <div className="bottom gap-3">
                    <input
                        placeholder="Enter A Message"
                        value={sendmassage}
                        onChange={(e) => setSendmassage(e.target.value)}
                        className="Input"
                    />
                    <button onClick={handleMessageSend} className="btn_Green">Send</button>
                </div>
            ) : null}
        </div>
        {popupOpen?.open ?
            <div className="popup-overlay">
                <div className="popup-content shadow">
                    <div style={{ width: "100%" }}>
                        <div className="box">S</div>
                        <div className="text-center mt-2 fs-3">Call</div>

                        {popupOpen?.type === "me" ?
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
                                    Call end.
                                </div>
                            </div>
                            : popupOpen?.type === "you" ?
                                <div style={{ display: 'flex', justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                                    <div onClick={() => initiateMeeting(null, false)} className="AcceptCall" style={{ cursor: "pointer" }}>
                                        Accept
                                    </div>
                                    <div onClick={closeMeeting} className="CutCall1" style={{ cursor: "pointer" }}>
                                        Reject
                                    </div>
                                </div> : null}
                        <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "auto", display: isVideo ? "block" : "none" }} />
                        <audio ref={audioRef} autoPlay playsInline style={{ display: "none" }} />
                    </div>
                </div>
            </div> : null}
        <section className="fixed z-[999] w-[40%] h-[20rem] bg-slate-600">
            {otherPeers.map((peer, index) => <PeersMedia index={index} peer={peer} />)}
            {/* <AudioInput /> */}
        </section>
    </div>
}

export default Index;
