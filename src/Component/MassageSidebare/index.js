import { FectchRooms } from "@/config/Axiosconfig/AxiosHandle/chat";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [data, setData] = useState([]);
  const GetRooms = async () => {
    try {
      const response = await FectchRooms();
      if (response) {
        setData([...response.data.rooms]);
        console.log(data, "data");
      }
    } catch (e) {
      console.log(e, "err");
    }
  };
  useEffect(() => {
    GetRooms();
  }, []);
  const router = useRouter();
  const handleClick = (id) => {
    localStorage.setItem("RoomId", id);
    router.push({
      pathname: "/massage",
      query: { id: id },
    });
  };

  return (
    <div className="massage_sideBare">
      <div>
        <div className="title_hobblyland">
          Hobbly <br />
          Land
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input className="Input mt-3" placeholder="search Here .." />

          <button className="btn_Green mt-3">Search</button>
        </div>
        <div className="mt-3">
          {data.map((e, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  handleClick(e.last_message.room_id);
                }}
                className="chips_"
              >
                <div className="circleProfile">
                  {e.members[1].firstname.charAt(0)}
                </div>
                <div>
                  <div className="title_">{e.members[1].firstname}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
