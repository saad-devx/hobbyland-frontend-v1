const { default: axios } = require("axios");
const { BASECHATURL, BASEURL } = require("..");

export const CreateRoom = (user_id) => {
  const responseData = axios.post(
    `${BASECHATURL}/room/create?user_id=${user_id}`,
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
