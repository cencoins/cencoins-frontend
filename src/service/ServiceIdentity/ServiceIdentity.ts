import getConfig from "next/config";
import { ServiceBase } from "../ServiceBase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { EmailSignUpParams } from "./ServiceIdentity.dto";
import { createAxiosInstance } from "../createAxiosInstance";

const {
  serverRuntimeConfig: { USER_SERVICE_URL },
} = getConfig();

export class ServiceIdentity extends ServiceBase {
  protected static BASE_URL = USER_SERVICE_URL;
  protected static TAG_SERVICE = "/identity";
  protected static api = createAxiosInstance(USER_SERVICE_URL);

  public static emailSignUp(
    body: EmailSignUpParams,
    config: AxiosRequestConfig<unknown>
  ): AxiosPromise<void> {
    return this.post<void>("/email/signup", body, config);
  }
}
