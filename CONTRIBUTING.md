# Contributing

Thanks for your interest in contributing to resend-ecommerce!

## Getting started
```bash
git clone https://github.com/imnotannamaria/resend-ecommerce.git
cd resend-ecommerce
npm install
cp .env.example .env.local  # add your RESEND_API_KEY
npm run dev
```

## What you can contribute

- New email templates (review request, cart abandonment, back-in-stock)
- Improvements to existing templates
- Bug fixes
- Documentation improvements

## Before opening a PR

Make sure the following pass locally:
```bash
npm run check   # lint + format
npm run test:run  # full test suite
```

Pre-commit hooks will run these automatically, but it's good to check before pushing.

## Guidelines

- Keep templates consistent with the existing design system (Radix UI, Tailwind v4)
- New templates should follow the same file structure under `app/emails/`
- Each template needs a preview page under `app/orders/`
- Add tests for any new logic under `app/__tests__/`

## Opening a PR

- Keep PRs focused — one change per PR
- Describe what you changed and why
- If it's a new template, include a screenshot of the preview

## Questions

Open an issue or reach out at anna.maria.dev.br@gmail.com
