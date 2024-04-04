import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import {
  FetchMe,
  UpdateUserProfile,
} from "@/config/Axiosconfig/AxiosHandle/user";
function Index() {
  const router = useRouter();
  const navigateLink = [
    {
      title: "User Profile",
      path: "./profile",
    },
    {
      title: "Setting",
      path: "./setting",
    },
    {
      title: "Change password",
      path: "./ForgetPassword",
    },
  ];
  const [sidebare, setSidebare] = useState(true);
  const [sidebarePosition, setSidebarePosition] = useState(true);
  const [showSidebare, setShowSidebare] = useState(true);
  const [menue, setMenue] = useState(false);
  const [fecthmeData, setFecthmeData] = useState({});
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchMe();
        if (response) {
          setFecthmeData({ ...response.data.user });
          const profileImageUrl = response.data.user.profile_image || "";

          localStorage.setItem("profileimage", profileImageUrl); // Store image URL in local storage
        }
      } catch (error) {
        router.push("/login");
      }
    };

    fetchData();

    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setSidebare(true);
        setSidebarePosition(true);
        setShowSidebare(false);
        setMenue(true);
      } else {
        setSidebare(false);
        setShowSidebare(true);
        setMenue(false);
        setSidebarePosition(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Retrieve image URL from local storage when the component mounts
    const storedImageUrl = localStorage.getItem("profileimage");
    if (storedImageUrl) {
      setProfileImage(storedImageUrl);
    }
  }, []);

  const handleProfileImageClick = () => {
    document.getElementById("profile-image-input").click();
  };

  const handleProfileImageChange = async (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);

    const updatedData = {
      ...fecthmeData,
      profile_image: imageUrl,
    };

    try {
      const response = await UpdateUserProfile(updatedData);
      if (response) {
        setProfileImage(response.data.user.profile_image);
        localStorage.setItem("profileimage", response.data.user.profile_image); // Update stored image URL in local storage
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(profileImage);
  return (
    <div className="User_profile_Container">
      {!sidebare ? (
        <div className="SideBare">
          {menue ? (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                onClick={() => {
                  sidebare ? setSidebare(false) : setSidebare(true);
                }}
                className="Icon"
                icon="uiw:left"
                fontSize={25}
                color="#002333"
              />
            </div>
          ) : null}
          <div
            className="User_Profile_Circle"
            onClick={handleProfileImageClick}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "100%",
                objectFit: "contain",
              }}
              src={profileImage}
              alt="../"
            />
            {/* {fecthmeData.profile_image ? (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "100%",
                  objectFit: "contain",
                }}
                src={local}
                alt="Profile"
              />
            ) : (
              <p>{fecthmeData.firstname}</p>
            )} */}
          </div>
          <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
          />
          <div className="Heading">{fecthmeData.firstname}</div>

          <div className="my-3">
            <div className="p-2">
              {navigateLink.map((e, i) => {
                return (
                  <button
                    onClick={() => {
                      router.push(e.path);
                    }}
                    className="Button"
                  >
                    {e.title}
                  </button>
                );
              })}

              <div className="my-5">
                <button
                  onClick={() => {
                    router.push("./login");
                  }}
                  className="Button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : menue ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: "13px",
              left: "08px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#002333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              onClick={() => {
                sidebare ? setSidebare(false) : setSidebare(true);
              }}
              className="Icon"
              icon="uiw:right"
              fontSize={25}
              color="white"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;
