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
  return responseData;
};
export const DeleteService = (id) => {
  const responseData = axios.delete(
    `${BASEURL}user/mentor/service/delete?service_id=${id}`,
    {
      withCredentials: true,
    }
  );
  return responseData;
};

export const UpdateService = (id, body) => {
  const responseData = axios.put(
    `${BASEURL}user/mentor/service/update?service_id=${id}`,
    body,
    {
      withCredentials: true,
    }
  );
  return responseData;
};

export const FindService = (find) => {
  const responseData = axios.get(
    `${BASEURL}user/mentor/service/search?query=${find}`,
    {
      withCredentials: true,
    }
  );
  return responseData;
};
