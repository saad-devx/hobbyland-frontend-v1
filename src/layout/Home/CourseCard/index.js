import React from "react";
function Index() {
  const courseCategriosCard = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrRP8JreEX62fA6rZI-j2yNx20hiRaFVw0kA&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rqlUUsglmiFwk3S7HDZilYpmkGv93NETEw&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrRP8JreEX62fA6rZI-j2yNx20hiRaFVw0kA&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rqlUUsglmiFwk3S7HDZilYpmkGv93NETEw&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
  ];
  return (
    <div>
      <div className="Container_Course_card">
        <div className="HoobbyLand_Title">What to learn next</div>
        <div className="Card_Cotainer">
          <div className="container">
            <div className="row">
              {courseCategriosCard.map((e, i) => {
                return (
                  <div className="col-md-3 mt-3">
                    <div className="Categrios_Card">
                      <img className="Image_Categrios_card" src={e.image} />
                      <div className="p-2">
                        <div className="Course_Student">
                          <div className="Quantity_Student">
                            84,618 students
                          </div>
                          <div className="Quantity_Student">1h 13m</div>
                        </div>
                        <div className="Card_dsc">
                          YouTube Success: Script, Shoot & Edit with MKBHD
                        </div>
                        <div className="Card_location">Marques Brownlee</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className="p-3 text-white"
                style={{ textAlign: "end", cursor: "pointer" }}
              >
                See More ..
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
