import { NextRequest, NextResponse } from 'next/server';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from './config';

const PUBLIC_PATHS = ['/signup', '/login'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // 회원가입/로그인 페이지에서 로그인 되어 있는 경우 홈페이지로 이동
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({ request: { headers } });
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
