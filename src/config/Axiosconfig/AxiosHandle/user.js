import axios from "axios";
import { BASEURL } from "..";

export const FetchMe = async () => {
  const responseData = await axios.get(`${BASEURL}user/get/me`, {
    withCredentials: true,
  });
  return responseData;
};

export const FetchMe2 = async (cb) => {
  const responseData = await axios.get(`${BASEURL}user/get/me`, {
    withCredentials: true,
  });
  if (cb) cb(responseData);
  return responseData;
};

export const UpdateUserProfile = (data) => {
  const responseData = axios.put(`${BASEURL}user/update`, data, {
    withCredentials: true,
  });
  return responseData;
};

export const ProfileGetByeId = (data) => {
  const responseData = axios.get(`${BASEURL}user/get/profile?user_id=${data}`, {
    withCredentials: true,
  });
  return responseData;
};

export const FetchMeNotification = (data) => {
  const responseData = axios.get(`${BASEURL}user/get/notifications`, {
    withCredentials: true,
  });
  return responseData;
};
export const UpdateNotificationCategory = (data) => {
  const responseData = axios.put(
    `${BASEURL}user/get/notifications/update-status?category=${data}`,
    {},
    { withCredentials: true }
  );
  console.log(data);
  return responseData;
};
