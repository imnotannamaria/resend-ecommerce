import { Flex, Text } from "@radix-ui/themes"

export function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <Flex direction="column" gap="1">
      <Text as="label" size="1" weight="medium" color="gray">{label}</Text>
      {children}
      {error && <Text size="1" color="red">{error}</Text>}
    </Flex>
  )
}
