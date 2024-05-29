// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASECHATURL } from '../Axiosconfig';
import { AuthToken } from '../Axiosconfig/AxiosHandle/chat';


const SocketContext = createContext(null);

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

            newSocket.on("connect", () => {
              console.log("Socket connected successfully");
            });

            newSocket.on("error", (error) => {
              console.error("Socket connection error:", error);
            });

            setSocket(newSocket); // Set the socket in state
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
