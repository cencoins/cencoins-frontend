import getConfig from "next/config";
import { ServiceBase } from "../ServiceBase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { API_VERSION } from "@/constants/API_VERSION";
import { Coin, Market } from "../ServiceSocket/ServiceSocket.dto";

const {
  serverRuntimeConfig: { GATEWAY_URL },
} = getConfig();

export class ServiceFilters extends ServiceBase {
  protected static TAG_SERVICE = "/filters";
  protected static API_VERSION = "gw/" + API_VERSION.V1;

  public static getMarkets(
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<Market[]> {
    return this.get<Market[]>(`/markets`, undefined, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }

  public static getCoins(
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<Coin[]> {
    return this.get<Coin[]>(`/coins`, undefined, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }
}
