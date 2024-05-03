import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FetchMe,
  UpdateUserProfile,
} from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";

function Index() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [fecthmeData, setFecthmeData] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    account_type: "",
    gender: "Male",
    timezone: "",
    password: "",
    phone_number: {
      prefix: "+92",
      suffix: "",
    },
  });
  const fetchData = async () => {
    try {
      const response = await FetchMe();
      if (response) {
        console.log(response);
        setFecthmeData({ ...response.data.user });
      }
    } catch (e) {
      localStorage.setItem("is_logged_in", false);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      phone_number: {
        prefix: "+92",
        suffix: value,
      },
    }));
  };
  useEffect(() => {
    setFormData({
      firstname: fecthmeData.firstname,
      lastname: fecthmeData.lastname ? fecthmeData.lastname : "",
      email: fecthmeData.email ? fecthmeData.email : "",
      account_type: fecthmeData.account_type ? fecthmeData.account_type : "",
      timezone: fecthmeData.timezone,
      password: fecthmeData.password,
      phone_number: {
        prefix: "+92",
        suffix: fecthmeData.phone_number ? fecthmeData.phone_number.suffix : "",
      },
    });
  }, [fecthmeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await UpdateUserProfile(formData);
      if (response) {
        console.log(response);
        setSuccess("Profile Updated Succesfully");
      }
    } catch (error) {
      console.log(error, "err");
      setError(error.response ? error.response.data.msg : error.message);
    }
  };
  console.log("profile", fecthmeData);
  return (
    <div>
      <ProfileLayout>
        <div className="profile_Container">
          <div className="container">
            <div className="row">
              <h3 className="my-3 mx-3 fw-bold mt-5">Update Profile</h3>
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
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Full Name</div>
                  <input
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    name="firstname"
                    className="Input"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Last Name</div>
                  <input
                    placeholder="Last Name"
                    className="Input"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    name="lastname"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Email</div>
                  <input
                    placeholder="Email"
                    className="Input"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">account_type</div>
                  <input
                    placeholder="account_type"
                    className="Input"
                    value={formData.account_type}
                    onChange={handleInputChange}
                    name="account_type"
                  />
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Gender</div>
                  <select
                    onChange={handleInputChange}
                    name="gender"
                    className="Input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Timezone</div>
                  <input
                    className="Input"
                    placeholder="Timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    name="timezone"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Phone Number</div>
                  <input
                    placeholder="Suffix"
                    // value={formData.phone_number.suffix}
                    value={
                      formData.phone_number ? formData.phone_number.suffix : ""
                    }
                    onChange={handlePhoneNumberChange}
                    name="suffix"
                    className="Input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "20px 35px 0px 20px",
            }}
          >
            <button onClick={handleSubmit} className="btn_Green mb-3">
              Save
            </button>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
}

export default Index;
