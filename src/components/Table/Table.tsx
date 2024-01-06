import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableContainer, TableTh, TableHead, TableTd } from "./Table.styled";
import { TableBody } from "@mui/material";

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
    <TableContainer>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableTh
                key={header.id}
                style={{
                  width: header.column.getSize(),
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableTh>
            ))}
          </tr>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableTd
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableTd>
            ))}
          </tr>
        ))}
      </TableBody>
    </TableContainer>
  );
};
