import { Inter } from "next/font/google";
import Home from "./Home";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const Router = useRouter();

  useEffect(() => {
    const payload = localStorage.getItem("Acces__teken");
    if (payload) {
      setToken(true);
      Router.push("/StudentHome");
    } else {
      setToken(false);
      Router.push("/Home");
    }
    // Set loading to false after redirecting
    setLoading(false);
  }, []);

  // Conditional rendering based on loading state
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
