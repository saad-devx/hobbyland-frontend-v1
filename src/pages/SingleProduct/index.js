import { Card, Footer, Header } from "@/Component";
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
    _id: "660e7cfc1c7ff1a8ea22f5c5",
    title:
      "whatever t ghgfhfghfghfghfghfgh fghfghgh he title isjkhjkhjkhjkfgfdgdfgdf",
    description: "bla bla bla",
    portfolio: [
      {
        media_url: "https://www.merriam-webster.com/dictionary/portfolio",
        description: "media deschjkhjkhjkhjkription",
      },
    ],
    category: "as name suggests",
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
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [recentdata, setRecentdata] = useState([]);
  const router = useRouter();
  const queryid = router.query;
  console.log(queryid, "quesry");
  const [addtocard, setAddtocard] = useState([]);

  const handleAddToCart = () => {
    const existingCartData = JSON.parse(localStorage.getItem("cartData")) || [];
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
        console.log(singleData);
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
        console.log(response.data.services);
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

  return (
    <div className="conatiner_single_Product">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-5">
            <div>
              <img
                src={singleData.portfolio[0].media_url}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          </div>
          <div className="col-md-6 my-5" style={{ position: "relative" }}>
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
                    <li
                      onClick={() => {
                        router.push("/massage");
                      }}
                      style={{}}
                    >
                      Massage
                    </li>
                    <li
                      onClick={() => {
                        router.push("/massage");
                      }}
                      style={{}}
                    >
                      Massage
                    </li>
                    <li
                      onClick={() => {
                        router.push("/massage");
                      }}
                      style={{}}
                    >
                      Massage
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
