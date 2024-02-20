import { Footer, Header } from "@/Component";
import React from "react";

function Index() {
  return (
    <>
      <Header />
      <div className="continar_login mb-3">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Chnage Your Password.</div>

          <div className="mt-3">
            <div className="w-100 mt-3">
              <input className="Input" placeholder="New Password" />
            </div>
            <div className="w-100 mt-3">
              <input className="Input" placeholder="Confirm New Password" />
            </div>
            <div className="text-center">
              <a href="">
                <button className="btn_Green_Size_Full mt-5">
                  Update Password
                </button>
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
