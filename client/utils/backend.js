import axios from "axios";

export const backend = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

export const getAuthorization = (token) => {
  const getToken = token || sessionStorage.getItem("token");
  const Headers = {
    Authorization: `Bearer ${getToken}`,
  };
  return Headers;
};
