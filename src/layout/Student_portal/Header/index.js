import React from "react";

function Index() {
  return (
    <div className="Conatiner_Student_Header">
      <div className="Box">
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-2 margin_top">
              <h1 className="fw-bold fs-1" style={{ width: "75%" }}>
                Skill That Drive You Forward
              </h1>
              <p className="fs-5 fw-bold mt-3">
                Technalogy And The World Of Work Change Fast - with Us Your's
                Fater Of the Skills To Achieve Goals And Stay compititive
              </p>
              <div className="d-flex gap-3 mt-5">
                <input className="Input" />
                <button className="btn_Green">Search</button>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="img_box">
                <img
                  style={{ width: "8000px" }}
                  src="https://media.istockphoto.com/id/1316676180/vector/webinar-online-video-training-tutorial-podcast-concept-with-character-students-e-learning-by.jpg?s=612x612&w=0&k=20&c=BomDPLP9N09dycgxlVc-cnLaBGKH3YwHDvmoiLcKndY="
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
