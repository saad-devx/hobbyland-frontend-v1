import MassageLayout from "@/layout/Massageloyout";
import React from "react";

function Index() {
  return (
    <div style={{ display: "flex", width: "100%", gap: "0px" }}>
      <MassageLayout />
      <div
        style={{
          width: "100%",
          backgroundColor: "#f9f9f9",
          position: "relative",
        }}
      >
        <div className="Header_Top">
          <div className="circle_box">S</div>
          <div className="title_">Shahbaz Ali</div>
        </div>
        <div className="MassageBox"></div>
        <div className="bottom gap-3">
          <input placeholder="Enter A Massage" className="Input" />
          <button className="btn_Green">Search</button>
        </div>
      </div>
    </div>
  );
}

export default Index;
