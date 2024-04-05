import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const HandleRoute = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));

    if (cartData) {
      setData(cartData);
    }
  }, []);

  const handleDeleteItem = (index) => {
    const updatedCartData = [...data];
    updatedCartData.splice(index, 1); // Remove item at index
    setData(updatedCartData); // Update state
    localStorage.setItem("cartData", JSON.stringify(updatedCartData)); // Update local storage
  };

  return (
    <div>
      <div className="AddTOCardContainer" style={{ marginTop: "15px" }}>
        <div className="container mb-5 mt-4">
          <h2 className="fw-bold">Sales Cart</h2>
          <div className="mt-3">{data.length} Courses in Cart</div>
          <div className="row mt-5">
            <div className="col-md-8 p-1">
              {data.map((e, i) => (
                <div
                  key={i}
                  className="card_main"
                  onClick={() => HandleRoute("/SingleProduct")}
                >
                  <div className="postion_absolute">
                    <button
                      className="btn_Green"
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent event from bubbling up to parent div
                        handleDeleteItem(i); // Handle delete item
                      }}
                    >
                      <Icon icon="material-symbols:delete" />
                    </button>
                  </div>
                  <div className="d-flex gap-3">
                    <div style={{ width: "250px", height: "150px" }}>
                      <img
                        src={e.portfolio.map((e) => e.media_url)}
                        alt="./"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="fw-bold">{e.title}</h5>
                      <div className="">Desc : {e.description}</div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="fw-bold d-flex gap-1"
                      style={{ color: "#003a55" }}
                    >
                      $ {e.pricing.map((e) => e.price)}
                      <Icon icon="mdi:money-off" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="Right_card_main">
                <div className="fw-bold">Total:</div>
                <h2 className="fw-bold text-dark">$38.97</h2>
                <div>
                  <del>$224.97</del>
                </div>
                <div>83% off</div>
                <div className="mt-2">
                  <button
                    onClick={() => HandleRoute("/checkout")}
                    className="btn_Green_Size_Full"
                  >
                    checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
