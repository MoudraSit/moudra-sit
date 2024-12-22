"use client";

import { useEffect } from "react";

export default function ScrollToElement({
  elementId,
  offset = 0,
}: {
  elementId: string;
  offset: number;
}) {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      // Get the element's position
      const elementTop = element.getBoundingClientRect().top + window.scrollY;

      // Scroll to the element, accounting for the header offset
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  }, [elementId, offset]); // Re-run if elementId or offset changes

  return null;
}
