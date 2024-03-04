import { Footer, Header } from "@/Component";
import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import React from "react";

function index() {
  return (
    <>
      <CourseLayout>
        <div className="w-100 intent_container">
          <div className="Header_">
            <div className="title_">Intended learners</div>
          </div>
          <div className="p-3">
            <div className="p-3 card2 p-3 ">
              <div className="pera_first">
                The following descriptions will be publicly visible on your{" "}
                <a
                  class="ud-link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/Course-Edit/Landing-page"
                >
                  Course Landing Page
                </a>{" "}
                and will have a direct impact on your course performance. These
                descriptions will help learners decide if your course is right
                for them.
              </div>
              <div class="Heading">
                What will students learn in your course?
              </div>
              <div className="mt-3">
                <span>
                  You must enter at least 4{" "}
                  <a
                    class="ud-link-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="#"
                  >
                    learning objectives or outcomes
                  </a>{" "}
                  that learners can expect to achieve after completing your
                  course.
                </span>
              </div>
              <div className="Input_box">
                <div className="mt-3">
                  <input
                    className="Input"
                    placeholder="Example: Define the roles and responsibilities of a project manager"
                  />
                </div>
                <div className="mt-3">
                  <input
                    className="Input"
                    placeholder="Example: Estimate project timelines and budgets"
                  />
                </div>
                <div className="mt-3">
                  <input
                    className="Input"
                    placeholder="Example: Identify and manage project risks"
                  />
                </div>
                <div className="mt-3">
                  <input
                    className="Input"
                    placeholder="Example: Complete a case study to manage a project from conception to completion"
                  />
                </div>
              </div>
              <button className="add_properties">
                <div>
                  <Icon icon="material-symbols:add" />
                </div>
                <div>Add more to your response</div>
              </button>
              <div className="Heading">
                What are the requirements or prerequisites for taking your
                course?
              </div>
              <div className="py-3">
                List the required skills, experience, tools or equipment
                learners should have prior to taking your course.
              </div>
              <div className="pb-3">
                If there are no requirements, use this space as an opportunity
                to lower the barrier for beginners.
              </div>
              <div className="Input_box">
                <div className="mt-3">
                  <input
                    className="Input"
                    placeholder="Example: No programming experience needed. You will learn everything you need to know"
                  />
                </div>
              </div>
              <button className="add_properties">
                <div>
                  <Icon icon="material-symbols:add" />
                </div>
                <div>Add more to your response</div>
              </button>
              <div className="Heading">Who is this course for?</div>
              <div className="py-3">
                Write a clear description of the{" "}
                <a
                  class="ud-link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  intended learners
                </a>{" "}
                for your course who will find your course content valuable.
              </div>
              <div className="pb-3">
                This will help you attract the right learners to your course.
              </div>
              <div className="Input_box">
                <div className="mt-3">
                  <input
                    className="Input"
                    placeholder="Example: Beginner Python developers curious about data science"
                  />
                </div>
              </div>
              <button className="add_properties">
                <div>
                  <Icon icon="material-symbols:add" />
                </div>
                <div>Add more to your response</div>
              </button>
            </div>
          </div>
        </div>
      </CourseLayout>
    </>
  );
}

export default index;
