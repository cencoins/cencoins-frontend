import { Table } from "../Table/Table";
import { tableArbitrageColumns } from "./TableArbitrage.utils";
import { useUnit } from "effector-react";
import {
  $arbitrage,
  onStreamOrders,
} from "@/stores/arbitrage/arbitrage.effector";
import { useWebsocket } from "@/hooks/useWebsocket";

export const TableArbitrage: React.FC = () => {
  const arbitrage = useUnit($arbitrage);

  useWebsocket({ events: { onStreamOrders } });

  return (
    <Table
      data={arbitrage.data.sort((a, b) => b.spread - a.spread)}
      columns={tableArbitrageColumns}
    />
  );
};
