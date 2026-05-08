import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Auth guard dipindah ke masing-masing halaman via useEffect
  return NextResponse.next();
}

export const config = {
  matcher: [],
};