import { Footer, Header } from "@/Component";
import { MentorDocumentation } from "@/config/Axiosconfig/AxiosHandle/mentor";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Index() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    document_type: "",
    document_number: "",
    document_name: "",
    issued_by: "",
    issue_date: "",
    front_image: "",
    back_image: "",
    additional_details: "",
    expiration_date: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      // console.log("Form data:", formData);
      // alert("Form submitted successfully!");
      const data = {
        documents: [{ ...formData }],
      };
      console.log(data);
      try {
        const response = await MentorDocumentation(data);
        if (response) {
          setSuccess(
            "Documents submitted for review, please wait for approval."
          );
          router.push("./Two-step-verfication");

          setError();
        }
      } catch (e) {
        console.log(e);
        setSuccess();
        setError(e.response.data.msg);
      }
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
    if (!data.expiration_date) {
      errors.expiration_date = "Expire Date are required";
    }
    if (!data.issue_date) {
      errors.issue_date = "issue_date are required";
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
          {error && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#feefee",
                padding: "12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon
                icon="carbon:warning-filled"
                style={{ fontSize: "29px", color: "#ee5d50" }}
              />
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#e6faf5",
                padding: "12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon
                icon="ep:success-filled"
                style={{ fontSize: "29px", color: "#01b574" }}
              />
              {success}
            </div>
          )}
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

          <div className="d-flex gap-3">
            <div className="w-75 mt-3">
              <DatePicker
                className={`${
                  errors.expiration_date ? "errTimezoneInput" : "Input"
                }`}
                selected={formData.expiration_date}
                onChange={(date) =>
                  setFormData({ ...formData, expiration_date: date })
                }
                placeholderText="expiration_date"
              />
              {errors.expiration_date && (
                <p style={{ color: "red" }}>{errors.expiration_date}</p>
              )}
            </div>
            <div className="w-75 mt-3">
              <DatePicker
                className={` w-100 ${
                  errors.issue_date ? "errTimezoneInput" : "Input"
                }`}
                selected={formData.issue_date}
                onChange={(date) =>
                  setFormData({ ...formData, issue_date: date })
                }
                placeholderText="issue_date"
              />
              {errors.issue_date && (
                <p style={{ color: "red" }}>{errors.issue_date}</p>
              )}
            </div>
          </div>

          <button onClick={handleSubmit} className="btn_Green_Size_Full mt-3">
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
