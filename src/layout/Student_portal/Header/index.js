import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!value) {
      return setErr("Enter Your Field and Search Service");
    }
    router.push({
      pathname: "./Serach-service",
      query: { title: value },
    });
  };

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
                Technology And The World Of Work Change Fast - with Us Yours
                Faster Of the Skills To Achieve Goals And Stay competitive
              </p>
              <div className="d-flex gap-3 mt-5">
                <input
                  className={err ? "errTimezoneInput" : "Input"}
                  placeholder="Search Your Service"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />{" "}
                <button onClick={handleSearch} className="btn_Green">
                  Search
                </button>
              </div>
              {err && (
                <p style={{ color: "red" }} className="error">
                  {err}
                </p>
              )}
            </div>
            <div className="col-md-6 ">
              <div className="img_box">
                <img
                  style={{ width: "800px" }}
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
