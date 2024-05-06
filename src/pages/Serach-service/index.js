import { Card, Footer, Header } from "@/Component";
import { FindService } from "@/config/Axiosconfig/AxiosHandle/service";
import { Student_Header } from "@/layout/Student_portal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const [data, setData] = useState();
  const { title } = router.query;
  console.log(title);
  const FetchFindService = async () => {
    try {
      const response = await FindService(title);
      if (response) {
        setData([...response.data.services]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchFindService();
  });
  return (
    <div>
      <Header />
      <Student_Header />
      <h1 className="Heading text-center">Find Course</h1>
      <div className="underLine mb-3"></div>
      <div className="container">
        <div className="row">
          {data?.map((e, i) => {
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
