import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';
import './globals.css';
import ThemeProvider from './theme-provider';

const baseUrl = 'https://resend-ecommerce.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Resend Ecommerce — Transactional Email Templates',
    template: '%s | Resend Ecommerce',
  },
  description:
    'Open-source transactional email templates for e-commerce. Order created, confirmed, shipped, and delivered — built with React Email and Resend. Customize, preview, and send in minutes.',
  keywords: [
    'resend',
    'email templates',
    'transactional email',
    'e-commerce',
    'react email',
    'order confirmation',
    'order shipped',
    'order delivered',
    'open source',
  ],
  authors: [{ name: 'Anna Maria', url: 'https://github.com/imnotannamaria' }],
  creator: 'Anna Maria',
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'Resend Ecommerce — Transactional Email Templates',
    description:
      'Open-source transactional email templates for e-commerce. Built with React Email and Resend.',
    siteName: 'Resend Ecommerce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resend Ecommerce — Transactional Email Templates',
    description:
      'Open-source transactional email templates for e-commerce. Built with React Email and Resend.',
    creator: '@imnotannamaria',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
