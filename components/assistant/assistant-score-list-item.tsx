import { ListItemContent } from "@mui/joy";
import { ListItem, Typography, Stack, ListItemAvatar } from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import { formatDate } from "helper/utils";
import NextLink from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SeniorQuery } from "types/seniorQuery";
import { JSObject } from "types/common";

type Props = {
  item: SeniorQuery;
  style: JSObject;
};

function AssistantScoreListItem({ item: query, style }: Props) {
  return (
    <NextLink
      key={query.id}
      href={`${AssistantPagePaths.ASSISTANT_PROFILE_MY_SCORE}/${query.id}`}
    >
      <ListItem
        sx={{
          ...style,
          padding: "0.5rem",
        }}
      >
        <ListItemContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="caption"
              sx={{ color: "#A5A5A5", fontWeight: "300" }}
            >
              {query.fields.iDSeniora?.fields.prijmeniJmeno}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#A5A5A5", fontWeight: "300" }}
            >
              {formatDate(query.fields.datumVytvoreni)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", fontSize: "1rem", color: "black" }}
            >
              {query.fields.popis}
            </Typography>
            <ChevronRightIcon fontSize="small" />
          </Stack>
        </ListItemContent>
      </ListItem>
    </NextLink>
  );
}

export default AssistantScoreListItem;
