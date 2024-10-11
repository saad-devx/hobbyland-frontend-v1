import React, { createContext, useState, useEffect } from "react";
import { FetchMe } from "../Axiosconfig/AxiosHandle/user";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const saveUser = (userData) => {
    setUser(userData);
  };
  const fetchUserData = async () => {
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
          console.log(response, "render");
          setUser({ ...response.data?.user });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ user, saveUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
