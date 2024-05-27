import { FetchMe, FetchMeNotification } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/config/contextapi/user";
import { SocketProvider, useSocket } from "@/config/contextapi/socket";

function Header() {
  const [datalenght, setDatalenght] = useState(0);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [fixedNavebare, setFixedNavebare] = useState(false);
  const [faveroutelenght, setFaveroutelenght] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { fetchUserData } = useContext(UserContext)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 135) {
        setFixedNavebare(true);
      } else {
        setFixedNavebare(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fecthMeData = async () => {
    try {
      const cookies = document.cookie.split(";");
      console.log(cookies, "cookies");
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
          console.log(response, "fetchme header");
          setUserdata({ ...response.data.user });
          fetchUserData()
          const cookies = document.cookie.split(";");
          console.log(cookies, "cookies");
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
      } else {
      }
    } catch (error) {
      console.log(error, "err");
      setToken(false);
    }
  };
  const [notification, setNotification] = useState([])
  const FetchNotification = async () => {
    try {
      const cookies = document.cookie.split(";");
      console.log(cookies, "cookies");
      let isLoggedIn = false;
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name.trim() === "is_logged_in" && value.trim() === "true") {
          isLoggedIn = true;
        }
      });
      if (isLoggedIn) {
        const response = await FetchMeNotification()
        if (response) {
          console.log(response, "notification")
          setNotification(response.data.notifications_data[0]?.notifications)
          // console.log()
          console.log(notification, "notifcation")
        }
      }

    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    FetchNotification()
  }, [])
  useEffect(() => {
    fecthMeData();
    console.log(token, "token");
  }, []);

  useEffect(() => {
    if (token && userdata._id) {
    }
  }, [token, userdata._id]);

  const handleFaverioteCLick = () => {
    router.push("favourite");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
    }
  }, [])
  return (
    <>
      {token ? (
        <>
          <div
            className={`${fixedNavebare ? "fixed_Navebar_Container" : "Navebar_Container"
              }`}
          >
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
                {/* {notification} */}
                <div
                  onClick={handleMenuOpen}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <div>
                    <Icon
                      fontSize={25}
                      icon="mingcute:notification-fill"
                      color="white"
                    />
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    {notification?.map((e, i) => {
                      console.log(notification)
                      return (
                        <div
                          style={{
                            cursor: "pointer",
                            padding: "15px",
                            backgroundColor: "#e6faf5",
                            padding: "2px",
                            marginTop: "8px",
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            width: "500px",
                            alignItems: "center"
                          }}
                          className="notification_"
                        >
                          <div>

                            <Icon
                              icon="ep:success-filled"
                              style={{ fontSize: "29px", color: "#01b574" }}
                            />
                          </div>
                          <div>

                            <div className="fs-5 fw-bold">{e?.mini_msg}</div>
                            <div className="">{e?.message}</div>
                          </div>

                        </div>
                      )
                    })
                    }

                  </Menu>
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
        <div
          className={`${fixedNavebare ? "fixed_Navebar_Container" : "Navebar_Container"
            }`}
        >
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
                  <div
                    onClick={() => {
                      router.push("./SIgnupDetail");
                    }}
                    className="Responsive_Navigation_link"
                  >
                    HobbyLand Teacher
                  </div>
                  <div
                    onClick={() => {
                      router.push("./SIgnupDetail");
                    }}
                    className="Responsive_Navigation_link"
                  >
                    HobbyLand student
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
            <div
              onClick={() => {
                router.push("./SIgnupDetail");
              }}
              className="Link_Navigation"
            >
              HobblyLand Teacher
            </div>
            <div
              onClick={() => {
                router.push("./SIgnupDetail");
              }}
              className="Link_Navigation"
            >
              HobblyLand StudentHome
            </div>
          </div>
          <div className="Right_Section">
            <Link href="./login" className="SignIn">
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
