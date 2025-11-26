'use client';
import { useQuery } from "@tanstack/react-query";

export const PostList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
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

  if (isLoading) return <div className="text-center p-10 text-gray-500">Loading posts...</div>;
  if (isError) return <div className="text-center p-10 text-red-500">Error loading posts.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest Posts</h1>
      <ul className="grid gap-6 md:grid-cols-2">
        {data?.map((post) => (
          <li
            key={post.id}
            className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2 capitalize leading-tight">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {post.body}
            </p>
            <div className="mt-auto pt-4 flex items-center text-xs text-gray-400 font-medium">
              <span>Post ID: {post.id}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
