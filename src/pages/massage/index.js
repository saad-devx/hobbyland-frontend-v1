import { useEffect, useState, useRef } from "react";
import {
  GetMassage,
  GetSingleRoom,
  MessageSend,
} from "@/config/Axiosconfig/AxiosHandle/chat";
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
  console.log("Here is the peer: ", props.peer);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (audioStream) audioRef.current.srcObject = audioStream;
  }, [audioStream]);

  useEffect(() => {
    if (vidStream) videoRef.current.srcObject = vidStream;
  }, [vidStream]);

  return (
    <div key={props.index} className="pointer-events-none">
      {audioStream && (
        <audio
          ref={audioRef}
          onLoadedMetadata={() => audioRef.current.play()}
          onCanPlay={() => audioRef.current.play()}
          autoPlay
          controls={false}
          hidden
        />
      )}
      {vidStream && (
        <video
          ref={videoRef}
          onLoadedMetadata={() => videoRef.current.play()}
          autoPlay
          playsInline
          controls={false}
        />
      )}
      {!vidStream && (
        <div className="text-white font-semibold">
          <div className="name">{name}</div>
          <div className="status">
            {audioStream ? "Audio Only" : "Spectator"}
          </div>
        </div>
      )}
    </div>
  );
};

function Index({ socket }) {
  const router = useRouter();
  const [medata, serMedata] = useState({});
  const [room, setRoom] = useState({});
  const [loader, setLoader] = useState(true);
  const [sendmassage, setSendmassage] = useState("");
  const [rtcSocket, setRtcSocket] = useState(null);
  const [device, setDevice] = useState(null);
  const [producingTransport, setProducingTransport] = useState(null);
  const [consumingTransport, setConsumingTransport] = useState(null);
  const [consumersData, setConsumersData] = useState(null);
  const [producers, setProducers] = useState([]);
  const [data, setData] = useState([]);
  const [rtpCapabilities, setRtpCapabilities] = useState(null);
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

  console.log("The Streams: ", streams);
  console.log("The Device: ", device);

  useEffect(() => {
    // Fetch user data
    (async () => {
      try {
        const cookies = document.cookie.split(";");
        let isLoggedIn = false;
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=");
          if (name.trim() === "is_logged_in" && value.trim() === "true")
            isLoggedIn = true;
        });
        if (isLoggedIn) {
          const response = await FetchMe();
          if (response) serMedata(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    // Connecting to the rtc socket server
    (async () => {
      try {
        const rtcSocketInstance = createSocket(
          WEBRTCBASEURL,
          localStorage.getItem("Sockettoken")
        );
        setRtcSocket(rtcSocketInstance);
        rtcSocketInstance.on("connect", () => {
          console.log("RTC Socket connected successfully");

          // rtcSocketInstance.on("incoming-call", () => {
          //     setPopupOpen({
          //         type: "me",
          //         open: true
          //     });
          // })

          rtcSocketInstance.on("new-peer", ({ socket_id, user }) => {
            setPeers((prev) => ({ ...prev, [socket_id]: user }));
          });

          rtcSocketInstance.on("new-producer", async (newProducer) => {
            const newProducers = [...producers, newProducer];
            await hydrateProducers(newProducers);
          });

          rtcSocketInstance.on("consumers", (data) => {
            if (
              consumersData?.timestamp &&
              new Date(consumersData.timestamp) > new Date(data.timestamp)
            )
              return;
            else setConsumersData(data);
          });
        });
      } catch (e) {
        console.log("Error connecting to the RTC socket server: ", e);
      }
    })();

    return () => {
      rtcSocket?.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("message", (v) => {
      fetchAllMessages();
    });
  }, [socket]);

  useEffect(() => {
    fetchAllMessages();
    (async () => {
      // fetching the room
      try {
        if (!room_id) return;
        const response = await GetSingleRoom(room_id);
        if (response) setRoom({ ...response.data.room });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [room_id]);

  const fetchAllMessages = async () => {
    try {
      if (!room_id) return;
      const response = await GetMassage(room_id);
      if (response) {
        setData([...response.data?.messages]);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageSend = async () => {
    if (!sendmassage) return;
    try {
      const response = await MessageSend(room_id, sendmassage);
      if (response) {
        setSendmassage("");
        fetchAllMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const produceAudio = async () => {
    try {
      setIsAudio(true);
      const audioStream = await navigator?.mediaDevices.getUserMedia({
        audio: true,
      });
      const audioProducer = await producingTransport.produce({
        track: audioStream.getAudioTracks()[0],
      });
      setLocalAudioProducer(audioProducer);
    } catch (err) {
      console.log("getusermedia produce failed", err);
      setIsAudio(false);
    }
  };

  const produceVideo = async () => {
    try {
      setIsVideo(true);
      const vidStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) videoRef.current.srcObject = vidStream;
      const params = {
        track: vidStream.getVideoTracks()[0],
        appData: { isScreen: false },
      };
      setLocalStream(vidStream);
      const videoProducer = await producingTransport.produce(params);
      setLocalVideoProducer(videoProducer);
    } catch (err) {
      console.log("Video production failed: ", err);
      setIsVideo(false);
    }
  };

  const stopVideo = async () => {
    try {
      if (localStream) localStream.getVideoTracks()[0].stop();
      if (videoRef.current) videoRef.current.srcObject = null;
      await rtcSocket.asyncEmit("remove", {
        producer_id: localVideoProducer.id,
        room_id,
      });
      localVideoProducer.close();
      setLocalVideoProducer(null);
      setIsVideo(false);
    } catch (e) {
      console.log(e);
    }
  };

  const stopAudio = async () => {
    try {
      if (!producingTransport || producingTransport.closed)
        return console.error("Producing transport is not ready or closed");
      if (audioRef.current) audioRef.current.srcObject = null;
      await rtcSocket.asyncEmit("remove", {
        producer_id: localAudioProducer.id,
        room_id,
      });
      localAudioProducer.close();
      setLocalAudioProducer(null);
      setIsAudio(false);
    } catch (e) {
      console.log(e);
    }
  };

  const hydrateProducers = async (newProducers) => {
    setProducers(newProducers);
    const newStreams = [];
    for (const producer of newProducers) {
      if (
        !consumersData?.content?.length ||
        (!consumersData.content.includes(producer.producerID) &&
          producer.room_id === room_id)
      ) {
        const { producerID, socket_id, user_id } = producer;
        setConsumersData((prev) => ({
          ...prev,
          content: [...prev.content, producerID],
        }));

        if (consumingTransport) {
          let stream = await consume(consumingTransport, producer);
          stream.producerID = producerID;
          stream.socket_id = socket_id;
          stream.user_id = user_id;
          newStreams.push(stream);
        }
        rtcSocket.emit("resume", { producer_id: producerID });
      }
    }
    setStreams((prev) => [...prev, ...newStreams]);
  };

  const subscribeConsumerTransport = async (device, transportParams) => {
    const transport = device.createRecvTransport(transportParams);

    transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      try {
        await rtcSocket.asyncEmit("connect-consumer-transport", {
          dtlsParameters,
        });
        callback();
      } catch (e) {
        errback(e);
      }
    });
    transport.on("connectionstatechange", async (state) => {
      switch (state) {
        case "connecting":
          break;
        case "connected":
          console.log("Consumer transport connected.");
          for (const producer of producers) {
            await rtcSocket.asyncEmit("resume", {
              producer_id: producer.producerID,
            });
          }
          break;
        case "failed":
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

    transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      try {
        await rtcSocket.asyncEmit("connect-producer-transport", {
          dtlsParameters,
        });
        callback();
      } catch (e) {
        errback(e);
      }
    });
    transport.on(
      "produce",
      async ({ kind, rtpParameters, appData }, callback, errback) => {
        try {
          rtcSocket.emit(
            "produce",
            {
              kind,
              rtpParameters,
              room_id,
              isScreen: appData && appData.isScreen,
            },
            ({ id }) => callback({ id })
          );
        } catch (e) {
          errback(e);
        }
      }
    );

    transport.on("connectionstatechange", (state, whatever) => {
      console.log("Producer states and whatever: ", state, whatever);
      switch (state) {
        case "connecting":
          break;
        case "connected":
          console.log("Producer transport connected.");
          break;
        case "failed":
          transport.close();
          console.log("The producer transport is closed due to failure.");
          break;
        default:
          break;
      }
    });
    setProducingTransport(transport);
  };

  const initiateMeeting = async (_, outgoing = true) => {
    try {
      if (outgoing) {
        rtcSocket.asyncEmit("call-user", { room_id });
        setPopupOpen({
          type: "me",
          open: true,
        });
        console.log("Point 1: opened the Call");
      }

      const {
        producers,
        consumers,
        peers,
        routerRtpCapabilities,
        producerTransportParams,
        consumerTransportParams,
      } = await rtcSocket.asyncEmit("join-meeting", { room_id });
      setRtpCapabilities(routerRtpCapabilities);
      setPeers(peers);
      setConsumersData(consumers);
      console.log(
        "Point 2: Emitted the join meeting socket event and set the states."
      );

      const device = new Device();
      await device.load({ routerRtpCapabilities });
      setDevice(device);
      console.log("Point 3: Initiated the device and set the states");

      await subscribeProducerTransport(device, producerTransportParams);
      console.log("Point 4: Subscribed to the producer transport");
      await subscribeConsumerTransport(device, consumerTransportParams);
      await hydrateProducers(producers);
      console.log(
        "Point 5: Subscribed to the consumer transport and hydrated the producers and streams."
      );

      // await produceAudio();
      // console.log("Point 6: Now producing the audio...")
      // await produceVideo();
    } catch (e) {
      console.log("Error in initializing the meeting: " + e);
    }
  };

  const consume = async (transport, producer) => {
    const { producerId, id, kind, rtpParameters } = await rtcSocket.asyncEmit(
      "consume",
      {
        rtpCapabilities,
        socket_id: producer.socket_id,
        producer_id: producer.producerID,
      }
    );

    const consumer = await transport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      codecOptions: {},
    });
    consumer.on("", () => console.log("consumer closed"));
    consumer.on("producerclose", () =>
      console.log("associated producer closed so consumer closed")
    );
    const stream = new MediaStream();
    stream.addTrack(consumer.track);
    stream.isVideo = kind === "video";
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
      });
      await rtcSocket.asyncEmit("leave-meeting", { room_id });
      setStreams([]);
      setConsumersData(null);
      setProducers([]);
      setPeers({});
      producingTransport([]);
      consumingTransport([]);
      setIsAudio(false);
      setIsVideo(false);
    } catch (e) {
      console.log(e);
    }
  };

  const otherConsumers =
    consumersData?.content.filter(
      (consumer) => consumer !== medata.session_id
    ) || [];
  console.log(otherConsumers, peers);
  const otherPeers = [];
  otherConsumers.forEach((consumer) => {
    const peer = peers[consumer];
    if (!peer) return;
    const audioStream = streams.find(
      (stream) => stream.socket_id === peer.id && !isVideo
    );
    const vidStream = streams.find(
      (stream) => stream.socket_id === peer.id && isVideo
    );
    console.log("Here are the found streams: ", audioStream, vidStream);
    otherPeers.push({
      id: peer.id,
      socket_id: peer.socket_id,
      name: peer.name,
      audioStream,
      vidStream,
    });
  });

  return (
    <div className="flex w-full">
      <MassageLayout />
      <div className="relative w-full h-screen bg-gray-100">
        {room_id ? (
          otherMember ? (
            <div className="Header_Top">
              <div className="d-flex gap-1 align-items-center">
                <div className="circle_box">
                  {otherMember?.firstname.charAt(0)}
                </div>
                <div className="title_">{otherMember?.firstname}</div>
              </div>
              <div
                onClick={() => initiateMeeting(null, true)}
                className="padingleft"
                style={{ cursor: "pointer" }}
              >
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

        {room_id ? (
          <>
            {loader ? (
              <div className="MassageBox d-flex justify-content-center align-items-center">
                <BulletList />
              </div>
            ) : (
              <div className="MassageBox">
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "",
                    height: "100%",
                    overflow: "auto",
                    padding: "25px",
                  }}
                >
                  {data.length > 0 &&
                    data
                      .map((message, index, array) => {
                        if (index === array.length - 1)
                          return (
                            <div
                              className="py-3 m-auto d-flex justify-content-center"
                              key={index}
                            >
                              <span
                                style={{
                                  margin: "auto",
                                  marginTop: "10px",
                                  marginBottom: "20px",
                                  backgroundColor: "#003a55",
                                  color: "white",
                                  padding: "10px",
                                }}
                                className="rounded"
                              >
                                {message.content}
                              </span>
                            </div>
                          );
                        else
                          return (
                            <div
                              style={{
                                height: "45px",
                                width: "100%",
                                marginTop: "20px",
                              }}
                              key={index}
                            >
                              <p
                                style={{
                                  fontSize: "15px",
                                  paddingLeft: "2px",
                                  lineHeight: "18px",
                                  backgroundColor: "transparent",
                                  textAlign:
                                    message.author._id == medata._id
                                      ? "right"
                                      : "left",
                                }}
                              >
                                {message.author.firstname}
                              </p>
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
                                }}
                              >
                                <div
                                  style={{ backgroundColor: "#003a55" }}
                                  className={`rounded px-2 ${
                                    message.author._id == medata._id
                                      ? " text-white"
                                      : " text-white"
                                  }`}
                                >
                                  {message.content}
                                </div>
                              </div>
                            </div>
                          );
                      })
                      .reverse()}
                </div>
              </div>
            )}
          </>
        ) : null}

        {room_id ? (
          <div className="bottom gap-3">
            <input
              placeholder="Enter A Message"
              value={sendmassage}
              onChange={(e) => setSendmassage(e.target.value)}
              className="Input"
            />
            <button onClick={handleMessageSend} className="btn_Green">
              Send
            </button>
          </div>
        ) : null}
      </div>
      {popupOpen?.open && consumersData?.content?.length > 1 ? (
        <div className="popup-overlay">
          <div className="popup-content shadow">
            <div style={{ width: "100%" }}>
              <div className="box">S</div>
              <div className="text-center mt-2 fs-3">Shahbaz Ai</div>

              {popupOpen?.type === "me" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    gap: "20px",
                  }}
                >
                  <div
                    onClick={() => (isVideo ? stopVideo() : produceVideo())}
                    className={`${isVideo ? "activebutton" : "unactivebutton"}`}
                    style={{ cursor: "pointer" }}
                  >
                    {isVideo ? (
                      <Icon icon="mdi:video" color="white" />
                    ) : (
                      <Icon icon="hugeicons:video-off" color="black" />
                    )}
                  </div>
                  <div
                    onClick={() => (isAudio ? stopAudio() : produceAudio())}
                    className={`${
                      isAudio === true ? "activebutton" : "unactivebutton"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {isAudio ? (
                      <svg
                        focusable="false"
                        width="24"
                        height="22"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
                      </svg>
                    ) : (
                      <Icon icon="mdi:mute" />
                    )}
                  </div>
                  <div
                    onClick={closeMeeting}
                    className="CutCall"
                    style={{ cursor: "pointer" }}
                  >
                    Call end.
                  </div>
                </div>
              ) : popupOpen?.type === "you" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    gap: "20px",
                  }}
                >
                  <div
                    onClick={() => initiateMeeting(null, false)}
                    className="AcceptCall"
                    style={{ cursor: "pointer" }}
                  >
                    Accept
                  </div>
                  <div
                    onClick={closeMeeting}
                    className="CutCall1"
                    style={{ cursor: "pointer" }}
                  >
                    Reject
                  </div>
                </div>
              ) : null}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  display: isVideo ? "block" : "none",
                }}
              />
              <audio
                ref={audioRef}
                autoPlay
                playsInline
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      ) : null}
      <section className="fixed w-[30%] h-[10rem] bg-slate-600">
        {otherPeers.map((peer, index) => (
          <PeersMedia index={index} peer={peer} />
        ))}
      </section>
    </div>
  );
}

export default Index;
