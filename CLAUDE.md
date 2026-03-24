# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Novapatch is a subscription-based e-commerce platform for medical/wellness patches, supporting Mexico and Brazil markets. It is a monorepo with two apps:
- **`commerce/`** — Medusa.js v2 backend (API + admin), runs on port 9000
- **`commerce-storefront/`** — Next.js 15 frontend storefront, runs on port 8000

## Commands

### Backend (`commerce/`)
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run test:unit    # Unit tests
npm run test:integration:http     # HTTP integration tests
npm run test:integration:modules  # Module integration tests
npm run db:migrate   # Run migrations
npm run db:reset     # Drop and re-migrate (destructive)
```

### Frontend (`commerce-storefront/`)
```bash
npm run dev          # Start dev server on port 8000
npm run build        # Build for production
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run test:e2e     # Cypress e2e tests
npm run cypress      # Open Cypress UI
```

### Local Infrastructure
```bash
docker-compose up -d database   # Start PostgreSQL
```

## Architecture

### Data Flow
User authenticates via **Clerk** → `ClerkMedusaSyncProvider` automatically syncs to a Medusa customer (`POST /store/custom/create-customer`) → customer can shop, checkout, and manage subscriptions.

Payments are routed by region: **Mexico → Openpay**, **Brazil → Mercado Pago**, via a custom payment gateway module at `commerce/src/modules/payment-gateway/`.

### Backend Structure (`commerce/src/`)
- **`api/store/`** — Public endpoints: payments, subscriptions, custom customer creation
- **`api/admin/`** — Admin endpoints: subscription management, sync utilities
- **`models/`** — Custom MikroORM models: `Subscription`, `SubscriptionPlan`
- **`workflows/`** — Medusa workflows for create/update/process-subscription-order
- **`subscribers/`** — Event handlers: `customer.created` (welcome email), `order.placed` (confirmation email)
- **`jobs/`** — `process-subscriptions.ts` runs daily at 00:00 UTC to charge due subscriptions
- **`modules/payment-gateway/`** — Abstraction layer for region-based payment provider routing
- **`lib/`** — Utilities: email config (Resend), rate limiter, subscription config

### Frontend Structure (`commerce-storefront/src/`)
- **`app/[countryCode]/`** — Dynamic routing by country (`mx`/`br`); all pages live under this segment
- **`modules/`** — Feature modules: `checkout/`, `subscriptions/`, `products/`, `account/`, `cart/`, `home/`, `common/`
- **`providers/clerk-medusa-sync.tsx`** — Wraps the app; auto-syncs Clerk auth to Medusa on load
- **`lib/hooks/use-clerk-medusa-sync.ts`** — Hook that calls the backend customer sync endpoint
- **`lib/data/`** — Server-side data fetching utilities
- **`lib/util/`** — Helpers: `money.ts`, `region-detection.ts`, `product.ts`, `env.ts`
- **`middleware.ts`** — Handles i18n locale detection and country-code redirects
- **`i18n.ts`** — `next-intl` configuration

### Key Patterns
- **Multi-region routing**: All storefront routes prefixed with `[countryCode]` (`/mx/...`, `/br/...`). Middleware handles locale detection.
- **Subscription lifecycle**: User creates subscription → stored in custom model → daily job checks `next_order_date` → triggers `process-subscription-order` workflow → order + charge created.
- **Email via Resend**: Triggered by Medusa events in `subscribers/`; configured in `lib/email-config.ts`.
- **Rate limiting**: Applied on sensitive endpoints (e.g., customer creation) via `lib/rate-limiter.ts`.

## Key Configuration Files
- `commerce/medusa-config.ts` — Medusa modules, CORS, database, payment providers
- `commerce-storefront/next.config.js` — Next.js build config
- `commerce-storefront/src/i18n.ts` — Supported locales/countries
- `.env.example` (root) — All required environment variables

## Environment Variables
Required: `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`
Frontend: `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
Backend: `CLERK_SECRET_KEY`, `RESEND_API_KEY`, `MERCADOPAGO_ACCESS_TOKEN`, `OPENPAY_*`
Optional: `REDIS_URL` (recommended for production event bus/cache)
