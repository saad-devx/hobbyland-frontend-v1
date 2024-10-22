import { Footer, Header } from "@/Component";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import React, { use, useContext, useEffect, useState } from "react";
import { Card } from "@/Component";
import { FindService } from "@/config/Axiosconfig/AxiosHandle/service";
import { UserContext } from "@/config/contextapi/user";

function Index() {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);

  const FetchFaverouteService = async () => {
    try {
      const response = await FindService("&");
      if (response) {
        console.log(response, "reponse");
        const filterService = response.data.services;
        const filteredServices = filterService
          .map((service) => {
            if (
              service.IsFavoriteUserId &&
              Array.isArray(service.IsFavoriteUserId)
            ) {
              if (service.IsFavoriteUserId.includes(user?._id)) {
                return service;
              }
            }
            return null; // Return null if 'me' is not found
          })
          .filter((data) => data !== null);
        console.log(filteredServices, "filterSerive");
        setData(filteredServices);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchFaverouteService();
  }, [user]);
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
                  title={e.title}
                  AllObject={e}
                  price={`$ ${e.pricing[0].price}`}
                  desc={e.description}
                  category={e.category}
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
