'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export default function BookList({ q, author }: { q: string; author?: string }) {
  const { data: books, isPending } = useQuery({
    queryKey: ['books', q, author],
    queryFn: async (): Promise<Book[]> => {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}${author ? `&author=${encodeURIComponent(author)}` : ''}&limit=30`, { cache: 'no-store' });
      const data = await res.json();
      return data.docs || [];
    }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6 border-b pb-4">
        <p className="text-lg text-gray-700">
          Resultados para: <span className="font-bold text-indigo-600">{q}</span>
          <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{books?.length} encontrados</span>
        </p>
        {author && (
          <p className="text-sm text-gray-600 mt-2 sm:mt-0">
            Filtrado por autor: <span className="font-medium text-gray-900">{author}</span>
          </p>
        )}
      </div>

      {isPending ? (
        <div className="p-4 text-center text-gray-500">Cargando libros...</div>
      ) : books && books.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No se encontraron libros para la búsqueda realizada.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books?.map(b => (
            <Link key={b.key} href={`/books/${b.key.replace('/works/', '')}`} className="group block h-full">
              <article className="h-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  {b.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`}
                      alt={`Portada de ${b.title}`}
                      className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      <span className="text-xs font-medium uppercase tracking-wider">Sin portada</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm font-medium">Ver detalles &rarr;</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col grow">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {b.title}
                  </h3>

                  <div className="mt-auto space-y-2">
                    {b.author_name && (
                      <div className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span className="line-clamp-1">
                          {b.author_name.slice(0, 2).join(', ')}
                          {b.author_name.length > 2 && ' ...'}
                        </span>
                      </div>
                    )}

                    {b.first_publish_year && (
                      <div className="flex items-center text-xs text-gray-500 font-medium bg-gray-50 w-fit px-2 py-1 rounded">
                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {b.first_publish_year}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
