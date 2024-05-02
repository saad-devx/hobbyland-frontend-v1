import { Card, Footer, Header } from "@/Component";
import { CreateRoom } from "@/config/Axiosconfig/AxiosHandle/chat";
import {
  FetchServices,
  GetSingleProduct,
} from "@/config/Axiosconfig/AxiosHandle/service";
import data from "@/constant/product";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
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
  const handleCreateRoom = async () => {
    try {
      console.log(singleData.user_id._id, "id_user");
      const response = await CreateRoom(singleData.user_id._id);
      if (response) {
        console.log(response, "Roomcreate");
        router.push({
          pathname: "/massage",
          query: { id: singleData.user_id._id },
        });
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
      const response = await FetchServices();
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
    const filteredData = data.filter(
      (item) =>
        item.category === singleData.category && item._id !== singleData._id
    );
    setRecentdata(filteredData);
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
                {singleData.user_id.firstname.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: "18px" }}>
                  {singleData.user_id.firstname}
                </div>
                <div style={{ fontSize: "13px" }}>
                  {singleData.user_id.email}
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
            <div
              style={{
                position: "absolute",
                right: "0px",
                top: "30px",
                cursor: "pointer",
              }}
              onMouseEnter={handleMouseEnter}
            >
              <Icon
                icon="iconamoon:menu-kebab-vertical-bold"
                style={{ fontSize: "20px", color: "rgb(0 58 85)" }}
              />
              {isHovered && (
                <div
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: "absolute",
                    top: "100%",
                    width: "150px",
                    left: "-150px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    padding: "5px",
                    zIndex: 999,
                  }}
                >
                  {/* Your menu list items */}
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    <li onClick={handleCreateRoom} style={{}}>
                      Massage
                    </li>
                    <li
                      onClick={() => {
                        router.push("/massage");
                      }}
                      style={{}}
                    >
                      Active
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <h2 className="fw-bold mt-5 ">{singleData.title}</h2>
            <div className="fw-bold">
              Price : ${singleData.pricing[0].price}
            </div>
            <div className="mt-3">{singleData.description}</div>
            <div className="w-100 mt-5">
              <button className="btn_Green_Size_Full" onClick={handleAddToCart}>
                Add To Cart
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
                      like={false}
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
