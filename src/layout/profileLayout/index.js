import React from "react";
import { SideBar, UserProfileLayout } from "@/Component";

function ProfileLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <UserProfileLayout />
      {children}
    </div>
  );
}

export default ProfileLayout;
