import { TableCell } from "@/components/Table/TableCell/TableCell";
import { createColumnHelper } from "@tanstack/react-table";

interface TablePaymenHistoryItem {
  subscription: string;
  period: string;
  status: string;
  dateStart: string;
  dateEnd: string;
  actions: string;
}

export const tablePaymentHistoryData: TablePaymenHistoryItem[] = [
  {
    subscription: "Pro",
    period: "Месяц",
    status: "Активная",
    dateStart: "12.01.2024",
    dateEnd: "12.02.2024",
    actions: "Прекратить",
  },
];

const columnHelper = createColumnHelper<TablePaymenHistoryItem>();

export const tablePaymenHistoryColumns = [
  columnHelper.accessor((row) => row.subscription, {
    id: "subscription",
    header: () => <TableCell>Подписка</TableCell>,
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.period, {
    id: "period",
    header: () => <TableCell>Период</TableCell>,
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: () => <TableCell>Статус</TableCell>,
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.dateStart, {
    id: "dateStart",
    header: () => <TableCell>Дата начала</TableCell>,
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.dateEnd, {
    id: "dateEnd",
    header: () => <TableCell>Дата окончания</TableCell>,
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.actions, {
    id: "actions",
    header: () => <TableCell>Действия</TableCell>,
    cell: (info) => (
      <TableCell color="primary.main" style={{ cursor: "pointer" }}>
        {info.getValue()}
      </TableCell>
    ),
  }),
];
