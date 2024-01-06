import { createEvent, createStore } from "effector";

interface ModalDepSpreadCoinStore {
  open: boolean;
  searchValue: string;
  isShowAdded: boolean;
}

export const onChangeModalDepSpread =
  createEvent<Partial<ModalDepSpreadCoinStore>>();
export const onSaveModalDepSpread = createEvent<void>();
export const resetModalDepSpread = createEvent<void>();

export const $modalDepSpread = createStore<ModalDepSpreadCoinStore>({
  open: false,
  searchValue: "",
  isShowAdded: false,
})
  .on(onChangeModalDepSpread, (state, payload) => ({ ...state, ...payload }))
  .reset(resetModalDepSpread);
