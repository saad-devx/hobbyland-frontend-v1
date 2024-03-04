import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div className="w-100 Curriculum_container">
          <div className="Header_">
            <div className="title_">Captions</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="mt-3 mb-3">
                Learners of all levels of language proficiency highly value
                subtitles as it helps follow, understand and memorize the
                content. Also having subtitles to ensure the content is
                accessible for those that are deaf or hard of hearing is
                crucial. Learn more.
              </div>
              <div className="Captions">
                <div>
                  <Icon
                    icon="mingcute:warning-fill"
                    style={{ fontSize: "24px", color: "black" }}
                  />
                </div>
                <div className="fw-bold">
                  When you add video lectures to your course via the Curriculum
                  you will be able to add captions to those videos here.
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
