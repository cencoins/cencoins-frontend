import getConfig from "next/config";
import { ServiceBase } from "../ServiceBase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { API_VERSION } from "@/constants/API_VERSION";
import { GetLocationParams, GetLocationResponse } from "./ServiceLocation.dto";

const {
  serverRuntimeConfig: { GATEWAY_URL },
} = getConfig();

export class ServiceLocation extends ServiceBase {
  protected static TAG_SERVICE = "/location";
  protected static API_VERSION = "gw/" + API_VERSION.V1;

  public static getLocation(
    params: GetLocationParams,
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<GetLocationResponse> {
    return this.post<GetLocationResponse>(`/${params.ip}`, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }
}
