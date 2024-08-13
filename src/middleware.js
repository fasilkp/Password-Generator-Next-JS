import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { appLog, errLog } from './_lib/appLogger';

export async function middleware(request, params) {
  const { pathname } = request.nextUrl;
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token');
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/login", {
      method: "GET",
      headers: {
        'Authorization': token?.value,
      }
    });

    const data = await res.json()
    const response = NextResponse.next()
    response.cookies.set('userId', data?.user?._id)

    if (!data.login && pathname !== '/login') {
      return response.redirect(new URL('/login', request.url));
    }
    if (data.login && pathname === '/login') {
      return response.redirect(new URL('/', request.url));
    }
    return response;
  } catch (err) {
    errLog("middleware error", err, request.headers.get("Referer") === process.env.BASE_URL + "/login");
    if (pathname !== process.env.BASE_URL + "/login") {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}