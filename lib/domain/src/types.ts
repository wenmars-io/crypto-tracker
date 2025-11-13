/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cryptocurrency data
 */
export interface Currency extends BaseEntity {
  symbol: string;
  name: string;
}

export interface CurrencyPrice extends BaseEntity {
  price?: number;
  marketCap?: number;
  volume24h?: number;
  changePercent24h?: number;
  lastUpdated?: Date;
}

/**
 * Cryptocurrency holding
 */
export interface Holding extends BaseEntity {
  currencyId: string;
  quantity: number;
  purchasePrice?: number;
  purchaseDate?: Date;
}
