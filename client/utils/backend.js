import { API_URL } from "@/constants/api";
import axios from "axios";

export const backend = axios.create({
  baseURL: API_URL + "/api/v1/",
});

export const getAuthorization = (token) => {
  const getToken = token || sessionStorage.getItem("token");
  const Headers = {
    Authorization: `Bearer ${getToken}`,
  };
  return Headers;
};
