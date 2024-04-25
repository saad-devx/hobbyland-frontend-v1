import { GetSingleProduct } from "@/config/Axiosconfig/AxiosHandle/service";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Index(props) {
  const [like, setLike] = useState(() => {
    const storedServices = localStorage.getItem("faveroutedata");
    if (storedServices) {
      const parsedServices = JSON.parse(storedServices);

      const existingService = parsedServices.find(
        (service) => service.id === props.id
      );
      if (existingService) {
        return true;
      }
    }
    return false;
  });

  console.log(like, "like_");
  const router = useRouter();
  const handleClick = (id) => {
    localStorage.setItem("servicesId", id);
    router.push(`/SingleProduct?id=${id}`);
  };
  const FaverouteAdd = async (id) => {
    try {
      console.log(id);
      const storedServices = localStorage.getItem("faveroutedata");
      let parsedServices = storedServices ? JSON.parse(storedServices) : [];
      const existingServiceIndex = parsedServices.findIndex(
        (service) => service._id === id
      );
      if (existingServiceIndex !== -1) {
        parsedServices.splice(existingServiceIndex, 1);
        localStorage.setItem("faveroutedata", JSON.stringify(parsedServices));
        setLike(false);
      }
      const response = await GetSingleProduct(id);
      if (response && response.data) {
        const serviceData = response.data;
        parsedServices.push(serviceData);
        localStorage.setItem("faveroutedata", JSON.stringify(parsedServices));
        setLike(true);
        console.log(parsedServices, "services");
      }
    } catch (e) {
      console.log(e);
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
      <div
        className="Heart_ shadow"
        onClick={() => {
          FaverouteAdd(props.id);
        }}
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
