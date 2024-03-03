import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import {
  ReactElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";

interface Props {
  ref: any;
  data: any;
  columns?: any;
  rowsLoader?: ReactElement;
  isLoading?: boolean;
  columnFilters: any;
  setColumnFilters: any;
}

export const Table: React.FC<Props> = forwardRef(
  (
    {
      data,
      columns,
      rowsLoader,
      columnFilters,
      setColumnFilters,
      isLoading = false,
    },
    ref,
  ) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        columnFilters,
      },
      filterFns: {
        customFilter: (row, columnId, filterValue) => {
          const rowValue = row.getValue(columnId);
          return Boolean(
            filterValue.find(
              (value: string) =>
                // @ts-ignore
                value.toLowerCase() === rowValue.name.toLowerCase(),
            ),
          );
        },
      },
      onColumnFiltersChange: setColumnFilters,
    });

    useEffect(() => {
      setColumnFilters(columnFilters);
    }, [columnFilters, setColumnFilters]);

    useImperativeHandle(ref, () => table);

    return (
      <Box sx={{ width: "100%", overflow: "hidden", minHeight: 400 }}>
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
              {isLoading
                ? rowsLoader
                : table.getFilteredRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            minWidth: cell.column.getSize(),
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
    );
  },
);

Table.displayName = "Table";
