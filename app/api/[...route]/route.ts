import { render } from '@react-email/render';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { Resend } from 'resend';
import { OrderConfirmedEmail } from '@/app/emails/order-confirmed';
import { OrderCreatedEmail } from '@/app/emails/order-created';
import { env } from '@/env';

const app = new Hono().basePath('/api');
const resend = new Resend(env.RESEND_API_KEY);

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
    subject: `Order ${body.order_id} confirmed`,
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
    subject: `Payment confirmed for order ${body.order_id}`,
    html,
  });
  if (error) return c.json({ error }, 400);
  return c.json({ data });
});

export const GET = handle(app);
export const POST = handle(app);
