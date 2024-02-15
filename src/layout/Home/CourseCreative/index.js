import { Icon } from "@iconify/react";
import React from "react";

function Index() {
  return (
    <div className="Course_Creative_container">
      <div className="Tilte_Course_Creative">Get Creative With Skillshare</div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="col_box">
              <div className="mt-2">
                <Icon fontSize={25} icon="material-symbols:check" />
              </div>
              <div className="Creative_Content">
                Learn creative skills to achieve your personal and professional
                goals.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col_box">
              <div className="mt-2">
                <Icon fontSize={25} icon="material-symbols:check" />
              </div>
              <div className="Creative_Content">
                Tune in and level up at your own pace.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col_box">
              <div className="mt-2">
                <Icon fontSize={25} icon="material-symbols:check" />
              </div>
              <div className="Creative_Content">
                Go from dabbler to master in a matter of hours.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col_box">
              <div className="mt-2">
                <Icon fontSize={25} icon="material-symbols:check" />
              </div>
              <div className="Creative_Content">
                Connect with a global community of curious creatives.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
