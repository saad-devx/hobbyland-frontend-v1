import { Footer, Header } from "@/Component";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

function Index() {
  const [inputType, setInputType] = useState(true);

  return (
    <>
      <Header />
      <div className="continar_login mb-3">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Welcome.</div>
          <div className="Top_EmailText">
            <Icon icon="mdi:user" />
            mshahbazali@gmail.com
          </div>
          <div className="mt-5">
            <div className="Input">
              <div className="input_box">
                <input
                  type={`${inputType ? "password" : ""}`}
                  className="PasswordInput"
                  placeholder="Your Password"
                />
              </div>
              <div className="p-2 ">
                {inputType ? (
                  <Icon
                    className="icon"
                    onClick={() => {
                      setInputType(false);
                    }}
                    icon="ep:hide"
                    fontSize={15}
                  />
                ) : (
                  <Icon
                    className="icon"
                    onClick={() => {
                      setInputType(true);
                    }}
                    icon="icon-park-outline:eyes"
                    fontSize={15}
                  />
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "9px",
              }}
            >
              <div className="PrivacyKepLogin">
                <input type="checkbox" />
                Keep Login Me
              </div>
              <a className="ForgetPassword" href="./ForgetPassword">
                <div className="PrivacyKepLogin">Forget Password ?</div>
              </a>
            </div>
            <div className="text-center">
              <a href="./loginPassword">
                <button className="btn_Green_Size_Full mt-3">Login</button>
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
