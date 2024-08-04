// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { getRole } from './app/firebase/firebase';

export async function middleware(request: NextRequest) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const role = await getRole();

  if (request.nextUrl.pathname.startsWith('/manage')) {
    if (role !== 'manager' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/manage/:path*'],
};
