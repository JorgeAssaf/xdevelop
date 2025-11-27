"use client"

import { useUsers } from "@/hooks/use-user"
import type { User } from "@/types/user"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { UsersTable } from "./users-table"

export const UserList = ({
  searchParams,
}: {
  searchParams: { page?: string | undefined }
}) => {
  const page = Number(searchParams.page) || 1
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
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        <span>Error: {error.message}</span>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User List</h2>
        <p className="text-muted-foreground">
          Manage and view the list of registered users.
        </p>
      </div>

      {isPending ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground animate-pulse">
            Loading users...
          </p>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <UsersTable
            data={users.data}
            columns={columns}
            page={users?.page}
            totalPages={users?.total_pages}
          />
        </div>
      )}
    </div>
  )
}
