import React, { useState } from "react";

function Index() {
  const [step, setStep] = useState(2);
  return (
    <div className="container_Profile_Qustion">
      <div className="Header_">
        <div className="HoobbyLand_Title">
          Hobby
          <br />
          Land.
        </div>
      </div>
      {step === 1 ? (
        <div className="Main_content">
          <div>
            <div className="Heading">
              Answer two quick questions for personalized recommendations
            </div>
            <div className="Inner_Box">
              <div className="title">What is your current career goal?</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Enter a New Feild</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Advance in my field</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Become a manager in my field</div>
            </div>
            <div className="chips">
              <div>
                <input type="radio" />
              </div>
              <div className="chips_title">Advance as a manager</div>
            </div>
          </div>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="Main_content">
          <div>
            <div className="Heading">
              Answer two quick questions for personalized recommendations
            </div>
            <div>
              <div className="title mt-3">
                What is your current career goal?
              </div>
              <div className="chips">
                <div>
                  <input type="radio" />
                </div>
                <div className="chips_title">Become a manager in my field</div>
              </div>
            </div>
            <div className="title mt-5 mb-3">Become a manager in my field</div>
            <select className="Input">
              <option value="Web developement">Web developement</option>
              <option value="Web developement">Web developement</option>
              <option value="Web developement">Web developement</option>
              <option value="Web developement">Web developement</option>
              <option value="Web developement">Web developement</option>
              <option value="Web developement">Web developement</option>
            </select>
          </div>
        </div>
      ) : null}
      <div className="Postion_Bottom">
        <button
          onClick={() => {
            if (step === 1) {
            } else {
              setStep(1);
            }
          }}
          disabled={step === 1 ? true : false}
          className="Outline_Btn"
        >
          Skip
        </button>
        <div className="Text_">
          <span className="Current_Step">{step}</span> / 2
        </div>
        <button
          onClick={() => {
            if (step === 2) {
              alert("okay");
            } else {
              setStep(2);
            }
          }}
          className="dark_btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Index;
