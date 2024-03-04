import CourseLayout from "@/layout/CourseLayout";
import React from "react";

function index() {
  return (
    <div>
      <CourseLayout>
        <div className="w-100 course_structure_container">
          <div className="Header_">
            <div className="title_">Setup & test video</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 p-3">
                    <div className="fs-3 fw-bold">
                      Arrange your ideal studio and get early feedback
                    </div>
                    <div className="mt-3 ">
                      It's important to get your audio and video set up
                      correctly now, because it's much more difficult to fix
                      your videos after you’ve recorded. There are many creative
                      ways to use what you have to create professional looking
                      video.
                    </div>
                  </div>
                  <div className="col-md-4 p-5 shadow rounded">
                    <div className="images">
                      <img
                        className="m-auto"
                        src="https://s.udemycdn.com/instructor/manage/video-help.jpg"
                      />
                      <div className="fs-3 mt-3 fw-bold text-center">
                        Free expert video help
                      </div>
                      <div className="pt-3 text-center">
                        Get personalized advice on your audio and video
                      </div>
                      <div className="text-center">
                        <button className="btn_Green_Large_Size mt-3">
                          Create a test video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Heading">Tips</div>
              <div className="Small_box">
                <div className="Heading_smalll mt-4">
                  Equipment can be easy.
                </div>
                <div className="mt-3">
                  You don’t need to buy fancy equipment. Most smartphone cameras
                  can capture video in HD, and you can record audio on another
                  phone or external microphone.
                </div>
                <div className="Heading_smalll mt-4">
                  Students need to hear you.
                </div>
                <div className="mt-3">
                  A good microphone is the most important piece of equipment you
                  will choose. There are lot of affordable options.. Make sure
                  it’s correctly plugged in and 6-12 inches (15-30 cm) from you.
                </div>
                <div className="Heading_smalll mt-4">Make a studio.</div>
                <div className="mt-3">
                  Clean up your background and arrange props. Almost any small
                  space can be transformed with a backdrop made of colored paper
                  or an ironed bed sheet.
                </div>
                <div className="Heading_smalll mt-4">
                  Light the scene and your face.
                </div>
                <div className="mt-3">
                  Turn off overhead lights. Experiment with three point lighting
                  by placing two lamps in front of you and one behind aimed on
                  the background.
                </div>
                <div className="Heading_smalll mt-4">
                  Reduce noise and echo.
                </div>
                <div className="mt-3">
                  Turn off fans or air vents, and record at a time when it’s
                  quiet. Place acoustic foam or blankets on the walls, and bring
                  in rugs or furniture to dampen echo.
                </div>
                <div className="Heading_smalll mt-4">Be creative.</div>
                <div className="mt-3">
                  Students won’t see behind the scenes. No one will know if
                  you’re surrounded by pillows for soundproofing...unless you
                  tell other instructors in the community!
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
