import { persist } from "effector-storage/local";

import { Coin, Market } from "@/service/ServiceSocket/ServiceSocket.dto";
import { createEvent, createStore } from "effector";

export interface ArbitrageFilterStore {
  coins: Coin[];
  markets: Market[];
  selectedCoinIds: string[];
  selectedMarketBuyIds: string[];
  selectedMarketBidIds: string[];
}

interface SelectArbitrageFilterEvent {
  key: "selectedCoinIds" | "selectedMarketBuyIds" | "selectedMarketBidIds";
  value?: string;
}

export const setDataArbitrageFilter =
  createEvent<Partial<ArbitrageFilterStore>>();
export const onSelectArbitrageFilter =
  createEvent<SelectArbitrageFilterEvent>();
export const onResetArbitrageFilter = createEvent<SelectArbitrageFilterEvent>();
export const onDeleteArbitrageFilter =
  createEvent<SelectArbitrageFilterEvent>();

export const $arbitrageFilter = createStore<ArbitrageFilterStore>(
  {
    coins: [],
    markets: [],
    selectedCoinIds: [],
    selectedMarketBuyIds: [],
    selectedMarketBidIds: [],
  },
  { sid: "arbitrageFilter" },
)
  .on(setDataArbitrageFilter, (state, payload) => ({ ...state, ...payload }))
  .on(onSelectArbitrageFilter, (state, payload) => ({
    ...state,
    [payload.key]: [...state[payload.key], payload.value],
  }))
  .on(onResetArbitrageFilter, (state, payload) => ({
    ...state,
    [payload.key]: [],
  }))
  .on(onDeleteArbitrageFilter, (state, payload) => ({
    ...state,
    [payload.key]: state[payload.key].filter((id) => id !== payload.value),
  }));

persist({ store: $arbitrageFilter, key: "arbitrageFilter" });
