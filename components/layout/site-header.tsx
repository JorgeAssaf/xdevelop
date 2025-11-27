import { cookies } from "next/headers"
import Link from "next/link"
import User from "../user-avatar"
import { cn } from "@/lib/utils"

export default async function SiteHeader() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("token")
  const navItems = [
    { label: "Users", href: "/users" },
    { label: "Posts", href: "/posts" },
    { label: "Books", href: "/books" },
  ]

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 mx-auto items-center">
        <div className="flex justify-between w-full gap-2">
          <div className="flex">
            <p className="text-lg font-medium">Xdevelop</p>
            {navItems.map((item) => {
              return item.href ? (
                <Link aria-label={item.label} key={item.label} href={item.href}>
                  <span
                    className={cn(
                      "group hover:bg-muted hover:text-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1",
                    )}>
                    <span>{item.label}</span>
                  </span>
                </Link>
              ) : (
                <span
                  key={item.label}
                  className="text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline">
                  {item.label}
                </span>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {token ? (
              <User />
            ) : (
              <Link
                href="/auth/sign-in"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
