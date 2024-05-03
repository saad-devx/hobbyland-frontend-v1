import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { ServiesCreate } from "@/config/Axiosconfig/AxiosHandle/service";

function Index() {
  const router = useRouter();
  const navigateLink = [];
  const navigateLink2 = [];
  const navigateLink3 = [
    {
      title: "Pricing",
      path: "/Course-Edit/Pricing",
    },
    {
      title: "F&A",
      path: "/Course-Edit/F&A",
    },
  ];

  const [sidebare, setSidebare] = useState(true);
  const [sidebarePosition, setSidebarePosition] = useState(true);
  const [showSidebare, setShowSidebare] = useState(true);
  const [menue, setMenue] = useState(false);
  const [pricing, setPricing] = useState(null);
  const [fAQ, setFAQ] = useState(null);
  const [createForm, setCreateForm] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setSidebare(true);
        setSidebarePosition(true);
        setShowSidebare(false);
        setMenue(true);
      } else {
        setSidebare(false);
        setShowSidebare(true);
        setMenue(false);

        setSidebarePosition(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const serializedData = localStorage.getItem("pricing");
    if (serializedData) {
      const parsedData = JSON.parse(serializedData);
      setPricing(parsedData);
      console.log(pricing, "pricing");
    }
    const faqdata = localStorage.getItem("fAQ");
    if (faqdata) {
      const faq = JSON.parse(faqdata);
      setFAQ(faq);
    }
    const firstformdata = localStorage.getItem("formData");
    if (firstformdata) {
      const firstdata = JSON.parse(firstformdata);
      setCreateForm(firstdata);
    }
  }, []);
  const HandleCreate = async () => {
    const obj = {
      ...fAQ,
      ...pricing,
      ...createForm,
    };
    console.log(obj);
    try {
      console.log(obj);
      const data = await ServiesCreate(obj);
      if (data) {
        console.log(data);
        alert("Services Create Succesfully");
        router.push("/Dashboard");
      }
    } catch (error) {
      console.log(error, "err");
      alert(error.response ? error.response.data.msg : error.message);

      router.push(
        `${
          error.response
            ? error.response.data.feild
              ? error.response.data.feild === "pricing"
                ? "/Course-Edit/Pricing"
                : error.response.data.feild === "FAQ"
                ? "/Course-Edit/F&A"
                : "/Course-Edit/Pricing"
              : "/Course-Edit/Pricing"
            : "/Course-Edit/Pricing"
        }`
      );
    }
  };
  return (
    <div className="User_profile_Container">
      {!sidebare ? (
        <div className="SideBare">
          <div className="my-3">
            <div className="p-2">
              {menue ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="mb-5 fs-3 text-white">Plan your course</div>
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      onClick={() => {
                        sidebare ? setSidebare(false) : setSidebare(true);
                      }}
                      className="Icon"
                      icon="uiw:left"
                      fontSize={25}
                      color="#002333"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-5 fs-3 text-white">Plan your course</div>
              )}

              {navigateLink.map((e, i) => {
                return (
                  <button
                    onClick={() => {
                      router.push(e.path);
                    }}
                    className="Button"
                  >
                    {e.title}
                  </button>
                );
              })}

              {navigateLink2.map((e, i) => {
                return (
                  <button
                    onClick={() => {
                      router.push(e.path);
                    }}
                    className="Button"
                  >
                    {e.title}
                  </button>
                );
              })}

              {navigateLink3.map((e, i) => {
                return (
                  <button
                    onClick={() => {
                      router.push(e.path);
                    }}
                    className="Button"
                  >
                    {e.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-3">
            <div>
              <button onClick={HandleCreate} className="btn_Green_Size_Full">
                Create Your Services
              </button>
            </div>
          </div>
        </div>
      ) : menue ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "15px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#002333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              onClick={() => {
                sidebare ? setSidebare(false) : setSidebare(true);
              }}
              className="Icon"
              icon="uiw:right"
              fontSize={25}
              color="white"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;
