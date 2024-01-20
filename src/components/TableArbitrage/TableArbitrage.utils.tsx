import { createColumnHelper } from "@tanstack/react-table";
import { TableCellFavourite } from "../Table/TableCell/TableCellFavourite";
import { TableCell } from "../Table/TableCell/TableCell";
import { TableCellCoin } from "../Table/TableCell/TableCellCoin";

interface TableCoin {
  name: string;
  shortName: string;
  logo: string;
}

interface TableMarket {
  name: string;
  logo: string;
}

interface TableArbitrageItem {
  isFavourite: boolean;
  pair: string;
  coin: TableCoin;
  buyMarket: TableMarket;
  buyPrice: number;
  sellMarket: TableMarket;
  sellPrice: number;
  spread: number;
}

export const tableArbitrageData: TableArbitrageItem[] = [
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: false,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: false,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: false,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
  {
    isFavourite: true,
    pair: "USDT/TON",
    coin: {
      name: "Toncoin",
      shortName: "TON",
      logo: "/images/ton.svg",
    },
    buyMarket: {
      name: "Bybit",
      logo: "/images/bybit.svg",
    },
    buyPrice: 2.1056,
    sellPrice: 2.207,
    sellMarket: {
      name: "Kraken",
      logo: "/images/kraken.svg",
    },
    spread: 3.2,
  },
];

const columnHelper = createColumnHelper<TableArbitrageItem>();

export const tableArbitrageColumns = [
  columnHelper.accessor((row) => row.isFavourite, {
    id: "isFavourite",
    header: () => "",
    size: 40,
    cell: (info) => (
      <TableCellFavourite isFavourite={info.getValue()} {...info} />
    ),
  }),
  columnHelper.accessor((row) => row.coin, {
    id: "coin",
    size: 204,
    header: () => <TableCell textAlign="left">Монета</TableCell>,
    cell: (info) => <TableCellCoin {...info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.pair, {
    id: "pair",
    size: 74,
    header: () => <TableCell textAlign="left">Пара</TableCell>,
    cell: (info) => <TableCell>{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.buyMarket, {
    id: "buyMarket",
    size: 174,
    header: () => <TableCell textAlign="left">Покупка</TableCell>,
    cell: (info) => <TableCellCoin {...info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.buyPrice, {
    id: "buyPrice",
    size: 100,
    header: () => <TableCell textAlign="right">Цена</TableCell>,
    cell: (info) => <TableCell textAlign="right">{info.getValue()}</TableCell>,
  }),
  columnHelper.accessor((row) => row.sellMarket, {
    id: "sellMarket",
    size: 174,
    header: () => <TableCell textAlign="left">Продажа</TableCell>,
    cell: (info) => <TableCellCoin {...info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.sellPrice, {
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
      <TableCell textAlign="right">{`${info.getValue()}%`}</TableCell>
    ),
  }),
];
