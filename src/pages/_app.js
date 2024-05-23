import "@/styles/globals.scss";
import "@/styles/navebar.scss";
import "@/styles/AddToCard.scss";
import "@/styles/adminProfileQuestion.scss";
import "@/styles/Signup.scss";
import "@/styles/edit_course.scss";
import "@/styles/Card_.scss";
import "@/styles/analytics.scss";
import "@/styles/perfomance.scss";
import "@/styles/marketing_place.scss";
import "@/styles/tools.scss";
import "@/styles/TwoStepVarification.scss";
import "@/styles/profileQuestion.scss";
import "@/styles/student_home.scss";
import "@/styles/Addcourse.scss";
import "@/styles/massagesidebare.scss";
import "@/styles/studentMassage.scss";
import "@/styles/massage.scss";
import "@/styles/sidebare.scss";
import "@/styles/setting.scss";
import "@/styles/dashbaord.scss";
import "@/styles/_progress.scss";
import "@/styles/login.scss";
import "@/styles/Footer.scss";
import "@/styles/home/hero-section.scss";
import "@/styles/home/productCard.scss";
import "@/styles/home/CourseCreative.scss";
import "@/styles/student/header.scss";
import "@/styles/student/Card_Section.scss";
import "@/styles/SingleProduct.scss";
import "@/styles/home/CourseMember.scss";
import "@/styles/home/CourseMember.scss";
import "@/styles/home/Features.scss";
import "@/styles/checkout/index.scss";
import "@/styles/Auth/signupDetail.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthToken } from "@/config/Axiosconfig/AxiosHandle/chat";
import React, { useEffect } from "react";
import { SocketProvider } from "@/config/contextapi/socket";
import { AuthProvider } from "@/config/contextapi/auth";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";

export default function App({ Component, pageProps }) {
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
    const response = await FetchMe()
    if (response) {
      console.log(response.data.user._id)
    }
    if (isLoggedIn) {
      try {

        const PusherPushNotifications = await import("@pusher/push-notifications-web");

        const beamsClient = new PusherPushNotifications.Client({
          instanceId: "3c7f24f8-0cec-4d30-af7a-d137b4b70eb6",
        });

        const deviceId = await beamsClient.start().then((client) => client.getDeviceId());
        console.log("Successfully registered with Beams. Device ID:", deviceId);
        await beamsClient.addDeviceInterest(response.data.user._id);
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
  }, []);

  return (
    <AuthProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </AuthProvider>
  );
}
