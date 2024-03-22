import { NextResponse } from 'next/server';
import { getSession, updateSession } from '@/utils/session';

// export const config = {
//   matcher: ["/user/:path*", "/", "/sign-up", "/login"]
// }

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const session = await getSession();

  if (path === "/") {
    if (session) {
      const redirectUrl = new URL("/timecard", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (path === "/timecard") {
    if (!session) {
      const redirectUrl = new URL("/", request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return await updateSession(session);
  }
}