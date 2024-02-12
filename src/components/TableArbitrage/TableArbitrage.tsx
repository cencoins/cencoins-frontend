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
          data={arbitrage.data.sort((a, b) => {
            if (a.coinDto.name > b.coinDto.name) {
              return 1;
            }
            if (a.coinDto.name < b.coinDto.name) {
              return -1;
            }

            return 0;
          })}
          columns={tableArbitrageColumns}
        />
      </Box>
    </Box>
  );
};
