import { useRouter } from "next/router";
import React, { useState } from "react";
import images2 from '../../../Assests/images/images.png'

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
              <h1 className="fw-bold fs-1 fw-bold" style={{ width: "75%" }}>
                Skill That Drive You Forward
              </h1>
              <p className="mt-3 fw-bold mt-3">
                Technology And The World Of Work Change Fast - <br /> with Us Yours
                Faster Of the Skills To Achieve Goals <br /> And Stay competitive
              </p>
              <div className="d-flex gap-3 mt-5 w-75">
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4u8yrJAwUrpEzkC42WvWwDOXZsV2Zy4n2s5vGVkTFu9D5kMmf"
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
