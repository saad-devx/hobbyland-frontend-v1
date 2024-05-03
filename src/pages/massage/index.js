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

function Index() {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [sendmassage, setSendmassage] = useState();
  const [data, setData] = useState([]);
  const [medata, serMedata] = useState();
  const [allmessage, setAllmessage] = useState([]);
  const [room, setRoom] = useState({});
  const { id } = router.query;
  const roomid = id;

  const FetchAllMassage = async () => {
    try {
      console.log(roomid, "id");
      const response = await GetMassage(roomid);
      if (response) {
        console.log(response, "rrom");
        setData([...response.data?.messages]);
        console.log(data, "data");
        setAllmessage([response.data?.messages]);
        setTimeout(() => {
          setLoader(false);
        }, 1500);
      }
    } catch (e) {
      console.log(e, "errmassage get");
    }
  };
  const FetchRoom = async () => {
    try {
      // const response = await data();
    } catch (e) {
      console.log(e);
    }
  };
  const FetchMedata = async () => {
    try {
      const response = await FetchMe();
      if (response) {
        console.log(response, "fetchMedata");
        serMedata(response.data.user);
        console.log(medata, "fetcRoom");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchAllMassage();
  }, [id, allmessage]);
  useEffect(() => {
    FetchMedata();
  }, []);
  const GetRoom = async () => {
    try {
      const response = await GetSingleRoom(roomid);
      if (response) {
        console.log(response.data.room);
        setRoom({ ...response.data.room });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetRoom();
  }, [id]);
  const handleMessageSend = async () => {
    console.log(sendmassage);
    if (!sendmassage) {
      return;
    }
    try {
      const response = await MessageSend(roomid, sendmassage);
      if (response) {
        console.log(response, "Message Was Sent Succesfully");
        FetchAllMassage();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(room, "singleRoom");
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
            <div className="circle_box">
              {room.members &&
                room.members.length > 1 &&
                room.members[1].firstname.charAt(0)}
            </div>

            <div className="title_">
              {room.members &&
                room.members.length > 1 &&
                room.members[1].firstname}
            </div>
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
