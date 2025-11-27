"use client"

import { useQuery } from "@tanstack/react-query"
interface BookDetail {
  title: string
  description?: string | { value: string }
  covers?: number[]
  key: string
  subjects?: string[]
  created?: { value: string }
  last_modified?: { value: string }
}
export default function BookDetail({ name }: { name: string }) {
  const { data: book, isPending } = useQuery({
    queryKey: ["book-detail", name],
    queryFn: async (): Promise<BookDetail> => {
      const url = `https://openlibrary.org/works/${name}.json`
      const res = await fetch(url, { cache: "no-store" })

      if (!res.ok) {
        throw new Error("Error al obtener los datos")
      }

      const book = (await res.json()) as BookDetail

      return book
    },
  })

  if (isPending) {
    return (
      <div className="p-4 text-center text-gray-500">
        Cargando detalles del libro...
      </div>
    )
  }
  if (!book) {
    return (
      <div className="p-4 text-center text-red-500">
        No se encontraron detalles para este libro.
      </div>
    )
  }

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value

  const coverId = book.covers && book.covers.length > 0 ? book.covers[0] : null

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white border rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-6">
        {coverId && (
          <div className="shrink-0 mx-auto md:mx-0">
            <img
              src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
              alt={`Portada de ${book.title}`}
              className="w-64 h-auto object-cover rounded shadow-md"
            />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

          {description && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Descripción</h3>
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
            </div>
          )}

          {book.subjects && book.subjects.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Temas</h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 mt-6 border-t pt-4">
            {book.created && (
              <p>Creado: {new Date(book.created.value).toLocaleDateString()}</p>
            )}
            {book.last_modified && (
              <p>
                Última modificación:{" "}
                {new Date(book.last_modified.value).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
