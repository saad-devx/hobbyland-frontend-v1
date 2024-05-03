import { ServiesCreate } from "@/config/Axiosconfig/AxiosHandle/service";
import CourseLayout from "@/layout/CourseLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const router = useRouter();
  const [pricing, setPricing] = useState(null);
  const [fAQ, setFAQ] = useState(null);
  const [createForm, setCreateForm] = useState(null);
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

  useEffect(() => {
    const serializedData = localStorage.getItem("pricing");
    if (serializedData) {
      const parsedData = JSON.parse(serializedData);
      setPricing(parsedData);
      console.log(pricing, "pricing");
    }
    const faqdata = localStorage.getItem("fAQ");
    if (faqdata) {
      const faq = JSON.parse(faqdata);
      setFAQ(faq);
    }
    const firstformdata = localStorage.getItem("formData");
    if (firstformdata) {
      const firstdata = JSON.parse(firstformdata);
      setCreateForm(firstdata);
    }
  }, []);

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
    try {
      const obj = {
        ...fAQ,
        ...pricing,
        ...createForm,
      };
      console.log(obj);
      try {
        console.log(obj);

        const data = await ServiesCreate(obj);
        if (data) {
          console.log(data);
          toast.success("Services Create Succesfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            router.push("/Dashboard");
          }, 1500);
        }
      } catch (error) {
        console.log(error, "err");
        toast.error(
          error.response
            ? error.response.data.field + " " + error.response.data.msg
            : error.message,
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setTimeout(() => {
          router.push(
            `${
              error.response
                ? error.response.data.field
                  ? error.response.data.field === "pricing"
                    ? "/Course-Edit/Pricing"
                    : error.response.data.field === "FAQ"
                    ? "/Course-Edit/F&A"
                    : "/Course-Edit/Pricing"
                  : "/Course-Edit/Pricing"
                : "/Course-Edit/Pricing"
            }`
          );
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <ToastContainer />
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
                  Create course
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
