import axios from "axios";
import { BASEURL } from "..";

export const ScanQrcode = async () => {
  const responseData = await axios.get(`${BASEURL}2fa/get-qrcode`);
  return responseData;
};
