import { GetSingleProduct } from "@/config/Axiosconfig/AxiosHandle/service";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Index(props) {
  const [like, setLike] = useState(false);
  const [isFaveroute, setIsFaveroute] = useState([]);
  const router = useRouter();
  const handleClick = (id) => {
    localStorage.setItem("servicesId", id);
    router.push(`/SingleProduct?id=${id}`);
  };
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(favorites, "faveroutedata");
    const index = favorites.findIndex((item) => item._id === props.id);
    if (index !== -1) {
      setLike(true);
    } else {
      setLike(false); // Set like to false if props.id is not found in favorites
    }
  }, [isFaveroute]);
  const toggleLike = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(
      (item) => item._id === props.AllObject._id
    );
    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(props.AllObject);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    const data = JSON.parse(localStorage.getItem("favorites"));
    setIsFaveroute([...data]);
  };

  return (
    <div className="Card_">
      <img
        onClick={() => handleClick(props.id)}
        className="Image"
        src={props.image}
        alt="Product Image"
      />
      <div className="Heart_ shadow" onClick={toggleLike}>
        {like === true ? (
          <Icon
            icon="mdi:heart"
            style={{ fontSize: "30px", color: "#002333" }}
          />
        ) : (
          <Icon
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
        <div className="text-white d-flex gap-3 ">
          <div style={{ fontSize: "15px" }}>Type : {props.type}</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
