import { TableRow, TableCell, Skeleton } from "@mui/material";

interface Props {
  rowsNumber: number;
}

export const TableArbitrageRowsLoader: React.FC<Props> = ({ rowsNumber }) => {
  return [...Array(rowsNumber)].map((_, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" height={44} />
      </TableCell>
    </TableRow>
  ));
};
