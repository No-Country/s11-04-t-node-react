import axios from "axios";

export const backend = axios.create({
  baseURL: "http://localhost:2500/api/v1/",
});

export const getAuthorization = (token) => {
  const getToken = token || sessionStorage.getItem("token");
  const Headers = {
    Authorization: `Bearer ${getToken}`,
  };
  return Headers;
};
