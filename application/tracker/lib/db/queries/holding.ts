import { prisma } from "../prisma";

export async function getHoldingsByCurrencyId(currencyId: string) {
  return prisma.holding.findMany({
    where: { currencyId },
    include: {
      currency: {
        include: {
          prices: {
            orderBy: {
              lastUpdated: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });
}

export async function getAllHoldings() {
  return prisma.holding.findMany({
    include: {
      currency: {
        include: {
          prices: {
            orderBy: {
              lastUpdated: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });
}

export async function createHolding(
  currencyId: string,
  quantity: number,
  purchasePrice?: number,
  purchaseDate?: Date
) {
  return prisma.holding.create({
    data: {
      currencyId,
      quantity,
      purchasePrice,
      purchaseDate,
    },
    include: {
      currency: true,
    },
  });
}

export async function updateHolding(
  id: string,
  quantity: number,
  purchasePrice?: number
) {
  return prisma.holding.update({
    where: { id },
    data: {
      quantity,
      purchasePrice,
    },
    include: {
      currency: true,
    },
  });
}

export async function deleteHolding(id: string) {
  return prisma.holding.delete({
    where: { id },
  });
}
