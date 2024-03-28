import { Card, Footer, Header } from "@/Component";
import data from "@/constant/product";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const SingleProduct = {
    title: "Video Editing Course",
    price: "$79.00",
    desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eadolorem provident natus exercitationem voluptates mollitia quis autsint deleniti labore",
    location: "Pakistan,karachi",
    videoSource: "abc",
    image: "https://www.wscubetech.com/images/free-video-editing-course.png",
    id: 1,
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/addtocard");
  };
  return (
    <div className="conatiner_single_Product">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-5">
            <div>
              <video
                style={{ width: "100%", height: "400px" }}
                controls
                poster={SingleProduct.image}
              >
                <source
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </video>
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
            <h2 className="fw-bold mt-5 ">{SingleProduct.title}</h2>
            <div className="fw-bold">Price : {SingleProduct.price}</div>
            <div className="mt-3">{SingleProduct.desc}</div>
            <div className="w-100 mt-5">
              <button
                onClick={handleNavigation}
                className="btn_Green_Size_Full"
              >
                <Icon icon="iconoir:add-to-cart" /> Add To Card
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
            {data.map((e, i) => {
              return (
                <div key={i} className="col-md-4 mt-3 p-2">
                  <div>
                    <Card
                      title={e.title}
                      price={e.price}
                      desc={e.desc}
                      location={e.location}
                      videoSource={e.videoSource}
                      image={e.image}
                      id={e.id}
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
