import getConfig from "next/config";
import { ServiceBase } from "../ServiceBase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { API_VERSION } from "@/constants/API_VERSION";
import { Period } from "./ServicePeriods.dto";

const {
  serverRuntimeConfig: { GATEWAY_URL },
} = getConfig();

export class ServicePeriods extends ServiceBase {
  protected static TAG_SERVICE = "/periods";
  protected static API_VERSION = "gw/" + API_VERSION.V1;

  public static getPeriods(
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<Period[]> {
    return this.get<Period[]>("", undefined, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }
}
