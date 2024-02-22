import { Footer, Header } from "@/Component";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const [inputType, setInputType] = useState(true);
  const router = useRouter();
  const { email } = router.query;
  const [data, setData] = useState({ password: "", email: email });
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const handleLoginClick = () => {
    if (data.password.length > 8) {
      setError("Password must be at least 8 characters long");
    } else {
      // Proceed with login
      console.log(data);
      console.log(error);
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
          <div className="mt-5">
            <div className="Input">
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
              <div className="PrivacyKepLogin">
                <input type="checkbox" />
                Keep Login Me
              </div>
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
