'use client';
import { useQuery } from "@tanstack/react-query";
export const PostList = () => {
  const data = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return (await response.json()) as { id: number; title: string; body: string; userId: number }[];
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  console.log(data)
  return (
   <ul className="space-y-4">
        {data.data?.map((book) => (
          <li 
            key={book.id}
            className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: 'var(--white)' }}
          >
            <strong className="text-xl" style={{ color: 'var(--gray-900)' }}>
              {book.title}
            </strong>
            <span style={{ color: 'var(--gray-600)' }}> - {book.author}</span>
          </li>
        ))}
      </ul>
  )
}
