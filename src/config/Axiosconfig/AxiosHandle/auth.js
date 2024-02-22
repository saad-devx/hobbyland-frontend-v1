import axios from "axios";
import { BASEURL } from "..";

export const signup = (data) => {
  const responseData = axios.post(`${BASEURL}auth/signup`, data);
  return responseData;
};

export const signupCallback = (data) => {
  const responseData = axios.post(`${BASEURL}auth/signup/callback`, data);
  return responseData;
};
