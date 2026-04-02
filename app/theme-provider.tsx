"use client"

import { Theme } from "@radix-ui/themes"
import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { IconButton } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import { Toaster } from "sonner"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<"light" | "dark">("dark")

  return (
    <Theme appearance={appearance}>
      <header className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="object-contain" />
        <Link href="/" className="font-bold text-xl">resend-ecommerce</Link>
        <IconButton
          variant="ghost"
          color="gray"
          highContrast
          onClick={() => setAppearance(appearance === "dark" ? "light" : "dark")}
        >
          {appearance === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </IconButton>
      </header>
      {children}
      <Toaster
        theme={appearance}
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast: "font-sans text-[13px] rounded-md",
          },
        }}
      />
    </Theme>
  )
}
