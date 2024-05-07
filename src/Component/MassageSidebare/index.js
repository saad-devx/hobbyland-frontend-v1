import { FectchRooms } from "@/config/Axiosconfig/AxiosHandle/chat";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [data, setData] = useState([]);
  const [openSideBare, setOpenSideBare] = useState(true);
  const [open, setOpen] = useState(true);
  const [medata, setMedata] = useState({});

  useEffect(() => {
    const FetchmeData = async () => {
      try {
        const cookies = document.cookie.split(";");
        let isLoggedIn = false;
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=");
          if (name.trim() === "is_logged_in" && value.trim() === "true") {
            isLoggedIn = true;
          }
        });
        if (isLoggedIn) {
          const response = await FetchMe();
          if (response) {
            setMedata({ ...response?.data?.user });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    FetchmeData();
  }, []);

  useEffect(() => {
    const GetRooms = async () => {
      try {
        const response = await FectchRooms();
        if (response) {
          setData([...response.data.rooms]);
        }
      } catch (e) {
        console.log(e, "err");
      }
    };

    GetRooms();
  }, []);

  const router = useRouter();
  const handleClick = (id) => {
    router.push({
      pathname: "/massage",
      query: { id: id },
    });
  };

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
              {data.map((room, i) => {
                const otherMember = room.members?.find(
                  (member) => member._id !== medata._id
                );

                if (otherMember) {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        handleClick(room.last_message.room_id);
                      }}
                      className="chips_"
                    >
                      <div className="circleProfile">
                        {otherMember.firstname.charAt(0)}
                      </div>
                      <div>
                        <div className="title_">{otherMember.firstname}</div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
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
