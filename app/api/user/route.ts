import { NextResponse } from 'next/server';

type Data = {
  name: string;
};

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('username');
  const res = await fetch(
    `http://localhost:4000/api/v2/web/user/${name}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
