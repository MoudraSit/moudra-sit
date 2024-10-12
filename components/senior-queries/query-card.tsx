import { Button, Card, Typography, Stack, Box } from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import { formatDate } from "helper/utils";
import Link from "next/link";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";
import QueryStatusChip from "./query-status-chip";

export const MAX_QUERY_CARD_HEIGHT = 245;
export const MAX_QUERY_CARD_WIDTH = 500;
const CARD_SPACING = "1rem";

type Props = {
  style: JSObject;
  item: SeniorQuery;
};

function QueryCard({ style, item }: Props) {
  return (
    <Card
      style={{
        ...style,
        height: `calc(${MAX_QUERY_CARD_HEIGHT}px - ${CARD_SPACING})`,
        maxWidth: MAX_QUERY_CARD_WIDTH,
        marginBottom: CARD_SPACING,
        display: "flex",
      }}
    >
      <Stack
        gap={1}
        justifyContent="space-between"
        flexGrow={1}
        sx={{
          borderRadius: "6px",
          paddingBottom: "0.5rem !important",
          padding: "0.5rem",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <QueryStatusChip queryStatus={item.fields.stavDotazu} />
          <Typography variant="body1">
            {formatDate(item.fields.datumVytvoreni)}
          </Typography>
        </Stack>

        <Box>
          <Typography variant="h2" fontWeight={"bold"}>
            {item.fields.popis}
          </Typography>
          <Typography variant="body1">
            {item.fields.iDSeniora.fields.prijmeniJmeno}
          </Typography>
          <Typography variant="body1">
            {item.fields.iDSeniora.fields.mesto}
          </Typography>
          <Typography variant="body1" fontWeight="600">
            Zařízení:{" "}
            <span style={{ fontWeight: "normal" }}>
              {item.fields.kategorieDotazu}
            </span>
          </Typography>
          <Typography fontWeight="600" variant="body1">
            Místo setkání:{" "}
            <span style={{ fontWeight: "normal" }}>
              {item.fields.pozadovaneMistoPomoci}
            </span>
          </Typography>
        </Box>

        <Button
          LinkComponent={Link}
          href={`${AssistantPagePaths.SENIOR_QUERIES}/${item.id}/detail`}
          variant="outlined"
          color="info"
          fullWidth
        >
          Zobrazit Detail
        </Button>
      </Stack>
    </Card>
  );
}

export default QueryCard;
