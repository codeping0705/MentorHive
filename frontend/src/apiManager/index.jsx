import axios from "axios";
import toast from "react-hot-toast";
import { TOKEN, USER_STORE_PERSIST } from "../const";
import { BASE_URL } from "../const/env.const";
import { getToken, removeToken } from "../helper";

const AxiosInstances = axios.create({
  baseURL: BASE_URL || "https://mentorhive-8eq0.onrender.com/v1/",
});

AxiosInstances.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosInstances.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong!";
    toast.error(message);

    if (status === 401) {
      removeToken();
      sessionStorage.removeItem(USER_STORE_PERSIST);
      window.location.href = "/signin";
    }

    throw error;
  }
);

export default AxiosInstances;
