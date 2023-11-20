import { createEvent, createStore } from "effector";

interface ModalSignInStore {
  open: boolean;
}

export const toggleModalSignIn = createEvent<void>();

export const $modalSignIn = createStore<ModalSignInStore>({
  open: false,
}).on(toggleModalSignIn, (state) => ({ ...state, open: !state.open }));
