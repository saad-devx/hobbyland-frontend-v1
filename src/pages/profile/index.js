import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FetchMe,
  UpdateUserProfile,
} from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { UserContext } from "@/config/contextapi/user";
import { Autocomplete, TextField } from "@mui/material";

function Index() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [fecthmeData, setFecthmeData] = useState({});
  const { fetchUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "Male",
    timezone: "",
    password: "",
    country: "",
    city: "",
    phone_number: {
      prefix: "+92",
      suffix: "",
    },
  });
  const fetchData = async () => {
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
          setFecthmeData({ ...response.data.user });
        }
      }
    } catch (e) {
      localStorage.setItem("is_logged_in", false);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(formData);
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
  const handleDropdownChange = (event, value, name) => {
    const newData = { ...formData, [name]: value?.label };
    setFormData(newData);
  };
  useEffect(() => {
    setFormData({
      email: fecthmeData?.email,
      firstname: fecthmeData.firstname,
      lastname: fecthmeData.lastname ? fecthmeData.lastname : "",
      email: fecthmeData.email ? fecthmeData.email : "",
      account_type: fecthmeData.account_type ? fecthmeData.account_type : "",
      timezone: fecthmeData.timezone,
      password: fecthmeData.password,
      country: fecthmeData.country,
      city: fecthmeData.city,

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
      const response = await UpdateUserProfile(formData);
      if (response) {
        console.log(response, "profile updated");
        setSuccess("Profile Updated Succesfully");
        fetchUserData();
      }
    } catch (error) {
      console.log(error, "err");
      setError(error?.response ? error.response?.data?.msg : error?.message);
    }
  };

  const genderOption = [
    {
      label: "Male",
    },
    {
      label: "Female",
    },
  ];
  return (
    <div>
      <ProfileLayout>
        <div className="profile_Container">
          <div className="container">
            <div className="row">
              <h3 style={{ marginTop: "75px" }} className="fs-1 fw-bold">
                Profile
              </h3>
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
                  {/* <input
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    name="firstname"
                    className="Input"
                  /> */}
                  <TextField
                    id="outlined-basic"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    value={formData?.firstname}
                    focused={formData?.firstname}
                    sx={{ mt: 3 }}
                    label="First Name"
                    name="firstname"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <TextField
                    id="outlined-basic"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    value={formData?.lastname}
                    focused={formData?.lastname}
                    sx={{ mt: 3 }}
                    label="Last Name"
                    name="lastname"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div>
                  <TextField
                    id="outlined-basic"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={formData?.email}
                    focused={formData?.email}
                    sx={{ mt: 3 }}
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <TextField
                    id="outlined-basic"
                    placeholder="Country"
                    onChange={handleInputChange}
                    disabled={true}
                    value={formData?.country}
                    focused={formData?.country}
                    sx={{ mt: 3 }}
                    label="country"
                    name="country"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <TextField
                    id="outlined-basic"
                    placeholder="city"
                    onChange={handleInputChange}
                    disabled={true}
                    value={formData?.city}
                    focused={formData?.city}
                    sx={{ mt: 3 }}
                    label="city"
                    name="city"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    className="w-100"
                    options={genderOption}
                    sx={{ mt: 3 }}
                    fullWidth
                    name="gender"
                    onChange={(event, value) =>
                      handleDropdownChange(event, value, "gender")
                    }
                    value={
                      genderOption.find(
                        (opt) => opt.label == formData?.gender
                      ) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Gender"
                        focused={formData?.gender ? true : false}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div>
                  <TextField
                    id="outlined-basic"
                    placeholder="Timezone"
                    onChange={handleInputChange}
                    value={formData?.timezone}
                    focused={formData?.timezone}
                    sx={{ mt: 3 }}
                    label="Timezone"
                    name="timezone"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <TextField
                    id="outlined-basic"
                    placeholder="Phone Number"
                    type="number"
                    onChange={handlePhoneNumberChange}
                    value={
                      formData.phone_number ? formData.phone_number.suffix : ""
                    }
                    sx={{ mt: 3 }}
                    label="Phone"
                    name="suffix"
                    fullWidth
                    variant="outlined"
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
