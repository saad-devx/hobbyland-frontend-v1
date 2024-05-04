import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

// import { Button } from "antd";
import React, { useEffect, useState } from "react";

function Header() {
  const [datalenght, setDatalenght] = useState(0);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(false);
  const [userdata, serUserdata] = useState({});
  const [faveroutelenght, setFaveroutelenght] = useState(0);

  const router = useRouter();
  const fecthMeData = async () => {
    try {
      const response = await FetchMe();
      if (response) {
        console.log(response);
        serUserdata({ ...response.data.user });
        console.log(userdata);
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
          console.log(cookies);
          console.log(token);
        } else {
          setToken(false);
          console.log(cookies);
          console.log(token);
        }
      }
    } catch (error) {
      console.log(error, "err");
      setToken(false);
    }
  };
  useEffect(() => {
    fecthMeData();
    console.log(token, "teken");
  }, []);

  const handleFaverioteCLick = () => {
    router.push("favourite");
  };

  return (
    <>
      {token ? (
        <>
          <div className="Navebar_Container">
            {openSideBar ? (
              <div className="SideBarContainer">
                <div className="CLoseIcon">
                  <Icon
                    onClick={() => {
                      setOpenSideBar(false);
                    }}
                    icon="material-symbols:close"
                    fontSize={40}
                    color="black"
                  />
                  <div className="Link_Navigation_Container">
                    {userdata?.account_type === "student" ? (
                      <div></div>
                    ) : (
                      <div
                        onClick={() => {
                          router.push("./Dashboard");
                        }}
                        className="Responsive_Navigation_link"
                      >
                        Teach On HobbyLand
                      </div>
                    )}

                    <div
                      onClick={() => {
                        router.push("./StudentHome");
                      }}
                      className="Responsive_Navigation_link"
                    >
                      My Learning
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="Left_Section">
              <div className="MenueIcon">
                <Icon
                  onClick={() => {
                    setOpenSideBar(true);
                  }}
                  icon="eva:menu-2-outline"
                  fontSize={40}
                  color="white"
                />
              </div>
              <div
                onClick={() => {
                  router.push("/StudentHome");
                }}
                className="Title_Navebar"
              >
                HOBBY
                <br />
                LAND.
              </div>
              {userdata?.account_type === "student" ? (
                <div></div>
              ) : (
                <div
                  onClick={() => {
                    router.push("./Dashboard");
                  }}
                  className="Link_Navigation"
                >
                  Teach On HobblyLand
                </div>
              )}

              <div
                onClick={() => {
                  router.push("/StudentHome");
                }}
                className="Link_Navigation"
              >
                My Learning
              </div>
            </div>
            <div className="Right_Section">
              <div className="flex_display">
                <div
                  onClick={() => {
                    router.push("addtocard");
                  }}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <div>
                    <Icon
                      fontSize={25}
                      icon="iconoir:add-to-cart"
                      color="white"
                    />
                  </div>
                </div>
                <div
                  onClick={() => {
                    router.push("/massage");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Icon
                    fontSize={25}
                    icon="mage:message-dots-round"
                    color="white"
                  />
                </div>
                <div
                  onClick={handleFaverioteCLick}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <div>
                    <Icon
                      fontSize={25}
                      icon="icon-park-outline:like"
                      color="white"
                    />
                  </div>
                </div>

                <div
                  onClick={() => {
                    router.push("./profile");
                  }}
                  className="BottonUserProfile"
                >
                  {userdata && userdata.firstname
                    ? userdata?.firstname?.charAt(0)
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="Navebar_Container">
          {openSideBar ? (
            <div className="SideBarContainer">
              <div className="CLoseIcon">
                <Icon
                  onClick={() => {
                    setOpenSideBar(false);
                  }}
                  icon="material-symbols:close"
                  fontSize={40}
                  color="black"
                />
                <div className="Link_Navigation_Container">
                  <div className="Responsive_Navigation_link">Home</div>
                  <div className="Responsive_Navigation_link">Browse</div>
                  <div className="Responsive_Navigation_link">
                    Learning Paths
                  </div>
                  <div className="Responsive_Navigation_link">
                    Student Project
                  </div>
                  <div className="Responsive_Navigation_link">
                    Show Live Secission
                  </div>
                  <div className="Responsive_Navigation_link">
                    Shop 1-On-1 Secission
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="Left_Section">
            <div className="MenueIcon">
              <Icon
                onClick={() => {
                  setOpenSideBar(true);
                }}
                icon="eva:menu-2-outline"
                fontSize={40}
                color="white"
              />
            </div>
            <div className="Title_Navebar">
              HOBBY
              <br />
              LAND.
            </div>
            <div className="Link_Navigation">Browse</div>
            <div className="Link_Navigation">Learning Paths</div>
          </div>
          <div className="Right_Section">
            <Link href="/login" className="SignIn">
              <Icon color="white" icon="zondicons:network" />
              Sign In
            </Link>
            <button style={{ paddingLeft: "15px" }}>
              <a href="./SIgnupDetail" className="btn_Header_Green">
                Sign Up
              </a>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
