import { Footer, Header, SideBar } from "@/Component";
import { CourseCard, CourseTeam, HeroSection } from "@/layout/Home";
import React from "react";

function Index() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <CourseCard />
      <CourseTeam />
      <Footer />
    </div>
  );
}

export default Index;
