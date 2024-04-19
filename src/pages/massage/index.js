import MassageLayout from "@/layout/Massageloyout";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Index() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to the socket server
    const newSocket = io("http://localhost:8000", {
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    // Define event listeners for receiving messages
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Log when the socket connection is established
    newSocket.on("connect", () => {
      console.log("Socket connected");
      setError(null); // Clear any previous connection errors
    });

    // Handle connection errors
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setError("Failed to connect to the server. Please try again later.");
    });

    // Clean up function to disconnect socket when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleMessageSend = () => {
    // Emit a message event to the server
    if (socket) {
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
            Search
          </button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}

export default Index;
