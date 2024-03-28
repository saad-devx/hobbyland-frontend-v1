import { Footer, Header } from "@/Component";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const hnadleSubmit = () => {
    if (validateEmail()) {
      // Proceed with login
      console.log("Email is valid, proceed with login");
      router.push({
        pathname: "/ChnagePassword",
        query: { email: email },
      });
    } else {
      console.log("Email is invalid");
    }
  };
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
              <input
                className={`${emailError ? "errTimezoneInput" : "Input"}`}
                placeholder="Email And Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="ErrorMessage">{emailError}</div>}
            </div>
            <div className="text-center">
              <button
                onClick={hnadleSubmit}
                className="btn_Green_Size_Full mt-5"
              >
                Send Email
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
