import axios from "axios";
import { API_URL } from "../constants/api";

export const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers.Authorization = "Bearer " + user.token;
  }
  return config;
});
