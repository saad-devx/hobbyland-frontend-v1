import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
function Index() {
  const router = useRouter();
  const navigateLink = [
    {
      title: "User Profile",
      path: "./profile",
    },
    {
      title: "Setting",
      path: "./setting",
    },
    {
      title: "Change password",
      path: "./ForgetPassword",
    },
  ];
  const [sidebare, setSidebare] = useState(true);
  const [sidebarePosition, setSidebarePosition] = useState(true);
  const [showSidebare, setShowSidebare] = useState(true);
  const [menue, setMenue] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setSidebare(true);
        setSidebarePosition(true);
        setShowSidebare(false);
        setMenue(true);
      } else {
        setSidebare(false);
        setShowSidebare(true);
        setMenue(false);

        setSidebarePosition(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="User_profile_Container">
      {!sidebare ? (
        <div className="SideBare">
          {menue ? (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                onClick={() => {
                  sidebare ? setSidebare(false) : setSidebare(true);
                }}
                className="Icon"
                icon="uiw:left"
                fontSize={25}
                color="#002333"
              />
            </div>
          ) : null}
          <div className="User_Profile_Circle">
            S
            <input className="InputNone" type="file" />
          </div>
          <div className="Heading">Shahbaz ALi</div>
          <div className="desc">
            Hey ' I am Shahbaz ali and i am full Stack developer
          </div>
          <div className="my-3">
            <div className="p-2">
              {navigateLink.map((e, i) => {
                return (
                  <button
                    onClick={() => {
                      router.push(e.path);
                    }}
                    className="Button"
                  >
                    {e.title}
                  </button>
                );
              })}

              <div className="my-5">
                <button
                  onClick={() => {
                    router.push("./login");
                  }}
                  className="Button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : menue ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: "13px",
              left: "08px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#002333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              onClick={() => {
                sidebare ? setSidebare(false) : setSidebare(true);
              }}
              className="Icon"
              icon="uiw:right"
              fontSize={25}
              color="white"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;
