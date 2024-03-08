const { default: axios } = require("axios");

export const FetchCountries = () => {
  const responseData = axios.get(`https://api.example.com/countries`);
  return responseData;
};
