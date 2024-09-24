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
      console.log(cookies, "cokiies");
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
          console.log(response.data.user);
          setMeData({ ...response.data.user });
          console.log(medata, "Medata");
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
        setFindData([...response.data.services]);
        console.log(findData, "all ervice");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const FetchMeService = async () => {
    try {
      const response = await FetchServices();
      if (response) {
        console.log(response.data.services, "g");
        console.log(response.data.services, "my service");
        setCourseData([...response.data.services]);
      }
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    FetchMeService();
    FetchMedata();
    GetService();
  }, []);
  const MAX_ITEMS = 6;
  console.log(courseData, "coursedata");
  console.log(courseData, "coursedata");
  const datamap =
    courseData.length >= 1 ? courseData : findData.slice(0, MAX_ITEMS);
  console.log(datamap, "couseCard");
  return (
    <div className="Container_Card_Section">
      <div className="my-5">
        <h1 className="Heading">
          {courseData.length > 1 ? "My Course" : "Popular Course"}
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
