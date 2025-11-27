"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

interface UserTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page?: number
  perPage?: number
  totalPages?: number
}
export function UsersTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
  page = 1,
  perPage = 10,
  totalPages = 1,
}: UserTableProps<TData, TValue>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: perPage,
      },
    },
    pageCount: totalPages,
  })
  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`?${params.toString()}`)
  }
  const updatePageSize = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("per_page", newPageSize.toString())
    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }
  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  )
                })}
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Link
                      href={`/posts/${row.original.id}`}
                      className="text-blue-500 hover:underline">
                      Ver Posts
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          onClick={() => updatePage(1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50">
          {"<<"}
        </button>
        <button
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50">
          {"<"}
        </button>
        <span className="px-3">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => updatePage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50">
          {">"}
        </button>
        <button
          onClick={() => updatePage(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50">
          {">>"}
        </button>
        <select
          value={perPage}
          onChange={(e) => updatePageSize(Number(e.target.value))}
          className="px-2 py-1 border rounded">
          {[6, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
