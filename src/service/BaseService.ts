import { API_VERSION } from "@/constants/API_VERSION";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { stringify } from "qs";

import getConfig from "next/config";
import { createAxiosInstance } from "./createAxiosInstance";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export abstract class ServiceBase {
  protected static BASE_URL: string = BASE_URL;
  protected static API_VERSION: string = API_VERSION.V1;
  protected static TAG_SERVICE: string = "";
  protected static api = createAxiosInstance(this.BASE_URL);

  public static buildUrl(url: string): string {
    return `/api/${this.API_VERSION}${this.TAG_SERVICE}${url}`;
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
