import { Box } from "@mui/material";
import { Table } from "../Table/Table";
import { TableArbitrageFilter } from "./TableArbitrageFilter";
import {
  tableArbitrageColumns,
  tableArbitrageData,
} from "./TableArbitrage.utils";

export const TableArbitrage: React.FC = () => {
  return (
    <Box>
      <Box mb={2.5}>
        <TableArbitrageFilter />
      </Box>
      <Box>
        <Table data={tableArbitrageData} columns={tableArbitrageColumns} />
      </Box>
    </Box>
  );
};
