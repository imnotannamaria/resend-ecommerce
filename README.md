# Resend Ecommerce

Open-source transactional email templates for e-commerce, built with [React Email](https://react.email) and [Resend](https://resend.com). Customize, preview, and send in minutes.

## Email templates

Four templates covering the full order lifecycle:

| Template | Route | Description |
|---|---|---|
| Order Created | `/orders/created` | Sent immediately after purchase. Confirms order details, product summary, and estimated delivery. |
| Order Confirmed | `/orders/confirmed` | Sent when the merchant confirms the order is being prepared and payment is verified. |
| Order Shipped | `/orders/shipped` | Dispatched when the package leaves the warehouse. Includes tracking information. |
| Order Delivered | `/orders/delivered` | Final notification confirming the package has been delivered to the customer. |

Each template supports:
- **Accent color** — preset palette or custom hex
- **Border radius** — sharp, medium, or large
- **Toggleable sections** — delivery date, payment details, tracking info, sign-off, social links
- **Live preview** — see changes in real time as you fill the form
- **Copy HTML** — renders server-side and copies raw HTML to clipboard
- **Send** — sends a live test email via the Resend API

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/imnotannamaria/resend-ecommerce.git

# 2. Install dependencies
npm install

# 3. Add your Resend API key to .env.local
RESEND_API_KEY=re_xxxxxxxxx

# 4. Start the dev server
npm run dev
```

## Tech stack

- [Next.js 15](https://nextjs.org) — App Router
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [React Email](https://react.email) — Email rendering
- [Resend](https://resend.com) — Email delivery
- [Radix UI Themes](https://www.radix-ui.com/themes) — UI components
- [Lucide React](https://lucide.dev) — Icons
- [Geist](https://vercel.com/font) — Font
- [Tailwind CSS v4](https://tailwindcss.com) — Styling
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — Form validation
- [Hono](https://hono.dev) — API routes
- [Drizzle ORM](https://orm.drizzle.team) + [PostgreSQL](https://www.postgresql.org) — Database
- [Sonner](https://sonner.emilkowal.ski) — Toast notifications
- [Vitest](https://vitest.dev) — Tests
- [Biome](https://biomejs.dev) — Linting and formatting
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) — Pre-commit hooks

## Development

```bash
npm run dev        # Start dev server
npm run test       # Run tests in watch mode
npm run test:run   # Run tests once
npm run lint       # Lint with Biome
npm run format     # Format with Biome
npm run check      # Lint + format
```

## Project structure

```
app/
├── emails/           # Email templates (order-created, confirmed, shipped, delivered)
├── orders/           # Preview pages for each email template
├── components/       # Shared UI components (form fields, design panel, etc.)
├── api/              # API routes for rendering HTML and sending emails
└── __tests__/        # Unit and integration tests
```

## Pre-commit hooks

Husky runs on every commit:
1. **lint-staged** — Biome check on staged files
2. **vitest run** — full test suite

## Demo

> This live demo runs on my Resend API key — the **Send** action can only deliver to my address. Clone the repo and set your own `RESEND_API_KEY` to send to any inbox.

---

Developed by [Anna Maria](https://github.com/imnotannamaria)
