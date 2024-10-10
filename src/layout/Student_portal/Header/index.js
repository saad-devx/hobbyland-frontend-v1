import { FindService } from "@/config/Axiosconfig/AxiosHandle/service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const [allProdduct, setAllProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // Checkbox states
  const [courseTypes, setCourseTypes] = useState({
    Hybird: false,
    Physical: true, // Physical is selected by default
    Online: false,
  });

  // Fetch Data from API

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

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await FindService("$");
        if (response) {
          const filterStatius = response.data.services?.filter(
            (e) => e.status == "Approved"
          );
          setAllProduct(filterStatius);
        }
      } catch (error) {}
    };
    FetchData();
  }, []);

  // Handle search input and checkbox filter logic
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
