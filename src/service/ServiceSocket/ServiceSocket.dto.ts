export interface Coin {
  iconUrl?: Nullable<string>;
  name: string;
  pair: string;
  symbol: string;
  exchange: string;
}

export interface Market {
  id: string;
  name: string;
}

export interface Spread {
  key: string;
  coinDto: Coin;
  marketAskDto: Market;
  marketBuyDto: Market;
  priceAsk: number;
  priceBuy: number;
  spread: number;
}
