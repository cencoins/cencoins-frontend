// import { EmailSignInParams } from "@/service/ServiceIdentity/ServiceIdentity.dto";
import { NextService } from "@/service/NextService/NextService";
import { EmailSignInParams } from "@/service/ServiceIdentity/ServiceIdentity.dto";
import { AxiosError } from "axios";
import { createEffect, createEvent, createStore, sample } from "effector";
import { signIn } from "next-auth/react";

interface ModalSignInStore {
  open: boolean;
  email: string;
  password: string;
  error?: string[];
}

export const toggleModalSignIn = createEvent<void>();
export const onChangeModalSignIn = createEvent<Partial<ModalSignInStore>>();
export const onSubmitModalSignIn = createEvent<void>();
export const resetModalSignIn = createEvent<void>();

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

export const $modalSignIn = createStore<ModalSignInStore>({
  open: false,
  email: "",
  password: "",
  error: [],
})
  .on(toggleModalSignIn, (state) => ({ ...state, open: !state.open }))
  .on(onChangeModalSignIn, (state, payload) => ({
    ...state,
    ...payload,
    error: [],
  }))
  .on(signInFx.failData, (state, error) => ({
    ...state,
    error: error.response?.data,
  }));

sample({
  clock: onSubmitModalSignIn,
  source: $modalSignIn,
  fn: ({ email, password }) => ({ email, password }),
  target: signInFx,
});

sample({
  clock: signInFx.doneData,
  target: toggleModalSignIn,
});

sample({
  clock: toggleModalSignIn,
  source: $modalSignIn,
  filter: ({ open }) => !open,
  target: resetModalSignIn,
});
