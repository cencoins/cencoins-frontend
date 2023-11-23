import { NextService } from "@/service/NextService/NextService";
import {
  EmailSignUpParams,
  EmailSignUpValidateParams,
  EmailSignUpValidateResponse,
} from "@/service/ServiceIdentity/ServiceIdentity.dto";
import { AxiosError } from "axios";
import { createEffect, createEvent, createStore, sample } from "effector";

interface ModalSignUpStore {
  open: boolean;
  name: string;
  email: string;
  password: string;
  session: string;
  error?: string[];
}

export const toggleModalSignUp = createEvent<void>();
export const onChangeModalSignUp = createEvent<Partial<ModalSignUpStore>>();
export const onValidateEmailSignUp = createEvent<void>();
export const onSubmitModalSignUp = createEvent<void>();
export const resetModalSignUp = createEvent<void>();

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

export const $modalSignUp = createStore<ModalSignUpStore>({
  open: false,
  name: "",
  email: "",
  password: "",
  session: "",
  error: [],
})
  .on(toggleModalSignUp, (state) => ({ ...state, open: !state.open }))
  .on(onChangeModalSignUp, (state, payload) => ({
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
  .reset(resetModalSignUp);

sample({
  clock: onSubmitModalSignUp,
  source: $modalSignUp,
  fn: ({ email }) => ({ email }),
  target: singUpValidateFx,
});

sample({
  clock: singUpValidateFx.doneData,
  source: $modalSignUp,
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
  target: toggleModalSignUp,
});

sample({
  clock: toggleModalSignUp,
  source: $modalSignUp,
  filter: ({ open }) => !open,
  target: resetModalSignUp,
});
