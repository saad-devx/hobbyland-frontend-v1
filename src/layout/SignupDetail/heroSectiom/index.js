import { Icon } from "@iconify/react";
import { Fascinate } from "next/font/google";
import React, { useState } from "react";

function SignUpHero() {
  const [student, setStudent] = useState(false);
  const [courseAdministator, setCourseAdministator] = useState(false);

  return (
    <div className="Container_SignUpDetail">
      <div className="text-center fs-3 mt-4 fw-bold">
        Join as a Course or Course Administator
      </div>
      <div className="container mt-3">
        <div className="row PadingColoumn">
          <div className="col-md-6 mt-3">
            <div
              onClick={() => {
                student ? setStudent(false) : setStudent(true);

                setCourseAdministator(false);
              }}
              className={`${student ? "Checked" : "air3-btn-box"}`}
            >
              <div className="Card_Header">
                <div>
                  <Icon
                    icon="icomoon-free:user-tie"
                    fontSize={48}
                    color="#5a6d5a"
                    style={{ paddingTop: "20px" }}
                  />
                </div>
                <div>
                  <input checked={student} type="radio" />
                </div>
              </div>
              <div className="mt-3 fs-3">
                I’m a Studenr, hiring for a <br /> Course
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div
              onClick={() => {
                courseAdministator
                  ? setCourseAdministator(false)
                  : setCourseAdministator(true);
                setStudent(false);
              }}
              className={`${courseAdministator ? "Checked" : "air3-btn-box"}`}
            >
              <div className="Card_Header">
                <div>
                  <Icon
                    icon="icomoon-free:user-tie"
                    fontSize={48}
                    color="#5a6d5a"
                    style={{ paddingTop: "20px" }}
                  />
                </div>
                <div>
                  <input checked={courseAdministator} type="radio" />
                </div>
              </div>
              <div className="mt-3 fs-3">
                I’m a Administator, hiring for <br /> Student
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        <a href="./Signup">
          <button
            disabled={student ? false : courseAdministator ? false : true}
            className={`${
              student
                ? "btn_Green_Large_Size"
                : courseAdministator
                ? "btn_Green_Large_Size"
                : "btn_Green_Large_Size_Disabled"
            }`}
          >
            {student
              ? "Join as a Student"
              : courseAdministator
              ? "Join as a Administator"
              : "Create Acount"}
          </button>
        </a>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          I Have Already Created Your Acount ?{" "}
          <a href="./login" className="login_Href">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpHero;
