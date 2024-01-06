import { createEvent, createStore } from "effector";

interface ModalAddExchangeStore {
  open: boolean;
  searchValue: string;
  isShowAdded: boolean;
}

export const onChangeModalAddExchange =
  createEvent<Partial<ModalAddExchangeStore>>();
export const onSaveModalAddExchange = createEvent<void>();
export const resetModalAddExchange = createEvent<void>();

export const $modalAddExchange = createStore<ModalAddExchangeStore>({
  open: false,
  searchValue: "",
  isShowAdded: false,
})
  .on(onChangeModalAddExchange, (state, payload) => ({ ...state, ...payload }))
  .reset(resetModalAddExchange);
