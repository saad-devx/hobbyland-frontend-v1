import { Inter } from "next/font/google";
import Home from "./Home";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const Router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let isLoggedIn = false;

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name.trim() === "is_logged_in" && value.trim() === "true") {
        isLoggedIn = true;
      }
    });

    if (isLoggedIn) {
      setToken(true);
      Router.push("./StudentHome");
    } else {
      setToken(false);
      Router.push("./StudentHome");
    }
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return null; // Return null if not loading (redirected)
}
