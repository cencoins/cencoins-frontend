import { createColumnHelper } from "@tanstack/react-table";
// import { TableCellFavourite } from "../Table/TableCell/TableCellFavourite";
import { TableCell } from "../Table/TableCell/TableCell";
import { TableCellCoin } from "../Table/TableCell/TableCellCoin";
import { Spread } from "@/service/ServiceSocket/ServiceSocket.dto";
// import { onSelectSpread } from "@/stores/arbitrage.effector";

export interface TableArbitrageItem extends Spread {
  isFavourite: boolean;
}

const columnHelper = createColumnHelper<TableArbitrageItem>();

export const tableArbitrageColumns = [
  // columnHelper.accessor((row) => row.isFavourite, {
  //   id: "isFavourite",
  //   header: () => "",
  //   size: 40,
  //   cell: (info) => (
  //     <TableCellFavourite
  //       isFavourite={info.getValue()}
  //       onClick={() => onSelectSpread(info.row.original.key)}
  //       {...info}
  //     />
  //   ),
  // }),
  columnHelper.accessor((row) => row.coinDto, {
    id: "coinDto",
    size: 250,
    header: () => <TableCell textAlign="left">Монета</TableCell>,
    cell: (info) => <TableCellCoin {...info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.coinDto, {
    id: "pair",
    size: 200,
    header: () => <TableCell textAlign="left">Пара</TableCell>,
    cell: (info) => (
      <TableCell>
        {`${info.getValue().symbol} / ${info.getValue().exchange}`}
      </TableCell>
    ),
  }),
  columnHelper.accessor((row) => row.marketBuyDto, {
    id: "marketBuyDto",
    size: 140,
    header: () => <TableCell textAlign="left">Покупка</TableCell>,
    cell: (info) => <TableCellCoin {...info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.priceBuy, {
    id: "priceBuy",
    size: 100,
    header: () => <TableCell textAlign="right">Цена</TableCell>,
    cell: (info) => <TableCell textAlign="right">{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.marketAskDto, {
    id: "marketAskDto",
    size: 140,
    header: () => <TableCell textAlign="left">Продажа</TableCell>,
    cell: (info) => <TableCellCoin {...info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.priceAsk, {
    id: "sellPrice",
    size: 100,
    header: () => <TableCell textAlign="right">Цена</TableCell>,
    cell: (info) => <TableCell textAlign="right">{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.spread, {
    id: "spread",
    size: 54,
    header: () => <TableCell textAlign="right">Спред</TableCell>,
    cell: (info) => (
      <TableCell
        textAlign="right"
        color={info.getValue() < 0 ? "error.main" : "text.default"}
      >{`${info.getValue()}%`}</TableCell>
    ),
  }),
];
