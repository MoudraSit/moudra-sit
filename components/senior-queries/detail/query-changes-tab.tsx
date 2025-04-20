import { List, ListItem, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate, removeHTMLTags } from "helper/utils";
import { QueryChange } from "types/queryChange";
import { ListItemContent } from "@mui/joy";
import NextLink from "next/link";
import { AssistantPagePaths, QueryStatus } from "helper/consts";
import QueryStatusChip from "../query-status-chip";

type Props = {
  queryChanges: Array<QueryChange>;
};

function QueryChangesTab({ queryChanges }: Props) {
  return (
    <List>
      {queryChanges.length === 0 ? (
        <Typography
          fontSize={20}
          textAlign="center"
          sx={{ padding: "1rem" }}
        >
          Zatím tu nejsou žádné změny.
        </Typography>
      ) : (
        queryChanges.map((queryChange) => (
          <NextLink
            key={queryChange.id}
            href={`${AssistantPagePaths.CHANGES}/${queryChange.id}`}
          >
            <ListItem
              sx={{ padding: "0.5rem", borderBottom: "1px solid #DADADA " }}
            >
              <ListItemContent>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption">
                    {queryChange.fields.iDUzivatele?.fields.prijmeniAJmeno}
                  </Typography>
                  <Typography variant="caption">
                    {formatDate(queryChange.fields.vlozeniZaznamu)}
                  </Typography>
                </Stack>
                <QueryStatusChip
                  sx={{ alignSelf: "flex-start" }}
                  queryStatus={queryChange.fields.stav as QueryStatus}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {removeHTMLTags(queryChange.fields.poznamkaAsistentem)}
                  </Typography>
                  <ChevronRightIcon />
                </Stack>
              </ListItemContent>
            </ListItem>
          </NextLink>
        ))
      )}
    </List>
  );
}

export default QueryChangesTab;
