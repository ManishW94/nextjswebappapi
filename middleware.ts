// export { default } from "next-auth/middleware";

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "ADMIN"
    )
      return NextResponse.redirect(
        new URL(
          "/auth/signIn?message=You are not an ADMIN and you are not authorized to login!!",
          req.url
        )
      );

    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token?.role !== "USER"
    )
      return NextResponse.redirect(
        new URL(
          "/auth/signIn?message=You are not an USER and you are not authorized to login!!",
          req.url
        )
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/UserPost/:path*", "/admin/:path*", "/user/:path*"],
};
