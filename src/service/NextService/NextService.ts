import { AxiosPromise, AxiosRequestConfig } from "axios";
import { ServiceBase } from "../ServiceBase";
import { EmailSignUpParams } from "../ServiceIdentity/ServiceIdentity.dto";

export class NextService extends ServiceBase {
  protected static API_VERSION = "";

  public static emailSignUp(
    body: EmailSignUpParams,
    config?: AxiosRequestConfig<unknown>
  ): AxiosPromise<unknown> {
    return this.post("/identity/email/signup", body, config);
  }
}
