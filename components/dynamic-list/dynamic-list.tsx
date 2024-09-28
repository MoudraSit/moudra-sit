"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import CardSkeleton from "components/skeletons/card-skeleton";
import { AssistantPagePaths, FilterType } from "helper/consts";
import Link from "next/link";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { loadMoreQueries } from "./actions";

// TODO: set max height and use this here
export const REQUEST_CARD_HEIGHT = 160;
const CARD_SPACING = "1rem";

type Props = {
  initialItems: Array<Record<string, any>>;
  searchParams?: Partial<Record<FilterType, any>>;
};

function DynamicList({ initialItems, searchParams }: Props) {
  // We create a reference for the InfiniteLoader
  const infiniteLoaderRef = React.useRef(null);
  const hasMountedRef = React.useRef(false);

  const [page, setPage] = React.useState(0);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = React.useState(false);
  const [items, setItems] = React.useState(initialItems);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading
    ? () => {}
    : async () => {
        setPage(page + 1);
        setIsNextPageLoading(true);
        const newQueries = await loadMoreQueries(searchParams, page + 1);
        setIsNextPageLoading(false);
        if (!newQueries.length) setHasNextPage(false);
        setItems((items) => [...items, ...newQueries]);
      };

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Each time the filters prop changed we called the method resetloadMoreItemsCache to clear the cache
  React.useEffect(() => {
    // We only need to reset cached items when "sortOrder" changes.
    // This effect will run on mount too; there's no need to reset in that case.
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        //@ts-ignore
        infiniteLoaderRef.current.resetloadMoreItemsCache();
        setPage(0);
        setIsNextPageLoading(false);
        setHasNextPage(true);
        setItems(initialItems);
        //@ts-ignore
        infiniteLoaderRef.current._listRef.scrollTo(0, 0);
      }
    }
    hasMountedRef.current = true;
  }, [initialItems]);

  return (
    <>
      <Typography variant="h5" sx={{ margin: "3px", fontWeight: "bold" }}>
        Dotazy ({items.length})
      </Typography>

      <InfiniteLoader
        ref={infiniteLoaderRef}
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                className="LFist"
                itemCount={items.length}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemSize={REQUEST_CARD_HEIGHT}
                height={height}
                width={width}
              >
                {({ index, style }) => {
                  const item = items[index];
                  return isItemLoaded(index) ? (
                    // TODO: make into a separate component under senior-requests/
                    <Card
                      style={{
                        ...style,
                        height: `calc(${REQUEST_CARD_HEIGHT}px - ${CARD_SPACING})`,
                        marginBottom: CARD_SPACING,
                      }}
                    >
                      <CardContent>
                        <Typography variant="body2">
                          {item.fields.popis}
                        </Typography>
                        <CardActions>
                          <Button
                            LinkComponent={Link}
                            href={`${AssistantPagePaths.SENIOR_REQUESTS}/${item.id}`}
                            variant="contained"
                          >
                            Zobrazit Detail
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  ) : (
                    <CardSkeleton />
                  );
                }}
              </FixedSizeList>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </>
  );
}

export default DynamicList;
