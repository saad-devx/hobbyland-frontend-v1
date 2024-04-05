import { Footer, Header, SideBar } from "@/Component";
import { categrios } from "@/constant/categrios";
import { CourseCard, CourseTeam, HeroSection } from "@/layout/Home";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();
  const handleClick = (title) => {
    router.push({
      pathname: "/categriosCard",
      query: { title: title },
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split(";");
      let isLoggedIn = false;

      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name.trim() === "is_logged_in" && value.trim() === "true") {
          isLoggedIn = true;
        }
      });

      if (isLoggedIn) {
      } else {
        // router.push("/login");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="Student_home">
      <Header />
      <Student_Header />
      <div className="logos my-3  py-3">
        <div className="logo-slider">
          {categrios.map((e) => {
            return (
              <div
                onClick={() => {
                  handleClick(e.title);
                }}
                className="logo_item shadow gap-3"
              >
                {" "}
                <div>
                  {" "}
                  <div style={{ textAlign: "center" }}>
                    <Icon
                      icon={e.icon}
                      fontSize="42px"
                      style={{ margin: "auto" }}
                    />
                  </div>
                  <div className="tex-center">{e.title}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="logo-slider">
          {categrios.map((e) => {
            return (
              <div
                onClick={() => {
                  handleClick(e.title);
                }}
                className="logo_item shadow gap-3"
              >
                {" "}
                <div>
                  {" "}
                  <div style={{ textAlign: "center" }}>
                    <Icon
                      icon={e.icon}
                      fontSize="42px"
                      style={{ margin: "auto" }}
                    />
                  </div>
                  <div className="tex-center">{e.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Card_Section islike={false} />
      <Footer />
    </div>
  );
}

export default Index;
