import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";

function Index() {
  const router = useRouter();
  const [fecthmeData, setFecthmeData] = useState({});
  const data = async () => {
    try {
      const response = await FetchMe();
      if (response) {
        setFecthmeData({ ...response.data.user });
        console.log(fecthmeData);
      }
    } catch (e) {
      router.push("/login");
    }
  };
  useEffect(() => {
    data();
  }, []);
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
                  <input placeholder="First Name" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Last Name</div>
                  <input placeholder="Last Name" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Email</div>
                  <input placeholder="Email" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">account_type</div>
                  <input placeholder="account_type" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Password</div>
                  <input
                    placeholder="password"
                    type="password"
                    className="Input"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Gender</div>
                  <select className="Input">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div>
                  <div className="label">TImezon</div>
                  <input className="Input" placeholder="Timezone" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Phone Number</div>
                  <input className="Input" placeholder="Timezone" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Social Link</div>
                  <input className="Input" placeholder="Timezone" />
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
            <button className="btn_Green mb-3">Save</button>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
}

export default Index;
