// /app/post/[userId]/page.tsx
export default async function UserPostsPage({
  params,
}: {
  params:Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { next: { revalidate: 60 } } // ISR: revalidate every 60s
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts: { id: number; title: string; body: string }[] = await res.json();

  return (
    <div>
      <h1>Posts by User {userId}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}