import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

// import { Button } from "antd";
import React, { useState } from "react";

function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [token, setToken] = useState(true);
  const router = useRouter();

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
              <div className="flex_display">
                <div>
                  <Icon
                    fontSize={25}
                    icon="ic:baseline-notifications"
                    color="white"
                  />
                </div>
                <div>
                  <Icon
                    fontSize={25}
                    icon="iconoir:add-to-cart"
                    color="white"
                  />
                </div>
                <div>
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
                  S
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
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
            <div className="SignIn">
              <Icon color="white" icon="zondicons:network" />
              Sign In
            </div>
            <div style={{ paddingLeft: "15px" }}>
              <a href="./SIgnupDetail" className="btn_Green">
                SignUp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
