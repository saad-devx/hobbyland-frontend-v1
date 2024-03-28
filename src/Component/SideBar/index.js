import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

function SideBare() {
  const navigationLink = [
    {
      title: "Home",
      Icon: "teenyicons:home-solid",
      path: "./Dashboard",
    },
    {
      title: "Analytics",
      Icon: "mdi:analytics",
      path: "/Analytics",
    },

    {
      title: "Create Corse",
      Icon: "solar:course-up-bold",
      path: "/create-course",
    },
    {
      title: "Communication",
      Icon: "healthicons:communication",
      path: "/Communication",
    },
    {
      title: "perfomance",
      Icon: "uim:analytics",
      path: "/perfomance",
    },
    {
      title: "Tools",
      Icon: "mdi:tools",
      path: "/Tools",
    },
    {
      title: "Resources",
      Icon: "akar-icons:question-fill",
      path: "/Resources",
    },
    {
      title: "Massage",
      Icon: "subway:massage-1",
      path: "/Message_Teacher",
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
    <div className="width_main_">
      <div className="sideBare_main">
        {showSidebare ? (
          <div
            data-collapse={sidebare}
            className={`${!sidebare ? "SideBarehalf" : "SideBare__container"}`}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="SideBare__title">
                HOBBLY <br />
                LAND.
              </div>
              {menue ? (
                <div className="">
                  {!sidebare ? (
                    <Icon
                      onClick={() => {
                        setShowSidebare(false);
                      }}
                      className="Icon"
                      icon="uiw:left"
                      fontSize={25}
                      color="white"
                    />
                  ) : (
                    <Icon
                      onClick={() => {
                        setShowSidebare(false);
                      }}
                      className="Icon"
                      icon="uiw:right"
                      fontSize={25}
                      color="white"
                    />
                  )}
                </div>
              ) : (
                <div className="">
                  {!sidebare ? (
                    <Icon
                      onClick={() => {
                        sidebare ? setSidebare(false) : setSidebare(true);
                      }}
                      className="Icon"
                      icon="uiw:left"
                      fontSize={25}
                      color="white"
                    />
                  ) : (
                    <Icon
                      onClick={() => {
                        sidebare ? setSidebare(false) : setSidebare(true);
                      }}
                      className="Icon"
                      icon="uiw:right"
                      fontSize={25}
                      color="white"
                    />
                  )}
                </div>
              )}
            </div>
            <div style={{ paddingTop: "30px" }}>
              {navigationLink.map((e, i) => {
                return (
                  <a style={{ textDecoration: "none" }} href={e.path}>
                    <div className="Link_NavigationBox">
                      <div className="Icon">
                        <Icon icon={e.Icon} fontSize={18} color="white" />
                      </div>
                      <div className="title">{e.title}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setShowSidebare(true);
            }}
            className="border_Circle"
          >
            <Icon icon="heroicons-solid:menu-alt-3" className="MenueBare" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBare;
