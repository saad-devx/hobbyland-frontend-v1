import { Footer, Header } from "@/Component";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const route = useRouter();
  const card = [
    {
      title: "Test Video",
      desc: "Get free feedback from Udemy video experts on your audio,",
      icon: "teenyicons:screen-outline",
      path: "/test-video",
    },
    {
      title: "Marketplace Insights",
      desc: "Get Udemy-wide market data to create successful courses.",
      icon: "teenyicons:screen-outline",
      path: "/marketplace-insights",
    },
    {
      title: "Bulk coupon creation",
      desc: "Create multiple coupons at once via CSV upload.",
      icon: "teenyicons:screen-outline",
      path: "/multiple-coupons",
    },
  ];
  return (
    <div>
      <AdminLayout>
        <div className="w-100 Tools_container">
          <div className="TOP_HEader mb-3 my-3">
            <div>
              <Link className="Link" href="./StudentHome">
                <div className="Link">Student</div>
              </Link>
            </div>
            <div>
              <Icon className="Icon" icon="carbon:notification-filled" />
            </div>
            <div className="Profile_box">S</div>
          </div>
          <div className="py-3">
            <div className="mx-5">
              <h2 className="fw-bold">Tools</h2>
            </div>
            <div className="container mb-3">
              <div className="row">
                {card.map((e, i) => {
                  return (
                    <div
                      onClick={() => {
                        route.push(e.path);
                      }}
                      className="col-md-4 mt-3 "
                    >
                      <div className="card_Tools">
                        <div className="text-center">
                          <Icon
                            style={{
                              width: "4.8rem",
                              height: "4.8rem",
                              margin: "auto",
                            }}
                            icon={e.icon}
                          />
                        </div>
                        <div className="heading">{e.title}</div>
                        <div className="dsc text-center">{e.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default Index;
