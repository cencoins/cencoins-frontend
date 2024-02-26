import axios from "axios";
import { camelCaseKeysDeep } from "@/utils/camelCase";
import getConfig from "next/config";
import { GetServerSidePropsContext } from "next";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { LOCALES } from "@/constants/LOCALES";

const {
  serverRuntimeConfig: { BASE_URL, GATEWAY_URL },
} = getConfig();

const getNormalizedHeaders = (req: GetServerSidePropsContext["req"]) => {
  if (req) {
    // eslint-disable-next-line no-unused-vars
    const { "set-cookie": _, ...otherHeaders } = req.headers;
    return otherHeaders;
  }
  return {};
};

export const createAxiosInstance = (ctx?: GetServerSidePropsContext) => {
  const instance = axios.create({
    baseURL: ctx ? GATEWAY_URL : BASE_URL,
    headers: {
      Accept: "application/json",
      ...(ctx?.req && {
        ...getNormalizedHeaders(ctx?.req),
        ...(ctx?.locale && {
          "accept-language":
            ctx?.locale === LOCALES.DEFAULT ? LANGUAGES.RU : ctx?.locale,
        }),
      }),
    },
    withCredentials: true,
    timeout: 30_000,
  });

  instance.interceptors.request.use(
    (config) => ({
      ...config,
      metadata: { startTime: new Date() },
    }),
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      response.data = camelCaseKeysDeep(response.data);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
