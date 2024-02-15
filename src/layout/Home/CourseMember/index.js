import React from "react";

function CourseMember() {
  const RatingCard = [{}, {}, {}, {}];
  return (
    <div className="Course_Member_Container">
      <div className="container margin_top">
        <div className="row">
          {RatingCard.map((e, i) => {
            return (
              <div className="col-md-3 mt-3">
                <div className="RatingCard">
                  <div>
                    <div className="Rating_cardHeading">25K+</div>
                    <div className="Rating_p">CLASSES</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseMember;
