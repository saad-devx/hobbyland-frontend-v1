import { useState } from "react";
import { Footer, Header } from "@/Component";
import React from "react";
import { signupCallback } from "@/config/Axiosconfig/AxiosHandle/auth";
import axios from "axios";

function Index() {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState();
  const handleSignup = async () => {
    console.log(otp);

    axios
      .post("http://localhost:8000/api/auth/signup/callback", { otp: otp })
      .then((res) => {
        console.log(res.data, "data");
      })
      .catch((e) => {
        console.log(e, "e");
      });
  };

  return (
    <>
      <Header />
      <div className="continar_login">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Acount Create Otp.</div>

          <div className="mt-5">
            <div className="w-100 ">
              <input
                type="number"
                onChange={(e) => {
                  setOtp(parseInt(e.target.value));
                }}
                className="Input"
                placeholder="Otp"
              />
              {error && <div className="ErrorMessage">{error}</div>}
            </div>
            <div className="text-center">
              <button
                className="btn_Green_Size_Full mt-5"
                onClick={handleSignup}
              >
                Signup
              </button>
            </div>
            <a className="NotYou mt-3" href="./SIgnupDetail">
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
