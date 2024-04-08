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

export const FetchServices = () => {
  const responseData = axios.get(`${BASEURL}user/mentor/service/get/many`, {
    withCredentials: true,
  });
  return responseData;
};

export const GetSingleProduct = (id) => {
  const responseData = axios.get(
    `${BASEURL}user/mentor/service/get/one?service_id=${id}`,
    {
      withCredentials: true,
    }
  );
  console.log(id, "id_");
  return responseData;
};

export const FindService = (find) => {
  const responseData = axios.get(
    `${BASEURL}user/mentor/service/search?query=${find}`,
    {
      withCredentials: true,
    }
  );
  console.log(find, "find");
  return responseData;
};
