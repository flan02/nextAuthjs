export { default } from 'next-auth/middleware'

//* Indicate which routes should be protected and which should not be protected
export const config = {
    matcher: ['/dashboard/:path*'] //* Protect all routes that start with /dashboard
}

