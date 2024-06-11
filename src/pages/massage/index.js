import { BASECHATURL } from "@/config/Axiosconfig";
import {
  AuthToken,
  CreateRoom,
  FectchRooms,
  GetMassage,
  GetSingleRoom,
  MessageSend,
} from "@/config/Axiosconfig/AxiosHandle/chat";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import MassageLayout from "@/layout/Massageloyout";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useGlobal, getGlobal } from 'reactn';

import { io } from "socket.io-client";
import ContentLoader, {
  Instagram,
  List,
  BulletList,
  Code,
} from "react-content-loader";
import { Icon } from "@iconify/react";
import { UserContext } from "@/config/contextapi/user";

function Index({ socket }) {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [sendmassage, setSendmassage] = useState("");
  const [data, setData] = useState([]);
  const [medata, serMedata] = useState({});
  const [room, setRoom] = useState({});
  const [openSpeaker, setOpenSpeaker] = useState(false);
  const [opneVoluem, setOpneVoluem] = useState(false);

  const [popupOpen, setPopupOpen] = useState({
    open: false,
    type: "me",
  });
  const { id } = router.query;
  const roomid = id;

  let audioProducer;

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      try {
        const cookies = document.cookie.split(";");
        let isLoggedIn = false;
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=");
          if (name.trim() === "is_logged_in" && value.trim() === "true") {
            isLoggedIn = true;
          }
        });
        if (isLoggedIn) {
          const response = await FetchMe();
          if (response) {
            serMedata(response.data.user);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fetchAllMessages = async () => {
    try {
      if (!roomid) return;
      const response = await GetMassage(roomid);
      if (response) {
        setData([...response.data?.messages]);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, [roomid]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (!roomid) return;
        const response = await GetSingleRoom(roomid);
        if (response) {
          setRoom({ ...response.data.room });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [roomid]);

  const handleMessageSend = async () => {
    if (!sendmassage) return;
    try {
      const response = await MessageSend(roomid, sendmassage);
      if (response) {
        setSendmassage("");
        fetchAllMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };
  let transport;
  let videoProducer;
  let screenProducer;
  const [audio, setAudio] = useState("audio");
  const [audioStream, setAudioStream] = useGlobal('audioStream');
  const [video, setVideo] = useState(false);
  const [videoStream, setVideoStream] = useState();

  useEffect(() => {
    socket?.on("message", (v) => {
      setData((prevData) => [v.message, ...prevData]);
    });
  }, [socket]);

  const OpenVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setOpneVoluem(true);
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
      console.log(stream);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const StopVoice = async () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
      setOpneVoluem(false);
      if (audioRef.current) {
        audioRef.current.srcObject = null;
      }
    }
  };
  const getVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setVideoStream(stream);
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    console.log(stream, "video");
    return stream;
  };
  const StopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      setVideo(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const setLocalStream = (stream) => {
    setVideoStream(stream);
  };
  console.log(videoRef, "video")
  const produceVideo = async (stream) => {
    const useStream = stream || videoStream;
    setVideo(true);
    try {
      const track = useStream.getVideoTracks()[0];
      const params = { track, appData: { isScreen: false } };
      setLocalStream(useStream);
      videoProducer = await params;
    } catch (err) {
      console.log('getusermedia produce failed', err);
      setVideo(false);
    }
  };

  const otherMember = room.members?.find((member) => member._id !== medata._id);

  return (
    <div style={{ display: "flex", width: "100%", gap: "0px" }}>
      <MassageLayout />
      <div
        style={{
          width: "100%",
          backgroundColor: "#f9f9f9",
          position: "relative",
          height: "100vh",
        }}
      >
        {roomid ? (
          otherMember ? (
            <div className="Header_Top">
              <div className="d-flex gap-1 align-items-center">
                <div className="circle_box">{otherMember?.firstname.charAt(0)}</div>
                <div className="title_">{otherMember?.firstname}</div>
              </div>
              <div onClick={() => {
                setPopupOpen({
                  type: "me",
                  open: true,
                });
              }} className="padingleft" style={{ cursor: "pointer" }}>
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

        {roomid ? (
          <>
            {loader === true ? (
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
                        if (index === array.length - 1) {
                          return (
                            <div className="py-3 m-auto d-flex justify-content-center" key={index}>
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
                        } else {
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
                                  className={`rounded px-2 ${message.author._id == medata._id
                                    ? " text-white"
                                    : " text-white"
                                    }`}
                                >
                                  {message.content}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                      .reverse()}
                </div>
              </div>
            )}
          </>
        ) : null}

        {roomid ? (
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
              <div className="text-center">Ringing</div>
              {popupOpen?.type === "me" ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: "center",
                    marginTop: "20px",
                    gap: "20px",
                  }}
                >
                  <div
                    onClick={() => (video ? StopVideo() : getVideo().then((stream) => produceVideo(stream)))}
                    className={`${video === true ? "activebutton" : "unactivebutton"}`}
                    style={{ cursor: "pointer" }}
                  >
                    {video === true ? (
                      <Icon icon="mdi:video" color="white" />

                    ) : (
                      <Icon icon="hugeicons:video-off" color="black" />
                    )}
                  </div>
                  <div onClick={() => {
                    opneVoluem ? StopVoice() : OpenVoice();
                  }} className={`${opneVoluem === true ? "activebutton" : "unactivebutton"}`} style={{ cursor: "pointer" }}>
                    {opneVoluem === true ? (
                      <svg focusable="false" width="24" height="22" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
                      </svg>
                    ) : (
                      <Icon icon="mdi:mute" />
                    )}
                  </div>
                  <div onClick={() => {
                    setPopupOpen({
                      type: "",
                      open: false
                    });
                    StopVoice();
                    StopVideo();
                  }} className="CutCall" style={{ cursor: "pointer" }}>
                    Call end.
                  </div>
                </div>
              ) : popupOpen?.type === "you" ? (
                <div style={{ display: 'flex', justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                  <div onClick={() => {
                    setPopupOpen({
                      type: "me",
                      open: false
                    });
                    setPopupOpen({
                      type: "me",
                      open: true
                    });
                  }} className="AcceptCall" style={{ cursor: "pointer" }}>
                    Accept
                  </div>
                  <div onClick={() => {
                    setPopupOpen({
                      type: "",
                      open: false
                    });
                    StopVoice();
                    StopVideo();
                  }} className="CutCall1" style={{ cursor: "pointer" }}>
                    Rejected
                  </div>
                </div>
              ) : (null)}
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "auto", display: video ? "block" : "none" }} />
              <audio ref={audioRef} autoPlay playsInline style={{ display: "none" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
