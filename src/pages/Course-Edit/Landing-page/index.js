import { FetchCountries } from "@/config/Axiosconfig/AxiosHandle/country";
import CountryList from "@/constant/country";
import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function LandingPage() {
  const inputRef = useRef();

  useEffect(() => {
    const inputElement = inputRef.current;

    function handleFileSelect(event) {
      const file = event.target.files[0];
      const fileName = file.name;
      console.log(fileName);
    }

    inputElement.addEventListener("change", handleFileSelect);

    return () => {
      inputElement.removeEventListener("change", handleFileSelect);
    };
  }, []);

  function handleDivClick() {
    inputRef.current.click();
  }
  const levelDropdwon = [
    {
      title: "Beginner Level",
    },
    {
      title: "Intermediate Level",
    },
    {
      title: "Expert Level",
    },
    {
      title: "All Level",
    },
  ];
  const categrios = [
    {
      title: "Developement",
    },
    {
      title: "Busniss",
    },
    {
      title: "Fianance & Acounting",
    },
    {
      title: "It & Software",
    },
    {
      title: "Office Productivity",
    },
    {
      title: "Persnol Productively",
    },
    {
      title: "Persnol Developement",
    },
    {
      title: "Design",
    },
    {
      title: "Marketing",
    },
    {
      title: "Life Style",
    },
    {
      title: "PhotoGraphy",
    },
    {
      title: "Music",
    },
    {
      title: "Teaching",
    },
  ];
  return (
    <div>
      <CourseLayout>
        <div
          style={{ width: "100%" }}
          className="w-100 course_landing_container"
        >
          <div className="Header_">
            <div className="title_">Course landing page</div>
          </div>
          <div className="p-2">
            <div className="card2 p-3">
              <div className="mt-5">
                <span>
                  Your course landing page is crucial to your success on Udemy.
                  If it's done right, it can also help you gain visibility in
                  search engines like Google. As you complete this section,
                  think about creating a compelling Course Landing Page that
                  demonstrates why someone would want to enroll in your course.
                  Learn more about{" "}
                  <a target="_blank" rel="noopener noreferrer">
                    creating your course landing page
                  </a>{" "}
                  and{" "}
                  <a target="_blank" rel="noopener noreferrer">
                    course title standards.
                  </a>
                </span>
              </div>
              <div className="Small_box">
                <div className="mt-4">
                  <div className="fw-bold">Course title</div>
                  <input placeholder="course Title." className="Input" />
                  <div style={{ fontSize: "13px" }}>
                    Your title should be a mix of attention-grabbing,
                    informative, and optimized for search
                  </div>
                </div>
                <div className="mt-4">
                  <div className="fw-bold">Course subtitle</div>
                  <input
                    placeholder="Insert your course subtitle."
                    className="Input"
                  />
                  <div style={{ fontSize: "13px" }}>
                    Use 1 or 2 related keywords, and mention 3-4 of the most
                    important areas that you've covered during your course.
                  </div>
                </div>
                <div className="mt-4">
                  <div className="fw-bold">Course description</div>
                  <textarea
                    minLength={200}
                    placeholder="Insert Your Course Description"
                    className="Input_Large"
                  />
                  <div style={{ fontSize: "13px" }}>
                    Description should have minimum 200 words.
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="fw-bold fs-5">Basic info</div>
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <select className="Input">
                      {CountryList.map((item, index) => (
                        <option key={index} value={item.countryName}>
                          {item.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mt-3">
                    <select placeholder="-- select level ---" className="Input">
                      {levelDropdwon.map((e, i) => {
                        return <option key={`level-${i}`} value={e.title}>{e.title}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-md-4 mt-3">
                    <select className="Input">
                      {categrios.map((e, i) => {
                        return (
                          <option key={i} value={e.title}>
                            {e.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>{" "}
                </div>
              </div>
              <div className="Small_box">
                <div className="fw-bold d-flex gap-3 align-items-center mt-3">
                  What is primarily taught in your course?{" "}
                  <Icon
                    icon="mingcute:warning-fill"
                    style={{ fontSize: "15px", color: "black" }}
                  />
                </div>
                <input
                  className="Input mt-1"
                  placeholder="e.g. Landscape Photography"
                />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-6 mt-5">
                    <div onClick={handleDivClick} className="Add_cours_Images">
                      Course Images
                    </div>
                    <div className="mt-3">
                      Upload your course image here. It must meet our course
                      image quality standards to be accepted. Important
                      guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no
                      text on the image.
                    </div>
                  </div>
                  <div className="col-md-6 mt-5">
                    <div onClick={handleDivClick} className="Add_cours_Images">
                      Promotional video
                      <input
                        type="file"
                        id="promoVideo"
                        ref={inputRef}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="mt-3">
                      Your promo video is a quick and compelling way for
                      students to preview what they'll learn in your course.
                      Students considering your course are more likely to enroll
                      if your promo video is well-made. Learn how to make your
                      promo video awesome!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CourseLayout>
    </div>
  );
}

export default LandingPage;
