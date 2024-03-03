import { Table } from "../Table/Table";
import { tableArbitrageColumns } from "./TableArbitrage.utils";
import { useUnit } from "effector-react";
import {
  $arbitrage,
  onSetFilterArbitrage,
  onStreamOrders,
} from "@/stores/arbitrage/arbitrage.effector";
import { useWebsocket } from "@/hooks/useWebsocket";
import { TableArbitrageRowsLoader } from "./TableArbitrageRowsLoader";
import { useRef } from "react";

export const TableArbitrage: React.FC = () => {
  const tableInstance = useRef<Nullable<any>>(null);
  const arbitrage = useUnit($arbitrage);

  const onStreamOrdersEvent = useUnit(onStreamOrders);
  const onSetFilterEvent = useUnit(onSetFilterArbitrage);

  const { isConnected } = useWebsocket({
    events: { onStreamOrders: onStreamOrdersEvent },
  });

  return (
    <Table
      ref={tableInstance}
      isLoading={!isConnected}
      data={arbitrage.data.sort((a, b) => b.spread - a.spread)}
      columns={tableArbitrageColumns}
      rowsLoader={<TableArbitrageRowsLoader rowsNumber={4} />}
      columnFilters={arbitrage.filter}
      setColumnFilters={onSetFilterEvent}
    />
  );
};
