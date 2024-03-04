import CourseLayout from "@/layout/CourseLayout";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div className="w-100 course_structure_container">
          <div className="Header_">
            <div className="title_">Course Structure</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 p-3">
                    <div className="fs-3 fw-bold">
                      There's a course in you. Plan it out.
                    </div>
                    <div className="mt-3 ">
                      Planning your course carefully will create a clear
                      learning path for students and help you once you film.
                      Think down to the details of each lecture including the
                      skill you’ll teach, estimated video length, practical
                      activities to include, and how you’ll create introductions
                      and summaries.
                    </div>
                  </div>
                  <div className="col-md-4 p-5 shadow rounded">
                    <div className="images">
                      <img
                        className="m-auto"
                        src="https://s.udemycdn.com/instructor/manage/library-help.jpg"
                      />
                      <div className="fs-3 mt-3 fw-bold text-center">
                        Our library of resources
                      </div>
                      <div className="pt-3 text-center">
                        Tips and guides to structuring a course students love
                      </div>
                      <div className="text-center">
                        <button className="btn_Green_Large_Size mt-3">
                          Teaching Center
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Heading">Tips</div>
              <div className="Small_box">
                <div className="Heading_smalll mt-4">
                  Start with your goals.
                </div>
                <div className="mt-3">
                  Setting goals for what learners will accomplish in your course
                  (also known as learning objectives) at the beginning will help
                  you determine what content to include in your course and how
                  you will teach the content to help your learners achieve the
                  goals.
                </div>
                <div className="Heading_smalll mt-4">Create an outline.</div>
                <div className="mt-3">
                  Decide what skills you’ll teach and how you’ll teach them.
                  Group related lectures into sections. Each section should have
                  at least 3 lectures, and include at least one assignment or
                  practical activity. Learn more.
                </div>
                <div className="Heading_smalll mt-4">
                  Introduce yourself and create momentum.
                </div>
                <div className="mt-3">
                  People online want to start learning quickly. Make an
                  introduction section that gives learners something to be
                  excited about in the first 10 minutes.
                </div>
                <div className="Heading_smalll mt-4">
                  Sections have a clear learning objective.
                </div>
                <div className="mt-3">
                  Introduce each section by describing the section's goal and
                  why it’s important. Give lectures and sections titles that
                  reflect their content and have a logical flow.
                </div>
                <div className="Heading_smalll mt-4">
                  Lectures cover one concept.
                </div>
                <div className="mt-3">
                  A good lecture length is 2-7 minutes to keep students
                  interested and help them study in short bursts. Cover a single
                  topic in each lecture so learners can easily find and re-watch
                  them later.
                </div>
                <div className="Heading_smalll mt-4">
                  Mix and match your lecture types.
                </div>
                <div className="mt-3">
                  Alternate between filming yourself, your screen, and slides or
                  other visuals. Showing yourself can help learners feel
                  connected.
                </div>
                <div className="Heading_smalll mt-4">
                  Practice activities create hands-on learning.
                </div>
                <div className="mt-3">
                  Help learners apply your lessons to their real world with
                  projects, assignments, coding exercises, or worksheets.
                </div>
                <div className="Heading my-5 mt-5">Requirements</div>
                <ul>
                  <li>See the complete list of course quality requirements</li>
                  <li>Your course must have at least five lectures</li>
                  <li>
                    All lectures must add up to at least 30+ minutes of total
                    video
                  </li>
                  <li>
                    Your course is composed of valuable educational content and
                    free of promotional or distracting materials
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CourseLayout>
    </div>
  );
}

export default index;
