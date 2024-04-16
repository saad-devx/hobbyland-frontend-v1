import { Footer } from "@/Component";
import { FetchServices } from "@/config/Axiosconfig/AxiosHandle/service";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const route = useRouter();
  const handleCLick = () => {
    route.push("./Course-Edit/Pricing");
  };
  const [data, setData] = useState([]);
  const fectchAllservices = async () => {
    try {
      const response = await FetchServices();
      if (response) {
        console.log(response);
        setData([...response.data.services]);
        console.log(data, "data");
        console.log(response.data.services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fectchAllservices();
  }, []);
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
              <div
                onClick={() => {
                  route.push("/profile");
                }}
                className="Profile_box"
              >
                S
              </div>
            </div>
            <div className="py-5">
              <div className="py-3">
                <div className="text-center mb-3">Are You Ready to Begin?</div>
                {data.map((e, i) => {
                  return (
                    <div onClick={handleCLick} className="my-5 Card_Course">
                      <div className="d-flex">
                        <img
                          src={e.portfolio[0].media_url}
                          height={"100%"}
                          width="30%"
                          style={{ marginRight: "20px", objectFit: "cover" }}
                        />

                        <div>
                          <div className=" mt-3">
                            <span className="fw-bold">Title</span>:&nbsp;
                            {e.title}
                          </div>
                          <div className=" mt-1">
                            <span className="fw-bold">Desc</span>:&nbsp;
                            {e.description}
                          </div>
                          <div className=" mt-1">
                            <span className="fw-bold">price</span>:&nbsp; $
                            {e.pricing[0].price}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

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
