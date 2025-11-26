import type { UsersResponse } from "@/types/user"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      )
    }
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error)
    }
    const data = (await res.json()) as { token: string }

    const curretUserToken = data.token
    const user = curretUserToken.at(-1)
    console.log(user)

      ; (await cookies()).set("token", data.token, {
        sameSite: "lax",
        secure: true,
        // seven days
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })

    return NextResponse.json({ message: "Login successful" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "" },
      { status: 500 },
    )
  }
}
