"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const fantasyNavItems = [
  { href: "/fantasy/dashboard", label: "Dashboard" },
  { href: "/fantasy/create-team", label: "Create Team" },
  { href: "/fantasy/edit-team", label: "Edit Team" },
  { href: "/fantasy/join-team", label: "Join Team" },
  { href: "/fantasy/leaderboard", label: "Leaderboard" },
  { href: "/fantasy/standing", label: "Standings" },
]

export function FantasyNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {fantasyNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                pathname === item.href
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
