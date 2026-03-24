import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'resend-ecommerce',
  description:
    'Open-source starter kit for e-commerce transactional emails with Resend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
