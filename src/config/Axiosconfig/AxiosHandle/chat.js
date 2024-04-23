const { default: axios } = require("axios");
const { BASECHATURL } = require("..");

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
