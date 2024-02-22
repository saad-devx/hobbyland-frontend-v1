import { useState } from "react";
import { Footer, Header } from "@/Component";
import React from "react";
import { signupCallback } from "@/config/Axiosconfig/AxiosHandle/auth";

function Index() {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const handleSignup = async () => {
    const data = await signupCallback({ otp: otp }); // Assuming signupCallback is your API function

    if (!data.success) {
      setError(data.msg); // Assuming the error message is in response.msg
      return;
    }

    // Continue with successful signup process
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
                onChange={(e) => {
                  setOtp(e.target.value);
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
