import React, { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

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
    tags: "",
  });
  const [data, setData] = useState({
    title: "",
    description: "",
    portfolio: [
      {
        media_url: "",
        description: "",
      },
    ],
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
  };
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
      console.log(data);
      console.log(error);

      handleSubmit();
    }
  };
  const handleCategrios = (e) => {
    setData((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };
  const handleImageUrl = (e) => {
    const imageUrl = e.target.value;
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(imageUrl)) {
      setError((prevState) => ({
        ...prevState,
        portfolio: [
          { ...prevState.portfolio[0], media_url: "Invalid URL format" },
        ],
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        portfolio: [{ ...prevState.portfolio[0], media_url: imageUrl }],
      }));
      setError((prevState) => ({
        ...prevState,
        portfolio: [{ ...prevState.portfolio[0], media_url: "" }],
      }));
    }
  };

  const handlePortFoliaDescrion = (e) => {
    const description = e.target.value;
    setData((prevState) => ({
      ...prevState,
      portfolio: [{ ...prevState.portfolio[0], description: description }],
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
  };
  const handleSubmit = () => {
    Router.push({
      pathname: "./Course-Edit/Pricing",
      query: { data: JSON.stringify(data) },
    });
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
                <option value="Mern Stack">Mern Stack</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Native">Native</option>
              </select>
              {error.category && (
                <div className="text-danger">{error.category}</div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {step == 1 ? (
        <div className="Bottom">
          <div>
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
            <span className="Current_Step">{step}</span> / 5
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
