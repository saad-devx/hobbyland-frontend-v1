import { Card, Footer, Header } from "@/Component";
import { FindService } from "@/config/Axiosconfig/AxiosHandle/service";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const [allService, setAllService] = useState([]);
  const [findData, setFindData] = useState([]);
  const { title } = router.query;
  const [token, setToken] = useState(false);
  const [medata, setMeData] = useState({});
  const cookies = document.cookie.split(";");

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
          setMeData(response.data.user);
        }
      } else {
        setToken(false);
      }
    } catch (e) {}
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  useEffect(() => {
    FetchMedata();
  }, []);
  const GetService = async () => {
    try {
      const response = await FindService(title);
      const userData = medata;
      if (response) {
        const filterStatius = response.data.services?.filter(
          (e) => e.status === "Approved"
        );

        const userLatitude = userData.latitude;
        const userLongitude = userData.longitude;

        const mergedArray = filterStatius?.filter(
          (r) => r.courseType === "Online"
        );

        const filterStatusThird = filterStatius?.filter((r) => {
          if (r.courseType === "Hybird" || r.courseType === "Physical") {
            const courseLatitude = r.latitude;
            const courseLongitude = r.longitude;
            const targetedAreaString = r.targetedArea;
            const targetedArea = parseFloat(
              targetedAreaString.replace("km", "").trim()
            );
            const distance = getDistanceFromLatLonInKm(
              userLatitude,
              userLongitude,
              courseLatitude,
              courseLongitude
            );
            return distance <= targetedArea;
          }
          return false;
        });

        const finalArray = [...mergedArray, ...filterStatusThird];

        if (userData?.email) {
          setAllService(finalArray);
        } else {
          setAllService(filterStatius);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetService();
  }, [medata, title]);
  return (
    <div>
      <Header />
      <Student_Header />

      <div className="container">
        <div className="row">
          <div className="my-5">
            <h1 className="Heading text-center fw-bold">{title} Categories</h1>
            <div className="underLine"></div>
          </div>
          {allService?.map((e, i) => {
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
                  type={e.courseType}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
