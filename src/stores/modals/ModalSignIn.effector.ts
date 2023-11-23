// import { EmailSignInParams } from "@/service/ServiceIdentity/ServiceIdentity.dto";
import { createEffect, createEvent, createStore, sample } from "effector";
import { SignInOptions, SignInResponse, signIn } from "next-auth/react";

interface ModalSignInStore {
  open: boolean;
  email: string;
  password: string;
}

export const toggleModalSignIn = createEvent<void>();
export const onChangeModalSignIn = createEvent<Partial<ModalSignInStore>>();
export const onSubmitModalSignIn = createEvent<void>();

export const signInFx = createEffect<SignInOptions, SignInResponse | void>(
  async (params) => {
    try {
      // console.log({ params });
      const result = await signIn("email", { ...params });
      // console.log({ result });
      if (result?.ok) {
        // return Promise.resolve(result);
      }
    } catch (error) {
      // console.log({ error });
      // return Promise.reject(error);
    }
  }
);

export const $modalSignIn = createStore<ModalSignInStore>({
  open: false,
  email: "",
  password: "",
})
  .on(toggleModalSignIn, (state) => ({ ...state, open: !state.open }))
  .on(onChangeModalSignIn, (state, payload) => ({ ...state, ...payload }));

sample({
  clock: onSubmitModalSignIn,
  source: $modalSignIn,
  fn: ({ email, password }) => ({ email, password }),
  target: signInFx,
});
