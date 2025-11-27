"use client"

import { useQuery } from "@tanstack/react-query"

export default function PostsByUserId({ userId }: { userId: string }) {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts-by-userId", userId],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      )

      if (!res.ok) {
        throw new Error("Failed to fetch posts")
      }

      const posts: { id: number; title: string; body: string }[] =
        await res.json()
      return posts
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  if (isLoading)
    return (
      <div className="text-center p-10 text-gray-500">Loading posts...</div>
    )
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">Error loading posts.</div>
    )
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Posts by User <span className="text-blue-600">#{userId}</span>
      </h1>
      <ul className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 capitalize">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
