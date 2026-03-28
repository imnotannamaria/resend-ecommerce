import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resende Ecommerce',
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
      <body>
        <Theme>
          <header className="w-full border-b border-zinc-200 p-4 flex items-center justify-center">
            <h1 className='font-bold text-xl'>resend-ecommerce</h1>
          </header>
          {children}
        </Theme>
      </body>
    </html>
  );
}
