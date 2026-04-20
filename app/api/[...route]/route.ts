import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { render } from 'react-email';
import { Resend } from 'resend';
import { OrderConfirmedEmail } from '@/app/emails/order-confirmed';
import { OrderCreatedEmail } from '@/app/emails/order-created';
import { OrderDeliveredEmail } from '@/app/emails/order-delivered';
import { OrderShippedEmail } from '@/app/emails/order-shipped';
import { env } from '@/env';

const app = new Hono().basePath('/api');
const resend = new Resend(env.RESEND_API_KEY);

function orderRef(body: { orderNumber?: string; order_id?: string }) {
  return body.orderNumber ?? body.order_id ?? '';
}

app.post('/orders/created/html', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderCreatedEmail(body));
  return c.json({ html });
});

app.post('/orders/created/send', async (c) => {
  const body = await c.req.json();

  const html = await render(OrderCreatedEmail(body));

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: body.to_email || 'anna.maria.dev.br@gmail.com',
    subject: `Order ${orderRef(body)} created`,
    html,
  });

  if (error) {
    return c.json({ error }, 400);
  }

  return c.json({ data });
});

app.post('/orders/confirmed/html', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderConfirmedEmail(body));
  return c.json({ html });
});

app.post('/orders/confirmed/send', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderConfirmedEmail(body));
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: body.to_email || 'anna.maria.dev.br@gmail.com',
    subject: `Payment confirmed for order ${orderRef(body)}`,
    html,
  });
  if (error) return c.json({ error }, 400);
  return c.json({ data });
});

app.post('/orders/shipped/html', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderShippedEmail(body));
  return c.json({ html });
});

app.post('/orders/shipped/send', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderShippedEmail(body));
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: body.to_email || 'anna.maria.dev.br@gmail.com',
    subject: `Your order ${orderRef(body)} has been shipped`,
    html,
  });
  if (error) return c.json({ error }, 400);
  return c.json({ data });
});

app.post('/orders/delivered/html', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderDeliveredEmail(body));
  return c.json({ html });
});

app.post('/orders/delivered/send', async (c) => {
  const body = await c.req.json();
  const html = await render(OrderDeliveredEmail(body));
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: body.to_email || 'anna.maria.dev.br@gmail.com',
    subject: `Your order ${orderRef(body)} has been delivered`,
    html,
  });
  if (error) return c.json({ error }, 400);
  return c.json({ data });
});

export const GET = handle(app);
export const POST = handle(app);
