"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

export interface Holding {
  id: string;
  currencyId: string;
  quantity: number;
  purchasePrice: number | null;
  purchaseDate: string | null;
  currency: {
    id: string;
    symbol: string;
    name: string;
    prices: Array<{
      price: number | null;
    }>;
  };
}

export function useHoldings() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/holdings");
        setHoldings(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch holdings");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const addHolding = async (
    currencyId: string,
    quantity: number,
    purchasePrice?: number
  ) => {
    try {
      const response = await apiClient.post("/holdings", {
        currencyId,
        quantity,
        purchasePrice,
      });
      setHoldings([...holdings, response.data]);
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to add holding");
    }
  };

  const updateHolding = async (
    id: string,
    quantity: number,
    purchasePrice?: number
  ) => {
    try {
      const response = await apiClient.put(`/holdings/${id}`, {
        quantity,
        purchasePrice,
      });
      setHoldings(
        holdings.map((h) => (h.id === id ? response.data : h))
      );
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update holding");
    }
  };

  const deleteHolding = async (id: string) => {
    try {
      await apiClient.delete(`/holdings/${id}`);
      setHoldings(holdings.filter((h) => h.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete holding");
    }
  };

  return {
    holdings,
    loading,
    error,
    addHolding,
    updateHolding,
    deleteHolding,
  };
}
