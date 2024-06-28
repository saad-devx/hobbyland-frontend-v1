import { Footer, Header } from "@/Component";
import { AuthToken, CreateRoom } from "@/config/Axiosconfig/AxiosHandle/chat";
import { ProfileGetByeId } from "@/config/Axiosconfig/AxiosHandle/user";
import { UserContext } from "@/config/contextapi/user";
import { Icon } from "@iconify/react";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Index() {
  const [on, setOn] = useState(true);
  const router = useRouter();
  const [medata, setMedata] = useState({});
  const [medocumentation, setMedocumentation] = useState({});
  const { id } = router.query;
  const [token, setToken] = useState();

  const FetchProfile = async () => {
    try {
      const response = await ProfileGetByeId(id);
      if (response) {
        setMedocumentation({
          ...(response?.data?.documents ? response.data.documents : undefined),
        });
        console.log(response.data?.user, "profile");
        setMedata({ ...response?.data?.user });
        setOn(response?.data?.user?.two_fa?.enabled);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchProfile();
  }, []);

  const FetchToken = async () => {
    try {
      const response = await AuthToken();
      if (response) {
        setToken(response.data.token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchToken();
  }, []);

  console.log(medocumentation, "docmu");
  const { user } = useContext(UserContext);
  console.log(user, "uhhh");

  return (
    <div>
      <Header />
      <div className="postion width__ card my-5">
        <div className="text-center" style={{ backgroundColor: "rgb(243 243 243)" }}>
          <div style={{ width: "100%", height: "200px", backgroundColor: "red", position: "relative" }}>
            <img
              src="https://cdn.pixabay.com/photo/2015/11/19/08/52/banner-1050629_640.jpg"
              style={{ width: "100%", height: "100%" }}
            />
            <div className="profile-container">
              {medata?.profile_image ? (
                <img
                  className="prfile_circle_image"
                  src={medata?.profile_image}
                  alt="../"
                />
              ) : (
                <div className="profile-placeholder">
                  {medata?.firstname?.charAt(0)}
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: "70px" }}>
            <h2>{medata?.firstname}</h2>
            {medata?._id === user?._id ? (
              <div
                onClick={() => {
                  router.push("/profile");
                }}
                style={{ marginTop: "15px", cursor: "pointer", marginBottom: "15px" }}
              >
                Edit Profile
              </div>
            ) : null}
          </div>
        </div>
        {
          medata?.account_type === "mentor" && (<div className="container mt-3">
            <div className="row">
              <div className="col-md-4 ">
                <div className="shadow rounded box___ ">
                  <div>
                    <p style={{ fontSize: "50px", fontWeight: "800" }}>188+</p>
                    <p className="fs-5" style={{ lineHeight: "15px" }}>Total Course</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="shadow rounded box___ ">
                  <div>
                    <p style={{ fontSize: "50px", fontWeight: "800" }}>188+</p>
                    <p className="fs-5" style={{ lineHeight: "15px" }}>Total Sales Course</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="shadow rounded box___ ">
                  <div>
                    <p style={{ fontSize: "50px", fontWeight: "800" }}>1280</p>
                    <p className="fs-5" style={{ lineHeight: "15px" }}>Total Amount</p>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        }

        <div style={{ width: "98%", padding: "10px", margin: 'auto', backgroundColor: "rgb(243 243 243)" }} className="rounded shadow mt-3">
          <h2 style={{ marginTop: "10px", marginBottom: "10px" }} className="fw-bold">Profile</h2>
          <div className="d-flex mb-1 justify-content-between p-1">
            <div className="">Name :</div>
            <div>{medata?.firstname}</div>
          </div>
          <div className="d-flex mb-1 mt-3 justify-content-between p-1">
            <div className="">LastName :</div>
            <div>{medata?.lastname}</div>
          </div>
          <div className="d-flex mb-1 mt-3 justify-content-between p-1">
            <div className="">Email :</div>
            <div>{medata?.email}</div>
          </div>
          <div className="d-flex mb-1 mt-3 justify-content-between p-1">
            <div className="">Acount type :</div>
            <div>{medata?.account_type}</div>
          </div>
        </div>
        {medata?.account_type === "mentor" && (
          <div style={{ width: "98%", padding: "10px", margin: 'auto', backgroundColor: "rgb(243 243 243)" }} className="rounded shadow mt-3">
            <div>

              <div>
                <h2 className="fw-bold">Mentor Document</h2>
                <div className="d-flex mb-1 justify-content-between p-1">
                  <div className="">Document name :</div>
                  <div>{medocumentation?.documents?.[0]?.document_name}</div>
                </div>
                <div className="d-flex mb-1 justify-content-between p-1">
                  <div className="">Document Type :</div>
                  <div>{medocumentation?.documents?.[0]?.document_type}</div>
                </div>
                <div className="d-flex mb-1 justify-content-between p-1">
                  <div className="">Document Number :</div>
                  <div>{medocumentation?.documents?.[0]?.document_number}</div>
                </div>
                <div className="d-flex mb-1 justify-content-between p-1">
                  <div className="">Status :</div>
                  <div>{medocumentation?.verification_status}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className="documentation_Picture"
                      src={medocumentation?.documents?.[0]?.front_image}
                      alt="../"
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      className="documentation_Picture"
                      src={medocumentation?.documents?.[0]?.back_image}
                      alt="../"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ width: "98%", padding: "10px", margin: 'auto', backgroundColor: "rgb(243 243 243)" }} className="rounded shadow mt-3">
          <h2 style={{ marginTop: "10px", marginBottom: "10px" }} className="fw-bold">Setting</h2>
          <div className="d-flex mb-1  mt-3 justify-content-between p-1">
            <div className="">Two Step verification :</div>
            <div className="d-flex gap-3 ">
              <div className="mt-1">{on ? 'on' : 'Off'} /</div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={on}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default Index;
