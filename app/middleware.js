// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // Define your valid routes
  const validRoutes = [
    '/',
    '/checkout',
    '/products/[slug]',
    '/products',
    '/products/[slug]',
    '/login',
    '/register',
  ]

  // Check if the current path starts with any valid route
  const isValidRoute = validRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // If it's not a valid route, redirect to home page
  if (!isValidRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}