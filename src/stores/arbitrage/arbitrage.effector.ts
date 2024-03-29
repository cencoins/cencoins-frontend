import { TableArbitrageItem } from "@/components/TableArbitrage/TableArbitrage.utils";
import { Spread } from "@/service/ServiceSocket/ServiceSocket.dto";
import { ColumnFiltersState } from "@tanstack/react-table";
import { createEvent, createStore, sample } from "effector";
import { at, filter, flatten, keyBy, map, unionBy } from "lodash";
import { $arbitrageFilter } from "./arbitrageFilter.effector";

interface ArbitrageStore {
  isConnected: boolean;
  filter: ColumnFiltersState;
  data: TableArbitrageItem[];
}

export const onStreamOrders = createEvent<Spread[]>();
export const onSetFilterArbitrage = createEvent<ColumnFiltersState>();
export const onChangeConnectStatus = createEvent<boolean>();

export const $arbitrage = createStore<ArbitrageStore>(
  {
    isConnected: false,
    data: [],
    filter: [],
  },
  { sid: "arbitrage" },
)
  .on(onStreamOrders, (state, payload) => {
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
  })
  .on(onSetFilterArbitrage, (state, filter) => ({
    ...state,
    filter,
  }))
  .on(onChangeConnectStatus, (state, isConnected) => ({
    ...state,
    isConnected,
  }));

sample({
  source: $arbitrageFilter,
  filter: (filter) =>
    Boolean(
      filter.selectedCoinIds.length ||
        filter.selectedMarketBuyIds.length ||
        filter.selectedMarketBidIds.length,
    ),
  fn: (filter) => {
    let currentFilter: ColumnFiltersState = [];

    if (filter.selectedCoinIds.length) {
      currentFilter = [
        ...currentFilter,
        {
          id: "coinDto",
          value: at(keyBy(filter.coins, "id"), filter.selectedCoinIds).map(
            (item) => item.name,
          ),
        },
      ];
    }

    if (filter.selectedMarketBuyIds.length) {
      currentFilter = [
        ...currentFilter,
        {
          id: "marketBuyDto",
          value: at(
            keyBy(filter.markets, "id"),
            filter.selectedMarketBuyIds,
          ).map((item) => item.name),
        },
      ];
    }

    if (filter.selectedMarketBidIds.length) {
      currentFilter = [
        ...currentFilter,
        {
          id: "marketAskDto",
          value: at(
            keyBy(filter.markets, "id"),
            filter.selectedMarketBidIds,
          ).map((item) => item.name),
        },
      ];
    }

    return currentFilter;
  },
  target: onSetFilterArbitrage,
});
