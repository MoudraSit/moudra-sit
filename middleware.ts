import { Role } from "backend/role";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// TODO: Unify middleware matcher paths and the these paths
// For non-trivial patterns like "(.*)", simple string comparison in middleware() would not work
// Maybe you can move the matcher into authorized() and check it in the same with using .startsWith()
const assistantProtectedPaths = ["/asistent"];
const seniorProtectedPaths = ["/senior"];

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;

    // If the user is logged in as a senior and is trying to access assistant paths, redirect him.
    for (const assistantPath of assistantProtectedPaths) {
      if (
        req.nextUrl.pathname.startsWith(assistantPath) &&
        token?.role !== Role.DA
      ) {
        return NextResponse.redirect(new URL("/senior", req.url));
      }
    }

    // If the user is logged in as an assistant and is trying to access senior paths, redirect him.
    for (const seniorPath of seniorProtectedPaths) {
      if (
        req.nextUrl.pathname.startsWith(seniorPath) &&
        token?.role !== Role.SENIOR
      ) {
        return NextResponse.redirect(new URL("/asistent", req.url));
      }
    }
  },
  {
    // This function is required for the middleware function above to run.
    // Use is to check that the user is logged in, without caring about the role.
    callbacks: {
      authorized: ({ token, req }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/asistent", "/senior"],
};
