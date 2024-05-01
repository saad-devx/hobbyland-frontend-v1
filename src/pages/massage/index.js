import { BASECHATURL } from "@/config/Axiosconfig";
import {
  AuthToken,
  CreateRoom,
  FectchRooms,
  GetMassage,
  MessageSend,
} from "@/config/Axiosconfig/AxiosHandle/chat";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import MassageLayout from "@/layout/Massageloyout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Index() {
  const [roomid, setRoomid] = useState();
  const router = useRouter();
  const [sendmassage, setSendmassage] = useState();
  const [data, setData] = useState([]);
  const [medata, serMedata] = useState();
  const [allmessage, setAllmessage] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("RoomId");
    setRoomid(id);
  }, []);
  const FetchAllMassage = async () => {
    try {
      const id = localStorage.getItem("RoomId");
      const response = await GetMassage(id);
      if (response) {
        console.log(response, "rrom");
        setData([...response.data?.messages]);
        console.log(data, "data");
        setAllmessage([...response.data?.messages]);
      }
    } catch (e) {
      console.log(e, "errmassage get");
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
  }, [allmessage]);
  useEffect(() => {
    FetchMedata();
  }, []);
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
            <div className="circle_box">{roomid.charAt(0)}</div>
            <div className="title_">{roomid}</div>
          </div>
        ) : null}

        {roomid ? (
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
        ) : null}

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
