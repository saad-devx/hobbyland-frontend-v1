import { useRouter } from "next/router";
import React from "react";

function Index() {
  const route = useRouter();
  return (
    <div>
      <div className="Header_">
        <div className="HoobbyLand_Title">
          Hobby
          <br />
          Land.
        </div>
      </div>
      <div className="p-3 container">
        <div className="row p-3">
          <div className="col-md-6">
            <img src="https://www.udemy.com/staticx/udemy/images/teaching/test-video-v1.jpg" />
          </div>
          <div className="col-md-6 mt-5">
            <div className="fs-2 text-center fw-bold">
              We check production so you can focus on instruction
            </div>
            <div className="fw-bold my-3">
              You don't have to be an audio/video expert to teach what you know.
              By submitting a two-minute test video, you can:
            </div>
            <ul>
              <li className="mt-2">
                Fine tune your audio/video setup with personalized feedback
              </li>
              <li className="mt-2">
                Make sure your audio and video meet our technical standards
              </li>
              <li className="mt-2">
                Practice your delivery before you record your course
              </li>
            </ul>
            <div className="mt-3">
              Remember to use the same setup, including camera, microphone, and
              recording environment, that you will use for your course.
            </div>
            <div className="mt-3">
              Also, if you change any part of your setup, submit a new test
              video for an up-to-date review.
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            route.push("/test-video-start");
          }}
          className="btn_Green_Large_Size"
        >
          I Have My Equipment
        </button>
      </div>
    </div>
  );
}

export default Index;
