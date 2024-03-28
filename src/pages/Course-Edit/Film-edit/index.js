import CourseLayout from "@/layout/CourseLayout";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div
          style={{ width: "100%" }}
          className="w-100 course_structure_container"
        >
          <div className="Header_">
            <div className="title_">Film & edit</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 p-3">
                    <div className="fs-3 fw-bold">
                      You’re ready to share your knowledge.
                    </div>
                    <div className="mt-3 ">
                      This is your moment! If you’ve structured your course and
                      used our guides, you're well prepared for the actual
                      shoot. Pace yourself, take time to make it just right, and
                      fine-tune when you edit.
                    </div>
                  </div>
                  <div className="col-md-4 p-5 shadow rounded">
                    <div className="images">
                      <img
                        className="m-auto"
                        src="https://s.udemycdn.com/instructor/manage/video-help.jpg"
                      />
                      <div className="fs-3 mt-3 fw-bold text-center">
                        You’re in good company
                      </div>
                      <div className="pt-3 text-center">
                        Chat and get production help with other Udemy
                        instructors
                      </div>
                      <div className="text-center">
                        <button className="btn_Green_Large_Size mt-3">
                          Join the community
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Heading">Tips</div>
              <div className="Small_box">
                <div className="Heading_smalll mt-4">
                  Take breaks and review frequently.
                </div>
                <div className="mt-3">
                  Check often for any changes such as new noises. Be aware of
                  your own energy levels--filming can tire you out and that
                  translates to the screen.
                </div>
                <div className="Heading_smalll mt-4">Build rapport.</div>
                <div className="mt-3">
                  Students want to know who’s teaching them. Even for a course
                  that is mostly screencasts, film yourself for your
                  introduction. Or go the extra mile and film yourself
                  introducing each section!
                </div>
                <div className="Heading_smalll mt-4">
                  Being on camera takes practice.
                </div>
                <div className="mt-3">
                  Make eye contact with the camera and speak clearly. Do as many
                  retakes as you need to get it right.
                </div>
                <div className="Heading_smalll mt-4">
                  Set yourself up for editing success.
                </div>
                <div className="mt-3">
                  You can edit out long pauses, mistakes, and ums or ahs. Film a
                  few extra activities or images that you can add in later to
                  cover those cuts.
                </div>
                <div className="Heading_smalll mt-4">Create audio marks.</div>
                <div className="mt-3">
                  Clap when you start each take to easily locate the audio spike
                  during editing. Use our guides to manage your recording day
                  efficiently.
                </div>
                <div className="Heading_smalll mt-4">
                  For screencasts, clean up.
                </div>
                <div className="mt-3">
                  Move unrelated files and folders off your desktop and open any
                  tabs in advance. Make on-screen text at least 24pt and use
                  zooming to highlight.
                </div>

                <div className="Heading my-5 mt-5">Requirements</div>
                <ul>
                  <li>
                    Film and export in HD to create videos of at least 720p, or
                    1080p if possible
                  </li>
                  <li>
                    Audio should come out of both the left and right channels
                    and be synced to your video
                  </li>
                  <li>
                    Audio should be free of echo and background noise so as not
                    to be distracting to students
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
