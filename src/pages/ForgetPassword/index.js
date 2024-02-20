import { Footer, Header } from "@/Component";
import React from "react";

function Index() {
  return (
    <>
      <Header />
      <div className="continar_login mb-3">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Update Your Password.</div>
          <div className="UpdatePasswordText">
            Enter your username or email address and select <br />
            <span className="fw-bold">Send Email</span> .
          </div>
          <div className="mt-3">
            <div className="w-100 mt-3">
              <input className="Input" placeholder="Email And Email" />
            </div>
            <div className="text-center">
              <a href="./ChnagePassword">
                <button className="btn_Green_Size_Full mt-5">Send Email</button>
              </a>
            </div>
            <a className="NotYou" href="./SIgnupDetail">
              Not You ?
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
