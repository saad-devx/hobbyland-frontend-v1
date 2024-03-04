import React from "react";
import { SideBar } from "@/Component";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.3rem",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "0",
        overflowY: "scroll",
      }}
    >
      <SideBar />

      {children}
    </div>
  );
}

export default AdminLayout;
