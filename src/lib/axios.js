import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: "https://chatapp-l3am.onrender.com/api",
  withCredentials: true,
});
