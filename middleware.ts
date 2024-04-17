import { NextRequest, NextResponse } from "next/server";
// import { verify } from "jsonwebtoken"; // ? Don't supported in nextjs module
import { jwtVerify } from "jose";

export const config = {
    matcher: ['/home/:path*', '/about/:path*']
}

export async function middleware(request: NextRequest) {
    //console.log('Middleware running...');

    const rawCookie = request.cookies.get('tokenSerialized')?.value
    //console.log(rawCookie);

    // * If I use matcher from nextjs, I don't need evaluate each route in the middleware.
    /* if (request.nextUrl.pathname.includes('/home')) { 
        return NextResponse.redirect(new URL('/', request.nextUrl.origin).toString())
    } */
    if (rawCookie === undefined) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin).toString())
    }

    //if (rawCookie) {
    const start = '='
    const end = ';'
    const startIndex = rawCookie.indexOf(start) + 1
    const endIndex = rawCookie.indexOf(end, startIndex)
    const token = rawCookie.substring(startIndex, endIndex)
    console.log(token);
    try {
        const payload = await jwtVerify(token, new TextEncoder().encode('MISECRET'))
        console.log(payload);
        return NextResponse.next() // TODO: Continue with the request
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.redirect(new URL('/', request.nextUrl.origin).toString())
    }
    //}
    // }

    // return NextResponse.next()
}