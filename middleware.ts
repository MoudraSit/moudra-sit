import { canUserAccessQuery } from "helper/auth";
import {
  AssistantPagePaths,
  AssistantAuthStatus,
  Role,
  SeniorPagePaths,
  CommonPagePaths,
} from "helper/consts";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    if (!token) {
      console.error("Middleware: Token is missing");
      return NextResponse.redirect(new URL(CommonPagePaths.LOGIN, req.url));
    }

    // Newly created users that were not admin-approved in Tabidoo should have access only to their detail page
    if (
      token?.role === Role.DA &&
      token?.status === AssistantAuthStatus.PENDING
    ) {
      // Prevent inifinite redirection
      if (req.nextUrl.pathname == AssistantPagePaths.ASSISTANT_PROFILE) return;
      else
        return NextResponse.redirect(
          new URL(AssistantPagePaths.ASSISTANT_PROFILE, req.url)
        );
    }

    // // Check if the user is trying to access SENIOR_QUERIES/:id
    // if (req.nextUrl.pathname.startsWith(AssistantPagePaths.SENIOR_QUERIES)) {
    //   const queryId = extractUuidFromPath(req.nextUrl.pathname);

    //   if (queryId && !(await canUserAccessQuery(token!, queryId))) {
    //     return NextResponse.redirect(
    //       new URL(AssistantPagePaths.SENIOR_QUERIES, req.url)
    //     );
    //   }
    // }

    // If the user is logged in as a senior and is trying to access assistant paths, redirect him.
    for (const assistantPath of Object.values(AssistantPagePaths)) {
      if (
        req.nextUrl.pathname.startsWith(assistantPath) &&
        token?.role !== Role.DA
      ) {
        return NextResponse.redirect(
          new URL(SeniorPagePaths.SENIOR_PROFILE, req.url)
        );
      }
    }

    // If the user is logged in as an assistant and is trying to access senior paths, redirect him.
    for (const seniorPath of Object.values(SeniorPagePaths)) {
      if (
        req.nextUrl.pathname.startsWith(seniorPath) &&
        token?.role !== Role.SENIOR
      ) {
        return NextResponse.redirect(
          new URL(AssistantPagePaths.ASSISTANT_PROFILE, req.url)
        );
      }
    }
  },
  {
    // This function is required for the middleware function above to run.
    // Use is to check that the user is logged in, without caring about the role.
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);



// Needs to be constant at build time, variables would be ignored
// Defined negatively via regex negative lookahead
// Includes pages from the older app (mostly form and registration/login)
export const config = {
  matcher: [
    "/((?!form|newform|hodnoceni|api|prihlaseni|registrace|obnova-hesla|images|_next|favicon.ico).*)",
  ],
};
