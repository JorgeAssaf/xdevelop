// /c:/Users/jorge/Documents/work/xdevelop/app/books/page.tsx

import BookList from "@/components/books-list"

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolveSearchParams = await searchParams
  const q = (resolveSearchParams?.q || "").toString().trim()
  const author = (resolveSearchParams?.author || "").toString().trim()

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl mb-4 text-gray-800 font-bold">
          Buscador de Libros
        </h1>

        <form className="flex flex-col sm:flex-row justify-center gap-2.5 items-center">
          <input
            name="q"
            defaultValue={q}
            placeholder="Título o palabra clave..."
            className="px-4 py-2.5 text-base border border-gray-300 rounded w-full max-w-[300px]"
          />
          <input
            name="author"
            defaultValue={author}
            placeholder="Autor (ej: Tolkien)"
            className="px-4 py-2.5 text-base border border-gray-300 rounded w-full max-w-[300px]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors w-full sm:w-auto">
            Buscar
          </button>
        </form>
      </header>

      <BookList q={q} author={author} />
    </div>
  )
}
