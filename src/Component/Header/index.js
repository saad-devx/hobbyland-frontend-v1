import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

// import { Button } from "antd";
import React, { useEffect, useState } from "react";

function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(false);
  const [userdata, serUserdata] = useState({});
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
  const [datalenght, setDatalenght] = useState(0);
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
  });
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
                    <div className="Responsive_Navigation_link">
                      HobblyLand Business
                    </div>
                    <div className="Responsive_Navigation_link">
                      Teach On HobbyLand
                    </div>
                    <div className="Responsive_Navigation_link">
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
              <div className="Title_Navebar">
                HOBBY
                <br />
                LAND.
              </div>
              <div className="Link_Navigation">HobbyLand Business</div>
              <div className="Link_Navigation">Teach On HobblyLand</div>
              <div className="Link_Navigation">My Learning</div>
            </div>
            <div className="Right_Section">
              <div className="Input_serch">
                <input className="Input_serch" placeholder="Search..." />
                <button className="btn_Green">Search</button>
              </div>
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
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      right: "-20px",
                      width: "25px",
                      height: "25px",
                      backgroundColor: "white",
                      borderRadius: "100%",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {datalenght}
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
                <div onClick={handleFaverioteCLick}>
                  <Icon
                    fontSize={25}
                    icon="icon-park-outline:like"
                    color="white"
                  />
                </div>
                <div
                  onClick={() => {
                    router.push("./profile");
                  }}
                  className="BottonUserProfile"
                >
                  {userdata && userdata.firstname
                    ? userdata.firstname.charAt(0)
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="content_input">
            <div className="Input_serch">
              <input className="Input_serch" placeholder="Search..." />
              <button className="btn_Green">Search</button>
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
            <button className="SignIn">
              <Icon color="white" icon="zondicons:network" />
              Sign In
            </button>
            <button style={{ paddingLeft: "15px" }}>
              <a href="./SIgnupDetail" className="btn_Header_Green">
                SignUp
              </a>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
