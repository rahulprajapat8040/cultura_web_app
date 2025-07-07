// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_KEY || 'default-secret')

const roleRoutes: Record<string, string[]> = {
    admin: ['/admin'],
    organizer: ['/organizer', '/dashboard'],
    vendor: ['/vendor'],
    venue_owner: ['/venue'],
    artist: ['/feed', '/my-events', '/create'],
    user: ['/profile', '/marketplace', '/events'],
}


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/' ||
        pathname.startsWith('/auth') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    const token = request.cookies.get('accessToken')?.value
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    try {
        const { payload } = await jwtVerify(token, secret)
        console.log(payload)
        const role = payload.role as string
        const allowedRoutes = roleRoutes[role] || []

        const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route))

        if (!isAllowed) {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        return NextResponse.next()
    } catch (error) {
        console.error('JWT error', error)
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/organizer/:path*',
        '/dashboard/:path*',
        '/vendor/:path*',
        '/venue/:path*',
        '/feed/:path*',
        '/my-events/:path*',
        '/create/:path*',
        '/profile/:path*',
        '/marketplace/:path*',
        '/events/:path*',
    ],
}
