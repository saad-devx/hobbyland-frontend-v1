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
  const [data, setData] = useState();
  const [medata, serMedata] = useState();
  const { id } = router.query;
  useEffect(() => {
    setRoomid(id);
    console.log(roomid, "id_room  ");
  }, [id]);
  const FetchAllMassage = async () => {
    try {
      const id = localStorage.getItem("RoomId");
      const response = await GetMassage(id);
      if (response) {
        console.log(response, "rrom");
        setData(response.data);
        console.log(data, "data");
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
        console.log(medata);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchMedata();
    FetchAllMassage();
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
        }}
      >
        {id ? (
          <div className="Header_Top">
            <div className="circle_box">{id.charAt(0)}</div>
            <div className="title_">{id}</div>
          </div>
        ) : null}

        {id ? (
          <div className="MassageBox">
            <div
              style={{
                width: "100%",
                backgroundColor: "red",
                height: "100%",
                overflow: "auto",
                padding: "25px",
              }}
            >
              {data?.messages
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

        {id ? (
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
