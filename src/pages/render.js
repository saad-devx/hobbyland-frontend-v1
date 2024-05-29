import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/config/contextapi/user';
import { AuthToken } from '@/config/Axiosconfig/AxiosHandle/chat';
import { io } from "socket.io-client";
import { BASECHATURL } from '@/config/Axiosconfig';
import { useSocket } from '@/config/contextapi/socket';

function Render({ Component, pageProps }) {
    const { user } = useContext(UserContext);
    const [socket, setSocket] = useState(null)
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
                    console.log(newSocket, "render.js")
                    newSocket.on("error", (error) => {
                        console.error("Socket connection error:", error);
                    });
                    setSocket(newSocket)

                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const pusherAppSubscribe = async () => {
        try {
            const PusherPushNotifications = await import("@pusher/push-notifications-web");
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: "3c7f24f8-0cec-4d30-af7a-d137b4b70eb6",
            });
            if (user?._id) {
                await beamsClient.start()
                    .then(client => client.getDeviceId())
                    .then(deviceId => {
                        return beamsClient.addDeviceInterest(user._id);
                    })
                    .then(() => beamsClient.getDeviceInterests())
                    .then(interests => {
                    });
            } else {
                console.log("User ID not found");
            }
        } catch (error) {
        }
    };


    useEffect(() => {
        pusherAppSubscribe();
        fetchAuthSocket();
    }, [user]);

    return <Component socket={socket} {...pageProps} />;
}

export default Render;
