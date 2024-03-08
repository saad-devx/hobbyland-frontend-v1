import React, { useState } from "react";

function Index() {
  const [step, setStep] = useState(1);
  return (
    <div className="Tools_container">
      <div className="Header_">
        <div className="HoobbyLand_Title">
          Hobby
          <br />
          Land.
        </div>
      </div>
      <div className="Container__text_video_question">
        {step === 1 ? (
          <div>
            <h2 className="text-center text-black mt-3 fw-bold">
              What language will you speak in your test video?
            </h2>
            <div className="my-3">
              Feedback on tone and delivery is available in some languages,
              while audio and video quality checks are available in all
              languages.
            </div>
            <div className="fw-bold">Select one</div>
            <select className="Input">
              <option>fianance</option>
            </select>
          </div>
        ) : step === 2 ? (
          <div>
            <h2 className="text-center text-black mt-3 fw-bold">
              What feedback will be helpful?
            </h2>
            <div className="my-3">
              We can provide tips for multiple aspects of your video. Students
              value both your filming quality and on-screen presence!
            </div>
            <div className="fw-bold">Select one or more</div>
            <div className="chips">
              <div>
                <input type="checkbox" />
              </div>
              <div className="chips_title">Video production</div>
            </div>
            <div className="chips">
              <div>
                <input type="checkbox" />
              </div>
              <div className="chips_title">audio production</div>
            </div>
          </div>
        ) : step === 3 ? (
          <div>
            <h2 className="text-center text-black mt-3 fw-bold">
              What are you filming for the test video?
            </h2>
            <div className="my-3">
              You can try out different filming methods in one video or test
              each individually, but we can only review one video at a time.
            </div>
            <div className="fw-bold">Select one or more</div>
            <div className="chips">
              <div>
                <input type="checkbox" />
              </div>
              <div className="chips_title">
                I am filming myself or another person
              </div>
            </div>
            <div className="chips">
              <div>
                <input type="checkbox" />
              </div>
              <div className="chips_title">I am filming my computer screen</div>
            </div>
            <div className="chips">
              <div>
                <input type="checkbox" />
              </div>
              <div className="chips_title">
                I am filming an activity (e.g. yoga, dog training, cooking)
              </div>
            </div>
          </div>
        ) : step === 4 ? (
          <div>
            <h2 className="text-center text-black mt-3 fw-bold">
              What are you using to record?
            </h2>
            <div className="my-3">
              Knowing this helps us troubleshoot issues, but if you aren't sure,
              select "I don't know."
            </div>
            <div className="my-4">Select all equipment types</div>
            <div className="fw-bold mt-4">Microphone type</div>
            <select className="Input">
              <option>fianance</option>
            </select>
            <div className="fw-bold mt-4">Camera type</div>
            <select className="Input">
              <option>fianance</option>
            </select>
            <div className="fw-bold mt-4">Software type</div>
            <select className="Input">
              <option>fianance</option>
            </select>
            <div className="fw-bold mt-4">Operating type</div>
            <select className="Input">
              <option>fianance</option>
            </select>
          </div>
        ) : step === 5 ? (
          <div>
            <h2 className="text-center text-black mt-3 fw-bold">
              What language will you speak in your test video?
            </h2>
            <div className="my-3">
              Feedback on tone and delivery is available in some languages,
              while audio and video quality checks are available in all
              languages.
            </div>
            <div className="fw-bold">Select one</div>
            <iframe
              class="vjs-tech"
              id="playerId__33984796--84_html5_api"
              preload="metadata"
              controlslist="nodownload"
              tabindex="-1"
              width={500}
              height={400}
              style={{
                margin: "auto",
              }}
              role="application"
              src="https://mp4-c.udemycdn.com/2021-06-02_23-50-12-e97ae1de857cd84a2bddbc2df08b7ce6/1/WebHD_720p.mp4?Expires=1709834624&amp;Signature=cktxnpuke5IrF~5TcFU9dXI6e5tPWHDTNl66Gf-HhSeQGInShCXCKf4r-29~iuzlFO3WfEab1ZS0Jc03TkcU6mZRA1DOvdjU0AnFlLJ2ivE9gDAiPuHioIGPjHuyCVdqry5cQUR3vrtCRWg9wL~h8gZFNpRNzR6AmojjjWgNom0JfTBRzrBr8m9Gj9AvMp-D2ENJ1E-J5G3H3yj63LhRRBqMI5tdUM~CAIJazznMAewsRuhZIU6O0zbmcBurg3kL8thYtTmkmGxskxdlbAudUgYLkmgHJ0vrZ6Hih-cw5P08YGBLUYFH9hGtV7y2pckapfAIXsa8oS-ngpxyJWAehA__&amp;Key-Pair-Id=K3MG148K9RIRF4"
            ></iframe>
          </div>
        ) : step === 6 ? (
          <div>
            <h2 className="text-center text-black mt-3 fw-bold">
              Lights, camera, action!
            </h2>
            <div className="my-3">
              You've got this! Create a video now and remember that it doesn't
              have to be perfect. Film for 1-3 minutes.
            </div>
            <div className="fw-bold">Select one</div>
            <iframe
              class="vjs-tech"
              id="playerId__33984796--84_html5_api"
              preload="metadata"
              controlslist="nodownload"
              tabindex="-1"
              className="Video_width"
              style={{
                margin: "auto",
              }}
              role="application"
              src="https://mp4-c.udemycdn.com/2021-06-02_23-49-55-96e179f4141c6fb8bceb2a7b39d15034/1/WebHD_720p.mp4?Expires=1709835636&Signature=k8qo58BUIx5TsCFtTZBkAbCs94L7-Rl-U03danAlQSPXYK-tLhZ3SKUSlj-Q1yTGoNS-ADsQC-Uj~PlJ8mKKv9VSBVVmC6sXH-O0KhqJ8jym7sdkylIljuNVhXCd-afOKfLQtwVyQRoTF3~VyuOd3CDIWO~xNmsM4X6weIBgexNP8PjWgC9AB69HOeF2v3ERDdhzZbaKoiTlmGpNdHl2Ysy-L6UAYtk8PaUSqBxZt7ZU4H-I-ZhDQmq-qDVFJOvEDr4VmcyxA5nQqsCJZuHxKUccDkY-XQjGKaA1iJ0C84vbRQRhlknmYHP4qUoUDofyFik~gUp2eowOnZbANCD7Iw__&Key-Pair-Id=K3MG148K9RIRF4"
            ></iframe>
            <div className="my-3">
              Talk about anything you want, or use one of our prompts:
            </div>
            <ul>
              <li>Teach a simple task</li>
              <li>Explain why you're passionate about something</li>
              <li>Describe an object or feature and its use</li>
            </ul>
            <div className="mt-3 fw-bold">Upload your test video</div>
            <div>
              <input type="file" />
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom_not">
        <div className="Postion_Bottom">
          <button
            onClick={() => {
              step === 1 ? setStep(1) : setStep(step - 1);
            }}
            className="Outline_Btn"
          >
            Skip
          </button>
          <div className="Text_">
            <span className="Current_Step">{step}</span> / 6
          </div>
          <button
            onClick={() => {
              step === 6 ? setStep(6) : setStep(step + 1);
            }}
            className="dark_btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
