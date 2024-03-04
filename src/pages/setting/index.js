import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React from "react";
import { Switch } from "antd";

function Index() {
  return (
    <div>
      <Header />
      <ProfileLayout>
        <div className="Settting_Container">
          <h3 className="my-3 fw-bold">Setting</h3>
          <div className="Proper_Container">
            <div className="Row">
              <div className="title">Two Step Varification </div>
              <div className="">
                On / &nbsp;&nbsp;&nbsp;&nbsp;
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
      <Footer />
    </div>
  );
}

export default Index;
