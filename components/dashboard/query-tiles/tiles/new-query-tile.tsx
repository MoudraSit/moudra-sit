import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import { AssistantPagePaths } from "helper/consts";

function NewQueryTile() {
  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={AssistantPagePaths.NEW_SENIOR_QUERY}
      >
        <CardContent>
          <Typography
            variant="body2"
            sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center" }}
          >
            + Nový Dotaz
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewQueryTile;
