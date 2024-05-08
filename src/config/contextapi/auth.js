// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let loggedIn = false;

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name.trim() === "is_logged_in" && value.trim() === "true") {
        loggedIn = true;
      }
    });

    setIsLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
