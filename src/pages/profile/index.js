import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FetchMe,
  UpdateUserProfile,
} from "@/config/Axiosconfig/AxiosHandle/user";

function Index() {
  const router = useRouter();
  const [fecthmeData, setFecthmeData] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    account_type: "",
    gender: "Male",
    timezone: "",
    phone_number: {
      prefix: "+92",
      suffix: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchMe();
        if (response) {
          setFecthmeData({ ...response.data.user });
        }
      } catch (e) {
        console.log(e);
        router.push("/login");
      }
    };
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
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <div>
      <ProfileLayout>
        <div className="profile_Container">
          <div className="container">
            <div className="row">
              <h3 className="my-3 mx-3 fw-bold mt-5">Update Profile</h3>
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
                  <div className="label">Timezon</div>
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
