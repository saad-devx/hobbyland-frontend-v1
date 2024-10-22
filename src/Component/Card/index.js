import {
  GetSingleProduct,
  UpdateService,
} from "@/config/Axiosconfig/AxiosHandle/service";
import { UserContext } from "@/config/contextapi/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

function Index(props) {
  const { user } = useContext(UserContext);

  const [like, setLike] = useState(false);
  const router = useRouter();
  const handleClick = (id) => {
    localStorage.setItem("servicesId", id);
    router.push(`/SingleProduct?id=${id}`);
  };
  useEffect(() => {
    const renderData = props.AllObject?.IsFavoriteUserId?.includes(user?._id);
    if (renderData) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [props]);
  const handleLike = async () => {
    try {
      if (!props.AllObject?.IsFavoriteUserId.includes(user?._id)) {
        props.AllObject?.IsFavoriteUserId.push(user?._id);
      }
      const response = await UpdateService(
        props?.AllObject?._id,
        props?.AllObject
      );
      if (response) {
        console.log(response);
        setLike(true);
      }
    } catch (e) {
      console.error(e);
      setLike(false);
    }
  };

  const handleUnLike = async () => {
    try {
      props.AllObject?.IsFavoriteUserId?.filter((id) => id !== user?._id);
      const response = await UpdateService(
        props?.AllObject?._id,
        props?.AllObject
      );
      if (response) {
        console.log(response);
        setLike(false);
      }
    } catch (e) {
      console.error(e);
      setLike(true);
    }
  };

  return (
    <div className="Card_">
      <img
        onClick={() => handleClick(props.id)}
        className="Image"
        src={props.image}
        alt="Product Image"
      />
      {user?.email && (
        <div
          className="Heart_ shadow"
          onClick={like ? handleUnLike : handleLike}
        >
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
      )}

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
