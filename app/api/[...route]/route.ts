import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { env } from '@/env';
import { OrderCreatedEmail } from '@/app/emails/order-created';

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
    to: 'anna.maria.dev.br@gmail.com',
    subject: `Order ${body.order_id} confirmed`,
    html,
  });

  if (error) {
    return c.json({ error }, 400);
  }

  return c.json({ data });
});

export const GET = handle(app);
export const POST = handle(app);
