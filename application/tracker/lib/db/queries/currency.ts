import { prisma } from "../prisma";

export async function getAllCurrencies() {
  return prisma.currency.findMany({
    include: {
      prices: {
        orderBy: {
          lastUpdated: "desc",
        },
        take: 1, // Get the latest price
      },
    },
  });
}

export async function getCurrencyById(id: string) {
  return prisma.currency.findUnique({
    where: { id },
    include: {
      prices: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10, // Get last 10 prices
      },
      holdings: true,
    },
  });
}

export async function getCurrencyBySymbol(symbol: string) {
  return prisma.currency.findUnique({
    where: { symbol },
    include: {
      prices: {
        orderBy: {
          lastUpdated: "desc",
        },
        take: 1,
      },
    },
  });
}

export async function createCurrency(symbol: string, name: string) {
  return prisma.currency.create({
    data: {
      symbol,
      name,
    },
  });
}

export async function updateCurrencyPrice(
  currencyId: string,
  price: {
    price?: number;
    marketCap?: number;
    volume24h?: number;
    changePercent24h?: number;
  }
) {
  return prisma.currencyPrice.create({
    data: {
      currencyId,
      ...price,
    },
  });
}

export async function getCurrencyLatestPrice(currencyId: string) {
  return prisma.currencyPrice.findFirst({
    where: { currencyId },
    orderBy: {
      lastUpdated: "desc",
    },
  });
}

export async function getCurrencyPriceHistory(
  currencyId: string,
  limit: number = 30
) {
  return prisma.currencyPrice.findMany({
    where: { currencyId },
    orderBy: {
      lastUpdated: "desc",
    },
    take: limit,
  });
}
