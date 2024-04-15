import { BASEURL } from "..";
import axios from "axios";

export const MentorDocumentation = (data) => {
  const responseData = axios.post(`${BASEURL}user/mentor/submit-docs`, data, {
    withCredentials: true,
  });
  return responseData;
};
