'use client';

import { Badge, Button, Callout } from '@radix-ui/themes';
import {
  ArrowRight,
  Book,
  Check,
  ChevronRight,
  Copy,
  GitBranch,
  Info,
  Key,
  Mail,
  Package,
  Send,
  ShoppingCart,
  Terminal,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from './components/code-block';

const STEPS = [
  {
    icon: GitBranch,
    title: 'Clone the repo',
    code: 'git clone https://github.com/imnotannamaria/resend-ecommerce.git',
  },
  {
    icon: Terminal,
    title: 'Install dependencies',
    code: 'npm install',
  },
  {
    icon: Key,
    title: 'Add your Resend API key',
    code: 'RESEND_API_KEY=re_xxxxxxxxx',
    note: '.env.local',
  },
];

const EMAILS = [
  {
    icon: ShoppingCart,
    href: '/orders/created',
    label: 'Order Created',
    description:
      'Sent immediately after purchase. Confirms the order details, product summary, and estimated delivery.',
  },
  {
    icon: Check,
    href: '/orders/confirmed',
    label: 'Order Confirmed',
    description:
      'Sent when the merchant confirms the order is being prepared and payment is verified.',
  },
  {
    icon: Package,
    href: '/orders/shipped',
    label: 'Order Shipped',
    description:
      'Dispatched when the package leaves the warehouse. Includes tracking information.',
  },
  {
    icon: Truck,
    href: '/orders/delivered',
    label: 'Order Delivered',
    description:
      'Final notification confirming the package has been delivered to the customer.',
  },
];

const ACTIONS = [
  {
    icon: Copy,
    label: ' HTML',
    description:
      'Renders the email template server-side and copies the raw HTML to your clipboard — ready to paste directly into the Resend API or any other email provider.',
  },
  {
    icon: Send,
    label: 'Send',
    description:
      'Sends a live test email via the Resend API to the address configured in the Email tab. Great for previewing exactly how it lands in an inbox.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <section className="flex flex-col items-center text-center px-6 pt-16 pb-14 gap-5 max-w-3xl mx-auto sm:pt-20 sm:pb-16 sm:gap-6 md:pt-24 md:pb-20">
          <div className="w-12 h-12 bg-(--gray-12) rounded-2xl flex items-center justify-center mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gray-1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Resend Ecommerce"
              role="img"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
            </svg>
          </div>

          <Badge color="green" variant="soft" radius="full" size="2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Open-source e-commerce email templates
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight leading-tight sm:text-4xl md:text-5xl">
            Transactional emails
            <br />
            for e-commerce
          </h1>
          <p className="text-(--gray-10) text-base leading-relaxed max-w-xl sm:text-lg">
            A ready-to-use starter kit with order email templates built with
            React Email and Resend. Customize, preview, and send in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2 sm:gap-4">
            <Button asChild size="3" color="gray" highContrast>
              <Link href="/orders/created">
                Get Started <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild size="3" variant="soft" color="gray">
              <Link
                href="https://anna-maria-dev.vercel.app/projects/resend-ecommerce"
                target="_blank"
              >
                Documentation <Book size={14} />
              </Link>
            </Button>
          </div>
        </section>

        {process.env.NODE_ENV === 'production' && (
          <section className="max-w-2xl mx-auto px-6 pb-10">
            <Callout.Root color="amber" variant="soft">
              <Callout.Icon>
                <Info size={14} />
              </Callout.Icon>
              <Callout.Text>
                This live demo runs on my Resend API key — the{' '}
                <strong>Send</strong> action can only deliver to my address.{' '}
                <a
                  href="https://github.com/imnotannamaria/resend-ecommerce"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 font-medium"
                >
                  Clone the repo
                </a>{' '}
                and set your own{' '}
                <code className="font-mono text-xs">RESEND_API_KEY</code> to
                send to any inbox.
              </Callout.Text>
            </Callout.Root>
          </section>
        )}

        <section className="max-w-2xl mx-auto px-6 pb-24">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-(--gray-9) mb-8 text-center">
            Get started in 3 steps
          </h2>
          <div className="flex flex-col">
            {STEPS.map(({ icon: Icon, title, code, note }, i) => (
              <div key={title} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full border border-(--gray-6) bg-(--gray-2) flex items-center justify-center text-(--gray-10)">
                    <Icon size={14} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px flex-1 my-1 bg-(--gray-6)"
                      style={{ minHeight: '2.5rem' }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-6">
                  <p className="text-sm font-medium mb-2 mt-1.5">{title}</p>
                  <CodeBlock code={code} note={note} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-(--gray-9) mb-2 text-center">
            Email templates
          </h2>
          <p className="text-(--gray-10) text-sm text-center mb-8">
            Four transactional emails covering the full order lifecycle.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EMAILS.map(({ icon: Icon, href, label, description }, i) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-3 border border-(--gray-5) rounded-xl p-5 hover:border-(--gray-8) hover:bg-(--gray-2) transition-all duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-(--gray-8) font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon size={16} className="text-(--gray-11)" />
                    <span className="font-semibold text-sm">{label}</span>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-(--gray-8) group-hover:text-(--gray-11) transition-colors"
                  />
                </div>
                <p className="text-(--gray-10) text-sm leading-relaxed">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-(--gray-9) mb-2 text-center">
            What you can do
          </h2>
          <p className="text-(--gray-10) text-sm text-center mb-8">
            Every template comes with two actions to test and integrate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACTIONS.map(({ icon: Icon, label, description }) => (
              <div
                key={label}
                className="flex flex-col gap-3 border border-(--gray-5) rounded-xl p-5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-(--gray-4) flex items-center justify-center">
                    <Icon size={14} className="text-(--gray-11)" />
                  </div>
                  <span className="font-semibold text-sm">{label}</span>
                </div>
                <p className="text-(--gray-10) text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-(--gray-5) px-4 py-8">
        <div className="w-full mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              Developed by{' '}
              <span className="font-semibold text-sm">Anna Maria</span>
            </p>
            <p className="text-(--gray-9) text-sm leading-relaxed">
              Always eager to learn, passionate about technology and building
              experiences that people love.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://github.com/imnotannamaria"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-(--gray-9) hover:text-(--gray-12) transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="GitHub"
                role="img"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <span className="text-(--gray-6)">·</span>
            <a
              href="mailto:anna.maria.dev.br@gmail.com"
              className="flex items-center gap-1.5 text-sm text-(--gray-9) hover:text-(--gray-12) transition-colors"
            >
              <Mail size={14} />
              Email
            </a>
            <span className="text-(--gray-6)">·</span>
            <a
              href="https://www.linkedin.com/in/imnotannamaria/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-(--gray-9) hover:text-(--gray-12) transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="LinkedIn"
                role="img"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
