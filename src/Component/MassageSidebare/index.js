import { FectchRooms } from "@/config/Axiosconfig/AxiosHandle/chat";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [data, setData] = useState([]);
  const [openSideBare, setOpenSideBare] = useState(true);
  const [open, setOpen] = useState(true);
  const GetRooms = async () => {
    try {
      const response = await FectchRooms();
      if (response) {
        setData([...response.data.rooms]);
        console.log(data, "data");
        console.log(data, "room");
      }
    } catch (e) {
      console.log(e, "err");
    }
  };
  useEffect(() => {
    GetRooms();
  }, []);
  const handleCLick = () => {
    setOpenSideBare((prev) => !prev);
  };
  const router = useRouter();
  const handleClick = (id) => {
    router.push({
      pathname: "/massage",
      query: { id: id },
    });
  };
  console.log(data, "roomgets");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setOpenSideBare(false);
        setOpen(false);
      } else {
        setOpen(true);
        setOpenSideBare(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* <div className="circleMenue__">
        <Icon icon="mingcute:arrow-left-fill" color="black" fontSize={"35px"} />
      </div> */}
      {open === true ? (
        <div
          className={`${
            openSideBare ? "massage_sideBare" : "massage_sideBare_relative"
          }`}
        >
          <div
            onClick={() => {
              setOpen(false);
            }}
            className="circle_menue"
          >
            <Icon
              icon="mingcute:arrow-right-fill"
              color="black"
              fontSize="34px"
            />
          </div>
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
                      {/* {e.members[1].firstname.charAt(0)} */}
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
      ) : (
        <div
          onClick={() => {
            setOpen(true);
            setOpenSideBare(false);
          }}
          className="circle_menue_open"
        >
          <Icon icon="mdi:arrow-left" color="white" fontSize="34px" />
        </div>
      )}
    </>
  );
}

export default Index;
