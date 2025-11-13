"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

export interface CurrencyPrice {
  id: string;
  price: number | null;
  marketCap: number | null;
  volume24h: number | null;
  changePercent24h: number | null;
  lastUpdated: string;
}

export interface CurrencyDetail {
  id: string;
  symbol: string;
  name: string;
  prices: CurrencyPrice[];
  holdings: Array<{
    id: string;
    quantity: number;
    purchasePrice: number | null;
  }>;
}

export function useCurrency(id: string) {
  const [currency, setCurrency] = useState<CurrencyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/currencies/${id}`);
        setCurrency(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch currency");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, [id]);

  return { currency, loading, error };
}
