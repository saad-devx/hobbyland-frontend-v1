import React from "react";
import { SideBar } from "@/Component";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", }}>
      <SideBar />

      {children}
    </div>
  );
}

export default AdminLayout;
