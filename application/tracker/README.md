# Crypto Tracker - Frontend

A modern Next.js 15 application for tracking cryptocurrency holdings and portfolio management.

## Tech Stack

- **Framework**: Next.js 15 (latest)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadCN/ui with Radix UI
- **Form Management**: React Hook Form + Zod
- **Database**: Prisma with SQLite
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
tracker/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   └── ui/                  # shadCN UI components
├── lib/
│   ├── api/                # API client configuration
│   ├── db/                 # Database utilities
│   │   ├── prisma.ts       # Prisma client singleton
│   │   ├── seed.ts         # Database seed script
│   │   └── queries/        # Database query functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── prisma/
│   └── schema.prisma       # Prisma schema
├── public/                 # Static assets
└── config files
```

## Getting Started

### Prerequisites

- Node.js 18+ (includes npm)
- pnpm (configured in workspace)

### Installation

From the root of the monorepo:

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

This will start the development server at `http://localhost:3000`

### Build

```bash
pnpm build
pnpm start
```

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Crypto Tracker
```

## Database

### Setup

Initialize the database:

```bash
pnpm db:push
```

### Seed Data

Add sample cryptocurrencies:

```bash
pnpm db:seed
```

### Prisma Studio

Open the database UI for visual exploration:

```bash
pnpm prisma:studio
```

## Data Models

### Currency
Represents a cryptocurrency (Bitcoin, Ethereum, etc.)
- Fields: `id`, `symbol`, `name`, `createdAt`, `updatedAt`

### CurrencyPrice
Historical price data for a currency
- Fields: `id`, `currencyId`, `price`, `marketCap`, `volume24h`, `changePercent24h`, `lastUpdated`

### Holding
User's cryptocurrency holdings
- Fields: `id`, `currencyId`, `quantity`, `purchasePrice`, `purchaseDate`

## Features

- Dashboard with portfolio overview
- Cryptocurrency holdings management
- Real-time price tracking with historical data
- Portfolio analytics and charts
- Responsive design
- Dark mode support (via shadCN theming)

## API Integration

The app connects to the NestJS API running at `http://localhost:3001/api`.

API client is configured in `lib/api/client.ts` with:
- Automatic token-based authentication
- Error handling and 401 redirects
- Request/response interceptors

## Database Access

Use the database query functions from `lib/db/queries/`:

```typescript
import { getAllCurrencies, getCurrencyById, getHoldingsByCurrencyId } from "@/lib/db/queries";

// Fetch all currencies with latest prices
const currencies = await getAllCurrencies();

// Fetch a specific currency
const bitcoin = await getCurrencyById(currencyId);

// Fetch holdings for a currency
const holdings = await getHoldingsByCurrencyId(currencyId);
```

Use the React hooks from `lib/hooks/`:

```typescript
import { useCurrencies, useCurrency, useHoldings } from "@/lib/hooks";

// In your component
const { currencies, loading, error } = useCurrencies();
const { holdings, addHolding, updateHolding, deleteHolding } = useHoldings();
```

## Contributing

Follow the TypeScript strict mode and ESLint rules. Use shadCN/ui components for UI consistency.

## License

ISC
