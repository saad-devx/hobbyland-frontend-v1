import { Icon } from "@iconify/react";
// import { Button } from "antd";
import React, { useState } from "react";

function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
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
                <div className="Responsive_Navigation_link">Home</div>
                <div className="Responsive_Navigation_link">Browse</div>
                <div className="Responsive_Navigation_link">Learning Paths</div>
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
    </>
  );
}

export default Header;
