''

import PostsByUserId from "@/components/posts-by-userId";

export default async function UserPostsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;


  return (
    <PostsByUserId userId={userId} />
  );
}