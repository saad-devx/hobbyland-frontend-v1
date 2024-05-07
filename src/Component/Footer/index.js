import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Footer() {
  const [data, setData] = useState({});
  const FetchMedata = async () => {
    try {
      const cookies = document.cookie.split(";");
      console.log(cookies, "cokiies");
      let isLoggedIn = false;
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name.trim() === "is_logged_in" && value.trim() === "true") {
          isLoggedIn = true;
        }
      });
      if (isLoggedIn) {
        const response = await FetchMe();
        if (response) {
          console.log(response.data.user);
          setData({ ...response.data.user });
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    FetchMedata();
  }, []);
  const router = useRouter();
  return (
    <div className="Footer_Container">
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="HeadinG_Foter">Pages</div>
              <a className="link">Home</a>
              <a className="link"></a>
              <a className="link">Press</a>
              <a className="link">Blog</a>
              <a className="link">Affiliates</a>
              <a className="link">Partnerships</a>
            </div>
            <div className="col-md-3">
              <div className="HeadinG_Foter">Community</div>
              <a className="link">Team Plans</a>
              <a className="link">Refer a Friend</a>
              <a className="link">Limited Memberships</a>
              <a className="link">Scholarships</a>
              <a className="link">Free Classes</a>
            </div>{" "}
            <div className="col-md-3">
              <div className="HeadinG_Foter">HobblyLand</div>
              {data?.account_type === "student" ? (
                <a
                  onClick={() => {
                    router.push("./StudentHome");
                  }}
                  className="link"
                >
                  HobblyLand Learning
                </a>
              ) : data?.account_type === "mentor" ? (
                <a
                  onClick={() => {
                    router.push("./Dashboard");
                  }}
                  className="link"
                >
                  HobblyLand Teacher
                </a>
              ) : null}
            </div>
            <div className="col-md-3">
              <div className="HeadinG_Foter">Contact</div>
              <div className="COntact_text">contact me send your email</div>
              <div className="mt-3">
                <div className="InputBox">
                  <input
                    className="Input_Email"
                    placeholder="Enter Your Gmail"
                  />
                  <div>
                    <Icon
                      icon="streamline:mail-send-email-message-solid"
                      fontSize={15}
                      color="white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Copy_Right">
          <div className="text-white">@hobby-land.com/en</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
