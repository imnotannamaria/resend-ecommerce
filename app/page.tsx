import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center p-24">
      <h1 className="text-4xl font-bold">resend-ecommerce</h1>
      <p className="mt-4 text-lg text-gray-500">
        Open-source starter kit for e-commerce transactional emails with Resend
      </p>
      <div className="flex items-center gap-2">
        <Link href="/orders/created" className="cursor-pointer bg-red-900 text-red-200 p-2 rounded hover:text-red-300">
          <p>Order Created</p>
        </Link>
        <p>{'>'}</p>
        <Link href="/orders" className="cursor-pointer bg-yellow-900 text-yellow-200 p-2 rounded hover:text-yellow-300">
          <p>Order Confirmed</p>
        </Link>
        <p>{'>'}</p>
        <Link href="/orders" className="cursor-pointer bg-orange-900 text-orange-200 p-2 rounded hover:text-orange-300">
          <p>Order Shipped</p>
        </Link>
        <p>{'>'}</p>
        <Link href="/orders" className="cursor-pointer bg-green-900 text-green-200 p-2 rounded hover:text-green-300">
          <p>Order Delivered</p>
        </Link>
      </div>
    </main>
  );
}
