"use client";

import CardSkeleton from "components/skeletons/card-skeleton";
import { FilterType, MAX_QUERY_CARD_HEIGHT } from "helper/consts";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { loadMoreQueries } from "./actions";
import QueryCard from "components/senior-queries/query-card";
import { SeniorQuery } from "types/seniorQuery";

type Props = {
  initialItems: Array<SeniorQuery>;
  searchParams?: Partial<Record<FilterType, any>>;
};

function QueryCardDynamicList({ initialItems, searchParams }: Props) {
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
        const newQueries = await loadMoreQueries(page + 1, searchParams);
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
              itemSize={MAX_QUERY_CARD_HEIGHT}
              height={height}
              width={width}
            >
              {({ index, style }) => {
                const item = items[index];
                return isItemLoaded(index) ? (
                  <QueryCard style={style} item={item} />
                ) : (
                  <CardSkeleton />
                );
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}

export default QueryCardDynamicList;
