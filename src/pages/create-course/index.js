import React, { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { categrios } from "@/constant/categrios";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import VideoRecorder from "./Recorded";

const libraries = ["places"];

function Index() {
  const [step, setStep] = useState(1);
  const Router = useRouter();
  const [error, setError] = useState({
    title: "",
    description: "",
    portfolio: [
      {
        media_url: "",
        description: "",
      },
    ],
    category: "",
    targetedArea: "",
    courseType: "",
    longitude: "",
    latitude: "",
    location: "",
    tags: "",
  });
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA1lurRRYuP5JyVNVNsjHvNgDiq7TBtNhU", // Your API Key here
    libraries, // Needed for places library
  });

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      // Extracting latitude and longitude
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      setData((prev) => ({
        ...prev,
        location: place.formatted_address || "",
        latitude: lat || "",
        longitude: lng || "",
      }));
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
  const [data, setData] = useState({
    title: "",
    description: "",
    portfolio: [
      {
        media_url: "",
        description: "",
      },
    ],
    targetedArea: "",
    location: "",
    courseType: "",

    category: "",

    tags: [],
  });

  const step1onCLick = () => {
    if (data.title === "") {
      setError((prevState) => ({
        ...prevState,
        title: "Enter Your Title",
      }));
    } else {
      console.log("okay");
      console.log(data);
      setStep(2);
      setError((prevState) => ({
        ...prevState,
        title: "",
      }));
    }
  };

  const targetedLimitArrat = [
    {
      title: "5km",
    },
    {
      title: "10km",
    },
    {
      title: "15km",
    },
    {
      title: "20km",
    },
    {
      title: "25km",
    },
    {
      title: "30km",
    },
    {
      title: "35km",
    },
    {
      title: "40km",
    },
    {
      title: "45km",
    },
    {
      title: "50km",
    },
  ];
  console.log(data, "data");

  const step2onCLick = () => {
    if (data.description === "") {
      setError((prevState) => ({
        ...prevState,
        description: "Enter Your Desc",
      }));
    } else {
      console.log("okay");
      console.log(data);
      setError((prevState) => ({
        ...prevState,
        description: "",
      }));
      setStep(3);
    }
  };
  const handleTitleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
    setError((prev) => ({ ...prev, title: "" }));
  };

  const courseTargetedArea = [
    {
      title: "All",
    },
    {
      title: "Specific Country",
    },
    {
      title: "Specific City",
    },
  ];

  const step5onCLick = () => {
    if (data.category === "") {
      setError((prevState) => ({
        ...prevState,
        category: "Enter Your category",
      }));
    } else {
      console.log("okay");
      console.log(data);
      setError((prevState) => ({
        ...prevState,
        category: "",
      }));
      setStep(6);

      console.log(data);
      console.log(error);
    }
  };

  const step6onCLick = () => {
    if (data.courseType === "") {
      setError((prevState) => ({
        ...prevState,
        courseType: "Select Your Course Type",
      }));
    } else if (
      (data.courseType == "Phiscal" || data.courseType == "Hybird") &&
      data.location == ""
    ) {
      setError((prevState) => ({
        ...prevState,
        location: "Location Required",
      }));
    } else if (
      (data.courseType == "Phiscal" || data.courseType == "Hybird") &&
      data.targetedArea == ""
    ) {
      setError((prevState) => ({
        ...prevState,
        targetedArea: "Select Your Targeted Area ",
      }));
    } else {
      console.log("okay");
      console.log(data);
      setError((prevState) => ({
        ...prevState,
        courseType: "",
        targetedArea: "",
        location: "",
      }));
      console.log(data);
      console.log(error);
      if (data.courseType == "Online") {
        setStep(7);
      } else {
        handleSubmit();
      }
    }
  };
  const handleCategrios = (e) => {
    setData((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
    setError((prev) => ({ ...prev, category: "" }));
  };
  const handleCategriosType = (e) => {
    setData((prevState) => ({
      ...prevState,
      courseType: e.target.value,
    }));
    setError((prev) => ({ ...prev, courseType: "" }));
  };
  const handleSpefice = (e) => {
    setData((prevState) => ({
      ...prevState,
      targetedArea: e.target.value,
    }));
    setError((prev) => ({ ...prev, targetedArea: "" }));
  };

  const handleImageUrl = (e) => {
    const imageUrl = e.target.value;

    setData((prevState) => ({
      ...prevState,
      portfolio: [{ ...prevState.portfolio[0], media_url: imageUrl }],
    }));
    setError((prev) => ({
      ...prev,
      portfolio: [{ ...prev.portfolio[0], media_url: "" }],
    }));
  };
  const courseTypeOption = [
    {
      title: "Physical",
    },
    {
      title: "Online",
    },
    {
      title: "Hybird",
    },
  ];
  const handlePortFoliaDescrion = (e) => {
    const description = e.target.value;
    setData((prevState) => ({
      ...prevState,
      portfolio: [{ ...prevState.portfolio[0], description: description }],
    }));
    setError((prev) => ({
      ...prev,
      portfolio: [{ ...prev.portfolio[0], description: "" }],
    }));
  };
  const step4onCLick = () => {
    if (data.portfolio[0].media_url === "") {
      setError((prevState) => ({
        ...prevState,
        portfolio: [
          { ...prevState.portfolio[0], media_url: "Please enter Image URL" },
        ],
      }));
    } else if (data.portfolio[0].description === "") {
      setError((prevState) => ({
        ...prevState,
        portfolio: [{ ...prevState.portfolio[0], media_url: "" }],
      }));
      setError((prevState) => ({
        ...prevState,
        portfolio: [
          {
            ...prevState.portfolio[0],
            description: "Please Enter Description",
          },
        ],
      }));
    } else {
      console.log(data);
      setError((prevState) => ({
        ...prevState,
        portfolio: [
          {
            ...prevState.portfolio[0],
            description: "",
          },
        ],
      }));
      console.log(error);
      setStep(5);
    }
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setData((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, selectedTag],
    }));
  };
  const step3onClick = () => {
    if (data.tags.length === 0) {
      setError((prevState) => ({
        ...prevState,
        tags: "Please select at least one tag",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        tags: "",
      }));
      setStep(4);
      console.log(data);
    }
  };

  const handleDescChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
    setError((prev) => ({ ...prev, description: "" }));
  };
  const handleSubmit = () => {
    localStorage.removeItem("fAQ");
    localStorage.removeItem("pricing");
    const serializedData = JSON.stringify(data);
    localStorage.setItem("formData", serializedData);
    Router.push("/Course-Edit/Pricing");
  };
  return (
    <div className="container__">
      <div className="Header_">
        <div className="HoobbyLand_Title">
          HOBBY
          <br />
          LAND.
        </div>
      </div>
      {step === 1 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How about a working title?
            </h3>
            <div className="my-5">
              It's ok if you can't think of a good title now. You can change it
              later.
            </div>
            <div>
              <div>
                <input
                  placeholder="Enter Your title"
                  className={`${
                    error.title ? "errTimezoneInput" : "Input_dark"
                  }`}
                  value={data.title}
                  onChange={handleTitleChange}
                />
                {error.title && (
                  <div className="text-danger">{error.title}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              What Tag best fits the knowledge you'll share?
            </h3>
            <div className="my-5">
              If you're not sure about the right category, you can change it
              later. later.
            </div>
            <div className="d-flex jsutify-content-center">
              <select
                className={`${error.tags ? "errTimezoneInput" : "Input_dark"}`}
                placeholder="Select Yout Categrios"
                onChange={handleTagChange}
              >
                <option value="Mern Stack">Mern Stack</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Native">Native</option>
              </select>
            </div>
            {error.tags && <div className="text-danger">{error.tags}</div>}
          </div>
        </div>
      ) : step === 2 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How about a working Desc?
            </h3>
            <div className="my-5">
              It's ok if you can't think of a good title now. You can change it
              later.
            </div>
            <div>
              <input
                placeholder="Description"
                value={data.description}
                onChange={handleDescChange}
                className={`${
                  error.description
                    ? "Input_dark_text_area_err"
                    : "Input_dark_text_area"
                }`}
              />
              {error.description && (
                <div className="text-danger">{error.description}</div>
              )}
            </div>
          </div>
        </div>
      ) : step === 4 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How PotFolia a working Imae & Video Url & Desctiption?
            </h3>
            <div className="my-3">
              <input
                placeholder="Enter Your Image & Url"
                onChange={handleImageUrl}
                value={data.portfolio[0].media_url}
                className={`${
                  error.portfolio[0].media_url
                    ? "errTimezoneInput"
                    : "Input_dark"
                }`}
              />
              {error.portfolio[0].media_url && (
                <div className="text-danger">
                  {error.portfolio[0].media_url}
                </div>
              )}
            </div>
            <div className="my-3">
              <input
                placeholder="Description"
                value={data.portfolio[0].description}
                onChange={handlePortFoliaDescrion}
                className={`${
                  error.portfolio[0].description
                    ? "errTimezoneInput"
                    : "Input_dark"
                }`}
              />
              {error.portfolio[0].description && (
                <div className="text-danger">
                  {error.portfolio[0].description}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : step === 5 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How Categios a working Servies
            </h3>
            <div className="my-5">
              <select
                className={`${
                  error.category ? "errTimezoneInput" : "Input_dark"
                }`}
                placeholder="Select Yout Categrios"
                onChange={handleCategrios}
                value={data.category}
              >
                {categrios.map((e) => {
                  return <option value={e.title}>{e.title}</option>;
                })}
              </select>
              {error.category && (
                <div className="text-danger">{error.category}</div>
              )}
            </div>
          </div>
        </div>
      ) : step == 6 ? (
        <div className="main_container_">
          <div>
            <h3 className="fw-bold text-center mb-3">
              How Type a working Servies
            </h3>
            <div className="my-5">
              <select
                className={`${
                  error.courseType ? "errTimezoneInput" : "Input_dark"
                }`}
                placeholder="Select Yout Course Type"
                onChange={handleCategriosType}
                value={data.courseType}
              >
                {courseTypeOption.map((e) => {
                  return <option value={e.title}>{e.title}</option>;
                })}
              </select>
              {error.courseType && (
                <div className="text-danger">{error.courseType}</div>
              )}
            </div>
            {data.courseType == "Physical" || data.courseType == "Hybird" ? (
              <div className="my-5">
                {/* <div className="">
                  <input
                    className={`${
                      error.location ? "errTimezoneInput" : "Input_dark"
                    }`}
                    placeholder="location"
                    value={data.location}
                    name="location"
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }));
                    }}
                  />
                  {error.location && (
                    <div className="text-danger">{error.location}</div>
                  )}
                </div> */}
                <div>
                  <Autocomplete
                    onLoad={(auto) => setAutocomplete(auto)}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      className={`${
                        error.location ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="location"
                      value={data.location}
                      name="location"
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }));
                      }}
                    />
                  </Autocomplete>
                </div>
                <div className="my-3">
                  <select
                    className={`${
                      error.targetedArea ? "errTimezoneInput" : "Input_dark"
                    }`}
                    placeholder="Select Your Targeted Area"
                    onChange={(e) => {
                      setData((pre) => ({
                        ...pre,
                        targetedArea: e.target.value,
                      }));
                    }}
                    value={data.targetedArea}
                  >
                    {targetedLimitArrat.map((e) => {
                      return <option value={e.title}>{e.title}</option>;
                    })}
                  </select>
                  {error.targetedArea && (
                    <div className="text-danger">{error.targetedArea}</div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : step == 7 ? (
        <div className="main_container_">
          <div>
            <VideoRecorder />
          </div>
        </div>
      ) : null}

      {step == 1 ? (
        <div className="Bottom">
          <div></div>
          <div></div>

          <div clas>
            <button
              onClick={() => {
                step1onCLick();
              }}
              className="dark_btn"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="Bottom">
          <div>
            <button
              onClick={() => {
                if (step === 1) {
                } else {
                  setStep(step - 1);
                }
              }}
              className="Outline_Btn"
            >
              Skip
            </button>
          </div>
          <div className="Text_">
            <span className="Current_Step">{step}</span> /{" "}
            {data.courseType === "Online" ? "7" : "6"}
          </div>
          <div>
            <button
              onClick={() => {
                if (step === 1) {
                  step1onCLick();
                } else if (step === 2) {
                  step2onCLick();
                } else if (step == 3) {
                  step3onClick();
                } else if (step === 4) {
                  step4onCLick();
                } else if (step === 5) {
                  step5onCLick();
                } else if (step == 6) {
                  step6onCLick();
                } else if (step == 7) {
                  handleSubmit();
                }
              }}
              className="dark_btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
