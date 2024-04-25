import { Card } from "@/Component";
import {
  FetchServices,
  FindService,
} from "@/config/Axiosconfig/AxiosHandle/service";
import data from "@/constant/product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index(props) {
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [findData, setFindData] = useState([]);
  const [findservices, setFindservices] = useState("");
  const [searchData, setSearchData] = useState([]);
  const FetchAllServices = async () => {
    try {
      const response = await FetchServices();
      if (response) {
        setCourseData([...response.data.services]);
        console.log(courseData, "data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchAllServices();
  }, []);

  useEffect(() => {
    const filteredData = courseData
      ? courseData
      : searchData.filter((e) => e.category === props.categrios);
    setFindData(filteredData);
  }, [courseData ? courseData : searchData, props.categrios]);
  console.log(courseData);
  const findServices = async () => {
    try {
      const response = await FindService(findservices);
      if (response) {
        console.log(response.data.services);
        setSearchData([...response.data.services]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const courseFindSales = async () => {
    try {
      const response = await FindService(findservices);
      if (response) {
        console.log(response.data.services, "findservices");
        console.log(props.categrios, "props.categrios");

        const filterdata = response.data.services.filter((e) => {
          return e.category === props.categrios;
        });
        console.log(filterdata, "filterdata");
        setFindData(filterdata);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    courseFindSales();
  }, [props.categrios]);
  console.log(findData, "finddata", props.categrios);
  return (
    <div className="Container_Card_Section">
      <div className="my-5">
        <h1 className="Heading">Course Sales</h1>
        <div className="underLine"></div>
        <div className="container my-5">
          <div className="row">
            {props.categrios ? (
              <div></div>
            ) : (
              <div className="col-md-6 d-flex gap-3">
                <input
                  onChange={(e) => {
                    setFindservices(e.target.value);
                  }}
                  className="Input"
                  placeholder="Search here title ..."
                />
                <button onClick={findServices} className="btn_Green">
                  Search
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <div className="row">
            {(props.categrios
              ? findData
              : searchData.length > 0
              ? searchData
              : props.categrios
              ? findData
              : courseData
            ).map((e, i) => {
              return (
                <div className="col-md-4 mt-3 p-2" key={i}>
                  <Card
                    title={e.title}
                    price={`$ ${e.pricing[0].price}`}
                    desc={e.description}
                    category={e.category}
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
