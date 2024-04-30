import { message } from "antd";

const { default: axios } = require("axios");
const { BASECHATURL, BASEURL } = require("..");

export const CreateRoom = (user_id) => {
  const responseData = axios.post(
    `${BASECHATURL}/api/room/create?user_id=${user_id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return responseData;
};
export const AuthToken = () => {
  const responseData = axios.get(`${BASEURL}socket/auth`, {
    withCredentials: true,
  });
  return responseData;
};

export const FectchRooms = () => {
  const responseData = axios.get(`${BASECHATURL}/api/room/get-many`, {
    withCredentials: true,
  });
  return responseData;
};

export const GetMassage = (id) => {
  const responseData = axios.get(
    `${BASECHATURL}/api/message/get-many?room_id=${id}&page=1&limit=25`,
    {
      withCredentials: true,
    }
  );
  return responseData;
};

export const MessageSend = (id, message) => {
  const responseData = axios.post(
    `${BASECHATURL}/api/message/send`,
    {
      room_id: id,
      message: message,
    },
    {
      withCredentials: true,
    }
  );
  return responseData;
};
