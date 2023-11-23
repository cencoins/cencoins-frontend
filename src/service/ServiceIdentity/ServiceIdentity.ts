import getConfig from "next/config";
import { ServiceBase } from "../ServiceBase";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import {
  EmailSignInParams,
  EmailSignInRefreshParams,
  EmailSignInRefreshResponse,
  EmailSignInResponse,
  EmailSignUpParams,
  EmailSignUpValidateParams,
  EmailSignUpValidateResponse,
} from "./ServiceIdentity.dto";
import { API_VERSION } from "@/constants/API_VERSION";

const {
  serverRuntimeConfig: { GATEWAY_URL },
} = getConfig();

// eslint-disable-next-line no-console
console.log({ GATEWAY_URL });

export class ServiceIdentity extends ServiceBase {
  protected static TAG_SERVICE = "/identity";
  protected static API_VERSION = "gw/" + API_VERSION.V1;

  public static emailSignUpValidate(
    body: EmailSignUpValidateParams,
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<EmailSignUpValidateResponse> {
    return this.post<EmailSignUpValidateResponse>("/signup/validate", body, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }

  public static emailSignUp(
    body: EmailSignUpParams,
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<void> {
    return this.post<void>("/signup", body, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }

  public static emailSignIn(
    body: EmailSignInParams,
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<EmailSignInResponse> {
    return this.post<EmailSignInResponse>("/signin", body, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }

  public static emailSignInRefresh(
    body: EmailSignInRefreshParams,
    config?: AxiosRequestConfig<unknown>,
  ): AxiosPromise<EmailSignInRefreshResponse> {
    return this.post<EmailSignInRefreshResponse>("/signin/refresh", body, {
      ...config,
      baseURL: GATEWAY_URL,
    });
  }
}
