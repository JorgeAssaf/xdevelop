  import {PostList  } from "@/components/post-list";
export default function PostPage() {

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-800)' }}>
        Lista de Libros
      </h1>
        <PostList />
    </div>
  );
}