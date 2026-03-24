async function getStatus() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/hello`);
  return res.json() as Promise<{ message: string }>;
}

export default async function Home() {
  const { message } = await getStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">resend-ecommerce</h1>
      <p className="mt-4 text-lg text-gray-500">
        Open-source starter kit for e-commerce transactional emails with Resend
      </p>
      <p className="mt-8 rounded-md bg-gray-100 px-4 py-2 font-mono text-sm">
        {message}
      </p>
    </main>
  );
}
