import AdminLayout from "@/layout/AdminLayount";
import MassageLayout from "@/layout/Massageloyout";
import React from "react";

function Index() {
  return (
    <div className="teahermassage">
      <MassageLayout>
        <div style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
          <div
            style={{
              width: "100%",
              height: "75px",
              backgroundColor: "white",
              padding: "0px 20px",
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
            className="shadow__"
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                backgroundColor: "rgb(0 58 85)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              S
            </div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "800",
                color: "rgb(0 58 85)",
              }}
            >
              Shahbaz Ali
            </div>
          </div>
          <div className="backimagesText">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="massage__text_right">he ia ma</div>
            </div>
          </div>
          <div className="bottom_scrion">
            <div style={{ width: "90%" }}>
              <input
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  height: "40px",
                  borderRadius: "0px",
                  backgroundColor: "#efeae2",
                  fontSize: "15px",
                  outline: "none",
                  borderRadius: "8px",
                  padding: "0px 12px",
                }}
                placeholder="Write your message here..."
              />
            </div>
            <div>
              <button className="btn_Green">Send </button>
            </div>
          </div>
        </div>
      </MassageLayout>
    </div>
  );
}

export default Index;
