import axios from "axios";
import { BASEURL } from "..";

export const FetchQrcode = () => {
  const responseData = axios.get(`${BASEURL}2fa/get-qrcode`, {
    withCredentials: true,
  });
  return responseData;
};
export const Register2Fa = (data) => {
  const responseData = axios.post(`${BASEURL}2fa/register`, data, {
    withCredentials: true,
  });
  return responseData;
};
export const ToggleUser2Fa = (data) => {
  const responseData = axios.put(`${BASEURL}2fa/toggle`, data, {
    withCredentials: true,
  });
  return responseData;
};
