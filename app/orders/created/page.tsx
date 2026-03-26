import Image from "next/image"

interface Variables {
  customer_name: string
  delivery_date: Date
  order_id: string
  order_name: string
  order_quantity: number
  order_single_price: number
  order_price: number
  order_image: string
}

export default function CreatedOrder() {
  const variables: Variables  = {
    "customer_name": "Anna",
    "delivery_date": new Date(),
    "order_id": "23232-323232",
    "order_name": "Pop Funko",
    "order_quantity": 2,
    "order_price": 120,
    "order_single_price": 240,
    "order_image": "https://images.unsplash.com/photo-1607134286392-1726f8cca84e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
  return (
    <div className="p-2 flex flex-col gap-4">
      <div className='flex gap-4 justify-end'>
        <button className="cursor-pointer bg-zinc-900 text-zinc-200 py-2 px-4 rounded hover:text-zinc-300">Copy</button>
        <button className="cursor-pointer bg-zinc-900 text-zinc-200 py-2 px-8 rounded hover:text-zinc-300">Send</button>
      </div>

      <div className="grid grid-cols-[1fr_4fr_1fr] gap-4">
        <div className="w-full p-2 border border-zinc-200">
          variables
        </div>

        <div className="w-full p-2 border border-zinc-200">
          <p>Thank you for your order, {variables.customer_name}!</p>

          <p>Your order has been placed and arrives on {variables.delivery_date.toLocaleDateString()}</p>

          <p>Order number: {variables.order_id}</p>

          <div className="flex justify-between items-center">
            <Image alt="Pop funko" src={variables.order_image} width={100} height={50}/>

            <div>
              <p>{variables.order_name}</p>
              <p>{variables.order_quantity}</p>
              <p>{variables.order_price}</p>
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