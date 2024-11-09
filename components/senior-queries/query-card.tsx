import { Card, Typography, Stack, Box } from "@mui/material";
import { MAX_QUERY_CARD_HEIGHT, MAX_QUERY_CARD_WIDTH } from "helper/consts";
import { formatDate, formatDateTime, removeHTMLTags } from "helper/utils";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";
import QueryStatusChip from "./query-status-chip";
import QueryDetailButton from "components/buttons/query-detail-button";

const CARD_SPACING = "1rem";

type Props = {
  style?: JSObject;
  item: SeniorQuery;
  showVisitInfo?: boolean;
  dynamicList?: boolean;
};

function QueryCard({
  style,
  item,
  dynamicList = true,
  showVisitInfo = false,
}: Props) {
  return (
    <Card
      style={{
        ...style,
        maxHeight: dynamicList
          ? `calc(${MAX_QUERY_CARD_HEIGHT}px - ${CARD_SPACING})`
          : "unset",
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
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <QueryStatusChip queryStatus={item.fields.stavDotazu} />
            <Typography variant="body1">
              {formatDate(item.fields.datumVytvoreni)}
            </Typography>
          </Stack>

          <Typography variant="h2" fontWeight={"bold"}>
            {item.fields.popis}
          </Typography>
          <Typography variant="body1">
            {item.fields.iDSeniora?.fields.prijmeniJmeno}
          </Typography>
          <Typography variant="body1">
            {item.fields.iDSeniora?.fields.mesto}
          </Typography>
          <Typography variant="body1" fontWeight="600">
            Zařízení:{" "}
            <span style={{ fontWeight: "normal" }}>
              {item.fields?.kategorieMultichoice?.join(", ")}
            </span>
          </Typography>
          <Typography fontWeight="600" variant="body1">
            Místo setkání:{" "}
            <span style={{ fontWeight: "normal" }}>
              {/* This field used to be a string historically */}
              {typeof item.fields?.pozadovaneMistoPomoci === "object"
                ? item.fields?.pozadovaneMistoPomoci?.join(", ")
                : item.fields?.pozadovaneMistoPomoci}
            </span>
          </Typography>
          {showVisitInfo ? (
            <>
              <Typography fontWeight="600" variant="body1">
                Datum a čas setkání:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {formatDateTime(
                    item.fields.navstevy?.fields?.datumPlanovanaNavsteva
                      ?._$$max ?? ""
                  )}
                </span>
              </Typography>
              {item.fields.navstevy?.fields?.posledniPoznamkaAsistent ? (
                <Typography fontWeight="600" variant="body1">
                  Poznámka k setkání:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {removeHTMLTags(
                      item.fields.navstevy?.fields?.posledniPoznamkaAsistent
                    )}
                  </span>
                </Typography>
              ) : null}
            </>
          ) : null}
        </Box>

        <QueryDetailButton item={item} />
      </Stack>
    </Card>
  );
}

export default QueryCard;
