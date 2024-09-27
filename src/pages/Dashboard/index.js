import { Footer } from "@/Component";
import NotificationDropdown from "@/Component/Notificationdrowpdown";
import {
  DeleteService,
  FetchServices,
} from "@/config/Axiosconfig/AxiosHandle/service";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Index() {
  const route = useRouter();
  const [userdata, setUserdata] = useState({});
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
  const FetchData = async () => {
    try {
      const cookies = document.cookie.split(";");
      console.log(cookies, "cokiies");
      let isLoggedIn = false;
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name.trim() === "is_logged_in" && value.trim() === "true") {
          isLoggedIn = true;
        }
      });
      if (isLoggedIn) {
        const response = await FetchMe();
        if (response) {
          setUserdata({ ...response.data.user });
          console.log(response.data.user, "Medata");
          response.data.user?.account_type == "student"
            ? route.push("./StudentHome")
            : null;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  const handleCourseDelete = async (id) => {
    console.log(id);
    try {
      const response = await DeleteService(id);
      if (response) {
        console.log(response);
        toast.success("Services Delete Succesfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout>
        <div className="container__dashbaord">
          <div>
            <div className="TOP_HEader mb-3">
              <div>
                <NotificationDropdown iconColor="black" />
              </div>
              <div>
                <Link className="Link" href="./StudentHome">
                  <div className="Link">Student</div>
                </Link>
              </div>

              <div
                onClick={() => {
                  route.push("/profile");
                }}
                className="Profile_box"
              >
                {userdata && userdata.firstname
                  ? userdata?.firstname?.charAt(0)
                  : ""}
              </div>
            </div>
            <div className="py-5">
              <div className="py-3">
                <div className="text-center mb-3">Are You Ready to Begin?</div>
                {data.map((e, i) => {
                  return (
                    <div className="my-5 Card_Course">
                      <div className="icon_din">
                        <div className="d-flex gap-3">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleCourseDelete(e._id);
                            }}
                          >
                            <Icon icon="material-symbols:delete" />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex " onClick={handleCLick}>
                        <img
                          src={e.portfolio[0].media_url}
                          height={"100%"}
                          width="300x"
                          style={{ marginRight: "20px", objectFit: "cover" }}
                        />

                        <div>
                          <div className=" mt-3">
                            <span className="fw-bold">Title</span>:&nbsp;
                            {e.title}
                          </div>
                          <div className=" mt-1">
                            <span className="fw-bold">Description</span>:&nbsp;
                            {e.description}
                          </div>
                          <div className=" mt-1">
                            <span className="fw-bold">price</span>:&nbsp; $
                            {e.pricing[0].price}
                          </div>
                          <div className=" mt-1">
                            <span className="fw-bold">Course Type</span>:&nbsp;
                            {e.courseType}
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
    </>
  );
}

export default Index;
