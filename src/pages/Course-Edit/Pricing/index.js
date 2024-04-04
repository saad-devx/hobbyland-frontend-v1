import CourseLayout from "@/layout/CourseLayout";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    plan: "",
    title: "",
    description: "",
    price: "",
    delivery_time: "",
    features: [],
  });

  const [errors, setErrors] = useState({
    plan: "",
    title: "",
    description: "",
    price: "",
    delivery_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "price") {
      newValue = parseFloat(value);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleFeaturesChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      features: selectedOptions,
    });
  };

  const handleSubmit = () => {
    const { plan, title, description, price, delivery_time, features } =
      formData;
    const newErrors = {};
    if (!plan) {
      newErrors.plan = "Plan name is required";
    }
    if (!title) {
      newErrors.title = "Plan title is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!price) {
      newErrors.price = "Price is required";
    }
    if (!delivery_time) {
      newErrors.delivery_time = "Delivery time is required";
    }
    if (features.length === 0) {
      newErrors.features = "At least one feature is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      plan,
      title,
      description,
      price,
      delivery_time,
      features,
    };
    console.log(payload);
    console.log(formData);

    const obj = {
      pricing: [{ ...formData }],
      delivery_methods: ["abc", "xyz"],
    };
    const serializedData = JSON.stringify(obj);
    localStorage.setItem("pricing", serializedData);
    console.log(serializedData);
    router.push("/Course-Edit/F&A");
  };
  return (
    <div>
      <CourseLayout>
        <div style={{ width: "100%" }} className="w-100 Curriculum_container">
          <div className="Header_">
            <div className="title_">Pricing</div>
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
              <div className=" mt-4">
                <div className="row">
                  <div className="col-md-6 mt-5">
                    <input
                      className={`${
                        errors.plan ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="Enter Your plan name"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                    />
                    {errors.plan && (
                      <div style={{ color: "red" }}>{errors.plan}</div>
                    )}
                  </div>
                  <div className="col-md-6 mt-5">
                    <input
                      className={`${
                        errors.title ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="Enter Your plan title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div style={{ color: "red" }}>{errors.title}</div>
                    )}
                  </div>
                  <div className="col-md-6 mt-5">
                    <input
                      className={`${
                        errors.description ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="Enter Your description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <div style={{ color: "red" }}>{errors.description}</div>
                    )}
                  </div>
                  <div className="col-md-6 mt-5">
                    <input
                      className={`${
                        errors.price ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="Enter Your price"
                      name="price"
                      type="number"
                      onChange={handleChange}
                    />
                    {errors.price && (
                      <div style={{ color: "red" }}>{errors.price}</div>
                    )}
                  </div>
                  <div className="col-md-6 mt-5">
                    <input
                      className={`${
                        errors.delivery_time ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="Enter Your delivery time"
                      name="delivery_time"
                      value={formData.delivery_time}
                      onChange={handleChange}
                    />
                    {errors.delivery_time && (
                      <div style={{ color: "red" }}>{errors.delivery_time}</div>
                    )}
                  </div>
                  <div className="col-md-6 mt-5">
                    <select
                      // className="Input_dark"
                      className={`${
                        errors.features ? "errTimezoneInput" : "Input_dark"
                      }`}
                      placeholder="Select features"
                      name="features"
                      onChange={handleFeaturesChange}
                    >
                      <option value="feature1">Feature 1</option>
                      <option value="feature2">Feature 2</option>
                      <option value="feature3">Feature 3</option>
                    </select>
                    {errors.features && (
                      <div style={{ color: "red" }}>{errors.features}</div>
                    )}
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
                      Save
                    </button>
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

export default Index;
