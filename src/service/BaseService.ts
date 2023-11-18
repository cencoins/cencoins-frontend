import { AxiosPromise, AxiosRequestConfig } from "axios";
import axios from "axios";
import getConfig from "next/config";
import { stringify } from "qs";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export abstract class ServiceBase {
  protected static BASE_URL: string;

  protected static api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
    },
  });

  public static buildUrl(url: string): string {
    return `/api${this.BASE_URL}${url}`;
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
