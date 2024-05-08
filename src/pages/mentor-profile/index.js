import { Footer, Header } from "@/Component";
import { AuthToken, CreateRoom } from "@/config/Axiosconfig/AxiosHandle/chat";
import { ProfileGetByeId } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
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
  const handleCreateRoom = async () => {
    try {
      const response = await CreateRoom(medata._id, token);
      if (response) {
        console.log(response, "Roomcreate");

        router.push("./massage");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error, "roomcreate err");
    }
  };
  console.log(medocumentation, "docmu");
  return (
    <div>
      <Header />
      <div className="container postion card p-3 my-5">
        <div className="d-flex flex-wrap gap-3">
          <div>
            {medata?.profile_image ? (
              <img
                className="prfile_circle_image"
                src={medata?.profile_image}
              />
            ) : (
              <div
                style={{
                  width: "75px",
                  height: "75px",
                  backgroundColor: "#003a55",
                  fontSize: "35px",
                  borderRadius: "100%",
                  color: "white",
                  textTransform: "uppercase",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {medata?.firstname?.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h2>{medata?.firstname}</h2>
            <p>{medata?.lastname}</p>
            {medata?.account_type ===
            "student" ? null : medata?.account_type === "mentor" ? (
              <button
                onClick={handleCreateRoom}
                className="btn_Green_Large_Size"
              >
                Contact With Mentor
              </button>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4  mt-3 borderLeft rounded">
            <div className="d-flex mb-1 justify-content-between p-1">
              <div className="">Name :</div>
              <div>{medata?.firstname}</div>
            </div>
            <div className="d-flex mb-1 justify-content-between p-1">
              <div className="">LastName :</div>
              <div>{medata?.lastname}</div>
            </div>
            <div className="d-flex mb-1 justify-content-between p-1">
              <div className="">Email :</div>
              <div>{medata?.email}</div>
            </div>
            <div className="d-flex mb-1 justify-content-between p-1">
              <div className="">Acount type :</div>
              <div>{medata?.account_type}</div>
            </div>
          </div>
          <div className="col-md-8 mt-3 borderLeft rounded">
            {medocumentation?.documents ? (
              <div>
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
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
