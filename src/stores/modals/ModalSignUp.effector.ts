import { createEvent, createStore } from "effector";

interface ModalSignUpStore {
  open: boolean;
}

export const toggleModalSignUp = createEvent<void>();

export const $modalSignUp = createStore<ModalSignUpStore>({
  open: false,
}).on(toggleModalSignUp, (state) => ({ ...state, open: !state.open }));
