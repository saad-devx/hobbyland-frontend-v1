import { Footer, Header } from "@/Component";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Index() {
  const [formData, setFormData] = useState({
    document_type: "",
    document_number: "",
    document_name: "",
    issued_by: "",
    issue_date: new Date(),
    front_image: "",
    back_image: "",
    additional_details: "",
    expiration_date: "",
  });

  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleIssueDateSelect = (date) => {
    console.log(date.toLocaleDateString());
    setFormData({ ...formData, issue_date: date });
    setShowCalendar(false);
  };

  const handleExpirationDateSelect = (date) => {
    console.log(date.toLocaleDateString());
    setFormData({ ...formData, expiration_date: date });
    setShowCalendar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form data:", formData);
      alert("Form submitted successfully!");
    } else {
      setErrors(errors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.document_type) {
      errors.document_type = "Document type is required";
    }
    if (!data.document_number) {
      errors.document_number = "Document number is required";
    }
    if (!data.document_name) {
      errors.document_name = "Document name is required";
    }
    if (!data.issued_by) {
      errors.issued_by = "Issued by is required";
    }
    if (!data.front_image) {
      errors.front_image = "Front image is required";
    }
    if (!data.back_image) {
      errors.back_image = "Back image is required";
    }
    if (!data.additional_details) {
      errors.additional_details = "Additional details are required";
    }
    // Add more validation rules as needed
    return errors;
  };

  return (
    <>
      <Header />
      <div className="Main_Container mb-3">
        <div style={{ position: "relative" }} className="CenterContainer">
          <div className="fs-3 text-center fw-bold">
            Submit Mentor Documentation
          </div>
          <p>
            Submit Mentor request then accepted request then mentor position
          </p>
          <div className="d-flex gap-3">
            <div className="w-75 mt-3">
              <input
                className={`${
                  errors.document_type ? "errTimezoneInput" : "Input"
                }`}
                placeholder="Documentation type"
                name="document_type"
                value={formData.document_type}
                onChange={handleChange}
              />
              {errors.document_type && (
                <p style={{ color: "red" }}>{errors.document_type}</p>
              )}
            </div>
            <div className="w-75 mt-3">
              <input
                className={`${
                  errors.document_number ? "errTimezoneInput" : "Input"
                }`}
                placeholder="Documentation Number"
                name="document_number"
                value={formData.document_number}
                onChange={handleChange}
              />
              {errors.document_number && (
                <p style={{ color: "red" }}>{errors.document_number}</p>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-75 mt-3">
              <input
                className={`${
                  errors.document_name ? "errTimezoneInput" : "Input"
                }`}
                placeholder="Documentation Name"
                name="document_name"
                value={formData.document_name}
                onChange={handleChange}
              />
              {errors.document_name && (
                <p style={{ color: "red" }}>{errors.document_name}</p>
              )}
            </div>
            <div className="w-75 mt-3">
              <input
                className={`${errors.issued_by ? "errTimezoneInput" : "Input"}`}
                placeholder="Issued By"
                name="issued_by"
                value={formData.issued_by}
                onChange={handleChange}
              />
              {errors.issued_by && (
                <p style={{ color: "red" }}>{errors.issued_by}</p>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-75 mt-3">
              <input
                className={`${
                  errors.front_image ? "errTimezoneInput" : "Input"
                }`}
                placeholder="Front image"
                name="front_image"
                value={formData.front_image}
                onChange={handleChange}
              />
              {errors.front_image && (
                <p style={{ color: "red" }}>{errors.front_image}</p>
              )}
            </div>
            <div className="w-75 mt-3">
              <input
                className={`${
                  errors.back_image ? "errTimezoneInput" : "Input"
                }`}
                placeholder="Back image"
                name="back_image"
                value={formData.back_image}
                onChange={handleChange}
              />
              {errors.back_image && (
                <p style={{ color: "red" }}>{errors.back_image}</p>
              )}
            </div>
          </div>
          <div className="w-100 mt-3">
            <input
              className={`${
                errors.additional_details ? "errTimezoneInput" : "Input"
              }`}
              placeholder="Additional Details"
              name="additional_details"
              value={formData.additional_details}
              onChange={handleChange}
            />
            {errors.additional_details && (
              <p style={{ color: "red" }}>{errors.additional_details}</p>
            )}
          </div>
          <div className="w-100 mt-3">
            {/* Input field for issue date */}
            <p>Issue Date</p>
            <input
              className="Input"
              placeholder="Select Date"
              onClick={toggleCalendar}
              value={formData.issue_date.toLocaleDateString()}
              readOnly
            />
            {showCalendar && (
              <Calendar
                onChange={handleIssueDateSelect}
                value={formData.issue_date}
              />
            )}
          </div>
          <div className="w-100 mt-3">
            {/* Input field for expiration date */}
            <p>Expiration Date</p>
            <input
              className="Input"
              placeholder="Select Date"
              onClick={toggleCalendar}
              value={formData.expiration_date.toLocaleDateString()}
              readOnly
            />
            {showCalendar && (
              <Calendar
                onChange={handleExpirationDateSelect}
                value={formData.expiration_date}
              />
            )}
          </div>
          <button onClick={handleSubmit} className="btn_Green_Size_Full">
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
