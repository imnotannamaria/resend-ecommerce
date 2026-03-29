"use client"

import { Theme } from "@radix-ui/themes"
import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { IconButton } from "@radix-ui/themes"
import Link from "next/link"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<"light" | "dark">("dark")

  return (
    <Theme appearance={appearance}>
      <header className="w-full bg-zinc-900 p-4 flex items-center justify-between">
        <div className="flex-1" />
        <Link href="/" className="font-bold text-xl">resend-ecommerce</Link>
        <div className="flex-1 flex justify-end">
          <IconButton
            variant="ghost"
            color="indigo"
            onClick={() => setAppearance(appearance === "dark" ? "light" : "dark")}
          >
            {appearance === "dark" ? <Sun /> : <Moon />}
          </IconButton>
        </div>
      </header>
      {children}
    </Theme>
  )
}
