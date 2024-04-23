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
import { io } from "socket.io-client";
import { BASECHATURL } from "@/config/Axiosconfig";
const FectchAuthSocket = async () => {
  try {
    const response = await AuthToken();
    if (response) {
      console.log(response, "response");
      const socket = io(BASECHATURL, {
        query: {
          token: response.data.token,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export default function App({ Component, pageProps }) {
  useEffect(() => {
    FectchAuthSocket();
  }, []);
  return <Component {...pageProps} />;
}
