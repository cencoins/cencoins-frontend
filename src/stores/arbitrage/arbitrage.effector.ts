import { TableArbitrageItem } from "@/components/TableArbitrage/TableArbitrage.utils";
import { Spread } from "@/service/ServiceSocket/ServiceSocket.dto";
import { ColumnFiltersState } from "@tanstack/react-table";
import { createEvent, createStore } from "effector";
import { filter, flatten, map, unionBy } from "lodash";

interface ArbitrageStore {
  filter: ColumnFiltersState;
  data: TableArbitrageItem[];
}

export const onStreamOrders = createEvent<Spread[]>();
export const onSetFilterArbitrage = createEvent();

export const $arbitrage = createStore<ArbitrageStore>(
  {
    data: [],
    filter: [],
  },
  { sid: "arbitrage" },
).on(onStreamOrders, (state, payload) => {
  const updatedArray = unionBy(
    payload.map((item) => ({ ...item, isFavourite: false })),
    state.data,
    "key",
  );

  const filteredArray = flatten(
    map(payload, (item) => filter(updatedArray, item)),
  ) as TableArbitrageItem[];

  return {
    ...state,
    data: filteredArray,
  };
});
