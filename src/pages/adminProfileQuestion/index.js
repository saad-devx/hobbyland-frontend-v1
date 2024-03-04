import React, { useState } from "react";
import { useRouter } from "next/router";

function Index() {
  const [step, setStep] = useState(1);
  const Router = useRouter();
  const handleSubmit = () => {
    Router.push("./Dashboard");
  };
  return (
    <div className="container__">
      <img
        className="Images"
        src={
          step === 1
            ? "https://s.udemycdn.com/instructor/onboarding/share.jpg"
            : step == 2
            ? "https://s.udemycdn.com/instructor/onboarding/create.jpg"
            : step === 3
            ? "https://s.udemycdn.com/instructor/onboarding/expand.jpg"
            : ""
        }
      />
      <div className="Header_">
        <div className="HoobbyLand_Title">
          HOBBY
          <br />
          LAND.
        </div>
      </div>
      {step == 1 ? (
        <div className="Content">
          <h1 className="fw-bold">Share your knowledge</h1>
          <div className="desc">
            Udemy courses are video-based experiences that give students the
            chance to learn actionable skills. Whether you have experience
            teaching, or it’s your first time, we’ll help you package your
            knowledge into an online course that improves student lives.
          </div>
          <div className="desc">
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">In person, informally</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">In person, professionally</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Online</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Other</div>
            </div>
          </div>
        </div>
      ) : null}
      {step == 2 ? (
        <div className="Content">
          <h1 className="fw-bold">Create a course</h1>
          <div className="desc">
            Over the years we’ve helped thousands of instructors learn how to
            record at home. No matter your experience level, you can become a
            video pro too. We’ll equip you with the latest resources, tips, and
            support to help you succeed.
          </div>
          <div className="fs-4 fw-bold">How much of a video “pro” are you?</div>
          <div className="desc">
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">I’m a beginner</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">I have some knowledge</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">I’m experienced</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">I have videos ready to upload</div>
            </div>
          </div>
        </div>
      ) : null}
      {step == 3 ? (
        <div className="Content">
          <h1 className="fw-bold">Expand your reach</h1>
          <div className="desc">
            Once you publish your course, you can grow your student audience and
            make an impact with the support of Udemy's marketplace promotions
            and also through your own marketing efforts. Together, we’ll help
            the right students discover your course.
          </div>
          <div className="fs-4 fw-bold">
            Do you have an audience to share your course with?
          </div>
          <div className="desc">
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Not at the moment</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">I have a small following</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">I have a sizeable following</div>
            </div>
          </div>
        </div>
      ) : null}
      {step == 1 ? (
        <div className="Bottom">
          <div>
            <button
              onClick={() => {
                if (step === 3) {
                  alert("okay");
                } else {
                  setStep(step + 1);
                }
              }}
              className="dark_btn"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="Bottom">
          <div>
            <button
              onClick={() => {
                if (step === 1) {
                } else {
                  setStep(step - 1);
                }
              }}
              className="Outline_Btn"
            >
              Skip
            </button>
          </div>
          <div className="Text_">
            <span className="Current_Step">{step}</span> / 3
          </div>
          <div>
            <button
              onClick={() => {
                if (step === 3) {
                  handleSubmit();
                } else {
                  setStep(step + 1);
                }
              }}
              className="dark_btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
