import MassageLayout from "@/layout/Massageloyout";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Index() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = io("ws://localhost:8000");
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up function to disconnect the socket when component unmounts
    return () => {
      newSocket.disconnect();
      newSocket.off("message");
    };
  }, []);

  const handleMessageSend = () => {
    if (socket && newMessage.trim() !== "") {
      socket.emit("message", newMessage);
      setNewMessage("");
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
        <div className="Header_Top">
          <div className="circle_box">S</div>
          <div className="title_">Shahbaz Ali</div>
        </div>
        <div className="MassageBox">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="bottom gap-3">
          <input
            placeholder="Enter A Massage"
            className="Input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleMessageSend} className="btn_Green">
            Send
          </button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}

export default Index;
