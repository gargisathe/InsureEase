// app/api/query/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  // forward to your FastAPI service
  const res = await fetch("http://10.0.0.155:8000/docs/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("FastAPI error:", await res.text());
    return NextResponse.error();
  }

  const data = await res.json();
  return NextResponse.json(data);
}
