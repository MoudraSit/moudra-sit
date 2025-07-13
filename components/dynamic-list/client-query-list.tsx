"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DynamicList from "components/dynamic-list/query-card-dynamic-list";
import { getQueryCount, loadMoreQueries } from "./actions";
import DynamicListSkeleton from "components/skeletons/dynamic-list-skeleton";
import { Box, Button, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SaveAssistantFilterDialog from "components/senior-queries/filter/save-assistant-filter-dialog";
import { useQueryFilters } from "helper/hooks";

type Props = {
  initialQueries: any[];
  initialTotal: number;
  defaultAssistantFilterExists: boolean;
};

export default function ClientQueryList({
  initialQueries,
  initialTotal,
  defaultAssistantFilterExists,
}: Props) {
  const searchParams = useSearchParams()!;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState(initialQueries);
  const [total, setTotal] = useState(initialTotal);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { assistantFilter } = useQueryFilters(searchParams);

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
      <Box>
        {assistantFilter ? null : (
          <Button
            startIcon={<BookmarkBorderIcon sx={{ marginRight: "4px" }} />}
            sx={{ fontSize: "1rem", textDecoration: "underline" }}
            color="warning"
            onClick={() => setIsDialogOpen(true)}
          >
            Uložit filtr
          </Button>
        )}
        <SaveAssistantFilterDialog
          open={isDialogOpen}
          defaultAssistantFilterExists={defaultAssistantFilterExists}
          handleClose={() => {
            setIsDialogOpen(false);
          }}
        />
        <Typography variant="caption" sx={{ margin: "3px", marginTop: "1rem" }}>
          Výsledky: {total}
        </Typography>
      </Box>

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
