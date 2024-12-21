import { Card, Typography, Stack, Box, ButtonBase } from "@mui/material";
import {
  AssistantPagePaths,
  MAX_QUERY_CARD_HEIGHT,
  QueryStatus,
} from "helper/consts";
import {
  checkIfQueryTooOld,
  formatDate,
  formatDateTime,
  labelVisitLocationTypes,
  removeHTMLTags,
} from "helper/utils";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";
import QueryStatusChip from "./query-status-chip";
import QueryDetailButton from "components/buttons/query-detail-button";
import OldQueryChip from "./old-query-chip";
import Link from "next/link";

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
    <Link
      href={`${AssistantPagePaths.SENIOR_QUERIES}/${item.id}/detail`}
      passHref
    >
      <ButtonBase
        component="div" // Prevents it from rendering as a button, keeping it accessible
        style={{
          cursor: "pointer",
          display: "block",
          textAlign: "inherit",
          width: "100%",
        }}
      >
        <Card
          style={{
            ...style,
            maxHeight: dynamicList
              ? `calc(${MAX_QUERY_CARD_HEIGHT}px - ${CARD_SPACING})`
              : "unset",
            marginBottom: CARD_SPACING,
            display: "flex",
          }}
        >
          <Stack
            gap={1}
            flexGrow={1}
            justifyContent="space-between"
            sx={{
              minWidth: 0,
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
                <QueryStatusChip
                  queryStatus={item.fields.stavDotazu as QueryStatus}
                />
                <Typography variant="body1">
                  {formatDate(item.fields.datumVytvoreni)}
                </Typography>
              </Stack>

              {checkIfQueryTooOld(item) ? <OldQueryChip /> : null}

              <Typography variant="h2" fontWeight={"bold"}>
                {item.fields.popis}
              </Typography>
              <Typography variant="body1">
                {item.fields.iDSeniora?.fields.prijmeniJmeno}
              </Typography>
              <Typography variant="body1">
                {item.fields.lokalita?.fields.mestoObec ??
                  item.fields.iDSeniora?.fields.mestoObecCalc ??
                  item.fields.iDSeniora?.fields.mesto}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="600"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Zařízení:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {item.fields?.kategorieMultichoice?.join(", ")}
                </span>
              </Typography>
              <Typography
                fontWeight="600"
                variant="body1"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Místo setkání:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {/* This field used to be a string historically */}
                  {labelVisitLocationTypes(item.fields?.pozadovaneMistoPomoci)}
                </span>
              </Typography>
              {showVisitInfo ? (
                <>
                  <Typography fontWeight="600" variant="body1">
                    Datum a čas setkání:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {formatDateTime(
                        item.fields.posledniZmenaLink?.fields
                          .datumPlanovanaNavsteva ?? ""
                      )}
                    </span>
                  </Typography>
                  {item.fields.posledniZmenaLink?.fields.poznamkaAsistentem ? (
                    <Typography
                      fontWeight="600"
                      variant="body1"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      Poznámka k setkání:{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {removeHTMLTags(
                          item.fields.posledniZmenaLink?.fields
                            .poznamkaAsistentem
                        )}
                      </span>
                    </Typography>
                  ) : null}
                </>
              ) : null}
            </Box>

            <QueryDetailButton queryId={item.id} />
          </Stack>
        </Card>
      </ButtonBase>
    </Link>
  );
}

export default QueryCard;
