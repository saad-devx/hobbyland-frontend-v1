import React, { useState } from "react";
import { Footer, Header } from "@/Component";
import { useRouter } from "next/router";
import { forgetpassword } from "@/config/Axiosconfig/AxiosHandle/auth";
import { Icon } from "@iconify/react";

function Index() {
  const [err, setErr] = useState({ password: "", confirmPassword: "" });
  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { email } = router.query;
  console.log(email);
  const obj = { email: email, new_password: data.password };
  const handleSubmit = async () => {
    const newErr = {};
    if (!data.password) {
      newErr.password = "Password is required";
    }
    if (!data.confirmPassword) {
      newErr.confirmPassword = "Confirm password is required";
    } else if (data.password !== data.confirmPassword) {
      newErr.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErr).length > 0) {
      setErr(newErr);
    } else {
      try {
        console.log(obj);
        const response = await forgetpassword(obj);
        if (response) {
          setSuccess(response.data.msg);
          setErrors("");
          setTimeout(() => {
            router.push("./changepasswordotp");
          }, 1000);
        }
      } catch (error) {
        setErrors(error.response ? error.response.data.msg : error.message);

        setSuccess("");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErr({ ...err, [name]: "" });
  };

  return (
    <>
      <Header />
      <div className="continar_login mb-3">
        <div className="CenterLogin">
          <div className="Heading_of_Signup">Change Your Password.</div>

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

          <div className="mt-3">
            <div className="w-100 mt-3">
              <input
                className={`${err.password ? "errTimezoneInput" : "Input"}`}
                type="password"
                name="password"
                placeholder="New Password"
                value={data.password}
                onChange={handleChange}
              />
              {err.password && (
                <div className="ErrorMessage">{err.password}</div>
              )}
            </div>
            <div className="w-100 mt-3">
              <input
                className={`${
                  err.confirmPassword ? "errTimezoneInput" : "Input"
                }`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              {err.confirmPassword && (
                <div className="ErrorMessage">{err.confirmPassword}</div>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="btn_Green_Size_Full mt-5"
              >
                Update Password
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
