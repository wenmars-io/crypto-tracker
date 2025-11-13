import { prisma } from "./prisma";

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.holding.deleteMany();
  await prisma.currencyPrice.deleteMany();
  await prisma.currency.deleteMany();

  console.log("Cleared existing data");

  // Seed cryptocurrencies with price history
  const cryptocurrencies = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      prices: [
        {
          price: 43500.0,
          marketCap: 850000000000,
          volume24h: 25000000000,
          changePercent24h: 2.5,
        },
        {
          price: 43200.0,
          marketCap: 845000000000,
          volume24h: 24500000000,
          changePercent24h: 1.8,
        },
        {
          price: 42800.0,
          marketCap: 840000000000,
          volume24h: 24000000000,
          changePercent24h: 0.5,
        },
      ],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      prices: [
        {
          price: 2300.0,
          marketCap: 276000000000,
          volume24h: 12000000000,
          changePercent24h: 1.8,
        },
        {
          price: 2280.0,
          marketCap: 274000000000,
          volume24h: 11800000000,
          changePercent24h: 0.9,
        },
        {
          price: 2250.0,
          marketCap: 270000000000,
          volume24h: 11500000000,
          changePercent24h: -0.5,
        },
      ],
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      prices: [
        {
          price: 612.0,
          marketCap: 93600000000,
          volume24h: 2800000000,
          changePercent24h: 3.2,
        },
        {
          price: 595.0,
          marketCap: 91000000000,
          volume24h: 2700000000,
          changePercent24h: 1.5,
        },
      ],
    },
    {
      symbol: "XRP",
      name: "XRP",
      prices: [
        {
          price: 2.1,
          marketCap: 112000000000,
          volume24h: 3200000000,
          changePercent24h: 4.5,
        },
        {
          price: 2.05,
          marketCap: 109000000000,
          volume24h: 3100000000,
          changePercent24h: 2.8,
        },
      ],
    },
    {
      symbol: "ADA",
      name: "Cardano",
      prices: [
        {
          price: 1.05,
          marketCap: 37000000000,
          volume24h: 1200000000,
          changePercent24h: 2.3,
        },
        {
          price: 1.02,
          marketCap: 36000000000,
          volume24h: 1150000000,
          changePercent24h: 1.1,
        },
      ],
    },
    {
      symbol: "SOL",
      name: "Solana",
      prices: [
        {
          price: 190.0,
          marketCap: 62000000000,
          volume24h: 2100000000,
          changePercent24h: 5.8,
        },
        {
          price: 182.0,
          marketCap: 59000000000,
          volume24h: 2000000000,
          changePercent24h: 3.2,
        },
      ],
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      prices: [
        {
          price: 0.35,
          marketCap: 50000000000,
          volume24h: 1800000000,
          changePercent24h: 6.2,
        },
        {
          price: 0.33,
          marketCap: 47000000000,
          volume24h: 1700000000,
          changePercent24h: 4.1,
        },
      ],
    },
    {
      symbol: "USDT",
      name: "Tether",
      prices: [
        {
          price: 1.0,
          marketCap: 95000000000,
          volume24h: 45000000000,
          changePercent24h: 0.1,
        },
      ],
    },
  ];

  const createdCurrencies = [];

  for (const crypto of cryptocurrencies) {
    const currency = await prisma.currency.create({
      data: {
        symbol: crypto.symbol,
        name: crypto.name,
      },
    });

    // Create price history (in reverse order - oldest first)
    for (const price of crypto.prices.reverse()) {
      await prisma.currencyPrice.create({
        data: {
          currencyId: currency.id,
          price: price.price,
          marketCap: price.marketCap,
          volume24h: price.volume24h,
          changePercent24h: price.changePercent24h,
        },
      });
    }

    createdCurrencies.push(currency);
  }

  console.log(`Created ${createdCurrencies.length} cryptocurrencies with price history`);

  // Create some sample holdings
  const bitcoin = createdCurrencies.find((c) => c.symbol === "BTC");
  const ethereum = createdCurrencies.find((c) => c.symbol === "ETH");
  const solana = createdCurrencies.find((c) => c.symbol === "SOL");

  if (bitcoin) {
    await prisma.holding.create({
      data: {
        currencyId: bitcoin.id,
        quantity: 0.5,
        purchasePrice: 42000.0,
        purchaseDate: new Date("2024-01-15"),
      },
    });

    await prisma.holding.create({
      data: {
        currencyId: bitcoin.id,
        quantity: 0.25,
        purchasePrice: 41000.0,
        purchaseDate: new Date("2024-02-20"),
      },
    });
  }

  if (ethereum) {
    await prisma.holding.create({
      data: {
        currencyId: ethereum.id,
        quantity: 5.0,
        purchasePrice: 2100.0,
        purchaseDate: new Date("2024-01-10"),
      },
    });
  }

  if (solana) {
    await prisma.holding.create({
      data: {
        currencyId: solana.id,
        quantity: 50.0,
        purchasePrice: 150.0,
        purchaseDate: new Date("2024-03-01"),
      },
    });
  }

  console.log("Created sample holdings");
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
