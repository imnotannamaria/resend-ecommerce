import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Delivered',
  description:
    'Preview and customize the Order Delivered email template. Final notification confirming the package has been delivered to the customer.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
