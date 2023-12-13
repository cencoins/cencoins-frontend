import { NextService } from "@/service/NextService/NextService";
import { EmailSignInParams } from "@/service/ServiceIdentity/ServiceIdentity.dto";
import { AxiosError } from "axios";
import { createEffect, createEvent, createStore, sample } from "effector";
import { signIn } from "next-auth/react";

interface SignInStore {
  email: string;
  password: string;
  error?: string[];
}

export const onChangeSignIn = createEvent<Partial<SignInStore>>();
export const onSubmitSignIn = createEvent<void>();
export const resetSignIn = createEvent<void>();

export const signInFx = createEffect<
  EmailSignInParams,
  void,
  AxiosError<string[]>
>(async (params) => {
  const response = await NextService.emailSignIn(params);

  if (response.data) {
    const result = await signIn("jwtAuth", {
      ...response.data,
      redirect: false,
    });

    if (result?.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
});

export const $signIn = createStore<SignInStore>({
  email: "",
  password: "",
  error: [],
})
  .on(onChangeSignIn, (state, payload) => ({
    ...state,
    ...payload,
    error: [],
  }))
  .on(signInFx.failData, (state, error) => ({
    ...state,
    error: error.response?.data,
  }));

sample({
  clock: onSubmitSignIn,
  source: $signIn,
  fn: ({ email, password }) => ({ email, password }),
  target: signInFx,
});
