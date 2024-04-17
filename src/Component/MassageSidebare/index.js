import React from "react";

function Index() {
  const data = [{}, {}];
  return (
    <div className="massage_sideBare">
      <div>
        <div className="title_hobblyland">
          Hobbly <br />
          Land
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input className="Input mt-3" placeholder="search Here .." />

          <button className="btn_Green mt-3">Search</button>
        </div>
        <div className="mt-3">
          {data.map(() => {
            return (
              <div className="chips_">
                <div className="circleProfile"></div>
                <div>
                  <div className="title_">Shahbaz ALi</div>
                  <div className="desc">lorem insum dollor and</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
