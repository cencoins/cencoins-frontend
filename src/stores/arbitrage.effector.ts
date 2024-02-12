import { TableArbitrageItem } from "@/components/TableArbitrage/TableArbitrage.utils";
import { Spread } from "@/service/ServiceSocket/ServiceSocket.dto";
import { createEvent, createStore } from "effector";
import { unionBy } from "lodash";

interface ArbitrageStore {
  data: TableArbitrageItem[];
  selected: string[];
  showSelected: boolean;
}

export const onStreamOrders = createEvent<Spread[]>();
export const onSelectSpread = createEvent<string>();
export const onShowSelected = createEvent();

export const $arbitrage = createStore<ArbitrageStore>({
  data: [],
  selected: [],
  showSelected: false,
})
  .on(onStreamOrders, (state, payload) => {
    return {
      ...state,
      data: unionBy(
        payload.map((item) => ({ ...item, isFavourite: false })),
        state.data,
        "key",
      ),
    };
  })
  .on(onSelectSpread, (state, payload) => ({
    ...state,
    selected: state.selected.find((item) => item === payload)
      ? state.selected.filter((item) => item === payload)
      : [...state.selected, payload],
  }))
  .on(onShowSelected, (state) => ({
    ...state,
    showSelected: !state.showSelected,
    data: state.showSelected
      ? state.data.filter((item) => item.isFavourite)
      : state.data,
  }));
