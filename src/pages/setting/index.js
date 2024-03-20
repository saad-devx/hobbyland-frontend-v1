import { Footer, Header } from "@/Component";
import ProfileLayout from "@/layout/profileLayout";
import React from "react";
import { Switch } from "antd";

function Index() {
  return (
    <div>
      <ProfileLayout>
        <div className="Settting_Container">
          <div className="Proper_Container">
            <h3 className="my-3 mx-5 fw-bold mt-5">Setting</h3>
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
    </div>
  );
}

export default Index;
