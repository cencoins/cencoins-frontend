import axios from "axios";
import { API_VERSION } from "@/constants/API_VERSION";
import { camelCaseKeysDeep } from "@/utils/camelCase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { stringify } from "qs";

import getConfig from "next/config";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

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

export abstract class ServiceBase {
  protected static BASE_URL: string = BASE_URL;
  protected static API_VERSION: string = API_VERSION.V1;
  protected static TAG_SERVICE: string = "";

  protected static api = instance;

  public static buildUrl(url: string): string {
    return `/api/${this.API_VERSION}${this.TAG_SERVICE}${url}`;
  }

  public static setAuthToken(token: Nullable<string>): void {
    if (!token) {
      delete this.api.defaults.headers.common.authorization;
      return;
    }
    this.api.defaults.headers.common = {
      ...this.api.defaults.headers.common,
      authorization: `Bearer ${token}`,
    };
  }

  public static setAcceptLanguage(locale: string): void {
    this.api.defaults.headers.common = {
      ...this.api.defaults.headers.common,
      "accept-language": locale,
    };
  }

  protected static get<T, P = Record<string, unknown>>(
    url: string,
    data?: P,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && Object.keys(data).length) {
      newUrl = `${newUrl}?${stringify(data)}`;
    }

    return this.api.get(this.buildUrl(newUrl), options);
  }

  protected static post<T, P = Record<string, unknown> | unknown>(
    url: string,
    data?: Nullable<P>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.post(this.buildUrl(url), data, options);
  }

  protected static put<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.put(this.buildUrl(url), data, options);
  }

  protected static patch<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.patch(this.buildUrl(url), data, options);
  }

  protected static delete<T>(
    url: string,
    data?: Nullable<Record<string, unknown>>,
    options?: AxiosRequestConfig,
    disableURLExtends?: boolean
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && !disableURLExtends) {
      newUrl = `${newUrl}?${stringify(data)}`;
      return this.api.delete(this.buildUrl(newUrl), options);
    }

    return this.api.delete(this.buildUrl(newUrl), { ...options, data });
  }
}
