'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Badge,
  Button,
  Flex,
  ScrollArea,
  Separator,
  TextField,
  Tooltip,
} from '@radix-ui/themes';
import { Calendar, Copy, SendHorizontal, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type CSSProperties, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { BrandStep } from '@/app/components/brand-step';
import { DateInput } from '@/app/components/date-input';
import { DemoNotice } from '@/app/components/demo-notice';
import { DesignPanel, type Radius } from '@/app/components/design-panel';
import { FormField } from '@/app/components/form-field';
import { StepSection } from '@/app/components/step-section';
import { computeTotal, formatDate } from '@/app/lib/utils';

type Design = {
  accentColor: string;
  accentHex: string;
  radius: Radius;
  showDelivery: boolean;
  showSignOff: boolean;
  showSocialLinks: boolean;
};

const previewRadius = {
  sharp: 'rounded-none',
  medium: 'rounded-lg',
  large: 'rounded-2xl',
};
const previewInnerRadius = {
  sharp: 'rounded-none',
  medium: 'rounded-md',
  large: 'rounded-xl',
};

const optionalUrl = z.union([z.url(), z.literal('')]).optional();

const variablesSchema = z.object({
  to_email: z.union([z.email(), z.literal('')]).optional(),
  company_name: z.string().min(1, 'Required'),
  help_center_url: optionalUrl,
  unsubscribe_url: optionalUrl,
  twitter_url: optionalUrl,
  instagram_url: optionalUrl,
  customer_name: z.string().min(1, 'Required'),
  delivery_date: z.string().min(1, 'Required'),
  order_id: z.string().min(1, 'Required'),
  order_name: z.string().min(1, 'Required'),
  order_quantity: z.string().min(1, 'Required'),
  order_single_price: z.string().min(1, 'Required'),
  order_image: optionalUrl,
});

type Variables = z.infer<typeof variablesSchema>;

export default function CreatedOrder() {
  const {
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Variables>({
    resolver: zodResolver(variablesSchema),
    defaultValues: {},
  });

  const [activeStep, setActiveStep] = useState(1);
  const [design, setDesign] = useState<Design>({
    accentColor: 'var(--color-zinc-900)',
    accentHex: '#18181b',
    radius: 'medium',
    showDelivery: true,
    showSignOff: true,
    showSocialLinks: true,
  });

  const variables = watch();
  const orderTotal = computeTotal(
    variables.order_quantity,
    variables.order_single_price,
  );

  function val(value: string | undefined, placeholder: string) {
    return { text: value || placeholder, isPlaceholder: !value };
  }

  const v = {
    company_name: val(variables.company_name, 'COMPANY_NAME'),
    customer_name: val(variables.customer_name, 'CUSTOMER_NAME'),
    delivery_date: val(formatDate(variables.delivery_date), 'DELIVERY_DATE'),
    order_id: val(variables.order_id, 'ORDER_ID'),
    order_name: val(variables.order_name, 'PRODUCT_NAME'),
    order_quantity: val(variables.order_quantity, 'QTY'),
    order_single_price: val(variables.order_single_price, 'UNIT_PRICE'),
    order_price: val(orderTotal, 'TOTAL_PRICE'),
    order_image: variables.order_image || '',
    unsubscribe_url: variables.unsubscribe_url || '#',
    help_center_url: variables.help_center_url || 'https://example.com/help',
    twitter_url: variables.twitter_url || '',
    instagram_url: variables.instagram_url || '',
  };

  function ph(field: { text: string; isPlaceholder: boolean }, className = '') {
    return (
      <span
        className={
          field.isPlaceholder ? `text-(--gray-7) ${className}` : className
        }
      >
        {field.text}
      </span>
    );
  }

  function buildPayload(data: Variables) {
    return {
      ...data,
      order_price: computeTotal(data.order_quantity, data.order_single_price),
      accent_color: design.accentHex,
      radius: design.radius,
      show_delivery: design.showDelivery,
      show_sign_off: design.showSignOff,
      show_social_links: design.showSocialLinks,
    };
  }

  async function onCopy() {
    try {
      const res = await fetch('/api/orders/created/html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(variables as Variables)),
      });
      const { html } = await res.json();
      await navigator.clipboard.writeText(html);
      toast.success('HTML copied to clipboard');
    } catch {
      toast.error('Failed to copy HTML');
    }
  }

  async function onSend(data: Variables) {
    try {
      const res = await fetch('/api/orders/created/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(data)),
      });
      if (!res.ok) throw new Error();
      toast.success('Email sent successfully');
    } catch {
      toast.error('Failed to send email');
    }
  }

  return (
    <div
      className="flex flex-col lg:h-[calc(100vh-3.5rem)]"
      style={{ '--accent': design.accentColor } as CSSProperties}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-(--gray-5) shrink-0">
        <Flex align="center" gap="2">
          <Link href="/">
            <span className="text-sm text-(--gray-10) hover:text-(--gray-12) transition-colors">
              Orders
            </span>
          </Link>
          <span className="text-sm text-(--gray-10)">/</span>
          <Flex align="center" gap="1">
            <ShoppingCart size={13} className="text-(--gray-10)" />
            <span className="text-sm font-medium">Order Created</span>
          </Flex>
          <Badge color="green" variant="soft" size="1" radius="full">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            Live preview
          </Badge>
        </Flex>
        <div className="flex gap-2 w-full sm:w-auto">
          <Tooltip content="Copy rendered HTML — paste directly into the Resend API">
            <Button
              variant="soft"
              color="gray"
              highContrast
              size="2"
              onClick={onCopy}
            >
              <Copy size={13} />
              Copy HTML
            </Button>
          </Tooltip>
          <Tooltip
            content={
              isValid
                ? 'Send a test email to the address in the Email tab'
                : 'Fill in all required fields before sending'
            }
          >
            <span style={{ flex: 1, display: 'flex' }}>
              <Button
                variant="solid"
                color="gray"
                highContrast
                size="2"
                onClick={handleSubmit(onSend)}
                loading={isSubmitting}
                disabled={!isValid}
              >
                <SendHorizontal size={13} />
                Send
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 lg:min-h-0 overflow-auto lg:overflow-hidden">
        <div className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-(--gray-5) flex flex-col">
          <ScrollArea className="flex-1">
            <StepSection
              step={1}
              title="Email"
              done={activeStep > 1}
              locked={false}
              open={activeStep === 1}
              onToggle={() => setActiveStep((s) => (s === 1 ? 0 : 1))}
              onNext={async () => {
                const ok = await trigger(['to_email']);
                if (ok) setActiveStep(2);
              }}
              nextLabel="Continue to Brand →"
            >
              <FormField label="To" error={errors.to_email?.message}>
                <TextField.Root
                  size="2"
                  placeholder="anna.maria.dev.br@gmail.com"
                  {...register('to_email')}
                />
              </FormField>
            </StepSection>

            <BrandStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              register={register}
              errors={errors}
              trigger={trigger}
            />

            <StepSection
              step={3}
              title="Order"
              done={activeStep > 3}
              locked={activeStep < 3}
              open={activeStep === 3}
              onToggle={() => setActiveStep((s) => (s === 3 ? 2 : 3))}
              onNext={async () => {
                const ok = await trigger([
                  'customer_name',
                  'delivery_date',
                  'order_id',
                  'order_name',
                  'order_quantity',
                  'order_single_price',
                  'order_image',
                ]);
                if (ok) setActiveStep(4);
              }}
              nextLabel="Done ✓"
            >
              <Flex direction="column" gap="3">
                <FormField
                  label="Customer name"
                  required
                  error={errors.customer_name?.message}
                >
                  <TextField.Root
                    size="2"
                    placeholder="Joanne G"
                    {...register('customer_name')}
                  />
                </FormField>
                <FormField
                  label="Delivery date"
                  required
                  error={errors.delivery_date?.message}
                >
                  <DateInput
                    value={variables.delivery_date}
                    {...register('delivery_date')}
                  />
                </FormField>
                <FormField
                  label="Order ID"
                  required
                  error={errors.order_id?.message}
                >
                  <TextField.Root
                    size="2"
                    placeholder="ORD-1234"
                    {...register('order_id')}
                  />
                </FormField>
                <Separator size="4" />
                <FormField
                  label="Product name"
                  required
                  error={errors.order_name?.message}
                >
                  <TextField.Root
                    size="2"
                    placeholder="Wireless Headphones"
                    {...register('order_name')}
                  />
                </FormField>
                <FormField
                  label="Quantity"
                  required
                  error={errors.order_quantity?.message}
                >
                  <TextField.Root
                    size="2"
                    placeholder="1"
                    type="number"
                    {...register('order_quantity')}
                  />
                </FormField>
                <FormField
                  label="Unit price"
                  required
                  error={errors.order_single_price?.message}
                >
                  <TextField.Root
                    size="2"
                    placeholder="99.00"
                    type="number"
                    {...register('order_single_price')}
                  />
                </FormField>
                <FormField label="Total price">
                  <TextField.Root
                    size="2"
                    value={orderTotal || ''}
                    placeholder="Auto-calculated"
                    readOnly
                    className="opacity-70 cursor-not-allowed"
                  />
                </FormField>
                <FormField
                  label="Product image URL"
                  error={errors.order_image?.message}
                >
                  <TextField.Root
                    size="2"
                    placeholder="https://acme.com/product.jpg"
                    {...register('order_image')}
                  />
                </FormField>
              </Flex>
            </StepSection>
          </ScrollArea>
          <DemoNotice />
        </div>

        <div className="flex-1 bg-(--gray-2) overflow-auto flex items-start justify-center py-8 px-6">
          <div
            className={`w-full max-w-xl bg-white shadow-sm overflow-hidden font-sans text-sm text-zinc-800 ${previewRadius[design.radius]}`}
          >
            <div className="h-1 bg-(--accent)" />

            <div className="px-12 pt-10 pb-8 text-center border-b border-zinc-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5 bg-(--accent)">
                <ShoppingCart size={20} stroke="white" strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-bold mb-2 tracking-tight text-(--accent)">
                Order created
              </h1>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-medium">
                Order #{ph(v.order_id)}
              </p>
            </div>

            <div className="px-12 py-10">
              <p className="text-zinc-800 font-medium mb-1">
                Hi {ph(v.customer_name)},
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                Thank you for your order. We've received it and will send a
                shipping notification once your items are on the way.
              </p>

              {design.showDelivery && (
                <div
                  className={`flex items-start gap-3 bg-zinc-50 border border-zinc-100 px-5 py-4 mb-8 ${previewInnerRadius[design.radius]}`}
                >
                  <Calendar
                    size={16}
                    className="mt-0.5 shrink-0 text-zinc-500"
                  />
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-0.5">
                      Expected delivery
                    </p>
                    <p className="text-zinc-800 font-medium">
                      {ph(v.delivery_date)}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                Order summary
              </p>

              <div className="flex gap-4 items-center py-4 border-t border-zinc-100">
                {v.order_image ? (
                  <Image
                    alt="Order product"
                    src={v.order_image}
                    width={64}
                    height={64}
                    className={`object-cover border border-zinc-100 shrink-0 ${previewInnerRadius[design.radius]}`}
                  />
                ) : (
                  <div
                    className={`w-16 h-16 bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-300 text-xs shrink-0 font-mono ${previewInnerRadius[design.radius]}`}
                  >
                    IMG
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900 truncate">
                    {ph(v.order_name)}
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    Qty: {ph(v.order_quantity)}
                  </p>
                </div>
                <p className="font-semibold text-zinc-900 shrink-0 tabular-nums">
                  {ph(v.order_single_price)}
                </p>
              </div>

              <div className="border-t border-zinc-100 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{ph(v.order_price)}</span>
                </div>
                <div className="flex justify-between font-semibold text-zinc-900 text-base pt-2 border-t border-zinc-100">
                  <span>Total</span>
                  <span className="tabular-nums">{ph(v.order_price)}</span>
                </div>
              </div>
            </div>

            {design.showSignOff && (
              <div className="px-12 pb-10 border-t border-zinc-100 pt-8">
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Questions about your order? Reply to this email or visit our{' '}
                  <a
                    href={v.help_center_url}
                    className="underline underline-offset-2 text-(--accent)"
                  >
                    Help Center
                  </a>
                  .
                </p>
                <p className="text-zinc-800 font-medium mt-5">
                  {ph(v.company_name)}
                </p>
              </div>
            )}

            <div className="bg-zinc-50 border-t border-zinc-100 px-12 py-6 flex items-center justify-between gap-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                You received this email because you placed an order.{' '}
                <a
                  href={v.unsubscribe_url}
                  className="underline underline-offset-2 text-(--accent)"
                >
                  Unsubscribe
                </a>
              </p>
              {design.showSocialLinks && (
                <div className="flex gap-2 shrink-0">
                  <a
                    href={v.twitter_url || '#'}
                    aria-label="Twitter"
                    className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors text-[13px] text-zinc-400"
                  >
                    𝕏
                  </a>
                  <a
                    href={v.instagram_url || '#'}
                    aria-label="Instagram"
                    className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors"
                  >
                    <Image
                      src="/instagram.png"
                      alt="Instagram"
                      width={16}
                      height={16}
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <DesignPanel
          accentColor={design.accentColor}
          accentHex={design.accentHex}
          radius={design.radius}
          sections={[
            {
              label: 'Delivery date',
              key: 'showDelivery',
              value: design.showDelivery,
            },
            {
              label: 'Sign-off',
              key: 'showSignOff',
              value: design.showSignOff,
            },
            {
              label: 'Social links',
              key: 'showSocialLinks',
              value: design.showSocialLinks,
            },
          ]}
          onAccentChange={(color, hex) =>
            setDesign((d) => ({ ...d, accentColor: color, accentHex: hex }))
          }
          onRadiusChange={(r) => setDesign((d) => ({ ...d, radius: r }))}
          onSectionChange={(key, value) =>
            setDesign((d) => ({ ...d, [key]: value }))
          }
        />
      </div>
    </div>
  );
}
