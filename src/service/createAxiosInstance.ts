import axios from "axios";
import { camelCaseKeysDeep } from "@/utils/camelCase";

export const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
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
