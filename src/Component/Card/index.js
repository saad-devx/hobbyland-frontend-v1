import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Index(props) {
  const [like, setLike] = useState(props.like);

  const router = useRouter();

  const handleClick = (id) => {
    localStorage.setItem("servicesId", id);
    router.push(`/SingleProduct?id=${id}`);
  };

  return (
    <div className="Card_">
      <img
        onClick={() => handleClick(props.id)}
        className="Image"
        src={props.image}
        alt="Product Image"
      />
      <div className="Heart_ shadow">
        {like === true ? (
          <Icon
            onClick={() => setLike(false)}
            icon="mdi:heart"
            style={{ fontSize: "30px", color: "#002333" }}
          />
        ) : (
          <Icon
            onClick={() => setLike(true)}
            icon="mdi:heart-outline"
            style={{ fontSize: "30px", color: "#002333" }}
          />
        )}
      </div>
      <div onClick={() => handleClick(props.id)} className="Card_Inner">
        <div className="Title">{props.title}</div>
        <div className="fw-bold text-white">Price : {props.price}</div>
        <div className="desc">{props.desc}</div>
        <div className="text-white d-flex gap-3 ">
          <div style={{ fontSize: "15px" }}>Categrios : {props.category}</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
