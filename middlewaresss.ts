import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for performance optimization
 * - Adds compression hints
 * - Monitors slow requests
 * - Adds security headers
 */
export function middleware(request: NextRequest) {
    const startTime = Date.now();

    // Clone the request headers
    const requestHeaders = new Headers(request.headers);

    // Add compression hint
    requestHeaders.set('Accept-Encoding', 'gzip, deflate, br');

    // Get response
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Add performance headers
    const responseTime = Date.now() - startTime;
    response.headers.set('X-Response-Time', `${responseTime}ms`);

    // Add security headers
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

    // Add cache hints for static assets
    const url = request.nextUrl.pathname;
    if (url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|woff|woff2)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Log slow requests in development
    if (process.env.NODE_ENV === 'development' && responseTime > 1000) {
        console.warn(`⚠️ Slow request: ${url} took ${responseTime}ms`);
    }

    return response;
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
    ],
};
