"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Flex, IconButton, SegmentedControl, Switch, Tabs, Text, TextField } from "@radix-ui/themes"
import { Check, Calendar, Copy, SendHorizontal, Square, SquareDashed, Circle } from "lucide-react"
import { toast } from "sonner"
import { useState, type CSSProperties } from "react"

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
  { label: "Delivery date", key: "showDelivery"    },
  { label: "Sign-off",      key: "showSignOff"      },
  { label: "Social links",  key: "showSocialLinks"  },
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
  company_name:     z.string().min(1, "Required"),
  unsubscribe_url:  optionalUrl,
  facebook_url:     optionalUrl,
  twitter_url:      optionalUrl,
  instagram_url:    optionalUrl,
  customer_name:    z.string().min(1, "Required"),
  delivery_date:    z.string().min(1, "Required"),
  order_id:         z.string().min(1, "Required"),
  order_name:       z.string().min(1, "Required"),
  order_quantity:   z.string().min(1, "Required"),
  order_single_price: z.string().min(1, "Required"),
  order_price:      z.string().min(1, "Required"),
  order_image:      optionalUrl,
})

type Variables = z.infer<typeof variablesSchema>

export default function CreatedOrder() {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<Variables>({
    resolver: zodResolver(variablesSchema),
  })

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
      <span className={field.isPlaceholder ? `text-zinc-300 ${className}` : className}>
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
    <div className="p-2 flex flex-col gap-4" style={{ "--accent": design.accentColor } as CSSProperties}>
      <div className="flex gap-2 justify-end">
        <Button variant="soft" color="gray" highContrast onClick={onCopy}>
          <Copy size={14} />
          Copy
        </Button>
        <Button variant="solid" color="gray" highContrast onClick={handleSubmit(onSend)} loading={isSubmitting}>
          <SendHorizontal size={14} />
          Send
        </Button>
      </div>

      <div className="grid grid-cols-[1fr_4fr_1fr] gap-4">

        <div className="w-full">
          <Tabs.Root defaultValue="brand">
            <Tabs.List size="2" className="w-full">
              <Tabs.Trigger value="brand" className="flex-1 justify-center">Brand</Tabs.Trigger>
              <Tabs.Trigger value="order" className="flex-1 justify-center">Order</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="brand" className="pt-4">
              <Flex direction="column" gap="3">
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Company name</Text>
                  <TextField.Root {...register("company_name")} />
                  {errors.company_name && <Text size="1" color="red">{errors.company_name.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Unsubscribe URL</Text>
                  <TextField.Root placeholder="https://" {...register("unsubscribe_url")} />
                  {errors.unsubscribe_url && <Text size="1" color="red">{errors.unsubscribe_url.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Facebook URL</Text>
                  <TextField.Root placeholder="https://facebook.com/…" {...register("facebook_url")} />
                  {errors.facebook_url && <Text size="1" color="red">{errors.facebook_url.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Twitter / X URL</Text>
                  <TextField.Root placeholder="https://twitter.com/…" {...register("twitter_url")} />
                  {errors.twitter_url && <Text size="1" color="red">{errors.twitter_url.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Instagram URL</Text>
                  <TextField.Root placeholder="https://instagram.com/…" {...register("instagram_url")} />
                  {errors.instagram_url && <Text size="1" color="red">{errors.instagram_url.message}</Text>}
                </Flex>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="order" className="pt-4">
              <Flex direction="column" gap="3">
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Customer name</Text>
                  <TextField.Root {...register("customer_name")} />
                  {errors.customer_name && <Text size="1" color="red">{errors.customer_name.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Delivery date</Text>
                  <TextField.Root type="date" {...register("delivery_date")} />
                  {errors.delivery_date && <Text size="1" color="red">{errors.delivery_date.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Order ID</Text>
                  <TextField.Root {...register("order_id")} />
                  {errors.order_id && <Text size="1" color="red">{errors.order_id.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Product name</Text>
                  <TextField.Root {...register("order_name")} />
                  {errors.order_name && <Text size="1" color="red">{errors.order_name.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Quantity</Text>
                  <TextField.Root type="number" {...register("order_quantity")} />
                  {errors.order_quantity && <Text size="1" color="red">{errors.order_quantity.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Unit price</Text>
                  <TextField.Root type="number" {...register("order_single_price")} />
                  {errors.order_single_price && <Text size="1" color="red">{errors.order_single_price.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Total price</Text>
                  <TextField.Root type="number" {...register("order_price")} />
                  {errors.order_price && <Text size="1" color="red">{errors.order_price.message}</Text>}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text as="label" size="2" weight="bold">Product image URL</Text>
                  <TextField.Root placeholder="https://" {...register("order_image")} />
                  {errors.order_image && <Text size="1" color="red">{errors.order_image.message}</Text>}
                </Flex>
              </Flex>
            </Tabs.Content>
          </Tabs.Root>
        </div>

        <div className="w-full">
          <div className={`max-w-150 mx-auto bg-white border border-zinc-200 overflow-hidden font-sans text-sm text-zinc-800 ${previewRadius[design.radius]}`}>

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
              <p className="text-zinc-800 font-medium mb-1">
                Hi {ph(v.customer_name)},
              </p>
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
                  <Image
                    alt="Order product"
                    src={v.order_image}
                    width={64}
                    height={64}
                    className={`object-cover border border-zinc-100 shrink-0 ${previewInnerRadius[design.radius]}`}
                  />
                ) : (
                  <div className={`w-16 h-16 bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-300 text-xs shrink-0 font-mono ${previewInnerRadius[design.radius]}`}>
                    IMG
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900 truncate">{ph(v.order_name)}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Qty: {ph(v.order_quantity)}</p>
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
                  Questions about your order? Reply to this email or visit our{" "}
                  <a href="#" className="underline underline-offset-2 text-(--accent)">Help Center</a>.
                </p>
                <p className="text-zinc-800 font-medium mt-5">
                  {ph(v.company_name)}
                </p>
              </div>
            )}

            <div className="bg-zinc-50 border-t border-zinc-100 px-12 py-6 flex items-center justify-between gap-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                You received this email because you placed an order.{" "}
                <a href={v.unsubscribe_url} className="underline underline-offset-2 text-(--accent)">
                  Unsubscribe
                </a>
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

        <div className="w-full flex flex-col gap-10 pt-1">
          <div className="flex flex-col gap-4">
            <Text size="1" weight="bold" className="uppercase tracking-widest text-(--gray-10)">Accent</Text>
            <div className="flex flex-wrap gap-4">
              {ACCENT_PRESETS.map(({ label, value, hex }) => (
                <IconButton
                  key={value}
                  title={label}
                  variant="ghost"
                  color="gray"
                  onClick={() => setDesign(d => ({ ...d, accentColor: value, accentHex: hex }))}
                  style={{ "--swatch": value } as CSSProperties}
                  className={`w-6! h-6! rounded-full! bg-(--swatch)! transition-all! ${design.accentColor === value ? "outline-2! outline-white! outline-offset!" : ""}`}
                />
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
                <div className="w-3 h-3 rounded-full border border-zinc-300 shrink-0 bg-(--accent)" />
              </TextField.Slot>
            </TextField.Root>
          </div>

          <div className="flex flex-col gap-3">
            <Text size="1" weight="bold" className="uppercase tracking-widest text-(--gray-10)">Sections</Text>
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
          </div>

          <div className="flex flex-col gap-3">
            <Text size="1" weight="bold" className="uppercase tracking-widest text-(--gray-10)">Radius</Text>
            <SegmentedControl.Root
              value={design.radius}
              onValueChange={v => setDesign(d => ({ ...d, radius: v as Radius }))}
              size="2"
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
          </div>
        </div>
      </div>
    </div>
  )
}
