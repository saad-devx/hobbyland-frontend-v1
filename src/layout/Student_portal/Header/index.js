import { FindService } from "@/config/Axiosconfig/AxiosHandle/service";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const [allProdduct, setAllProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // Checkbox
  const [token, setToken] = useState(false);
  const [medata, setMeData] = useState({});

  const FetchMedata = async () => {
    try {
      const cookies = document.cookie.split(";");

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
          setToken(true);
          setMeData(response.data.user);
        }
      } else {
        setToken(false);
      }
    } catch (e) {}
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  useEffect(() => {
    FetchMedata();
  }, []);

  const [courseTypes, setCourseTypes] = useState({
    Hybird: false,
    Physical: true,
    Online: false,
  });

  const routee = (title, id, type, data) => {
    router.push({
      pathname: "./Serach-service",
      query: {
        title: title,
        _id: id,
        type: type,
        data: data ? JSON.stringify(data) : [],
      },
    });
  };

  const GetService = async () => {
    try {
      const response = await FindService("&");
      const userData = medata;
      if (response) {
        const filterStatius = response.data.services?.filter(
          (e) => e.status === "Approved"
        );

        const userLatitude = userData.latitude;
        const userLongitude = userData.longitude;

        const mergedArray = filterStatius?.filter(
          (r) => r.courseType === "Online"
        );

        const filterStatusThird = filterStatius?.filter((r) => {
          if (r.courseType === "Hybird" || r.courseType === "Physical") {
            const courseLatitude = r.latitude;
            const courseLongitude = r.longitude;
            const targetedAreaString = r.targetedArea;
            const targetedArea = parseFloat(
              targetedAreaString.replace("km", "").trim()
            );
            const distance = getDistanceFromLatLonInKm(
              userLatitude,
              userLongitude,
              courseLatitude,
              courseLongitude
            );
            return distance <= targetedArea;
          }
          return false;
        });

        const finalArray = [...mergedArray, ...filterStatusThird];

        if (userData?.email) {
          setAllProduct(finalArray);
        } else {
          setAllProduct(filterStatius);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    GetService();
  }, [medata]);
  useEffect(() => {
    const { Hybird, Physical, Online } = courseTypes;
    const activeCourseTypes = [];

    if (Hybird) activeCourseTypes.push("Hybird");
    if (Physical) activeCourseTypes.push("Physical");
    if (Online) activeCourseTypes.push("Online");

    const filtered = allProdduct.filter((product) => {
      const matchesTitle = product.title
        .toLowerCase()
        .includes(value.toLowerCase());
      const matchesCourseType = activeCourseTypes.includes(product?.courseType);

      return matchesTitle && matchesCourseType;
    });

    setFilterData(filtered);
  }, [value, allProdduct, courseTypes]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourseTypes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="Conatiner_Student_Header">
      <div className="Box">
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-2 margin_top">
              <h1 className="fw-bold fs-1" style={{ width: "75%" }}>
                Skill That Drive You Forward
              </h1>
              <p className="fs-5 fw-bold mt-3">
                Technology And The World Of Work Change Fast - with Us Yours
                Faster Of the Skills To Achieve Goals And Stay competitive
              </p>
              <div className="d-flex gap-3 mt-5 w-1000">
                <div className="Input">
                  <div style={{ width: "50%" }}>
                    <input
                      className={err ? "errTimezoneInput" : "Input_"}
                      placeholder="Search Your Service"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (filterData.length > 0) {
                            routee(null, null, "Multiple", filterData);
                          }

                          // Add your logic for when Enter is pressed
                        }
                      }}
                    />{" "}
                  </div>
                  <div style={{ width: "50%" }}>
                    Hybrid&nbsp;
                    <input
                      type="checkbox"
                      name="Hybird"
                      checked={courseTypes.Hybird}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;&nbsp; Physical&nbsp;
                    <input
                      type="checkbox"
                      name="Physical"
                      checked={courseTypes.Physical}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;&nbsp; Online&nbsp;
                    <input
                      type="checkbox"
                      name="Online"
                      checked={courseTypes.Online}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;&nbsp;
                  </div>
                </div>
              </div>

              {value ? (
                <div
                  style={{ width: "100%", padding: "10px" }}
                  className="shadow radius"
                >
                  {filterData.length > 0 ? (
                    <>
                      {filterData.map((e, i) => {
                        return (
                          <div
                            onClick={() => {
                              routee(null, e._id, "Single", null);
                            }}
                            key={i}
                            className="ships-search"
                          >
                            <div>
                              <img
                                src={e.portfolio[0]?.media_url || ""}
                                style={{ width: "60px", height: "100%" }}
                              />
                            </div>
                            <div>
                              <p className="heading___">{e.title}</p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <p className="text-center">No Data Found</p>
                    </>
                  )}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 ">
              <div className="img_box">
                <img
                  style={{ width: "800px" }}
                  src="https://media.istockphoto.com/id/1316676180/vector/webinar-online-video-training-tutorial-podcast-concept-with-character-students-e-learning-by.jpg?s=612x612&w=0&k=20&c=BomDPLP9N09dycgxlVc-cnLaBGKH3YwHDvmoiLcKndY="
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
