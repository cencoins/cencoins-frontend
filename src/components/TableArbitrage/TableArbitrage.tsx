import { Table } from "../Table/Table";
import { tableArbitrageColumns } from "./TableArbitrage.utils";
import { useUnit } from "effector-react";
import {
  $arbitrage,
  onStreamOrders,
} from "@/stores/arbitrage/arbitrage.effector";
import { useWebsocket } from "@/hooks/useWebsocket";
import { TableArbitrageRowsLoader } from "./TableArbitrageRowsLoader";
import { useEffect, useRef, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { $arbitrageFilter } from "@/stores/arbitrage/arbitrageFilter.effector";
import { at, keyBy } from "lodash";

export const TableArbitrage: React.FC = () => {
  const tableInstance = useRef<Nullable<any>>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [init, setInit] = useState(false);
  const arbitrage = useUnit($arbitrage);
  const arbitrageFilter = useUnit($arbitrageFilter);

  const onStreamOrdersEvent = useUnit(onStreamOrders);

  const { isConnected } = useWebsocket({
    events: { onStreamOrders: onStreamOrdersEvent },
  });

  useEffect(() => {
    if (!init && arbitrage.data.length) {
      setInit(true);
    }
  }, [arbitrage.data.length, init]);

  useEffect(() => {
    let filter: ColumnFiltersState = [];

    if (arbitrageFilter.selectedCoinIds.length) {
      filter = [
        ...filter,
        {
          id: "coinDto",
          value: at(
            keyBy(arbitrageFilter.coins, "id"),
            arbitrageFilter.selectedCoinIds,
          ).map((item) => item.name),
        },
      ];
    }

    if (arbitrageFilter.selectedMarketBuyIds.length) {
      filter = [
        ...filter,
        {
          id: "marketBuyDto",
          value: at(
            keyBy(arbitrageFilter.markets, "id"),
            arbitrageFilter.selectedMarketBidIds,
          ).map((item) => item.name),
        },
      ];
    }

    if (arbitrageFilter.selectedMarketBidIds.length) {
      filter = [
        ...filter,
        {
          id: "marketAskDto",
          value: at(
            keyBy(arbitrageFilter.markets, "id"),
            arbitrageFilter.selectedMarketBidIds,
          ).map((item) => item.name),
        },
      ];
    }

    setColumnFilters(filter);
  }, [
    arbitrageFilter.coins,
    arbitrageFilter.markets,
    arbitrageFilter.selectedCoinIds,
    arbitrageFilter.selectedCoinIds.length,
    arbitrageFilter.selectedMarketBidIds,
    arbitrageFilter.selectedMarketBuyIds.length,
  ]);

  return (
    <Table
      ref={tableInstance}
      isLoading={!isConnected}
      data={arbitrage.data.sort((a, b) => b.spread - a.spread)}
      columns={tableArbitrageColumns}
      rowsLoader={<TableArbitrageRowsLoader rowsNumber={4} />}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
    />
  );
};
