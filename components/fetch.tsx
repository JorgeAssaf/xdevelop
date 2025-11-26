"use client"

import { useUsers } from "@/hooks/use-user"
import { useSearchParams } from "next/navigation"
import type { User } from "@/types/user"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { UsersTable } from "./users-table"

export const UserList = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { isPending, isError, data: users, error } = useUsers({ page })
  const columns: ColumnDef<User>[] = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Avatar",
      accessorFn: (row) => row.avatar,
      cell: ({ row }) => (
        <Image
          src={row.original.avatar}
          alt="avatar"
          className="rounded-full size-12 object-cover"
          width={50}
          height={50}
        />
      ),
    },
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },

    {
      header: "Email",
      accessorFn: (row) => row.email,
    },
  ]

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div>
      <h2>User List</h2>
      <p>Check the console for fetched user data.</p>
      {
        isPending ? <p>Loading users...</p> :<UsersTable
        data={users?.data || []}
        columns={columns}
        page={users?.page}
        perPage={users?.per_page}
        totalPages={users?.total_pages}
      />
      }
      
    </div>
  )
}
