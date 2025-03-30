"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DynamicList from "components/dynamic-list/query-card-dynamic-list";
import { getQueryCount, loadMoreQueries } from "./actions";
import DynamicListSkeleton from "components/skeletons/dynamic-list-skeleton";
import { Typography } from "@mui/material";

type Props = {
  initialQueries: any[];
  initialTotal: number;
};

export default function ClientQueryList({
  initialQueries,
  initialTotal,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState(initialQueries);
  const [total, setTotal] = useState(initialTotal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryObject = Object.fromEntries(searchParams!.entries());
      const [newQueries, newTotal] = await Promise.all([
        loadMoreQueries(0, queryObject),
        getQueryCount(queryObject),
      ]);
      setQueries(newQueries);
      setTotal(newTotal);
      setLoading(false);
    };

    fetchData();
  }, [searchParams, router]); // Re-run when filters change

  return (
    <>
      <Typography variant="caption" sx={{ margin: "3px" }}>
        Výsledky: {total}
      </Typography>

      {/* The div is required for list autosizing to work */}
      <div style={{ flex: "1 1 auto" }}>
        {loading ? (
          <DynamicListSkeleton />
        ) : (
          <DynamicList
            initialItems={queries}
            queryObject={Object.fromEntries(searchParams!.entries())}
          />
        )}
      </div>
    </>
  );
}
