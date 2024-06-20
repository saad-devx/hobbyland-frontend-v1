import React, { useContext, useEffect, useMemo, useState } from "react";
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



                    const Peer = useMemo(() => new RTCPeerConnection(
                        {
                            query: {
                                token: response.data?.token,
                            },
                            iceServers: [
                                {
                                    urls: [
                                        "stun:stun.l.goggle.com:19302",
                                        "stun:global.stun.twilio.com:478"
                                    ]
                                }
                            ]

                        }
                    ), [])

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

                    setSocket(newSocket);;
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
