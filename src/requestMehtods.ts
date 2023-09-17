import axios from "axios";

const BASEURL =
  "https://football-boots-store-jovt0p32r-greenberg-hammeed.vercel.app/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = axios.create({
  baseURL: BASEURL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
