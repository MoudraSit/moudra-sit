"use client";

import "styles/globals.css";

import { Box } from "@mui/material";
import { innerBoxStyles, outerBoxStyles } from "styles/common-layout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AssistantPagePaths } from "helper/consts";
import Loading from "./loading";

function extractUuidFromPath(path: string | null) {
  if (!path) return "";
  const segments = path.split("/").filter(Boolean); // Remove empty segments
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  return segments.find((segment) => uuidRegex.test(segment)) || null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  async function checkQueryAccess(queryId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/auth/query-access?queryId=${queryId}`);
      const data = await res.json();
      return data.access;
    } catch (error) {
      console.error("Error fetching query access:", error);
      return false;
    }
  }

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // Not logged in? Redirect to login
      router.replace("/prihlaseni");
      return;
    }

    const queryId = extractUuidFromPath(pathname);

    if (pathname?.startsWith(AssistantPagePaths.SENIOR_QUERIES) && queryId) {
      checkQueryAccess(queryId)
        .then((hasAccess) => {
          if (!hasAccess) {
            router.replace(AssistantPagePaths.ASSISTANT_PROFILE);
          } else {
            setLoading(false);
          }
        })
        .catch(() => router.replace(AssistantPagePaths.ASSISTANT_PROFILE));
    } else {
      setLoading(false);
    }
  }, [status, session, pathname, router]);

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        ...outerBoxStyles,
        bgcolor: "#F5F3EE",
      }}
    >
      <Box sx={innerBoxStyles}>{children}</Box>
    </Box>
  );
}
