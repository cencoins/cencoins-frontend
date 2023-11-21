import { AxiosPromise, AxiosRequestConfig } from "axios";
import { ServiceBase } from "../ServiceBase";
import {
  EmailSignInParams,
  EmailSignInRefreshParams,
  EmailSignInRefreshResponse,
  EmailSignInResponse,
  EmailSignUpParams,
  EmailSignUpValidateParams,
  EmailSignUpValidateResponse,
} from "../ServiceIdentity/ServiceIdentity.dto";

export class NextService extends ServiceBase {
  protected static API_VERSION = "api";

  public static emailSignUp(
    body: EmailSignUpParams,
    config?: AxiosRequestConfig<unknown>
  ): AxiosPromise<unknown> {
    return this.post("/identity/email/signup", body, config);
  }

  public static emailSignUpValidate(
    body: EmailSignUpValidateParams,
    config?: AxiosRequestConfig<unknown>
  ): AxiosPromise<EmailSignUpValidateResponse> {
    return this.post<EmailSignUpValidateResponse>(
      "/identity/email/signup/validate",
      body,
      config
    );
  }

  public static emailSignIn(
    body: EmailSignInParams,
    config?: AxiosRequestConfig<unknown>
  ): AxiosPromise<EmailSignInResponse> {
    return this.post<EmailSignInResponse>(
      "/identity/email/signin",
      body,
      config
    );
  }

  public static emailSignInRefresh(
    body: EmailSignInRefreshParams,
    config?: AxiosRequestConfig<unknown>
  ): AxiosPromise<EmailSignInRefreshResponse> {
    return this.post<EmailSignInResponse>(
      "/identity/email/signin/refresh",
      body,
      config
    );
  }
}
