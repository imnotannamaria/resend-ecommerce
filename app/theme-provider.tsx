"use client"

import { Theme } from "@radix-ui/themes"
import { useState } from "react"
import { Mail, Moon, Sun } from "lucide-react"
import { IconButton } from "@radix-ui/themes"
import Link from "next/link"
import { Toaster } from "sonner"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<"light" | "dark">("dark")

  return (
    <Theme appearance={appearance}>
      <header className={`px-5 py-3 border-b flex items-center justify-between ${appearance === "dark" ? "border-zinc-800" : "border-zinc-100"}`}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${appearance === "dark" ? "bg-white" : "bg-zinc-900"}`}>
            <Mail size={14} className={appearance === "dark" ? "text-zinc-900" : "text-white"} />
          </div>
          <span className="font-semibold text-sm tracking-tight">resend-ecommerce</span>
        </Link>
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
