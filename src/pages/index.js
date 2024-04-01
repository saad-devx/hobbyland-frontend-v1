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
  const fecthMeData = async () => {
    try {
      const response = await FetchMe();
      if (response) {
        console.log(userdata);
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem("is_logged_in", false);
      setToken(false);
      Router.push("/Home");
    }
  };
  useEffect(() => {
    fecthMeData();
    const payload = localStorage.getItem("is_logged_in");
    if (payload) {
      setToken(true);
      Router.push("/StudentHome");
    } else {
      setToken(false);
      Router.push("/Home");
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
