import { API_VERSION } from "@/constants/API_VERSION";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { stringify } from "qs";
import { axiosInstance } from "./createAxiosInstance";

export abstract class ServiceBase {
  protected static API_VERSION: string = API_VERSION.V1;
  protected static TAG_SERVICE: string = "";
  protected static api = axiosInstance;

  public static buildUrl(url: string): string {
    return `/${this.API_VERSION}${this.TAG_SERVICE}${url}`;
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

  protected static get<T, P = Record<string, unknown>>(
    url: string,
    data?: P,
    options?: AxiosRequestConfig,
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
    options?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.api.post(this.buildUrl(url), data, options);
  }

  protected static put<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.api.put(this.buildUrl(url), data, options);
  }

  protected static patch<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.api.patch(this.buildUrl(url), data, options);
  }

  protected static delete<T>(
    url: string,
    data?: Nullable<Record<string, unknown>>,
    options?: AxiosRequestConfig,
    disableURLExtends?: boolean,
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && !disableURLExtends) {
      newUrl = `${newUrl}?${stringify(data)}`;
      return this.api.delete(this.buildUrl(newUrl), options);
    }

    return this.api.delete(this.buildUrl(newUrl), { ...options, data });
  }
}
