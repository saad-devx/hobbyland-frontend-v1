import axios from "axios";
import { BASEURL } from "..";

export const ServiesCreate = (data) => {
  const responseData = axios.post(
    `${BASEURL}user/mentor/service/create`,
    data,
    {
      withCredentials: true,
    }
  );
  return responseData;
};
