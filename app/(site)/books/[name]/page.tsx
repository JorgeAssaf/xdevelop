import BookDetail from "@/components/book-detail"

export default async function BookPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

  return <BookDetail name={name} />
}
