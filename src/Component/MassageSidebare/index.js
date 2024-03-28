import React from "react";

function Index() {
  const data = [{}, {},];
  return (
    <div className="Massage_sideBare">
      <div className="sidebare">
        <div className="title_sidebare">
          Hobbly
          <br />
          Land
        </div>
        <div style={{ margin: "45px 0px" }}>
          {data.map((e, i) => {
            return (
              <div className="Chips__">
                Shahbaz ali <div className="position_absolute">1</div>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
