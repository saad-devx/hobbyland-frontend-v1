import { Footer } from "@/Component";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const route = useRouter();
  const handleCLick = () => {
    route.push("Course-Edit/Intended-learning");
  };
  return (
    <div>
      <AdminLayout>
        <div className="container__dashbaord">
          <div>
            <div className="TOP_HEader mb-3">
              <div>
                <Link className="Link" href="./StudentHome">
                  <div className="Link">Student</div>
                </Link>
              </div>
              <div>
                <Icon className="Icon" icon="carbon:notification-filled" />
              </div>
              <div className="Profile_box">S</div>
            </div>
            <div className="py-5">
              <div className="py-3">
                <div className="text-center mb-3">Are You Ready to Begin?</div>
                <div onClick={handleCLick} className="my-5 Card_Course">
                  <div className="d-flex">
                    <img
                      src="https://png.pngtree.com/png-vector/20191120/ourmid/pngtree-training-course-online-computer-chat-flat-color-icon-vector-png-image_2007114.jpg"
                      height={"100%"}
                      width="40%"
                    />

                    <div>
                      <div className="fw-bold  mt-3">Title</div>
                      <div>First Course</div>
                      <div className="fw-bold  mt-5">Draft</div>
                      <div>Public</div>
                    </div>
                  </div>
                </div>
                <div className="text-center px-3">
                  <Link href="./create-course">
                    <button className="btn_Green_Large_Size mt-3">
                      Create a course
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="container mb-5">
              <div className="row">
                <div className="col-md-4 mt-3">
                  <div className="Card_Design rounded shadow">
                    <img src="https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg" />
                    <div className="p-2">
                      <div className="title mt-3">
                        Create an Engaging Course
                      </div>
                      <div className="mt-3 desc">
                        Whether you've been teaching for years or are teaching
                        for the first time, you can make an engaging course.
                        We've compiled resources and best practices to help you
                        get to the next level, no matter where you're starting.x
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-3">
                  <div className="Card_Design rounded shadow">
                    <img src="https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg" />
                    <div className="p-2">
                      <div className="title mt-3">
                        Create an Engaging Course
                      </div>
                      <div className="mt-3 desc">
                        Whether you've been teaching for years or are teaching
                        for the first time, you can make an engaging course.
                        We've compiled resources and best practices to help you
                        get to the next level, no matter where you're starting.x
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-3">
                  <div className="Card_Design rounded shadow">
                    <img src="https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg" />
                    <div className="p-2">
                      <div className="title mt-3">
                        Create an Engaging Course
                      </div>
                      <div className="mt-3 desc">
                        Whether you've been teaching for years or are teaching
                        for the first time, you can make an engaging course.
                        We've compiled resources and best practices to help you
                        get to the next level, no matter where you're starting.x
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default Index;
