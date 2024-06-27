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

function Index({ socket }) {
    const router = useRouter();
    const [medata, serMedata] = useState({});
    const [room, setRoom] = useState({});
    const [loader, setLoader] = useState(true);
    const [sendmassage, setSendmassage] = useState("");
    const [rtcSocket, setRtcSocket] = useState(null);
    const [device, setDevice] = useState(null);
    const [localTransport, setLocalTransport] = useState([]);
    const [consumers, setConsumers] = useState([]);
    const [producers, setProducers] = useState([]);
    const [data, setData] = useState([]);
    const [popupOpen, setPopupOpen] = useState({ open: false, type: "me" });
    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(true);
    const [localVideoProducer, setLocalVideoProducer] = useState(true);
    const [localAudioProducer, setLocalAudioProducer] = useState(true);
    const [localStream, setLocalStream] = useState(true);
    const [peers, setPeers] = useState({});
    const [streams, setStreams] = useState([]);

    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const room_id = router.query.id;
    const otherMember = room.members?.find((member) => member._id !== medata._id);

    console.log("The local transport: ", localTransport)

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
                setRtcSocket(rtcSocketInstance);
                rtcSocketInstance.on("connect", () => {
                    console.log("RTC Socket connected successfully")
                });
            } catch (e) { console.log("Error connecting to the RTC socket server: ", e) }
        })()

        return () => { rtcSocket?.disconnect() }
    }, []);

    useEffect(() => {
        socket?.on("message", (v) => {
            setData((prevData) => [v.message, ...prevData]);
        });
    }, [socket]);

    useEffect(() => {
        fetchAllMessages();
        (async () => { // fetching the room
            try {
                if (!room_id) return;
                const response = await GetSingleRoom(room_id);
                if (response) setRoom({ ...response.data.room });
            } catch (error) { console.log(error) }
        })()
    }, [room_id]);

    useEffect(() => {
        (async () => { // persisting the call if producers change
            const newStreams = [];
            for (const producer of producers) {
                if (!consumers?.length || !consumers.includes(producer.producerID) && producer.roomID === room_id) {
                    setConsumers(prev => [...prev, producer.producerID]);

                    const stream = await consume(localTransport, producer);
                    stream.producerID = producer.producerID;
                    stream.socketID = producer.socketID;
                    stream.userID = producer.userID;

                    newStreams.push(stream);
                    rtcSocket.asyncEmit('resume', { producer_id: producer.producerID });
                }
            }
            setStreams(prev => ([...prev, ...newStreams]));
        })()
    }, [producers]);

    const fetchAllMessages = async () => {
        try {
            if (!room_id) return;
            const response = await GetMassage(room_id);
            if (response) {
                setData([...response.data?.messages]);
                setLoader(false);
            }
        } catch (error) { console.log(error) }
    };

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
            setIsAudio(true);
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // if (audioRef.current) audioRef.current.srcObject = audioStream;
            const audioProducer = await localTransport.produce({ track: audioStream.getAudioTracks()[0] });
            setLocalAudioProducer(audioProducer);
        } catch (err) {
            console.log('getusermedia produce failed', err);
            setIsAudio(false);
        }
    };

    const produceVideo = async () => {
        try {
            setIsVideo(true);
            const vidStream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = vidStream;
            const params = { track: vidStream.getVideoTracks()[0], appData: { isScreen: false } };
            setLocalStream(vidStream);
            const videoProducer = await localTransport.produce(params);
            setLocalVideoProducer(videoProducer);
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
            if (audioRef.current) audioRef.current.srcObject = null
            await rtcSocket.asyncEmit('remove', { producer_id: localAudioProducer.id, room_id });
            localAudioProducer.close();
            setLocalAudioProducer(null);
            setIsAudio(false);
        } catch (e) { console.log(e) }
    };

    const initiateMeeting = async () => {
        setPopupOpen({
            type: "me",
            open: true
        });
        setConsumers([]);

        const { producers, consumers, peers } = await rtcSocket.asyncEmit('join-meeting', { room_id });
        console.log("Here are the peers: ", peers, "And also consumers here: ", consumers)
        setPeers(peers);
        setProducers(producers);
        setConsumers(consumers.content);

        const routerRtpCapabilities = await rtcSocket.asyncEmit('get-router-rtp-capabilities');
        const device = new Device();
        await device.load({ routerRtpCapabilities });
        setDevice(device);

        const localTransportParams = await rtcSocket.asyncEmit('create-consumer-transport');

        let transport = device.createRecvTransport(localTransportParams);
        transport.on('connect', ({ dtlsParameters }, callback, errback) => {
            rtcSocket.asyncEmit('connect-consumer-transport', { dtlsParameters }).then(callback).catch(errback);
        });

        transport.on('connectionstatechange', async (state) => {
            switch (state) {
                case 'connecting': break;
                case 'connected':
                    for (const producer of producers) {
                        await rtcSocket.asyncEmit('resume', { producer_id: producer.producerID })
                    }
                    break;
                case 'failed':
                    transport.close();
                    break;
                default: break;
            }
        });

        const producerTransportParams = await rtcSocket.asyncEmit('create-producer-transport');

        transport = device.createSendTransport(producerTransportParams);
        transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            rtcSocket.asyncEmit('connect-producer-transport', { dtlsParameters }).then(callback).catch(errback);
        });

        transport.on('produce', async ({ kind, rtpParameters, appData }, callback, errback) => {
            try {
                const { id } = await rtcSocket.asyncEmit('produce', {
                    kind,
                    room_id,
                    rtpParameters,
                    isScreen: appData && appData.isScreen,
                });
                callback({ id });
            } catch (err) { errback(err); }
        });

        transport.on('connectionstatechange', (state) => {
            if (state === "closed" || state === "failed") transport.close();
        });

        setLocalTransport(transport);

        await produceAudio();
        // await produceVideo();
    };

    const consume = async (transport, producer) => {
        const { rtpCapabilities } = device;
        const { producerId, id, kind, rtpParameters } = await rtcSocket.asyncEmit('consume', {
            rtpCapabilities,
            socket_id: producer.socketID,
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
            localTransport.close();
            setPopupOpen({
                type: "",
                open: false,
            })
            await rtcSocket.asyncEmit('leave-meeting', { room_id });
            setStreams([]);
            setConsumers([]);
            setProducers([]);
            setPeers({});
            setLocalTransport(null);
            setStreams([])
        } catch (e) { console.log(e) }
    };

    return <div style={{ display: "flex", width: "100%", gap: "0px" }}>
        <MassageLayout />
        <div style={{
            width: "100%",
            backgroundColor: "#f9f9f9",
            position: "relative",
            height: "100vh",
        }}>
            {room_id ? (
                otherMember ? (
                    <div className="Header_Top">
                        <div className="d-flex gap-1 align-items-center">
                            <div className="circle_box">{otherMember?.firstname.charAt(0)}</div>
                            <div className="title_">{otherMember?.firstname}</div>
                        </div>
                        <div onClick={initiateMeeting} className="padingleft" style={{ cursor: "pointer" }}>
                            <Icon fontSize={35} icon="material-symbols:call" />
                        </div>
                    </div>
                ) : (
                    <div className="Header_Top">
                        <div>
                            <div className="circle_box">Y</div>
                            <div className="title_">You</div>
                        </div>
                    </div>
                )
            ) : null}

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
                        onChange={(e) => {
                            setSendmassage(e.target.value);
                        }}
                        className="Input"
                    />
                    <button onClick={handleMessageSend} className="btn_Green">
                        Send
                    </button>
                </div>
            ) : null}
        </div>
        {popupOpen?.open && (
            <div className="popup-overlay">
                <div className="popup-content shadow">
                    <div style={{ width: "100%" }}>
                        <div className="box">S</div>
                        <div className="text-center mt-2 fs-3">Shahbaz Ai</div>

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
                                    <div onClick={initiateMeeting} className="AcceptCall" style={{ cursor: "pointer" }}>
                                        Accept
                                    </div>
                                    <div onClick={closeMeeting} className="CutCall1" style={{ cursor: "pointer" }}>
                                        Rejected
                                    </div>
                                </div> : null}
                        <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "auto", display: isVideo ? "block" : "none" }} />
                        <audio ref={audioRef} autoPlay playsInline style={{ display: "none" }} />
                    </div>
                </div>
            </div>
        )}
    </div>
}

export default Index;
