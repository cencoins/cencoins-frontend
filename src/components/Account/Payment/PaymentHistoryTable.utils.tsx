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
    header: () => "Подписка",
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.period, {
    id: "period",
    header: () => "Период",
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: () => "Статус",
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.dateStart, {
    id: "dateStart",
    header: () => "Дата начала",
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.dateEnd, {
    id: "dateEnd",
    header: () => "Дата окончания",
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.actions, {
    id: "actions",
    header: () => "Действия",
    cell: (info) => (
      <TableCell color="primary.main" style={{ cursor: "pointer" }}>
        {info.getValue()}
      </TableCell>
    ),
  }),
];
