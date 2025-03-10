import axios from "axios";
import { BASEURL } from "..";

export const CreateAcount = (data) => {
  console.log(data, "acountCreateing");
  const responseData = axios.post(`${BASEURL}auth/signup`, data, {
    withCredentials: true,
  });
  return responseData;
};

export const SignupCallback = (data) => {
  const responseData = axios.post(`${BASEURL}auth/signup/callback`, data, {
    withCredentials: true,
  });
  return responseData;
};

export const Login = (data) => {
  const responseData = axios.post(`${BASEURL}auth/login`, data, {
    withCredentials: true,
  });
  return responseData;
};
export const forgetpassword = (data) => {
  const responseData = axios.post(`${BASEURL}auth/forgot-password`, data, {
    withCredentials: true,
  });
  return responseData;
};

export const changepasswordotp = (data) => {
  const responseData = axios.post(`${BASEURL}auth/change-password`, data, {
    withCredentials: true,
  });
  return responseData;
};

export const UserLogout = async () => {
  const responseData = await axios.patch(
    `${BASEURL}auth/logout`,
    {},
    { withCredentials: true }
  );
  return responseData;
};
