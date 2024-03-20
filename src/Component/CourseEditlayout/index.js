import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

function Index() {
  const router = useRouter();
  const navigateLink = [
    {
      title: "Intended learners",
      path: "/Course-Edit/Intended-learning",
    },
    {
      title: "Course structure",
      path: "/Course-Edit/CourseStructure",
    },
    {
      title: "Setup & test video",
      path: "/Course-Edit/SetupTestVideo",
    },
  ];
  const navigateLink2 = [
    {
      title: "Film & edit",
      path: "/Course-Edit/Film-edit",
    },
    {
      title: "Curriculum",
      path: "/Course-Edit/Curriculum",
    },
    {
      title: "Captions (optional)",
      path: "/Course-Edit/Captions",
    },
    {
      title: "Accessibility (optional)",
      path: "/Course-Edit/Accessibility",
    },
  ];
  const navigateLink3 = [
    {
      title: "Course landing page",
      path: "/Course-Edit/Landing-page",
    },
    {
      title: "Pricing",
      path: "/Course-Edit/Pricing",
    },
    {
      title: "Course messages",
      path: "/Course-Edit/Course-Massage",
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
          <div className="my-3">
            <div className="p-2">
              {menue ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="mb-5 fs-3 text-white">Plan your course</div>
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
                </div>
              ) : (
                <div className="mb-5 fs-3 text-white">Plan your course</div>
              )}

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
              <div className="mb-1 mt-5 fs-5 text-white">
                Create your content
              </div>
              {navigateLink2.map((e, i) => {
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
              <div className="mb-1 mt-5 fs-5 text-white">
                Publish your course
              </div>
              {navigateLink3.map((e, i) => {
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
            </div>
          </div>
          <div className="mt-3">
            <div>
              <button
                onClick={() => {
                  router.push("/Dashboard");
                }}
                className="btn_Green_Size_Full"
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      ) : menue ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "15px",
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
