import "@/styles/globals.scss";
// import "@/styles/navebar.scss";
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
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/config/contextapi/auth";
import { UserProvider } from "@/config/contextapi/user";
// import Render from "./render";
import { SocketProvider } from "@/config/contextapi/socket";
import { PeerProvider } from "@/config/contextapi/peer";
import { ToastContainer } from "react-toastify";
import { gendy } from "@/config";

function App({ Component, pageProps }) {
  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap.bundle.min.js");
  // }, []);
  return (
    <AuthProvider>
      <ToastContainer />
      {/* <SocketProvider> */}
      <UserProvider>
        <main className={gendy.className}>
          {/* <Render Component={Component} pageProps={pageProps} /> */}
          <Component pageProps={pageProps} />
        </main>
      </UserProvider>
      {/* </SocketProvider> */}
    </AuthProvider>
  );
}
export default dynamic(() => Promise.resolve(App), { ssr: false });
