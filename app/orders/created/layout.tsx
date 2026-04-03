import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Created',
  description:
    'Preview and customize the Order Created email template. Sent immediately after purchase — confirms order details, product summary, and estimated delivery.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
