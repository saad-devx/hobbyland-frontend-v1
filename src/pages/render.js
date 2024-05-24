import { BASECHATURL } from '@/config/Axiosconfig';
import { AuthToken } from '@/config/Axiosconfig/AxiosHandle/chat';
import { io } from "socket.io-client";
import { UserContext } from '@/config/contextapi/user';
import React, { useContext, useEffect, useState } from 'react'

function Render({ Component, pageProps }) {

    const { user } = useContext(UserContext)
    console.log(user)
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
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const pusherAppSubscribe = async () => {
        const cookies = document.cookie.split(";");
        console.log(cookies, "cookies");
        let isLoggedIn = false;
        cookies.forEach((cookie) => {
            const [name, value] = cookie.split("=");
            if (name.trim() === "is_logged_in" && value.trim() === "true") {
                isLoggedIn = true;
            }
        });
        if (isLoggedIn) {
            try {

                const PusherPushNotifications = await import("@pusher/push-notifications-web");

                const beamsClient = new PusherPushNotifications.Client({
                    instanceId: "3c7f24f8-0cec-4d30-af7a-d137b4b70eb6",
                });

                const deviceId = await beamsClient.start().then((client) => client.getDeviceId());
                console.log("Successfully registered with Beams. Device ID:", deviceId);
                await beamsClient.addDeviceInterest(user._id);
                const interests = await beamsClient.getDeviceInterests();
                console.log("Current interests:", interests);

            } catch (error) {
                console.error("Error subscribing to Pusher Beams:", error);
            }
        } else {
            console.log("Tokon Not found")
        }
    };

    useEffect(() => {
        pusherAppSubscribe();
        fetchAuthSocket()
    }, [user]);
    return (
        <>
            <Component {...pageProps} />

        </>
    )
}

export default Render
