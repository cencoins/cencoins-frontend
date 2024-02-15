import { Box } from "@mui/material";
import { Table } from "../Table/Table";
import { TableArbitrageFilter } from "./TableArbitrageFilter";
import { tableArbitrageColumns } from "./TableArbitrage.utils";
import { useUnit } from "effector-react";
import { $arbitrage } from "@/stores/arbitrage.effector";

export const TableArbitrage: React.FC = () => {
  const arbitrage = useUnit($arbitrage);

  return (
    <Box>
      <Box mb={2.5}>
        <TableArbitrageFilter />
      </Box>
      <Box>
        <Table
          data={arbitrage.data.sort((a, b) => b.spread - a.spread)}
          columns={tableArbitrageColumns}
        />
      </Box>
    </Box>
  );
};
