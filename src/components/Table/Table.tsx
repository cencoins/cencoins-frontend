import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  TableBody,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  Box,
  TableCell,
  Divider,
} from "@mui/material";

interface Props {
  data: any;
  columns?: any;
}

export const Table: React.FC<Props> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Divider />
      <TableContainer sx={{ fontSize: 14 }}>
        <MuiTable stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        fontWeight: 600,
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      minWidth: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};
