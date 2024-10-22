import { Card, Footer, Header } from "@/Component";
import { AuthToken, CreateRoom } from "@/config/Axiosconfig/AxiosHandle/chat";
import {
  FetchServices,
  FindService,
  GetSingleProduct,
} from "@/config/Axiosconfig/AxiosHandle/service";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import data from "@/constant/product";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [medata, setMedata] = useState({});
  const [singleData, setSingleData] = useState({
    user_id: {
      _id: "",
      username: "",
      email: "",
      register_provider: "",
      firstname: "",
    },
    _id: "",
    title: "",
    description: "",
    courseType: "",

    portfolio: [
      {
        media_url: "",
        description: "",
      },
    ],
    category: "",
    tags: ["mern", "react", "nodejs"],
    pricing: [
      {
        plan: "plan name",
        title: "plan title",
        description: "bla bla bla",
        price: 100,
        delivery_time: "30 days",
        features: ["features mentor wants to tell"],
      },
    ],
    delivery_methods: ["by-email", "physically", "online-lesson"],
    FAQ: [
      {
        question: "questi",
        answer: "answer here...",
      },
    ],
  });
  const [token, setToken] = useState();
  const FetchGetMe = async () => {
    try {
      const cookies = document.cookie.split(";");

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
          setMedata({ ...response.data.user });
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    FetchGetMe();
  }, []);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const GetService = async () => {
    try {
      const response = await FindService(title);
      const userData = medata;
      if (response) {
        const filterStatius = response.data.services?.filter(
          (e) => e.status === "Approved"
        );

        const userLatitude = userData.latitude;
        const userLongitude = userData.longitude;

        const mergedArray = filterStatius?.filter(
          (r) => r.courseType === "Online"
        );

        const filterStatusThird = filterStatius?.filter((r) => {
          if (r.courseType === "Hybird" || r.courseType === "Physical") {
            const courseLatitude = r.latitude;
            const courseLongitude = r.longitude;
            const targetedAreaString = r.targetedArea;
            const targetedArea = parseFloat(
              targetedAreaString.replace("km", "").trim()
            );
            const distance = getDistanceFromLatLonInKm(
              userLatitude,
              userLongitude,
              courseLatitude,
              courseLongitude
            );
            return distance <= targetedArea;
          }
          return false;
        });

        const finalArray = [...mergedArray, ...filterStatusThird];

        if (userData?.email) {
          setAllService(finalArray);
        } else {
          setAllService(filterStatius);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetService();
  }, [medata]);

  const FetchToken = async () => {
    try {
      const response = await AuthToken();
      if (response) {
        setToken(response?.data?.token);
      }
    } catch (e) {}
  };
  useEffect(() => {
    FetchToken();
  }, []);
  const handleCreateRoom = async () => {
    try {
      const response = await CreateRoom(singleData.user_id._id, token);
      if (response) {
        router.push("./massage");
      }
    } catch (error) {}
  };
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [recentdata, setRecentdata] = useState([]);
  const router = useRouter();
  const queryid = router.query;
  const [addtocard, setAddtocard] = useState([]);

  const handleAddToCart = () => {
    const cookies = document.cookie.split(";");
    let isLoggedIn = false;

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name.trim() === "is_logged_in" && value.trim() === "true") {
        isLoggedIn = true;
      }
    });
    if (isLoggedIn) {
      const existingCartData =
        JSON.parse(localStorage.getItem("cartData")) || [];
      const isItemInCart = existingCartData.some(
        (item) => item._id === singleData._id
      );
      if (!isItemInCart) {
        const updatedCartData = [...existingCartData, singleData];
        setAddtocard(updatedCartData);
        localStorage.setItem("cartData", JSON.stringify(updatedCartData));
      } else {
        return alert("your data already exist  in the cart");
      }
      router.push("./addtocard");
    } else {
      router.push("./login");
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchSingleProduct = async (id) => {
    try {
      const response = await GetSingleProduct(id);
      if (response) {
        setSingleData({ ...response.data.services });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const id = localStorage.getItem("servicesId");
    if (id) {
      fetchSingleProduct(id);
    }
  }, [queryid.id]);

  const fetchAllService = async () => {
    try {
      const response = await FindService("&");
      if (response) {
        setData([...response.data.services]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllService();
  }, []);

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.category === singleData.category && item._id !== singleData._id
    );
    setRecentdata(filteredData);
  }, [singleData]);
  return (
    <div className="conatiner_single_Product">
      <Header />
      <div className="container">
        <div className="row my-5">
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => {
                  router.push({
                    pathname: "/mentor-profile",
                    query: { id: singleData.user_id._id },
                  });
                }}
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "100%",
                  backgroundColor: "#003a55",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {singleData.user_id?.firstname?.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: "18px" }}>
                  {singleData.user_id?.firstname}
                </div>
                <div style={{ fontSize: "13px" }}>
                  {singleData.user_id?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 my-2">
            <div>
              <img
                src={singleData.portfolio[0].media_url}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          </div>
          <div className="col-md-6" style={{ position: "relative" }}>
            <h2 className="fw-bold mt-5 ">{singleData.title}</h2>
            <div className="fw-bold">
              Price : ${singleData.pricing[0].price}
            </div>
            <div className="mt-3">Desc : {singleData.description}</div>
            <div className="mt-3">Course Type : {singleData.courseType}</div>

            <div className="w-100 mt-5">
              {singleData.user_id?._id === medata?._id ? null : (
                <button
                  className="btn_Green_Size_Full_outline mb-3"
                  onClick={handleCreateRoom}
                >
                  Contact With Mentor
                </button>
              )}

              <button className="btn_Green_Size_Full" onClick={handleAddToCart}>
                Enrolled Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="fw-bold text-center">Recent Course</h1>
      <div className="Line_bottom"></div>
      <div className="my-3">
        <div className="container">
          <div className="row">
            {recentdata.map((e, i) => {
              return (
                <div key={i} className="col-md-4 mt-3 p-2">
                  <div>
                    <Card
                      title={e.title}
                      price={`$ ${e.pricing[0].price}`}
                      desc={e.description}
                      category={e.category}
                      AllObject={e}
                      image={e.portfolio.map((e) => {
                        return e.media_url;
                      })}
                      id={e._id}
                      type={e.courseType}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
