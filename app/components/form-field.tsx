import { Flex, Text } from "@radix-ui/themes"

export function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <Flex direction="column" gap="1">
      <Flex align="center" gap="1">
        <Text as="label" size="1" weight="medium" color="gray">{label}</Text>
        {required && <Text size="1" color="red" className="leading-none">*</Text>}
      </Flex>
      {children}
      {error && <Text size="1" color="red">{error}</Text>}
    </Flex>
  )
}
