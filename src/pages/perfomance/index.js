import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useRouter } from "next/router";

function Index() {
  const [perfomance, setPerfomance] = useState(true);
  const [student, setStudent] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [courseEngagement, setCourseEngagement] = useState(false);
  const [traficCoversation, setTraficCoversation] = useState(false);
  const router = useRouter();
  const engagementCard = [
    {
      title: "We've added trend insights to your Minutes Taught report!",
      desc: "Hover over the bars below to see how consumption from one month stacks up against consumption from the previous month, or from the same month a year earlier. Select the Last 12 months or Last 12+ months date range to check out your new insights.",
      buttonLabel: "Dismiss",
    },
    {
      title: "Coding exercise insights are available for a single course!",
      desc: "Get started with selecting a course and then scroll down to the Lecture details to see the learner engagement to a Coding exercise.",
      buttonLabel: "Dismiss",
    },
    {
      title:
        "We've updated the way we calculate course consumption to better reflect overall learner engagement.",
      desc: "This includes incorporating time spent engaging with on-platform practice activities like quizzes and coding exercises, and adjusting for factors such as watch speed and repeat viewing.",
      buttonLabel: "Dismiss",
    },
  ];
  return (
    <div>
      <AdminLayout>
        <div className="w-100 Perfomance_container">
          <div className="Top_Bare">
            <div
              onClick={() => {
                setPerfomance(true);
                setStudent(false);
                setReviews(false);
                setCourseEngagement(false);
                setTraficCoversation(false);
              }}
              className={`${perfomance == true ? "active" : "title_"}`}
            >
              perfomance
            </div>
            <div
              onClick={() => {
                setPerfomance(false);
                setStudent(true);
                setReviews(false);
                setTraficCoversation(false);

                setCourseEngagement(false);
              }}
              className={`${student == true ? "active" : "title_"}`}
            >
              Students
            </div>
            <div
              onClick={() => {
                setPerfomance(false);
                setStudent(false);
                setReviews(true);
                setCourseEngagement(false);
                setTraficCoversation(false);
              }}
              className={`${reviews == true ? "active" : "title_"}`}
            >
              Reviews
            </div>
            <div
              onClick={() => {
                setPerfomance(false);
                setReviews(false);
                setStudent(false);
                setCourseEngagement(true);
                setTraficCoversation(false);
              }}
              className={`${courseEngagement == true ? "active" : "title_"}`}
            >
              Course engagement
            </div>
            <div
              onClick={() => {
                setPerfomance(false);
                setStudent(false);
                setCourseEngagement(false);
                setTraficCoversation(true);

                setReviews(false);
              }}
              className={`${traficCoversation == true ? "active" : "title_"}`}
            >
              Traffic & conversion
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "90%",
              background: "transparent",
              padding: "21px",
            }}
          >
            {perfomance == true ? (
              <div>
                <div className="fs-3 fw-bold">perfomance</div>
                <div className="mt-5">
                  <div className="Text_Revenue">{"Revenue Report >"}</div>
                </div>
              </div>
            ) : student == true ? (
              <div className="text-center mt-4">
                <div className="fs-4 fw-bold">No students yet...</div>
                <div className="mt-3">
                  Once you publish your course, come here to learn about your
                  students.
                </div>
                <div>
                  <button className="btn_Green_Large_Size mt-3">
                    Go to Instructor Dashboard
                  </button>
                </div>
              </div>
            ) : reviews == true ? (
              <div>
                <div className="fs-3 fw-bold">Reviews</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div className="title__Cursor d-flex gap-3">
                      <input id="checkbox" type="checkbox" />{" "}
                      <label for="checkbox" style={{ cursor: "pointer" }}>
                        {" "}
                        Not Answered
                      </label>
                    </div>
                    <div className="title__Cursor d-flex gap-3">
                      <input id="checkboxid" type="checkbox" />{" "}
                      <label for="checkboxid" style={{ cursor: "pointer" }}>
                        {" "}
                        Has A Comment
                      </label>
                    </div>
                    <div className="title__Cursor d-flex gap-3">
                      <input id="same" type="checkbox" />{" "}
                      <label for="same" style={{ cursor: "pointer" }}>
                        {" "}
                        Rating All
                      </label>
                    </div>
                  </div>
                  <div>
                    <button className="btn_Green">Export to CSV.</button>
                  </div>
                </div>
                <div className="mt-5 text-center">No Reviews Found</div>
              </div>
            ) : courseEngagement == true ? (
              <div>
                {engagementCard.map((e, i) => {
                  return (
                    <div key={i} className="mt-3 Card_Course_engagement">
                      <div>
                        <Icon
                          icon={"mingcute:warning-fill"}
                          style={{ fontSize: "32px", color: "black" }}
                        />
                      </div>
                      <div>
                        <div className="fs-4 fw-bold">{e.title}</div>
                        <div className="mt-3">{e.desc}</div>
                        <div className="mt-3">
                          <button className="btn_Green">{e.buttonLabel}</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : traficCoversation == true ? (
              <div>
                <div className="mt-3 Card_Course_engagement">
                  <div>
                    <Icon
                      icon={"mingcute:warning-fill"}
                      style={{ fontSize: "32px", color: "black" }}
                    />
                  </div>
                  <div>
                    <div className="mt-3 fw-bold">
                      We've updated the way we count the number of unique people
                      visiting your courses to give you a more accurate
                      understanding of your traffic & conversion.
                    </div>
                    <div className="mt-3">
                      <button className="btn_Green">Dismiss</button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "13px 10px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: "1px",
                    borderBottomColor: "black",
                  }}
                >
                  <div>To learn more, select a course</div>
                  <div style={{ width: "200px" }}>
                    <select className="Input">
                      <option selected>Last 12 month</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="fw-bold">No courses yet...</div>
                  <div className="mt-3">
                    Once you publish your course, come here to learn about your
                    traffic & conversion.
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        router.push("/Dashboard");
                      }}
                      className="btn_Green_Large_Size"
                    >
                      Go to instructure Dashboard
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default Index;
