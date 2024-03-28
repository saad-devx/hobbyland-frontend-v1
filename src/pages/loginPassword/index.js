import { Footer, Header } from "@/Component";
import { Login } from "@/config/Axiosconfig/AxiosHandle/auth";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";

import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const [inputType, setInputType] = useState(true);
  const router = useRouter();
  const { email } = router.query;
  const [data, setData] = useState({
    password: "",
    email: email,
    register_provider: "hobbyland",
  });
  const [error, setError] = useState();

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const handlePasswordChange = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const handleLoginClick = async () => {
    console.log(data);
    if (!(data.password.length >= 8)) {
      setError("Please enter your password with at least 8 characters.");
    } else {
      try {
        const response = await Login(data);
        if (response) {
          console.log(response);
          setSuccess(response.data.msg);
          setErrors("");
          console.log(response.data.payload);
          localStorage.setItem("Acces__teken", response.data.payload);

          router.push("/StudentHome");
        }
      } catch (error) {
        console.log(error);
        setErrors(error.response.data.msg ? error.response.data.msg : null);
        setSuccess("");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="continar_login mb-3">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Welcome.</div>

          <div className="Top_EmailText">
            <Icon icon="mdi:user" />
            {email}
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
          <div className="mt-5">
            <div className={`${error ? "errTimezoneInput" : "Input"}`}>
              <div className="input_box">
                <input
                  type={`${inputType ? "password" : ""}`}
                  className="PasswordInput"
                  placeholder="Your Password"
                  value={data.password}
                  onChange={handlePasswordChange}
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
            {error && <div className="ErrorMessage">{error}</div>}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "9px",
              }}
            >
              <div className="PrivacyKepLogin"></div>
              <a className="ForgetPassword" href="./ForgetPassword">
                <div className="PrivacyKepLogin">Forget Password ?</div>
              </a>
            </div>
            <div className="text-center">
              <button
                className="btn_Green_Size_Full mt-3"
                onClick={handleLoginClick}
              >
                Login
              </button>
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
