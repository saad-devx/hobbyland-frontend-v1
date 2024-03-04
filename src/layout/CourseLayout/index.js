import React from "react";
import { CourseEditlayout, SideBar } from "@/Component";

function CourseLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        overflowY: "scroll",
      }}
    >
      <CourseEditlayout />

      {children}
    </div>
  );
}

export default CourseLayout;
