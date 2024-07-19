import { Footer, Header } from "@/Component";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import React, { useEffect, useState } from "react";
import { Card } from "@/Component";

function Index() {
  const [data, setData] = useState([]);
  const FetchData = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setData([...favorites]);
    console.log(data);
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div>
      <Header />
      <Student_Header />

      <div className="container mb-3">
        <h2 className="fw-bold text-center">Favorites Course</h2>
        <div className="my-3 Line_bottom"></div>
        <div className="row">
          {data.map((e, i) => {
            return (
              <div className="col-md-4 mt-3 p-2" key={i}>
                <Card
                  title={e?.title}
                  AllObject={e}
                  price={`$ ${e?.pricing[0].price}`}
                  desc={e?.description}
                  category={e?.category}
                  image={e?.portfolio.map((e) => {
                    return e?.media_url;
                  })}
                  id={e?._id}
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
