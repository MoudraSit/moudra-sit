"use client";

import { logVisitTimestamp } from "app/lib/actions/log-visit-timestamp";
import { HOMEPAGE_VISIT_FLAG_SESSION_KEY } from "helper/consts";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default function RecordUserSession() {
  useEffect(() => {
    if (sessionStorage.getItem(HOMEPAGE_VISIT_FLAG_SESSION_KEY)) return;

    // Does not block
    void (async () => {
      try {
        const session = await getSession();
        const userId = session?.user?.id;
        if (!userId) return;

        await logVisitTimestamp(userId);
        sessionStorage.setItem(HOMEPAGE_VISIT_FLAG_SESSION_KEY, "true");
      } catch (error) {
        console.error("Failed to log visit timestamp:", error);
      }
    })();
  }, []);

  return null;
}
