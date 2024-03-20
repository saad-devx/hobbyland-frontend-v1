import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const data = [{}, {}, {}];
  const router = useRouter();
  const HandleRoute = (path) => {
    router.push(path);
  };
  return (
    <div>
      <div className="AddTOCardContainer" style={{ marginTop: "15px" }}>
        <div className="container mb-5 mt-4">
          <h2 className="fw-bold">Sales Cart</h2>
          <div className="mt-3">3 Courses in Cart</div>
          <div className="row mt-5">
            <div className="col-md-8 p-1">
              {data.map((e, i) => {
                return (
                  <div
                    onClick={() => HandleRoute("/SingleProduct")}
                    className="card_main"
                  >
                    <div className="postion_absolute">
                      <button className="btn_Green">
                        <Icon icon="material-symbols:delete" />
                      </button>
                    </div>
                    <div className="d-flex gap-3">
                      <div>
                        <img
                          src="https://www.wscubetech.com/images/free-video-editing-course.png"
                          alt="./"
                          className="Images"
                        />
                      </div>
                      <div>
                        <h5 className="fw-bold">Video Editing Course</h5>
                        <div className="">
                          Desc : Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Ad eadolorem provident natus
                          exercitationem voluptates mollitia quis autsint
                          deleniti labore
                        </div>
                        <div className="mt-3 fw-bold d-flex gap-2 align-items-center">
                          4.8 Rating <Icon icon="material-symbols:star" />{" "}
                          <Icon icon="material-symbols:star" />{" "}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        className="fw-bold d-flex gap-1"
                        style={{ color: "#003a55" }}
                      >
                        $12.99
                        <Icon icon="mdi:money-off" />
                      </div>
                      <div
                        className="fw-bold d-flex gap-1"
                        style={{ color: "#003a55", marginTop: "10px" }}
                      >
                        <del>$19.99</del>
                        <Icon icon="mdi:money-off" />
                      </div>
                    </div>
                  </div>
                );
              })}
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
