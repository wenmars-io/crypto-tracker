import { Cryptocurrency } from "../types";
import { z } from "zod";

export const cryptocurrencySchema: z.ZodType<Cryptocurrency> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  symbol: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  marketCap: z.number().min(0), // TODO: Optional if impossible to fetch out
  volume24h: z.number().min(0),
  // changePercent24h: z.number(), // can be undefined at first
  lastUpdated: z.coerce.date(),
});
