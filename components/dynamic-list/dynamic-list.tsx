"use client";

import { Card, CardContent, Typography } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

// TODO: set max height and use this here
export const REQUEST_CARD_HEIGHT = 160;
const CARD_SPACING = "1rem";

type Props = {
  items: Array<Record<string, any>>;
};

function DynamicList({ items }: Props) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          className="LFist"
          itemCount={items.length}
          itemSize={REQUEST_CARD_HEIGHT}
          height={height}
          width={width}
        >
          {({ index, style }) => {
            const item = items[index];
            return (
              <Card
                style={{
                  ...style,
                  height: `calc(${REQUEST_CARD_HEIGHT}px - ${CARD_SPACING})`,
                  marginBottom: CARD_SPACING,
                }}
              >
                <CardContent>
                  <Typography variant="body2">{item.fields.popis}</Typography>
                </CardContent>
              </Card>
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

export default DynamicList;
