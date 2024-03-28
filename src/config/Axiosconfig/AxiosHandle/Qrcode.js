import axios from "axios";
import { BASEURL } from "..";

export const FetchQrcode = () => {
  const responseData = axios.get(`${BASEURL}2fa/get-qrcode`);
  return responseData;
};
