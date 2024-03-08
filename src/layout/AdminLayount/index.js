import React from "react";
import { SideBar } from "@/Component";

function AdminLayout({ children }) {
  return (
    <div className="layot_admin">
      <SideBar />

      {children}
    </div>
  );
}

export default AdminLayout;
