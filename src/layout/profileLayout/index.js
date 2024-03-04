import React from "react";
import { SideBar, UserProfileLayout } from "@/Component";

function ProfileLayout({ children }) {
  return (
    <div
      style={{ display: "flex", gap: "1.3rem", height: "100vh", width: "100%" }}
    >
      <UserProfileLayout />
      {children}
    </div>
  );
}

export default ProfileLayout;
