import { Card } from "@/Component";
import {
  FetchServices,
  FindService,
} from "@/config/Axiosconfig/AxiosHandle/service";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import data from "@/constant/product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index(props) {
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [findData, setFindData] = useState([]);
  const [medata, setMeData] = useState({});
  const [token, setToken] = useState(false);
  const FetchMedata = async () => {
    try {
      const cookies = document.cookie.split(";");

      let isLoggedIn = false;
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name.trim() === "is_logged_in" && value.trim() === "true") {
          isLoggedIn = true;
        }
      });
      if (isLoggedIn) {
        const response = await FetchMe();
        if (response) {
          setToken(true);
        }
      }
    } catch (e) {}
    setToken(false);
  };
  const GetService = async () => {
    try {
      const response = await FindService("&");
      if (response) {
        const filterStatius = response.data.services?.filter(
          (e) => e.status == "Approved"
        );
        setFindData(filterStatius);
      }
    } catch (e) {}
  };
  const FetchMeService = async () => {
    try {
      const response = await FetchServices();
      if (response) {
        const filterStatius = response.data.services?.filter(
          (e) => e.status == "Approved"
        );
        setCourseData(filterStatius);
      }
    } catch (er) {}
  };
  useEffect(() => {
    FetchMeService();
    FetchMedata();
    GetService();
  }, []);
  const MAX_ITEMS = 6;

  const datamap =
    courseData.length >= 1 ? courseData : findData.slice(0, MAX_ITEMS);

  return (
    <div className="Container_Card_Section">
      <div className="my-5">
        <h1 className="Heading">
          {courseData.length > 0 ? "My Course" : "Popular Course"}
        </h1>
        <div className="underLine"></div>
        <div className="container">
          <div className="row">
            {datamap.map((e, i) => {
              return (
                <div className="col-md-4 mt-3 p-2" key={i}>
                  <Card
                    title={e.title}
                    price={`$ ${e.pricing[0].price}`}
                    desc={e.description}
                    type={e.courseType}
                    category={e.category}
                    AllObject={e}
                    image={e.portfolio.map((e) => {
                      return e.media_url;
                    })}
                    id={e._id}
                    like={props.islike}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
