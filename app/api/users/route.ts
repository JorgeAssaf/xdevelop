import type { User, UsersResponse } from '@/types/user';
import { NextResponse, type NextRequest } from 'next/server';



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  try {

    const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
      method: "GET",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const users = (await response.json()) as UsersResponse;

    const mappedUsers: User[] = users.data.map((user) => ({
      ...user,
      role: user.id % 2 === 0 ? 'admin' : 'user',
    }));

    return NextResponse.json({
      ...users,
      data: mappedUsers,
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch users' + (err instanceof Error ? ': ' + err.message : '') },
      { status: 500 }
    );
  }
}