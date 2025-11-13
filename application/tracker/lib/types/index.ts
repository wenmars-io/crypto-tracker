/**
 * Currency data type
 */
export interface Currency {
  id: string;
  symbol: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Currency price data
 */
export interface CurrencyPrice {
  id: string;
  currencyId: string;
  price: number | null;
  marketCap: number | null;
  volume24h: number | null;
  changePercent24h: number | null;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cryptocurrency holding
 */
export interface Holding {
  id: string;
  currencyId: string;
  quantity: number;
  purchasePrice: number | null;
  purchaseDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Currency with latest price
 */
export interface CurrencyWithLatestPrice extends Currency {
  prices: CurrencyPrice[];
}

/**
 * Holding with currency info
 */
export interface HoldingWithCurrency extends Holding {
  currency: CurrencyWithLatestPrice;
}
