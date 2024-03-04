import React, { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

function Index() {
  const [step, setStep] = useState(1);
  const Router = useRouter();
  const handleSubmit = () => {
    Router.push("./Course-Edit/Intended-learning");
  };
  return (
    <div className="container__">
      <div className="Header_">
        <div className="HoobbyLand_Title">
          HOBBY
          <br />
          LAND.
        </div>
      </div>
      {step === 1 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              First, let's find out what type of course you're making.
            </h3>
            <div className="container mb-5">
              <div className="row mb-5">
                <div className="col-md-5 mb-5 mx-2 rounded card mt-3 p-3 text-center">
                  <div className="mb-3 mt-2">
                    <Icon
                      icon="carbon:screen"
                      style={{ fontSize: "40px", margin: "auto" }}
                    />
                    <div className="title_Card">Course</div>
                    <div className="desc_Card">
                      Create rich learning experiences with the help of video
                      lectures, quizzes, coding exercises, etc.
                    </div>
                  </div>
                </div>
                <div className="col-md-5 mb-5  mx-2 rounded card mt-3 p-3 text-center">
                  <div className="mb-3 mt-2">
                    <Icon
                      icon="mingcute:diary-line"
                      style={{ fontSize: "40px", margin: "auto" }}
                    />
                    <div className="title_Card">Practice Test</div>
                    <div className="desc_Card">
                      Help students prepare for certification exams by providing
                      practice questions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              What category best fits the knowledge you'll share?
            </h3>
            <div className="my-5">
              If you're not sure about the right category, you can change it
              later. later.
            </div>
            <div>
              <select
                placeholder="e.g. Learn Photoshop CS6 from Scratch"
                className="Input_dark"
              >
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
                <option value="Web developement">Web developement</option>
              </select>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How about a working title?
            </h3>
            <div className="my-5">
              It's ok if you can't think of a good title now. You can change it
              later.
            </div>
            <div>
              <input
                placeholder="e.g. Learn Photoshop CS6 from Scratch"
                className="Input_dark"
              />
            </div>
          </div>
        </div>
      ) : step === 4 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How about a working title?
            </h3>
            <div className="my-5">
              It's ok if you can't think of a good title now. You can change it
              later.
            </div>
            <div className="chips">
              <input type="radio" />
              <div className="chips_title">
                I’m very busy right now (0-2 hours)
              </div>
            </div>
            <div className="chips">
              <input type="radio" />
              <div className="chips_title">
                I’ll work on this on the side (2-4 hours)
              </div>
            </div>
            <div className="chips">
              <input type="radio" />
              <div className="chips_title">
                I have lots of flexibility (5+ hours)
              </div>
            </div>
            <div className="chips">
              <input type="radio" />
              <div className="chips_title">
                I haven’t yet decided if I have time
              </div>
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
            <span className="Current_Step">{step}</span> / 4
          </div>
          <div>
            <button
              onClick={() => {
                if (step === 4) {
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
