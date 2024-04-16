import axios from "axios";
import { BASEURL } from "..";

export const FetchMe = () => {
  const responseData = axios.get(`${BASEURL}user/get/me`, {
    withCredentials: true,
  });
  return responseData;
};

export const UpdateUserProfile = (data) => {
  const responseData = axios.put(`${BASEURL}user/update`, data, {
    withCredentials: true,
  });
  return responseData;
};
