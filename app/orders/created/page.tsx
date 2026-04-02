"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Badge, Button, Flex, IconButton, ScrollArea, SegmentedControl, Separator, Switch, Text, TextField, Tooltip } from "@radix-ui/themes"
import { Check, Calendar, Copy, SendHorizontal, Square, SquareDashed, Circle, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useState, type CSSProperties } from "react"
import Link from "next/link"
import { FormField } from "@/app/components/form-field"
import { StepSection } from "@/app/components/step-section"

type Radius = "sharp" | "medium" | "large"
type Design = {
  accentColor: string
  accentHex: string
  radius: Radius
  showDelivery: boolean
  showSignOff: boolean
  showSocialLinks: boolean
}

const SECTIONS = [
  { label: "Delivery date", key: "showDelivery"   },
  { label: "Sign-off",      key: "showSignOff"     },
  { label: "Social links",  key: "showSocialLinks" },
] as const

const ACCENT_PRESETS = [
  { label: "Zinc",   value: "var(--color-zinc-900)",   hex: "#18181b" },
  { label: "Blue",   value: "var(--color-blue-600)",   hex: "#2563eb" },
  { label: "Green",  value: "var(--color-green-600)",  hex: "#16a34a" },
  { label: "Indigo", value: "var(--color-indigo-600)", hex: "#4f46e5" },
  { label: "Orange", value: "var(--color-orange-500)", hex: "#f97316" },
  { label: "Red",    value: "var(--color-red-600)",    hex: "#dc2626" },
  { label: "Rose",   value: "var(--color-rose-500)",   hex: "#f43f5e" },
  { label: "Teal",   value: "var(--color-teal-500)",   hex: "#14b8a6" },
  { label: "Sky",    value: "var(--color-sky-500)",    hex: "#0ea5e9" },
  { label: "Violet", value: "var(--color-violet-600)", hex: "#7c3aed" },
]

const RADIUS_OPTIONS: { label: string; value: Radius }[] = [
  { label: "Sharp",  value: "sharp"  },
  { label: "Medium", value: "medium" },
  { label: "Large",  value: "large"  },
]

const RADIUS_ICONS = { sharp: Square, medium: SquareDashed, large: Circle }
const previewRadius = { sharp: "rounded-none", medium: "rounded-lg", large: "rounded-2xl" }
const previewInnerRadius = { sharp: "rounded-none", medium: "rounded-md", large: "rounded-xl" }

const optionalUrl = z.union([z.url(), z.literal("")]).optional()

const variablesSchema = z.object({
  to_email:           z.union([z.email(), z.literal("")]).optional(),
  company_name:       z.string().min(1, "Required"),
  unsubscribe_url:    optionalUrl,
  facebook_url:       optionalUrl,
  twitter_url:        optionalUrl,
  instagram_url:      optionalUrl,
  customer_name:      z.string().min(1, "Required"),
  delivery_date:      z.string().min(1, "Required"),
  order_id:           z.string().min(1, "Required"),
  order_name:         z.string().min(1, "Required"),
  order_quantity:     z.string().min(1, "Required"),
  order_single_price: z.string().min(1, "Required"),
  order_price:        z.string().min(1, "Required"),
  order_image:        optionalUrl,
})

type Variables = z.infer<typeof variablesSchema>


