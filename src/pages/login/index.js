import { Footer, Header } from "@/Component";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
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

  const handleLoginClick = () => {
    if (validateEmail()) {
      // Proceed with login
      console.log("Email is valid, proceed with login");
      router.push({
        pathname: "/loginPassword",
        query: { email: email },
      });
    } else {
      console.log("Email is invalid");
    }
  };
  const handleButtonClick = () => {
    // Redirect to the specified URL in a new tab
    window.open("https://accounts.google.com/o/oauth2/auth", "_blank");
  };

  return (
    <>
      <Header />
      <div className="continar_login mb-3">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Log in to HobbyLand.</div>
          <div className="mt-3">
            <div className="w-100 mt-5">
              <input
                className={`${emailError ? "errTimezoneInput" : "Input"}`}
                placeholder="Email And Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="ErrorMessage">{emailError}</div>}
            </div>
            <div className="text-center">
              <button
                className="btn_Green_Size_Full mt-3"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </div>
          <div className="mt-5">
            <a
              href="https://accounts.google.com/o/oauth2/auth?client_id=381982474591-dtbec03ptku7ftqfl930maoe7ev85171.apps.googleusercontent.com&redirect_uri=http://localhost:8000/api/auth/login/google&response_type=code&access_type=offline&scope=email%20profile"
              target="_blank"
            >
              <button class="google-button">
                <img
                  className="m-0  radius"
                  src="data:image/svg+xml;charset=utf-8,%3Csvg width='38' height='38' viewBox='0 0 101.33 101.33' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M0 0h101.33v101.33H0z'/%3E%3Cpath d='M50.667 36.167c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85c-4.16-3.87-9.59-6.25-16.06-6.25-9.38 0-17.49 5.38-21.44 13.22l7.98 6.19c1.89-5.69 7.2-9.91 13.46-9.91z' fill='%23ea4335'/%3E%3Cpath d='M73.647 51.217c0-1.57-.15-3.09-.38-4.55h-22.6v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z' fill='%234285f4'/%3E%3Cpath d='M37.197 55.257c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19c-1.63 3.24-2.55 6.9-2.55 10.78s.92 7.54 2.56 10.78z' fill='%23fbbc05'/%3E%3Cpath d='M50.667 74.667c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19c3.96 7.85 12.07 13.23 21.45 13.23z' fill='%2334a853'/%3E%3Cpath d='M26.667 26.667h48v48h-48z' fill='none'/%3E%3C/svg%3E"
                />
                <div className="text-center mx-3">Continue With Google</div>
              </button>
            </a>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
