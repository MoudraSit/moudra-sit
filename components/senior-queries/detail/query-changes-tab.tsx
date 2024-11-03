import { List, ListItem, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate, removeHTMLTags } from "helper/utils";
import { Visit } from "types/visit";
import { ListItemContent } from "@mui/joy";
import NextLink from "next/link";
import { AssistantPagePaths } from "helper/consts";
import QueryStatusChip from "../query-status-chip";

type Props = {
  visits: Array<Visit>;
};

function QueryChangesTab({ visits }: Props) {
  return (
    <>
      <List>
        {visits.length === 0 ? (
          <Typography
            variant="body1"
            fontSize={20}
            textAlign="center"
            sx={{ padding: "1rem" }}
          >
            Zatím tu nejsou žádné změny.
          </Typography>
        ) : (
          visits.map((visit) => (
            <NextLink
              key={visit.id}
              href={`${AssistantPagePaths.VISITS}/${visit.id}`}
            >
              <ListItem
                sx={{ padding: "0.5rem", borderBottom: "1px solid #DADADA " }}
              >
                <ListItemContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption">
                      {visit.fields.iDUzivatele?.fields.email}
                    </Typography>
                    <Typography variant="caption">
                      {formatDate(visit.fields.vlozeniZaznamu)}
                    </Typography>
                  </Stack>
                  <QueryStatusChip
                    sx={{ alignSelf: "flex-start" }}
                    queryStatus={visit.fields.stav}
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
                      {removeHTMLTags(visit.fields.poznamkaAsistentem)}
                    </Typography>
                    <ChevronRightIcon />
                  </Stack>
                </ListItemContent>
              </ListItem>
            </NextLink>
          ))
        )}
      </List>
    </>
  );
}

export default QueryChangesTab;
