import {
  Customer_Chart,
  Daily_Activity,
  Montly_Chart,
  Year_Sales,
} from "@/Component";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Index() {
  return (
    <div>
      <AdminLayout>
        <div className="Container_analytics mx-3">
          <div className="TOP_HEader mb-3">
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
          <div className="my-3 ">
            <h2 className="fw-bold mx-5">Analytics</h2>

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 p-3">
                    <div className="shadow p-3 w-100 mt-3">
                      <Year_Sales />{" "}
                    </div>
                  </div>
                  <div className="col-md-12 p-3">
                    <div className="shadow p-3 w-100 mt-3">
                      <Montly_Chart />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 p-3">
                    <div className="shadow p-3 w-100 mt-3">
                      <Daily_Activity />
                    </div>
                  </div>
                  <div className="col-md-12 p-3">
                    <div className="shadow p-3 w-100 mt-3">
                      <Customer_Chart />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default Index;
