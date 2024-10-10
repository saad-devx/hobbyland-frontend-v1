import { Card, Footer, Header } from "@/Component";
import {
  FindService,
  GetSingleProduct,
} from "@/config/Axiosconfig/AxiosHandle/service";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Student_Header } from "@/layout/Student_portal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();

  const [pdata, setPdata] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const { title, type, _id, data } = router.query;
  useEffect(() => {
    const FindServices = async () => {
      try {
        const response = await GetSingleProduct(_id);
        if (response) {
          setSingleProduct(response.data.services);
        }
      } catch (e) {}
    };
    if (type == "Single") {
      FindServices();
    }
  });
  return (
    <div>
      <Header />
      <Student_Header />
      <h1 className="Heading text-center">Find Course</h1>
      <div className="underLine mb-3"></div>
      <div className="container">
        <div className="row">
          {type === "Multiple" ? (
            data ? (
              JSON.parse(data).map((e, i) => {
                return (
                  <div className="col-md-4 mt-3 p-2" key={i}>
                    <Card
                      title={e.title}
                      price={`$ ${e.pricing[0].price}`}
                      desc={e.description}
                      category={e.category}
                      AllObject={e}
                      image={e.portfolio.map((e) => e.media_url)}
                      id={e._id}
                    />
                  </div>
                );
              })
            ) : null
          ) : singleProduct ? (
            <div className="col-md-4 mt-3 p-2">
              <Card
                title={singleProduct?.title}
                price={`$ ${singleProduct?.pricing[0]?.price}`}
                desc={singleProduct?.description}
                category={singleProduct?.category}
                AllObject={singleProduct || {}}
                image={singleProduct?.portfolio.map((e) => e.media_url)}
                id={singleProduct?._id}
              />
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
