import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div style={{ width: "100%" }} className=" Curriculum_container">
          <div className="Header_">
            <div className="title_">Accessibility </div>
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
              <div className="Captions_">
                <div>
                  <Icon
                    icon="mingcute:warning-fill"
                    style={{ fontSize: "24px", color: "black" }}
                  />
                </div>
                <div className="">
                  <div className="fw-bold">
                    Create accessible learning content
                  </div>
                  <div className="mt-3">
                    Accessibility provides a person with a disability access to
                    — and benefits of — the same information, interactions, and
                    services as a person without a disability in a way that’s
                    sensible, meaningful, and usable. In short, it’s the
                    inclusive practice of ensuring there are no barriers to
                    learning for as many people as possible.
                  </div>
                  <div className="mt-3">
                    Some may think that accessibility is primarily aimed at
                    helping people with physical disabilities, such as those
                    with hearing or vision loss. However, making content
                    accessible to everyone isn’t just the equitable thing to do,
                    it also helps to broaden your reach so that more learners
                    can benefit from your courses.
                  </div>
                  <div className="mt-3">
                    Learn more about creating accessible content in Udemy’s
                    Teaching Center.
                  </div>
                </div>
              </div>
              <div className="Heading mt-3">Accessibility checklists</div>
              <div className="mt-3">
                To help you create accessible course content, we’ve provided
                Instructors with recommendations and best practices to consider
                while creating new courses or updating existing content. Please
                review these accessibility recommendations and checklists to
                indicate whether your course meets the guidelines.
              </div>
              <div className="mt-3">
                Note: while these accessibility guidelines are strongly
                recommended, they are not a requirement prior to publishing your
                course. Though content that does meet these accessibility
                guidelines may benefit from a greater number of learners who
                could take your course.
              </div>
            </div>
          </div>
        </div>
      </CourseLayout>
    </div>
  );
}

export default index;
