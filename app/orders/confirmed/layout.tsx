import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description:
    'Preview and customize the Order Confirmed email template. Sent when payment is verified and the merchant confirms the order is being prepared.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
