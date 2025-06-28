import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { SeniorQueriesGetter } from "backend/senior-queries";
import Link from "next/link";
import { AssistantPagePaths, FilterType } from "helper/consts";
import { AssistantAPI } from "backend/assistant";
import { applyAssistantFilterToFilters } from "components/senior-queries/filter/applyAssistantFilterToFilters";

async function SavedFilterTile() {
  const assistantFilters = await AssistantAPI.getAssistantFilters();

  const defaultFilter = assistantFilters.find(
    (filter) => filter.fields.vychoziFiltr
  );

  if (assistantFilters.length === 0 || !defaultFilter) return;

  const filters = {};
  applyAssistantFilterToFilters(filters, defaultFilter);

  const queriesCount = await SeniorQueriesGetter.getSeniorQueryCountByUIFilters(
    filters
  );

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`${AssistantPagePaths.SENIOR_QUERIES}?${FilterType.SAVED_FILTER}=${defaultFilter.fields.nazev}`}
      >
        <CardContent>
          <Typography
            variant="body2"
            color={"#D3215D"}
            sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center" }}
          >
            Můj výchozí filtr ({queriesCount})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SavedFilterTile;
