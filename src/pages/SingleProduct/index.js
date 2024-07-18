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
          console.log(response.data.user);
          setMedata({ ...response.data.user });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchGetMe();
  }, []);
  const FetchToken = async () => {
    try {
      const response = await AuthToken();
      if (response) {
        setToken(response?.data?.token);
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
      console.log(singleData.user_id._id, "id_user");
      const response = await CreateRoom(singleData.user_id._id, token);
      if (response) {
        console.log(response, "Roomcreate");
        router.push("./massage");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error, "roomcreate err");
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [recentdata, setRecentdata] = useState([]);
  const router = useRouter();
  const queryid = router.query;
  console.log(queryid, "quesry");
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
      console.log("singleproductdata", id, "gfg");
      const response = await GetSingleProduct(id);
      if (response) {
        console.log(response, "red");
        setSingleData({ ...response.data.services });
        console.log(recentdata.data.services, "oneservice");
        console.log(singleData, "singledata");
      }
    } catch (error) {
      console.log(error, "err");
    }
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
        console.log(response.data.services, "singleservice");
        setData([...response.data.services]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllService();
  }, []);

  useEffect(() => {
    console.log(data, "data");
    const filteredData = data.filter(
      (item) =>
        item.category === singleData.category && item._id !== singleData._id
    );
    setRecentdata(filteredData);
    console.log(recentdata, "map");
  }, [singleData]);
  console.log(singleData.portfolio[0].media_url);
  console.log(singleData, "singledata");
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
            <div className="mt-3">{singleData.description}</div>
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
                      image={e.portfolio.map((e) => {
                        return e.media_url;
                      })}
                      id={e._id}
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
