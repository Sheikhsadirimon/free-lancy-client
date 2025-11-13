import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://free-lancy-api-server.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
