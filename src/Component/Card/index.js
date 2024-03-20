import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Index(props) {
  const [like, setLike] = useState(props.like);
  const router = useRouter();
  return (
    <div className="Card_">
      <img
        onClick={() => {
          router.push("SingleProduct");
        }}
        className="Image"
        src={props.image}
      />
      <div className="Heart_ shadow">
        {like === true ? (
          <Icon
            onClick={() => {
              setLike(false);
            }}
            icon="mdi:heart"
            style={{ fontSize: "30px", color: "#002333" }}
          />
        ) : (
          <Icon
            onClick={() => {
              setLike(true);
            }}
            icon="mdi:heart-outline"
            style={{ fontSize: "30px", color: "#002333" }}
          />
        )}
      </div>
      <div
        onClick={() => {
          router.push("SingleProduct");
        }}
        className="Card_Inner"
      >
        <div className="Title">{props.title}</div>
        <div className="fw-bold text-white">Price : {props.price}</div>

        <div className="desc">{props.desc}</div>
        <div className="text-white d-flex gap-3 ">
          <div>
            <Icon
              icon="mdi:location"
              style={{ fontSize: "18px", color: "white" }}
            />
          </div>
          <div style={{ fontSize: "15px" }}>{props.location}</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
