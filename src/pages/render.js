import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/config/contextapi/user";
import { AuthToken } from "@/config/Axiosconfig/AxiosHandle/chat";
import { io } from "socket.io-client";
import { BASECHATURL, WEBRTCBASEURL } from "@/config/Axiosconfig";
import SimplePeer from "simple-peer";

function Render({ Component, pageProps }) {
    const { user } = useContext(UserContext);
    const [socket, setSocket] = useState(null);
    const [peer, setPeer] = useState(null);

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

                    const newPeer = new SimplePeer({
                        query: {
                            token: response.data?.token,
                        },
                        initiator: true,
                        trickle: false,
                        config: {
                            iceServers: [
                                { urls: "stun:stun.l.google.com:19302" },
                            ]
                        },
                    });

                    console.log('New peer created:', newPeer);
                    newPeer.on("signal", data => {
                        console.log("Signal data sent:", data);
                        newSocket.emit("signal", data);
                    });
                    newPeer.on("connect", () => {
                        console.log("WebRTC connected successfully");
                    });
                    newPeer.on("error", (err) => {
                        console.error("WebRTC connection error:", err);
                    });
                    ;
                    newSocket.on("connect", () => {
                        console.log("Socket connected successfully");
                    });
                    newSocket.on("error", (error) => {
                        console.error("Socket connection error:", error);
                    });
                    newSocket.on("signal", data => {
                        console.log("Received signal:", data);
                        newPeer.signal(data);
                    });

                    newSocket.on("ice-candidate", (candidate) => {
                        console.log("Received ICE candidate:", candidate);
                        newPeer.signal({
                            candidate
                        });
                    });

                    setSocket(newSocket);
                    setPeer(newPeer);
                }
            }
        } catch (error) {
            console.error("Error in fetchAuthSocket:", error);
        }
    };

    useEffect(() => {
        fetchAuthSocket();
    }, [user]);

    return <Component socket={socket} peer={peer} {...pageProps} />;
}

export default Render;
