import type { UsersResponse } from "@/types/user"
import { useQuery } from "@tanstack/react-query"

export const useUsers = ({ page }: { page: number }) => {
  const data = useQuery({
    queryKey: ["user", page],
    queryFn: async () => {
      const response = await fetch(`/api/users?page=${page}`, {
        method: "GET",
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = (await response.json()) as UsersResponse
      console.log(data)
      return data
    },

    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  return data
}
