import { MassageSidebare } from "@/Component";
import React from "react";

function MassageLayout({ children }) {
  return (
    <div style={{ height: "100vh", display: "flex", gap: "20px" }}>
      <MassageSidebare />
      {children}
    </div>
  );
}

export default MassageLayout;
