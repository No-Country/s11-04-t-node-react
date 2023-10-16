import axios from "axios";

export const backend = axios.create({
  baseURL: "https://barberbuddy.fly.dev/api/v1/",
});



export const getAuthorization = (token) => {
  const getToken = token || sessionStorage.getItem("token");
  const Headers = {
    Authorization: `Bearer ${getToken}`,
  };
  return Headers;
};
