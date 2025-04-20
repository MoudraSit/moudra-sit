"use client";

import { FilterType, MAX_LIST_ITEM_HEIGHT } from "helper/consts";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { loadMoreQueries } from "./actions";
import { SeniorQuery } from "types/seniorQuery";
import AssistantScoreListItem from "components/assistant/assistant-score-list-item";
import ListItemSkeleton from "components/skeletons/list-item-skeleton";
import { Typography } from "@mui/material";

type Props = {
  initialItems: Array<SeniorQuery>;
  queryObject?: Partial<Record<FilterType, any>>;
};

function AssistantScoreListDynamicList({ initialItems, queryObject }: Props) {
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

        const newQueries = await loadMoreQueries(page + 1, queryObject);
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
      {!itemCount ? (
        <Typography
          fontSize={20}
          textAlign="center"
          sx={{ padding: "2rem" }}
        >
          Zatím nemáte žádné vyřešené dotazy.
        </Typography>
      ) : (
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
                  itemSize={MAX_LIST_ITEM_HEIGHT}
                  height={height}
                  width={width}
                >
                  {({ index, style }) => {
                    const item = items[index];
                    return isItemLoaded(index) ? (
                      <AssistantScoreListItem style={style} item={item} />
                    ) : (
                      <ListItemSkeleton />
                    );
                  }}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </>
  );
}

export default AssistantScoreListDynamicList;
