import { createEvent, createStore } from "effector";

interface ModalAddCoinStore {
  open: boolean;
  searchValue: string;
  isShowAdded: boolean;
}

export const onChangeModalAdd = createEvent<Partial<ModalAddCoinStore>>();
export const onSaveModalAdd = createEvent<void>();
export const resetModalAdd = createEvent<void>();

export const $modalAddCoin = createStore<ModalAddCoinStore>({
  open: false,
  searchValue: "",
  isShowAdded: false,
})
  .on(onChangeModalAdd, (state, payload) => ({ ...state, ...payload }))
  .reset(resetModalAdd);
