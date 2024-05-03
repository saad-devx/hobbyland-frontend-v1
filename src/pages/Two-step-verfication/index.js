import { Footer, Header } from "@/Component";
import {
  FetchQrcode,
  Register2Fa,
} from "@/config/Axiosconfig/AxiosHandle/Qrcode";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";

function Index() {
  const [qrcode, setQrcode] = useState("");
  const [secret, setSecret] = useState();
  const [totp, setTotp] = useState("");
  const [error, setError] = useState(""); // State for error message
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  const GetData = async () => {
    try {
      const responseData = await FetchQrcode();
      if (responseData) {
        console.log(responseData);
        setQrcode(responseData.data.qr_url);
        setSecret(responseData.data.qr_secret);
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  const handleSubmit = async () => {
    if (!totp) {
      // Check if OTP is empty
      setError("Please enter OTP"); // Set error message
      return;
    }
    const data = {
      qr_secret: secret,
      totp_code: totp,
    };
    console.log(data);
    try {
      const response = await Register2Fa(data);
      if (response) {
        console.log(response);
        // alert("okay");
        setSuccess("Two Step Authentication Succesfully");
        setErrors();
        router.push("./StudentHome");
      }
    } catch (error) {
      // console.log(error.data.msg);
      console.log(error);
      setErrors(error.response ? error.response.data.msg : error.message);

      setSuccess();
    }
    // If OTP is entered, continue with the submission
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <Header />
      <div className="Container__Two_Step_varification">
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6">
              <h3 className="fw-bold my-3">Two Step verfication</h3>
              <div className="verfication_code">
                <img src={qrcode} style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dscs">
                Scan The QrCOde the Two Factor Autheintication app on Your Phone
                And Enter a Verification Code Is You Con't use a barcode use the
                text code instead
              </div>
              {errors && (
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
                  {errors}
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
              <div className="my-3">
                <div style={{ fontSize: "14px", padding: "0px 3px 3px 0px" }}>
                  Enter Otp
                </div>
                <input
                  onChange={(e) => {
                    setTotp(parseInt(e.target.value));
                    setError("");
                  }}
                  className={error ? "errTimezoneInput" : "Input"}
                />
                {/* Conditional rendering for error message */}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <div className="Button_Section">
                <div>
                  <button
                    onClick={() => {
                      router.push("./StudentHome");
                    }}
                    className="btn_Green"
                  >
                    Skip
                  </button>
                </div>
                <div>
                  <button onClick={handleSubmit} className="btn_Green">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
