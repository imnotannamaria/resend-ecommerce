import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';
import './globals.css';
import ThemeProvider from './theme-provider';

export const metadata: Metadata = {
  title: 'Resend Ecommerce',
  description:
    'Open-source starter kit for e-commerce transactional emails with Resend',
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
      </body>
    </html>
  );
}
