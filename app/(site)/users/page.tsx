import { UserList } from "@/components/user-list"

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolveSearchParams = await searchParams
  return (
    <div>
      <UserList searchParams={resolveSearchParams} />
    </div>
  )
}
