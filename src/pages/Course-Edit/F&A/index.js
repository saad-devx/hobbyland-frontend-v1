import { ServiesCreate } from "@/config/Axiosconfig/AxiosHandle/service";
import CourseLayout from "@/layout/CourseLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [errors, setErrors] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    const { question, answer } = formData;
    const newErrors = {};
    if (!question) {
      newErrors.question = "Question is required";
    }
    if (!answer) {
      newErrors.answer = "Answer is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const obj = {
      FAQ: [{ ...formData }],
    };
    console.log(obj);
    const serializedData = JSON.stringify(obj);
    localStorage.setItem("fAQ", serializedData);
  };

  return (
    <div>
      <CourseLayout>
        <div
          style={{ width: "100%" }}
          className="w-100 course_structure_container"
        >
          <div className="Header_">
            <div className="title_">F&A</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="fw-bold fs-5">Set a price for your course</div>
              <div className="mt-3">
                Please select the currency and the price tier for your course.
                If you’d like to offer your course for free, it must have a
                total video length of less than 2 hours. Also, courses with
                practice tests can not be free.
              </div>
              <div className="row">
                <div className="col-md-6 mt-4">
                  <input
                    className={`${
                      errors.question ? "errTimezoneInput" : "Input_dark"
                    }`}
                    placeholder="Enter Your Question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                  />
                  {errors.question && (
                    <div style={{ color: "red" }}>{errors.question}</div>
                  )}
                </div>
                <div className="col-md-6 mt-4">
                  <input
                    className={`${
                      errors.answer ? "errTimezoneInput" : "Input_dark"
                    }`}
                    placeholder="Enter Your Answer"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                  />
                  {errors.answer && (
                    <div style={{ color: "red" }}>{errors.answer}</div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <button className="btn_Green" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </CourseLayout>
    </div>
  );
}

export default Index;
