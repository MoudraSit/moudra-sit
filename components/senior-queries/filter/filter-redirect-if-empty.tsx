"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QUERY_FILTER_KEY } from "helper/consts";

export default function FilterRedirectIfEmpty() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasSearchParams =
      Array.from(searchParams?.entries() ?? []).length > 0;
    if (hasSearchParams) return;

    const stored = localStorage.getItem(QUERY_FILTER_KEY);
    if (stored) {
      try {
        const localStorageFilters = JSON.parse(stored);
        const params = new URLSearchParams("");
        for (const [filterType, filterValue] of Object.entries(
          localStorageFilters
        )) {
          if (filterValue) params.set(filterType, filterValue as string);
          else params.delete(filterType);
        }

        router.replace(`?${params}`);
      } catch (err) {
        console.error("Failed to parse stored filter:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
