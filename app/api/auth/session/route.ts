import type { User } from "@/types/user"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const tokenCookie = (await cookies()).get("token")

  if (!tokenCookie) {
    return NextResponse.redirect(
      new URL("/api/auth/login", "http://localhost:3000"),
    )
  }
  const userId = tokenCookie.value.at(-1)

  if (!userId) {
    return NextResponse.json(
      { error: "User ID not found in token" },
      { status: 400 },
    )
  }

  const user = await fetch(`https://reqres.in/api/users/${userId}`, {
    method: "GET",
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  })
  if (!user.ok) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 },
    )
  }
  const userData = await user.json() as { data: User };
  const mappedUser: User = {
    ...userData.data,
    role: userData.data.id % 2 === 0 ? 'admin' : 'user',
  };

  return NextResponse.json({ user: mappedUser }, { status: 200 })
}
