import getConfig from "next/config";
import { ServiceBase } from "../ServiceBase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { API_VERSION } from "@/constants/API_VERSION";
import { GetTariffsByPeriodParams, Tariff } from "./ServiceTariffs.dto";

const {
  serverRuntimeConfig: { GATEWAY_URL },
} = getConfig();

export class ServiceTariffs extends ServiceBase {
  protected static TAG_SERVICE = "/tariffs";
  protected static API_VERSION = "gw/" + API_VERSION.V1;

  public static getTariffsByPeriod(
    params: GetTariffsByPeriodParams,
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<Tariff[]> {
    return this.get<Tariff[]>(`/period/${params.id}`, undefined, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }
}
