import { Card } from "@/Component";
import data from "@/constant/product";
import { useRouter } from "next/router";
import React from "react";

function Index(props) {
  const router = useRouter();

  return (
    <div className="Container_Card_Section">
      <div className="my-5">
        <h1 className="Heading">Course Sales</h1>
        <div className="underLine"></div>
        <div className="container">
          <div className="row">
            {props.categrios
              ? data.map((e, i) => {
                  return (
                    <div className="col-md-4 mt-3 p-2">
                      <div key={i}>
                        <Card
                          title={e.title}
                          price={e.price}
                          desc={e.desc}
                          location={e.location}
                          videoSource={e.videoSource}
                          image={e.image}
                          id={e.id}
                          like={props.islike}
                        />
                      </div>
                    </div>
                  );
                })
              : data.map((e, i) => {
                  return (
                    <div className="col-md-4 mt-3 p-2">
                      <div key={i}>
                        <Card
                          title={e.title}
                          price={e.price}
                          desc={e.desc}
                          location={e.location}
                          videoSource={e.videoSource}
                          image={e.image}
                          id={e.id}
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
