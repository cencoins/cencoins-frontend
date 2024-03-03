import { Table } from "../Table/Table";
import { tableArbitrageColumns } from "./TableArbitrage.utils";
import { useUnit } from "effector-react";
import {
  $arbitrage,
  onStreamOrders,
} from "@/stores/arbitrage/arbitrage.effector";
import { useWebsocket } from "@/hooks/useWebsocket";
import { TableArbitrageRowsLoader } from "./TableArbitrageRowsLoader";
import { useEffect, useState } from "react";

export const TableArbitrage: React.FC = () => {
  const [init, setInit] = useState(false);
  const arbitrage = useUnit($arbitrage);

  useEffect(() => {
    if (!init && arbitrage.data.length) {
      setInit(true);
    }
  }, [arbitrage.data.length, init]);

  const { isConnected } = useWebsocket({ events: { onStreamOrders } });

  return (
    <Table
      isLoading={!isConnected}
      data={arbitrage.data.sort((a, b) => b.spread - a.spread)}
      columns={tableArbitrageColumns}
      rowsLoader={<TableArbitrageRowsLoader rowsNumber={4} />}
    />
  );
};
