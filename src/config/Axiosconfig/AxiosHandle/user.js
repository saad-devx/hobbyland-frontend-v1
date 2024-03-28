import axios from "axios";
import { BASEURL } from "..";

export const FetchMe = () => {
  const responseData = axios.get(`${BASEURL}user/get/me`, {
    withCredentials: true,
  });
  return responseData;
};
