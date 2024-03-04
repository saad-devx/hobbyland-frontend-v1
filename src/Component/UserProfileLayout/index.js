import React from "react";
import { useRouter } from "next/router";
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

  return (
    <div className="User_profile_Container">
      <div className="SideBare">
        <div className="User_Profile_Circle">
          S
          <input className="InputNone" type="file" />
        </div>
        <div className="Heading">Shahbaz ALi</div>
        <div className="desc">
          Hey ' I am Shahbaz ali and i am full Stack developer
        </div>
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
    </div>
  );
}

export default Index;
