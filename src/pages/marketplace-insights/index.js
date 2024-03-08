import { Footer } from "@/Component";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Index() {
  return (
    <div>
      <AdminLayout>
        <div className="w-100 Marketing_place_container">
          <div className="TOP_HEader ">
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
          <div style={{ padding: "45px 20px" }}>
            <div className="w-100 card py-5">
              <div className="fs-3 fw-bold">
                What course topic are you interested in?
              </div>
              <div className="w-50 m-auto mt-4">
                <input
                  placeholder="e.g. Photography, Travel Photography, JavaScript"
                  className="Input"
                  style={{ margin: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <Footer />
    </div>
  );
}

export default Index;
