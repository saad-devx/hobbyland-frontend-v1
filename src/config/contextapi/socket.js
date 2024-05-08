import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthToken } from "../Axiosconfig/AxiosHandle/chat";
import { BASECHATURL } from "../Axiosconfig";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchAuthSocket = async () => {
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
          const response = await AuthToken();
          if (response) {
            localStorage.setItem("Sockettoken", response.data?.token);
            const newSocket = io(BASECHATURL, {
              query: {
                token: response.data.token,
              },
            });

            setSocket(newSocket);

            newSocket.on("connect", () => {
              console.log("Socket connected successfully");
            });

            newSocket.on("error", (error) => {
              console.error("Socket connection error:", error);
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthSocket();

    return () => {
      // Clean up socket connection
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
