import { render } from 'react-email';
import { describe, expect, it } from 'vitest';
import { OrderConfirmedEmail } from '@/app/emails/order-confirmed';
import { OrderCreatedEmail } from '@/app/emails/order-created';
import { OrderDeliveredEmail } from '@/app/emails/order-delivered';
import { OrderShippedEmail } from '@/app/emails/order-shipped';

const demoItem = {
  name: 'Wireless Headphones',
  quantity: 2,
  price: 49.99,
  image: 'https://example.com/p.png',
};

const baseOrder = {
  companyName: 'Acme Co',
  customerName: 'Jane Doe',
  orderNumber: 'ORD-001',
  items: [demoItem],
  subtotal: 99.98,
  total: 99.98,
  helpCenterUrl: 'https://acme.com/help',
  unsubscribeUrl: 'https://acme.com/unsub',
};

describe('OrderCreatedEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
      }),
    );
    expect(html).toBeTruthy();
  });

  it('includes order number', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
      }),
    );
    expect(html).toContain('ORD-001');
  });

  it('includes customer name', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
      }),
    );
    expect(html).toContain('Jane Doe');
  });

  it('includes product name', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
      }),
    );
    expect(html).toContain('Wireless Headphones');
  });

  it('includes expected delivery', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'Monday, June 3, 2024',
      }),
    );
    expect(html).toContain('Expected delivery');
    expect(html).toContain('Monday, June 3, 2024');
  });

  it('inlines accent color for brand highlights', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
        accentColor: '#2563eb',
      }),
    );
    expect(html).toContain('#2563eb');
  });

  it('inlines container radius for large preset', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
        radius: 'large',
      }),
    );
    expect(html).toMatch(/border-radius:\s*16px/i);
  });

  it('omits expected delivery block when showDelivery is false', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'Monday, June 3, 2024',
        showDelivery: false,
      }),
    );
    expect(html).not.toContain('Expected delivery');
    expect(html).not.toContain('Monday, June 3, 2024');
  });

  it('omits Help Center sign-off when showSignOff is false', async () => {
    const html = await render(
      OrderCreatedEmail({
        ...baseOrder,
        expectedDelivery: 'June 1, 2024',
        showSignOff: false,
      }),
    );
    expect(html).not.toContain('Help Center');
  });
});

describe('OrderConfirmedEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        paymentMethod: 'Visa **** 4242',
      }),
    );
    expect(html).toBeTruthy();
  });

  it('includes payment method', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        paymentMethod: 'Visa **** 4242',
      }),
    );
    expect(html).toContain('Visa **** 4242');
  });

  it('includes payment details section', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        paymentMethod: 'Visa **** 4242',
      }),
    );
    expect(html).toContain('Payment details');
  });

  it('uses accent on payment amount when provided', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        paymentMethod: 'Visa **** 4242',
        accentColor: '#16a34a',
      }),
    );
    expect(html).toContain('#16a34a');
  });

  it('omits payment details when showPayment is false', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        paymentMethod: 'Visa **** 4242',
        showPayment: false,
      }),
    );
    expect(html).not.toContain('Payment details');
    expect(html).not.toContain('Visa **** 4242');
  });

  it('omits Help Center sign-off when showSignOff is false', async () => {
    const html = await render(
      OrderConfirmedEmail({
        ...baseOrder,
        paymentMethod: 'Visa **** 4242',
        showSignOff: false,
      }),
    );
    expect(html).not.toContain('Help Center');
  });
});

describe('OrderShippedEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
      }),
    );
    expect(html).toBeTruthy();
  });

  it('includes tracking number', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
      }),
    );
    expect(html).toContain('TRK123456');
  });

  it('includes carrier when provided', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
        carrier: 'FedEx',
      }),
    );
    expect(html).toContain('FedEx');
  });

  it('includes tracking url when provided', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
        trackingUrl: 'https://track.fedex.com/TRK123456',
      }),
    );
    expect(html).toContain('https://track.fedex.com/TRK123456');
  });

  it('includes shipping information section', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
      }),
    );
    expect(html).toContain('Shipping information');
  });

  it('styles track button with accent', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
        accentColor: '#dc2626',
      }),
    );
    expect(html).toContain('#dc2626');
  });

  it('omits shipping / tracking block when showTracking is false', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
        showTracking: false,
      }),
    );
    expect(html).not.toContain('Shipping information');
    expect(html).not.toContain('TRK123456');
  });

  it('omits Help Center sign-off when showSignOff is false', async () => {
    const html = await render(
      OrderShippedEmail({
        ...baseOrder,
        trackingNumber: 'TRK123456',
        showSignOff: false,
      }),
    );
    expect(html).not.toContain('Help Center');
  });
});

describe('OrderDeliveredEmail', () => {
  it('renders without crashing', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
      }),
    );
    expect(html).toBeTruthy();
  });

  it('includes delivered date', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
      }),
    );
    expect(html).toContain('June 5, 2024');
  });

  it('includes review link when provided', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        reviewUrl: 'https://acme.com/review',
      }),
    );
    expect(html).toContain('https://acme.com/review');
  });

  it('includes review CTA copy', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        reviewUrl: 'https://acme.com/review',
      }),
    );
    expect(html).toContain('Leave a review');
  });

  it('includes delivery note when provided', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        deliveryNote: 'Left at front door',
      }),
    );
    expect(html).toContain('Left at front door');
  });

  it('uses accent on review CTA block when provided', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        accentColor: '#7c3aed',
      }),
    );
    expect(html).toContain('#7c3aed');
  });

  it('omits delivery confirmation when showDelivery is false', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        deliveryNote: 'Left at front door',
        showDelivery: false,
      }),
    );
    expect(html).not.toContain('Delivery confirmation');
    expect(html).not.toContain('June 5, 2024');
    expect(html).not.toContain('Left at front door');
  });

  it('omits review block when showReview is false', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        reviewUrl: 'https://acme.com/review',
        showReview: false,
      }),
    );
    expect(html).not.toContain('Leave a review');
    expect(html).not.toContain('Enjoying your purchase?');
  });

  it('omits Help Center sign-off when showSignOff is false', async () => {
    const html = await render(
      OrderDeliveredEmail({
        ...baseOrder,
        deliveredOn: 'June 5, 2024',
        showSignOff: false,
      }),
    );
    expect(html).not.toContain('Help Center');
  });
});
