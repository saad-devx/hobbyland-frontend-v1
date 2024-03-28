import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div style={{ width: "100%" }} className="w-100 Curriculum_container">
          <div className="Header_">
            <div className="title_">Pricing</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="fw-bold fs-5">Set a price for your course</div>
              <div className="mt-3">
                Please select the currency and the price tier for your course.
                If you’d like to offer your course for free, it must have a
                total video length of less than 2 hours. Also, courses with
                practice tests can not be free.
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-3 mt-3">
                    <div className="mb-2 fw-bold">Currency</div>
                    <select className="Input">
                      <option selected>USD</option>
                      <option>USD</option>
                      <option>USD</option>
                      <option>USD</option>
                      <option>USD</option>
                    </select>
                  </div>
                  <div className="col-md-3 mt-3">
                    <div className="mb-2 fw-bold d-flex gap-3 align-items-center">
                      Price Tier
                      <Icon
                        icon="mingcute:warning-fill"
                        style={{ fontSize: "18px", color: "black" }}
                      />
                    </div>
                    <select className="Input">
                      <option selected>USD</option>
                      <option>USD</option>
                      <option>USD</option>
                      <option>USD</option>
                      <option>USD</option>
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "35px",
                    }}
                  >
                    <button className="btn_Green">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CourseLayout>
    </div>
  );
}

export default index;
