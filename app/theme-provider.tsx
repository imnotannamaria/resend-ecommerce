"use client"

import { Theme } from "@radix-ui/themes"
import { useState } from "react"
import { AtSign, Moon, Sun, ShoppingCart, Package, Truck, Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Toaster } from "sonner"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { label: "Order Created",   href: "/orders/created",   icon: ShoppingCart },
  { label: "Order Confirmed", href: "/orders/confirmed", icon: Check        },
  { label: "Order Shipped",   href: "/orders/shipped",   icon: Package      },
  { label: "Order Delivered", href: "/orders/delivered", icon: Truck        },
]

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<"light" | "dark">("dark")
  const pathname = usePathname()
  const isDark = appearance === "dark"

  return (
    <Theme appearance={appearance}>
      <header className={`px-5 py-0 border-b flex items-center justify-between h-14 ${isDark ? "border-zinc-800" : "border-zinc-100"}`}>

        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isDark ? "bg-white" : "bg-zinc-900"}`}>
            <AtSign size={14} className={isDark ? "text-zinc-900" : "text-white"} />
          </div>
          <span className="font-semibold text-sm tracking-tight">Resend Ecommerce</span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, icon: Icon }, index) => {
            const active = pathname === href
            return (
              <div key={href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight size={12} className={isDark ? "text-zinc-600" : "text-zinc-300"} />
                )}
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150
                    ${active
                      ? isDark ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-900"
                      : isDark ? "text-zinc-400 hover:text-white hover:bg-zinc-800/60" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80"
                    }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              </div>
            )
          })}
        </nav>

        <button
          onClick={() => setAppearance(isDark ? "light" : "dark")}
          className={`relative flex items-center gap-0.5 p-1 rounded-full border transition-colors duration-200 cursor-pointer
            ${isDark ? "border-zinc-700 bg-zinc-950" : "border-zinc-200 bg-zinc-100"}`}
          aria-label="Toggle theme"
        >
          <span className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200
            ${!isDark ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500"}`}>
            <Sun size={13} />
          </span>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200
            ${isDark ? "bg-zinc-800 text-white" : "text-zinc-400"}`}>
            <Moon size={13} />
          </span>
        </button>

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
