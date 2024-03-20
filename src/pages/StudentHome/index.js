import { Footer, Header, SideBar } from "@/Component";
import { CourseCard, CourseTeam, HeroSection } from "@/layout/Home";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const data = [
    {
      title: "Javascript",
      icon: "ph:code-bold",
    },
    {
      title: "Flutter",
      icon: "material-symbols:flutter",
    },
    {
      title: "Wordpress",
      icon: "ic:baseline-wordpress",
    },
    {
      title: "Python",
      icon: "teenyicons:python-outline",
    },
    {
      title: "Photography",
      icon: "mdi:photography",
    },
    {
      title: "Artist",
      icon: "fluent-emoji-high-contrast:artist-palette",
    },
    {
      title: "Song",
      icon: "streamline:music-folder-song",
    },
    {
      title: "sport",
      icon: "icon-park-outline:sport",
    },
  ];
  const router = useRouter();
  const handleClick = (title) => {
    router.push({
      pathname: "/categriosCard",
      query: { title: title },
    });
  };
  return (
    <div className="Student_home">
      <Header />
      <Student_Header />
      <div className="logos my-3  py-3">
        <div className="logo-slider">
          {data.map((e) => {
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
          {data.map((e) => {
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
