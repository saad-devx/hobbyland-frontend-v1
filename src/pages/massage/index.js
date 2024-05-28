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
import { all } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ContentLoader, {
  Instagram,
  List,
  BulletList,
  Code,
} from "react-content-loader";
import { Icon } from "@iconify/react";
import { useSocket } from "@/config/contextapi/socket";

function Index() {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [sendmassage, setSendmassage] = useState("");
  const [data, setData] = useState([]);
  const [medata, serMedata] = useState({});
  const [room, setRoom] = useState({});
  const { id } = router.query;
  const roomid = id;

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
  const socket = useSocket();

  useEffect(() => {
    const conneckSocket = async () => {
      if (socket) {
        console.log(socket, "message-socket")
        await socket.on("message", (data) => {
          setData((prevData) => [data?.message, ...prevData]);
          console.log(data, "socket");
        });
      }
    }
    conneckSocket()
  }, [socket]);
  console.log(data);

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
          <div className="Header_Top">
            <div className="circle_box">{otherMember?.firstname.charAt(0)}</div>

            <div className="title_">{otherMember?.firstname}</div>
          </div>
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
                  {data
                    .map((message, index, array) => {
                      if (index === array.length - 1) {
                        return (
                          <div className="py-3 m-auto d-flex justify-content-center">
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
                              key={index}
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
                              backgroundColor: "transparent",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "15px",
                                paddingLeft: "2px",
                                lineHeight: "18px",
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
                              <span
                                style={{
                                  paddingLeft: "10px",
                                  paddingRight: "20px",
                                  backgroundColor: "#e8f0fe",
                                }}
                                className="rounded"
                              >
                                {message.content}
                              </span>
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
        ) : (
          <div>
            <Instagram />
          </div>
        )}

        {roomid ? (
          <div className="bottom gap-3">
            <input
              placeholder="Enter A Massage"
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
    </div>
  );
}

export default Index;
