import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div style={{ width: "100%" }} className="w-100 Curriculum_container">
          <div className="Header_">
            <div className="title_">Course messages</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="mt-3">
                Write messages to your students (optional) that will be sent
                automatically when they join or complete your course to
                encourage students to engage with course content. If you do not
                wish to send a welcome or congratulations message, leave the
                text box blank.
              </div>
              <div className="Small_box">
                <div className="mt-3">
                  <div className="fw-bold mb-2">Welcome Message</div>
                  <textarea
                    className="Input_Large"
                    placeholder="Course Massage"
                    maxLength={1000}
                  />
                </div>
                <div className="mt-3">
                  <div className="fw-bold mb-2">Congratulations Message</div>
                  <textarea
                    className="Input_Large"
                    maxLength={1000}
                    placeholder="Course Massage"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <button className="btn_Green">Save</button>
              </div>
            </div>
          </div>
        </div>
      </CourseLayout>
    </div>
  );
}

export default index;
