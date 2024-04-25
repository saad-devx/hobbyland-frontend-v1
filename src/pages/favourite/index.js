import { Footer, Header } from "@/Component";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import React, { useEffect, useState } from "react";
import { Card } from "@/Component";

function Index() {
  const [data, setData] = useState();
  const FetchData = () => {
    const dataresponse = localStorage.getItem("Faveroute");
    if (dataresponse) {
      const faq = JSON.parse(dataresponse);
      setData(faq);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div>
      <Header />
      <Student_Header />
      {data.map((e) => {
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
      <Footer />
    </div>
  );
}
export default Index;
