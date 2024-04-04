import { Card } from "@/Component";
import { FetchServices } from "@/config/Axiosconfig/AxiosHandle/service";
import data from "@/constant/product";
import { filter } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index(props) {
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [findData, setFindData] = useState([]);
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
    const filteredData = courseData.filter(
      (e) => e.category === props.categrios
    );
    setFindData(filteredData);
  }, [courseData, props.categrios]);
  console.log(courseData);
  return (
    <div className="Container_Card_Section">
      <div className="my-5">
        <h1 className="Heading">Course Sales</h1>
        <div className="underLine"></div>
        <div className="container">
          <div className="row">
            {props.categrios
              ? findData.map((e, i) => {
                  return (
                    <div className="col-md-4 mt-3 p-2">
                      <div key={i}>
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
                    </div>
                  );
                })
              : courseData.map((e, i) => {
                  return (
                    <div className="col-md-4 mt-3 p-2">
                      <div key={i}>
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
