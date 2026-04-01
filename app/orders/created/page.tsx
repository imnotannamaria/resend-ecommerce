"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Flex, Tabs, Text, TextField } from "@radix-ui/themes"
import { Check, Calendar } from "lucide-react"

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

  async function onSend(data: Variables) {
    await fetch('/api/orders/created/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className="flex gap-4 justify-end">
        <Button>Copy</Button>
        <Button onClick={handleSubmit(onSend)} loading={isSubmitting}>Send</Button>
      </div>

      <div className="grid grid-cols-[1fr_4fr_1fr] gap-4">

        <div className="w-full">
          <Tabs.Root defaultValue="brand">
            <Tabs.List size="1" className="w-full">
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
          <div className="max-w-150 mx-auto bg-white border border-zinc-200 rounded-lg overflow-hidden font-sans text-sm text-zinc-800">

            <div className="h-1 bg-zinc-900" />

            <div className="px-12 pt-10 pb-8 text-center border-b border-zinc-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-5">
                <Check size={20} stroke="white" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">Order confirmed</h1>
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

              <div className="flex items-start gap-3 bg-zinc-50 border border-zinc-100 rounded-lg px-5 py-4 mb-8">
                <Calendar size={16} className="mt-0.5 shrink-0 text-zinc-500" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-0.5">Expected delivery</p>
                  <p className="text-zinc-800 font-medium">{ph(v.delivery_date)}</p>
                </div>
              </div>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Order summary</p>

              <div className="flex gap-4 items-center py-4 border-t border-zinc-100">
                {v.order_image ? (
                  <Image
                    alt="Order product"
                    src={v.order_image}
                    width={64}
                    height={64}
                    className="rounded-md object-cover border border-zinc-100 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-300 text-xs shrink-0 font-mono">
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

            <div className="px-12 pb-10 border-t border-zinc-100 pt-8">
              <p className="text-zinc-500 text-sm leading-relaxed">
                Questions about your order? Reply to this email or visit our{" "}
                <a href="#" className="text-zinc-900 underline underline-offset-2">Help Center</a>.
              </p>
              <p className="text-zinc-800 font-medium mt-5">
                {ph(v.company_name)}
              </p>
            </div>

            <div className="bg-zinc-50 border-t border-zinc-100 px-12 py-6 flex items-center justify-between gap-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                You received this email because you placed an order.{" "}
                <a href={v.unsubscribe_url} className="underline underline-offset-2 text-zinc-400">
                  Unsubscribe
                </a>
              </p>

              {(v.facebook_url || v.twitter_url || v.instagram_url) && (
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

        <div className="w-full p-2" />
      </div>
    </div>
  )
}
