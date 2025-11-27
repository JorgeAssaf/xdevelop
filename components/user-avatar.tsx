"use client"
import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useRouter } from "next/navigation"

export default function User() {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/session")
      if (!res.ok) {
        throw new Error("Failed to fetch user session")
      }
      return res.json()
    },
  })

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })
      if (!res.ok) {
        throw new Error("Failed to log out")
      }
      return res.json()
    },
    onSuccess: () => {
      router.refresh()
    },
  })
  return (
    <div className="inline-flex items-center gap-2">
      <Avatar>
        <AvatarImage src={data?.user?.avatar} />
        <AvatarFallback>{data?.user?.name?.[0]}</AvatarFallback>
      </Avatar>
      <button className="text-sm" onClick={() => mutation.mutate()}>
        Log out
      </button>
    </div>
  )
}
