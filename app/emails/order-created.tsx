interface OrderCreatedEmailProps {
  customer_name: string
  delivery_date: string
  order_id: string
  order_name: string
  order_quantity: string
  order_single_price: string
  order_price: string
  order_image: string
}

export function OrderCreatedEmail({
  customer_name,
  delivery_date,
  order_id,
  order_name,
  order_quantity,
  order_single_price,
  order_price,
  order_image,
}: OrderCreatedEmailProps) {
  return (
    <div>
      <p>Thank you for your order, {customer_name}!</p>
      <p>Your order has been placed and arrives on {delivery_date}</p>
      <p>Order number: {order_id}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img alt="Order product" src={order_image} width={100} height={50} />
        <div>
          <p>{order_name}</p>
          <p>Qty: {order_quantity}</p>
          <p>Unit: {order_single_price}</p>
        </div>
      </div>
      <p>Total: {order_price}</p>
    </div>
  )
}
