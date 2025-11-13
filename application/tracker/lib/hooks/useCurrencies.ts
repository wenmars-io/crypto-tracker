"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

export interface CurrencyWithPrice {
  id: string;
  symbol: string;
  name: string;
  prices: Array<{
    id: string;
    price: number | null;
    marketCap: number | null;
    volume24h: number | null;
    changePercent24h: number | null;
  }>;
}

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<CurrencyWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/currencies");
        setCurrencies(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch currencies");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
}
