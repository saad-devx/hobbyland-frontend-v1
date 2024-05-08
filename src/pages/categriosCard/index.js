import { Card, Footer, Header } from "@/Component";
import { FindService } from "@/config/Axiosconfig/AxiosHandle/service";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const [allService, setAllService] = useState([]);
  const [findData, setFindData] = useState([]);
  const { title } = router.query;

  useEffect(() => {
    const FetchCategriosServce = async () => {
      try {
        const response = await FindService(title);
        if (response) {
          console.log(response.data.services);
          setAllService(response.data.services);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (title) {
      FetchCategriosServce();
    }
  }, [title]);

  useEffect(() => {
    if (allService.length > 0) {
      const filteredData = allService.filter((e) => e.category === title);
      setFindData(filteredData);
      console.log(findData, "data");
    }
  }, [allService, title]);

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
          {findData.map((e, i) => {
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
