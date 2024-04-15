import { Footer, Header } from "@/Component";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import ProfileLayout from "@/layout/profileLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [on, setOn] = useState(false);
  const router = useRouter();
  const handleToggle = () => {
    setOn(!on); // Toggle the state of 'on'
  };
  const fectchdata = async () => {
    try {
      const response = await FetchMe();
      if (response) {
        console.log(response.data.user);
        setOn(response.data.user.two_fa.enabled);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fectchdata();
  });
  const togleUserChange = () => {
    router.push("./toggle-verify-otp");
  };
  return (
    <div>
      <ProfileLayout>
        <div
          style={{ width: "100%", height: "100%", overflowY: "scroll" }}
          className="Settting_Container"
        >
          <div className="Proper_Container">
            <h3 className="my-3 mx-5 fw-bold mt-5">Setting</h3>
            <div className="Row">
              <div className="title">Two Step Verification</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <div>{on ? "On" : "Off"}</div>
                {/* Switch input */}
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={on}
                      onClick={togleUserChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                {/* Display state */}
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
}

export default Index;
