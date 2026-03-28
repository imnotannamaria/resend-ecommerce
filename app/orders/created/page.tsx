"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
  const { register, watch, formState: { errors } } = useForm<Variables>({
    resolver: zodResolver(variablesSchema),
  })

  const variables = watch()

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className='flex gap-4 justify-end'>
        <button className="cursor-pointer bg-zinc-900 text-zinc-200 py-2 px-4 rounded hover:text-zinc-300">Copy</button>
        <button className="cursor-pointer bg-zinc-900 text-zinc-200 py-2 px-8 rounded hover:text-zinc-300">Send</button>
      </div>

      <div className="grid grid-cols-[1fr_4fr_1fr] gap-4">
        <div className="w-full p-2 border border-zinc-200">
          <form className="flex flex-col gap-2">
            <div>
              <label className="font-bold">Customer name</label>
              <input {...register("customer_name")} />
              {errors.customer_name && <span>{errors.customer_name.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Delivery date</label>
              <input type="date" {...register("delivery_date")} />
              {errors.delivery_date && <span>{errors.delivery_date.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Order ID</label>
              <input {...register("order_id")} />
              {errors.order_id && <span>{errors.order_id.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Order name</label>
              <input {...register("order_name")} />
              {errors.order_name && <span>{errors.order_name.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Quantity</label>
              <input type="number" {...register("order_quantity")} />
              {errors.order_quantity && <span>{errors.order_quantity.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Unit price</label>
              <input type="number" {...register("order_single_price")} />
              {errors.order_single_price && <span>{errors.order_single_price.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Total price</label>
              <input type="number" {...register("order_price")} />
              {errors.order_price && <span>{errors.order_price.message}</span>}
            </div>
            <div>
              <label  className="font-bold">Image URL</label>
              <input {...register("order_image")} />
              {errors.order_image && <span>{errors.order_image.message}</span>}
            </div>
          </form>
        </div>

        <div className="w-full p-2 border border-zinc-200">
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

        <div className="w-full p-2 border border-zinc-200">
          design changes
        </div>
      </div>
    </div>
  )
}
