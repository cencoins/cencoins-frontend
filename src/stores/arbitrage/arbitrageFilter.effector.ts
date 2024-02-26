import { Coin, Market } from "@/service/ServiceSocket/ServiceSocket.dto";
import { createEvent, createStore } from "effector";

interface ArbitrageFilterStore {
  coins: Coin[];
  markets: Market[];
}
export const setDataArbitrageFilter =
  createEvent<Partial<ArbitrageFilterStore>>();

export const $arbitrageFilter = createStore<ArbitrageFilterStore>(
  {
    coins: [],
    markets: [],
  },
  { sid: "arbitrageFilter" },
).on(setDataArbitrageFilter, (state, payload) => ({ ...state, ...payload }));