export default function CreatedOrder() {
  const { register, watch, handleSubmit, trigger, formState: { errors, isSubmitting, isValid } } = useForm<Variables>({
    resolver: zodResolver(variablesSchema),
    defaultValues: {},
  })

  const [activeStep, setActiveStep] = useState(1)

  const [design, setDesign] = useState<Design>({
    accentColor: "var(--color-zinc-900)", accentHex: "#18181b",
    radius: "medium",
    showDelivery: true, showSignOff: true, showSocialLinks: true,
  })

  const variables = watch()

  function formatDate(value: string | undefined) {
    if (!value) return undefined
    const [year, month, day] = value.split("-").map(Number)
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })
      .format(new Date(year, month - 1, day))
  }

  function val(value: string | undefined, placeholder: string) {
    return { text: value || placeholder, isPlaceholder: !value }
  }

  const v = {
    company_name:       val(variables.company_name,       "COMPANY_NAME"),
    customer_name:      val(variables.customer_name,      "CUSTOMER_NAME"),
    delivery_date:      val(formatDate(variables.delivery_date), "DELIVERY_DATE"),
    order_id:           val(variables.order_id,           "ORDER_ID"),
    order_name:         val(variables.order_name,         "PRODUCT_NAME"),
    order_quantity:     val(variables.order_quantity,     "QTY"),
    order_single_price: val(variables.order_single_price, "UNIT_PRICE"),
    order_price:        val(variables.order_price,        "TOTAL_PRICE"),
    order_image:        variables.order_image || "",
    unsubscribe_url:    variables.unsubscribe_url || "#",
    facebook_url:       variables.facebook_url || "",
    twitter_url:        variables.twitter_url  || "",
    instagram_url:      variables.instagram_url || "",
  }

  function ph(field: { text: string; isPlaceholder: boolean }, className = "") {
    return (
      <span className={field.isPlaceholder ? `text-(--gray-7) ${className}` : className}>
        {field.text}
      </span>
    )
  }

  async function onCopy() {
    try {
      const res = await fetch('/api/orders/created/html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...variables, accent_color: design.accentHex, radius: design.radius, show_delivery: design.showDelivery, show_sign_off: design.showSignOff, show_social_links: design.showSocialLinks }),
      })
      const { html } = await res.json()
      await navigator.clipboard.writeText(html)
      toast.success('HTML copied to clipboard')
    } catch {
      toast.error('Failed to copy HTML')
    }
  }

  async function onSend(data: Variables) {
    try {
      const res = await fetch('/api/orders/created/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, accent_color: design.accentHex, radius: design.radius, show_delivery: design.showDelivery, show_sign_off: design.showSignOff, show_social_links: design.showSocialLinks }),
      })
      if (!res.ok) throw new Error()
      toast.success('Email sent successfully')
    } catch {
      toast.error('Failed to send email')
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]" style={{ "--accent": design.accentColor } as CSSProperties}>

      <div className="flex items-center justify-between px-5 py-3 border-b border-(--gray-5) shrink-0">
        <Flex align="center" gap="2">
          <Link href="/">
            <Text size="2" color="gray" className="hover:text-(--gray-12) transition-colors">Orders</Text>
          </Link>
          <Text size="2" color="gray">/</Text>
          <Flex align="center" gap="1">
            <ShoppingCart size={13} className="text-(--gray-10)" />
            <Text size="2" weight="medium">Order Created</Text>
          </Flex>
          <Badge color="green" variant="soft" size="1" radius="full">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            Live preview
          </Badge>
        </Flex>

        <Flex gap="2">
          <Tooltip content="Copy rendered HTML — paste directly into the Resend API">
            <Button variant="soft" color="gray" highContrast size="2" onClick={onCopy}>
              <Copy size={13} />
              Copy HTML
            </Button>
          </Tooltip>
          <Tooltip content={isValid ? "Send a test email to the address in the Email tab" : "Fill in all required fields before sending"}>
            <span>
              <Button variant="solid" color="gray" highContrast size="2" onClick={handleSubmit(onSend)} loading={isSubmitting} disabled={!isValid}>
                <SendHorizontal size={13} />
                Send
              </Button>
            </span>
          </Tooltip>
        </Flex>
      </div>

      <div className="flex flex-1 min-h-0">

        <div className="w-64 shrink-0 border-r border-(--gray-5) flex flex-col">
          <ScrollArea className="flex-1">
            <StepSection
              step={1} title="Email"
              done={activeStep > 1}
              locked={false}
              open={activeStep === 1}
              onToggle={() => setActiveStep(s => s === 1 ? 0 : 1)}
              onNext={async () => {
                const ok = await trigger(["to_email"])
                if (ok) setActiveStep(2)
              }}
              nextLabel="Continue to Brand →"
            >
              <FormField label="To" error={errors.to_email?.message}>
                <TextField.Root size="2" placeholder="anna.maria.dev.br@gmail.com" {...register("to_email")} />
              </FormField>
            </StepSection>

            <StepSection
              step={2} title="Brand"
              done={activeStep > 2}
              locked={activeStep < 2}
              open={activeStep === 2}
              onToggle={() => setActiveStep(s => s === 2 ? 1 : 2)}
              onNext={async () => {
                const ok = await trigger(["company_name", "unsubscribe_url", "facebook_url", "twitter_url", "instagram_url"])
                if (ok) setActiveStep(3)
              }}
              nextLabel="Continue to Order →"
            >
              <Flex direction="column" gap="3">
                <FormField label="Company name" error={errors.company_name?.message}>
                  <TextField.Root size="2" {...register("company_name")} />
                </FormField>
                <FormField label="Unsubscribe URL" error={errors.unsubscribe_url?.message}>
                  <TextField.Root size="2" placeholder="https://" {...register("unsubscribe_url")} />
                </FormField>
                <Separator size="4" />
                <FormField label="Facebook URL" error={errors.facebook_url?.message}>
                  <TextField.Root size="2" placeholder="https://facebook.com/…" {...register("facebook_url")} />
                </FormField>
                <FormField label="Twitter / X URL" error={errors.twitter_url?.message}>
                  <TextField.Root size="2" placeholder="https://twitter.com/…" {...register("twitter_url")} />
                </FormField>
                <FormField label="Instagram URL" error={errors.instagram_url?.message}>
                  <TextField.Root size="2" placeholder="https://instagram.com/…" {...register("instagram_url")} />
                </FormField>
              </Flex>
            </StepSection>

            <StepSection
              step={3} title="Order"
              done={activeStep > 3}
              locked={activeStep < 3}
              open={activeStep === 3}
              onToggle={() => setActiveStep(s => s === 3 ? 2 : 3)}
              onNext={async () => {
                const ok = await trigger(["customer_name", "delivery_date", "order_id", "order_name", "order_quantity", "order_single_price", "order_price", "order_image"])
                if (ok) setActiveStep(4)
              }}
              nextLabel="Done ✓"
            >
              <Flex direction="column" gap="3">
                <FormField label="Customer name" error={errors.customer_name?.message}>
                  <TextField.Root size="2" {...register("customer_name")} />
                </FormField>
                <FormField label="Delivery date" error={errors.delivery_date?.message}>
                  <TextField.Root size="2" type="date" {...register("delivery_date")} />
                </FormField>
                <FormField label="Order ID" error={errors.order_id?.message}>
                  <TextField.Root size="2" {...register("order_id")} />
                </FormField>
                <Separator size="4" />
                <FormField label="Product name" error={errors.order_name?.message}>
                  <TextField.Root size="2" {...register("order_name")} />
                </FormField>
                <FormField label="Quantity" error={errors.order_quantity?.message}>
                  <TextField.Root size="2" type="number" {...register("order_quantity")} />
                </FormField>
                <FormField label="Unit price" error={errors.order_single_price?.message}>
                  <TextField.Root size="2" type="number" {...register("order_single_price")} />
                </FormField>
                <FormField label="Total price" error={errors.order_price?.message}>
                  <TextField.Root size="2" type="number" {...register("order_price")} />
                </FormField>
                <FormField label="Product image URL" error={errors.order_image?.message}>
                  <TextField.Root size="2" placeholder="https://" {...register("order_image")} />
                </FormField>
              </Flex>
            </StepSection>
          </ScrollArea>
        </div>

        <div className="flex-1 bg-(--gray-2) overflow-auto flex items-start justify-center py-8 px-6">
          <div className={`w-full max-w-xl bg-white shadow-sm overflow-hidden font-sans text-sm text-zinc-800 ${previewRadius[design.radius]}`}>

            <div className="h-1 bg-(--accent)" />

            <div className="px-12 pt-10 pb-8 text-center border-b border-zinc-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5 bg-(--accent)">
                <Check size={20} stroke="white" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl font-bold mb-2 tracking-tight text-(--accent)">Order confirmed</h1>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-medium">
                Order #{ph(v.order_id)}
              </p>
            </div>

            <div className="px-12 py-10">
              <p className="text-zinc-800 font-medium mb-1">Hi {ph(v.customer_name)},</p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                Thank you for your order. We've received it and will send a shipping notification once your items are on the way.
              </p>

              {design.showDelivery && (
                <div className={`flex items-start gap-3 bg-zinc-50 border border-zinc-100 px-5 py-4 mb-8 ${previewInnerRadius[design.radius]}`}>
                  <Calendar size={16} className="mt-0.5 shrink-0 text-zinc-500" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-0.5">Expected delivery</p>
                    <p className="text-zinc-800 font-medium">{ph(v.delivery_date)}</p>
                  </div>
                </div>
              )}

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Order summary</p>

              <div className="flex gap-4 items-center py-4 border-t border-zinc-100">
                {v.order_image ? (
                  <Image alt="Order product" src={v.order_image} width={64} height={64}
                    className={`object-cover border border-zinc-100 shrink-0 ${previewInnerRadius[design.radius]}`} />
                ) : (
                  <div className={`w-16 h-16 bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-300 text-xs shrink-0 font-mono ${previewInnerRadius[design.radius]}`}>
                    IMG
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900 truncate">{ph(v.order_name)}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Qty: {ph(v.order_quantity)}</p>
                </div>
                <p className="font-semibold text-zinc-900 shrink-0 tabular-nums">{ph(v.order_single_price)}</p>
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
                  Questions about your order? Reply to this email or visit our{" "}
                  <a href="#" className="underline underline-offset-2 text-(--accent)">Help Center</a>.
                </p>
                <p className="text-zinc-800 font-medium mt-5">{ph(v.company_name)}</p>
              </div>
            )}

            <div className="bg-zinc-50 border-t border-zinc-100 px-12 py-6 flex items-center justify-between gap-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                You received this email because you placed an order.{" "}
                <a href={v.unsubscribe_url} className="underline underline-offset-2 text-(--accent)">Unsubscribe</a>
              </p>
              {design.showSocialLinks && (v.facebook_url || v.twitter_url || v.instagram_url) && (
                <div className="flex gap-2 shrink-0">
                  {v.facebook_url && (
                    <a href={v.facebook_url} className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors">
                      <svg width="12" height="12" fill="#a1a1aa" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                  )}
                  {v.twitter_url && (
                    <a href={v.twitter_url} className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors">
                      <svg width="12" height="12" fill="#a1a1aa" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    </a>
                  )}
                  {v.instagram_url && (
                    <a href={v.instagram_url} className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-zinc-400 transition-colors">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#a1a1aa"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="w-56 shrink-0 border-l border-(--gray-5) flex flex-col">
          <ScrollArea className="flex-1">
            <Flex direction="column" gap="6" p="4">

              <Flex direction="column" gap="3">
                <Text size="1" weight="bold" className="uppercase tracking-widest text-(--gray-9)">Accent</Text>
                <div className="grid grid-cols-5 gap-2">
                  {ACCENT_PRESETS.map(({ label, value, hex }) => (
                    <div key={value} className="flex items-center justify-center px-1 py-2">
                      <IconButton
                        title={label}
                        variant="ghost"
                        color="gray"
                        onClick={() => setDesign(d => ({ ...d, accentColor: value, accentHex: hex }))}
                        style={{ "--swatch": value } as CSSProperties}
                        className={`w-5! h-5! rounded-full! bg-(--swatch)! transition-all! ${design.accentColor === value ? "outline-2! outline-(--swatch-ring)! outline-offset-0!" : ""}`}
                      />
                    </div>
                  ))}
                </div>
                <TextField.Root
                  size="2"
                  value={design.accentHex}
                  maxLength={7}
                  onChange={e => {
                    const val = e.target.value
                    if (/^#[0-9a-fA-F]{0,6}$/.test(val)) setDesign(d => ({ ...d, accentColor: val, accentHex: val }))
                  }}
                >
                  <TextField.Slot>
                    <div className="w-3 h-3 rounded-full border border-(--gray-6) shrink-0 bg-(--accent)" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="3">
                <Text size="1" weight="bold" className="uppercase tracking-widest text-(--gray-9)">Sections</Text>
                <Flex direction="column" gap="3">
                  {SECTIONS.map(({ label, key }) => (
                    <Flex key={key} align="center" justify="between">
                      <Text size="2">{label}</Text>
                      <Switch
                        size="1"
                        checked={design[key]}
                        onCheckedChange={v => setDesign(d => ({ ...d, [key]: v }))}
                      />
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              <Separator size="4" />

              <Flex direction="column" gap="3">
                <Text size="1" weight="bold" className="uppercase tracking-widest text-(--gray-9)">Radius</Text>
                <SegmentedControl.Root
                  value={design.radius}
                  onValueChange={v => setDesign(d => ({ ...d, radius: v as Radius }))}
                  size="1"
                >
                  {RADIUS_OPTIONS.map(({ label, value }) => {
                    const Icon = RADIUS_ICONS[value]
                    return (
                      <SegmentedControl.Item key={value} value={value} title={label}>
                        <Icon size={12} />
                      </SegmentedControl.Item>
                    )
                  })}
                </SegmentedControl.Root>
              </Flex>

            </Flex>
          </ScrollArea>
        </div>

      </div>
    </div>
  )
}
