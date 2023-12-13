import { NextService } from "@/service/NextService/NextService";
import {
  EmailSignUpParams,
  EmailSignUpValidateParams,
  EmailSignUpValidateResponse,
} from "@/service/ServiceIdentity/ServiceIdentity.dto";
import { AxiosError } from "axios";
import { createEffect, createEvent, createStore, sample } from "effector";

interface SignUpStore {
  name: string;
  email: string;
  password: string;
  session: string;
  error?: string[];
  isRegistered: boolean;
}

export const onChangeSignUp = createEvent<Partial<SignUpStore>>();
export const onValidateEmailSignUp = createEvent<void>();
export const onSubmitSignUp = createEvent<void>();
export const resetSignUp = createEvent<void>();

export const singUpValidateFx = createEffect<
  EmailSignUpValidateParams,
  EmailSignUpValidateResponse,
  AxiosError<string[]>
>(async ({ email }) => {
  const response = await NextService.emailSignUpValidate({ email });
  return response.data;
});

export const signUpFx = createEffect<EmailSignUpParams, unknown>(
  async (params) => {
    const response = await NextService.emailSignUp(params);
    return response.data;
  },
);

export const $signUp = createStore<SignUpStore>({
  name: "",
  email: "",
  password: "",
  session: "",
  error: [],
  isRegistered: false,
})
  .on(onChangeSignUp, (state, payload) => ({
    ...state,
    ...payload,
    error: [],
  }))
  .on(singUpValidateFx.doneData, (state, payload) => ({
    ...state,
    session: payload.session,
  }))
  .on(singUpValidateFx.failData, (state, error) => ({
    ...state,
    error: error.response?.data,
  }))
  .reset(resetSignUp);

sample({
  clock: onSubmitSignUp,
  source: $signUp,
  fn: ({ email }) => ({ email }),
  target: singUpValidateFx,
});

sample({
  clock: singUpValidateFx.doneData,
  source: $signUp,
  fn: ({ name, email, password, session }) => ({
    name,
    email,
    password,
    session,
  }),
  target: signUpFx,
});

sample({
  clock: signUpFx.doneData,
  fn: () => ({
    isRegistered: true,
  }),
  target: onChangeSignUp,
});
