import axios from "axios";
import { camelCaseKeysDeep } from "@/utils/camelCase";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => ({
      ...config,
      metadata: { startTime: new Date() },
    }),
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      response.data = camelCaseKeysDeep(response.data);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
