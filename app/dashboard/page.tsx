'use client';

import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('api/auth/session/', {

      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { user } = await response.json() as { user: User };
      return user;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  console.log({ user });
  return (
    <div>
      <h1>{
        user?.role
      }</h1>

    </div>
  );
}