import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Footer() {
  const [data, setData] = useState({});
  const [token, setToken] = useState(true);
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
        setToken(true);
      } else {
        setToken(false);
      }
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
              <a
                onClick={() => {
                  router.push("./studentHome");
                }}
                className="link"
              >
                Home
              </a>
              <a
                onClick={() => {
                  router.push("./favourite");
                }}
                className="link"
              >
                favorite
              </a>
              <a
                onClick={() => {
                  router.push("./addtocard");
                }}
                className="link"
              >
                Categrios Pages
              </a>
              <a className="link">Add to Card</a>
            </div>
            <div className="col-md-3">
              <div className="HeadinG_Foter">Community</div>
              <p className="text-white">
                Community is the heart of shared support and understanding. It
                fosters collaboration, empathy, and growth, enriching lives
                through shared experiences and mutual aid. Embrace and
                contribute
              </p>
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
              {token === true ? (
                <div>fghfgh</div>
              ) : (
                <div>
                  <a
                    onClick={() => {
                      router.push("./SIgnupDetail");
                    }}
                    className="link"
                  >
                    HobblyLand Teacher
                  </a>
                  <a
                    onClick={() => {
                      router.push("./SIgnupDetail");
                    }}
                    className="link"
                  >
                    HobblyLand Teacher
                  </a>
                </div>
              )}
            </div>
            <div className="col-md-3">
              <div className="HeadinG_Foter">Contact</div>

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
          <div className="text-white">HobblyLand</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
