import React from "react";

function Index() {
  return (
    <div className="mt-5 Course_Team_Container">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="Heading">Skillshare for Teams</div>
            <div className="Content">
              Set your team up for success with reimagined learning to empower
              their personal and professional growth.
              <br />
              <br />
              With inspiring classes on soft skills, business essentials,
              well‑being and more, your whole team will have deep knowledge and
              expertise at their fingertips.
            </div>
            <div className="mt-3">
              <button className="btn_Green">Learn More.</button>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <img src="https://static-web-prod.skillshare.com/_next/static/images/skillshare_for_teams-c4a85c8c5a4eef0fee7c493669965f5b.webp" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
