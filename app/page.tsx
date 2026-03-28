import Link from "next/link";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center p-24">
      <Heading size="8">resend-ecommerce</Heading>
      <Text size="4" color="gray">
        Open-source starter kit for e-commerce transactional emails with Resend
      </Text>
      <Flex align="center" gap="2">
        <Button asChild color="red">
          <Link href="/orders/created">Order Created</Link>
        </Button>
        <Text>{">"}</Text>
        <Button asChild color="yellow">
          <Link href="/orders">Order Confirmed</Link>
        </Button>
        <Text>{">"}</Text>
        <Button asChild color="orange">
          <Link href="/orders">Order Shipped</Link>
        </Button>
        <Text>{">"}</Text>
        <Button asChild color="green">
          <Link href="/orders">Order Delivered</Link>
        </Button>
      </Flex>
    </main>
  );
}
