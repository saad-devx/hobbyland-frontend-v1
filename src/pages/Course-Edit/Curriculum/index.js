import CourseLayout from "@/layout/CourseLayout";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div style={{ width: "100%" }} className="w-100 Curriculum_container">
          <div className="Header_">
            <div className="title_">Curriculum</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="Heading">Curriculum</div>
              <div className="mt-3">
                Start putting together your course by creating sections,
                lectures and practice (quizzes, coding exercises and
                assignments).
              </div>
              <div className="mt-3">
                Start putting together your course by creating sections,
                lectures and practice activities (quizzes, coding exercises and
                assignments). Use your course outline to structure your content
                and label your sections and lectures clearly. If you’re
                intending to offer your course for free, the total length of
                video content must be less than 2 hours.
              </div>
              <div className="AddCurriculum">
                <div>Add Curriculum</div>
                <div className="mx-3">
                  <input type="file" className="mt-3" />
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
