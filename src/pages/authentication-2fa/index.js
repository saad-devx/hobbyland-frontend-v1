import { useState } from "react";
import { Footer, Header } from "@/Component";
import React from "react";

import axios from "axios";
import { Icon } from "@iconify/react";
import { SignupCallback } from "@/config/Axiosconfig/AxiosHandle/auth";
import { useRouter } from "next/router";
import { VerifiOtp } from "@/config/Axiosconfig/AxiosHandle/Qrcode";

function Index() {
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState();
  const arr = [];
  const [error, setError] = useState("");
  const obj = { totp_code: otp };

  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleCLick = async () => {
    if (!otp) {
      setErr("Please enter OTP");
    } else {
      try {
        console.log(obj);
        const response = await VerifiOtp(otp);
        if (response) {
          console.log(response);
          setSuccess(response.data.msg);
          setError();

          router.push("./setting");
        }
      } catch (error) {
        setSuccess("");
        setError(error.response.data.msg);
        console.error("Error", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="continar_login">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Authentication Verify Otp</div>
          {error && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#feefee",
                padding: "12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon
                icon="carbon:warning-filled"
                style={{ fontSize: "29px", color: "#ee5d50" }}
              />
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#e6faf5",
                padding: "12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon
                icon="ep:success-filled"
                style={{ fontSize: "29px", color: "#01b574" }}
              />
              {success}
            </div>
          )}
          <div className="mt-5">
            <div className="w-100 ">
              <input
                onChange={(e) => {
                  setOtp(parseInt(e.target.value));
                }}
                className={err ? "errTimezoneInput" : "Input"}
                placeholder="Otp"
              />
              {err && <div className="ErrorMessage">{err}</div>}
            </div>
            <div className="text-center">
              <button
                className="btn_Green_Size_Full mt-5"
                onClick={handleCLick}
              >
                Verify Otp
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
