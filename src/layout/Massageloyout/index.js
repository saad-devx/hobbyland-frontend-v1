import { MassageSidebare } from "@/Component";
import React from "react";

function MassageLayout({ children }) {
  return (
    <div
      style={{ display: "flex", gap: "0px", width: "100%", height: "100vh" }}
    >
      <MassageSidebare />
      {children}
    </div>
  );
}

export default MassageLayout;
