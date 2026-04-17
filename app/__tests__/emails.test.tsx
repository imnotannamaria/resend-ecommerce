import { render } from 'react-email';
import { describe, expect, it } from 'vitest';
import { OrderConfirmedEmail } from '@/app/emails/order-confirmed';
import { OrderCreatedEmail } from '@/app/emails/order-created';
import { OrderDeliveredEmail } from '@/app/emails/order-delivered';
import { OrderShippedEmail } from '@/app/emails/order-shipped';

const baseOrder = {
  company_name: 'Acme Co',
  customer_name: 'Jane Doe',
  order_id: 'ORD-001',
  order_name: 'Wireless Headphones',
  order_quantity: '2',
  order_single_price: '$49.99',
  order_price: '$99.98',
};

describe('OrderCreatedEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderCreatedEmail({ ...baseOrder, delivery_date: '2024-06-01' }),
    );
    expect(html).toBeTruthy();
  });

  it('includes order id', async () => {
    const html = await render(
      OrderCreatedEmail({ ...baseOrder, delivery_date: '2024-06-01' }),
    );
    expect(html).toContain('ORD-001');
  });

  it('includes customer name', async () => {
    const html = await render(
      OrderCreatedEmail({ ...baseOrder, delivery_date: '2024-06-01' }),
    );
    expect(html).toContain('Jane Doe');
  });

  it('includes product name', async () => {
    const html = await render(
      OrderCreatedEmail({ ...baseOrder, delivery_date: '2024-06-01' }),
    );
    expect(html).toContain('Wireless Headphones');
  });

  it('hides delivery section when show_delivery is false', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        delivery_date: '2024-06-01',
        show_delivery: false,
      }),
    );
    expect(html).not.toContain('Expected delivery');
  });

  it('hides sign-off when show_sign_off is false', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        delivery_date: '2024-06-01',
        show_sign_off: false,
      }),
    );
    expect(html).not.toContain('Help Center');
  });

  it('shows social links when urls are provided', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        delivery_date: '2024-06-01',
        twitter_url: 'https://x.com/acme',
        instagram_url: 'https://instagram.com/acme',
      }),
    );
    expect(html).toContain('https://x.com/acme');
    expect(html).toContain('https://instagram.com/acme');
  });

  it('applies accent color', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        delivery_date: '2024-06-01',
        accent_color: '#ff0000',
      }),
    );
    expect(html).toContain('#ff0000');
  });
});

describe('OrderConfirmedEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderConfirmedEmail({ ...baseOrder, payment_method: 'Visa **** 4242' }),
    );
    expect(html).toBeTruthy();
  });

  it('includes payment method', async () => {
    const html = await render(
      OrderConfirmedEmail({ ...baseOrder, payment_method: 'Visa **** 4242' }),
    );
    expect(html).toContain('Visa **** 4242');
  });

  it('hides payment section when show_payment is false', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        payment_method: 'Visa **** 4242',
        show_payment: false,
      }),
    );
    expect(html).not.toContain('Payment details');
  });
});

describe('OrderShippedEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderShippedEmail({ ...baseOrder, tracking_number: 'TRK123456' }),
    );
    expect(html).toBeTruthy();
  });

  it('includes tracking number', async () => {
    const html = await render(
      OrderShippedEmail({ ...baseOrder, tracking_number: 'TRK123456' }),
    );
    expect(html).toContain('TRK123456');
  });

  it('includes carrier when provided', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        tracking_number: 'TRK123456',
        carrier: 'FedEx',
      }),
    );
    expect(html).toContain('FedEx');
  });

  it('includes tracking url when provided', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        tracking_number: 'TRK123456',
        tracking_url: 'https://track.fedex.com/TRK123456',
      }),
    );
    expect(html).toContain('https://track.fedex.com/TRK123456');
  });

  it('hides tracking section when show_tracking is false', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        tracking_number: 'TRK123456',
        show_tracking: false,
      }),
    );
    expect(html).not.toContain('Shipping information');
  });
});

describe('OrderDeliveredEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderDeliveredEmail({ ...baseOrder, delivered_date: '2024-06-05' }),
    );
    expect(html).toBeTruthy();
  });

  it('includes delivered date', async () => {
    const html = await render(
      OrderDeliveredEmail({ ...baseOrder, delivered_date: '2024-06-05' }),
    );
    expect(html).toContain('June 5, 2024');
  });

  it('includes review link when provided', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        delivered_date: '2024-06-05',
        review_url: 'https://acme.com/review',
      }),
    );
    expect(html).toContain('https://acme.com/review');
  });

  it('hides review section when show_review is false', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        delivered_date: '2024-06-05',
        review_url: 'https://acme.com/review',
        show_review: false,
      }),
    );
    expect(html).not.toContain('Leave a review');
  });

  it('includes delivery note when provided', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        delivered_date: '2024-06-05',
        delivery_note: 'Left at front door',
      }),
    );
    expect(html).toContain('Left at front door');
  });
});
