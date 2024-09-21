"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import Link from "next/link";
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
              // TODO: make into a separate component under senior-requests/
              <Card
                style={{
                  ...style,
                  height: `calc(${REQUEST_CARD_HEIGHT}px - ${CARD_SPACING})`,
                  marginBottom: CARD_SPACING,
                }}
              >
                <CardContent>
                  <Typography variant="body2">{item.fields.popis}</Typography>
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
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

export default DynamicList;
