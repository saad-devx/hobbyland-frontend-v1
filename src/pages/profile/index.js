import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React from "react";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <ProfileLayout>
        <div className="w-100">
          <h3 className="my-3 fw-bold">Update Profile</h3>
          <div className="container">
            <div className="row">
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Full Name</div>
                  <input placeholder="First Name" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Full Name</div>
                  <input placeholder="Last Name" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Title</div>
                  <input placeholder="Title" className="Input" />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div>
                  <div className="label">Country</div>
                  <select placeholder="Contry" className="Input">
                    <option value="Pakistan">Pakistan</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 my-3">
                <div>
                  <div className="label">Bio</div>
                  <textarea placeholder="Contry" className="Input_Large" />
                </div>
              </div>
              <div className="col-md-12 my-3">
                <div>
                  <div className="label">Bio</div>
                  <textarea placeholder="Contry" className="Input_Large" />
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
            <button className="btn_Green">Save</button>
          </div>
        </div>
      </ProfileLayout>
      <Footer />
    </div>
  );
}

export default Index;
