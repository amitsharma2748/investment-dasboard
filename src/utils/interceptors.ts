import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosHttp = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/", 
});

axiosHttp.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    // PLACE WHERE YOU CAN SET UP TOKEN

    // const token = localStorage.getItem("auth_token"); 

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosHttp.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
   
    return Promise.reject(error);
  }
);

export default axiosHttp;
