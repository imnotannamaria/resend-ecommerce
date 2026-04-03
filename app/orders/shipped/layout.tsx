import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Shipped',
  description:
    'Preview and customize the Order Shipped email template. Dispatched when the package leaves the warehouse — includes tracking information.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
