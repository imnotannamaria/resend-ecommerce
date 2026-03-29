"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Flex, Text, TextField } from "@radix-ui/themes"

const variablesSchema = z.object({
  customer_name: z.string().min(1, "Required"),
  delivery_date: z.string().min(1, "Required"),
  order_id: z.string().min(1, "Required"),
  order_name: z.string().min(1, "Required"),
  order_quantity: z.string().min(1, "Required"),
  order_single_price: z.string().min(1, "Required"),
  order_price: z.string().min(1, "Required"),
  order_image: z.url("Must be a valid URL"),
})

type Variables = z.infer<typeof variablesSchema>

export default function CreatedOrder() {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<Variables>({
    resolver: zodResolver(variablesSchema),
  })

  const variables = watch()

  async function onSend(data: Variables) {
    await fetch('/api/orders/created/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className='flex gap-4 justify-end'>
        <Button>Copy</Button>
        <Button onClick={handleSubmit(onSend)} loading={isSubmitting}>Send</Button>
      </div>

      <div className="grid grid-cols-[1fr_4fr_1fr] gap-4">
        <div className="w-full p-2">
          <form>
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
                <Text as="label" size="2" weight="bold">Order name</Text>
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
                <Text as="label" size="2" weight="bold">Image URL</Text>
                <TextField.Root {...register("order_image")} />
                {errors.order_image && <Text size="1" color="red">{errors.order_image.message}</Text>}
              </Flex>
            </Flex>
          </form>
        </div>

        <div className="w-full p-2">
          <p>Thank you for your order, {variables.customer_name}!</p>

          <p>Your order has been placed and arrives on {variables.delivery_date}</p>

          <p>Order number: {variables.order_id}</p>

          <div className="flex justify-between items-center">
            {variables.order_image && (
              <Image alt="Order product" src={variables.order_image} width={100} height={50} />
            )}

            <div>
              <p>{variables.order_name}</p>
              <p>Qty: {variables.order_quantity}</p>
              <p>Unit: {variables.order_single_price}</p>
            </div>
          </div>

          <p>Total: {variables.order_price}</p>
        </div>

        <div className="w-full p-2">
          design changes
        </div>
      </div>
    </div>
  )
}
