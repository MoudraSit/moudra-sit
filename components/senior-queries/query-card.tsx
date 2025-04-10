import { Card, Typography, Stack, Box, ButtonBase } from "@mui/material";
import {
  AssistantPagePaths,
  MAX_QUERY_CARD_HEIGHT,
  MeetingLocationType,
  QueryStatus,
} from "helper/consts";
import {
  checkIfQueryTooOld,
  checkIfVisitInThePast,
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
import OldVisitChip from "./old-visit-chip";

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
              {checkIfVisitInThePast(item) && showVisitInfo ? (
                <OldVisitChip />
              ) : null}

              <Typography
                variant="h2"
                fontWeight={"bold"}
                sx={{ mt: "0.5rem" }}
              >
                {item.fields.popis}
              </Typography>
              <Typography variant="body1">
                {item.fields.iDSeniora?.fields.prijmeniJmeno}
              </Typography>
              <Typography variant="body1">
                {item.fields.iDSeniora?.fields.mestoObecCalc}
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
                  {item.fields?.kategorieMultichoice
                    ? item.fields?.kategorieMultichoice?.join(", ")
                    : item.fields?.kategorie?.fields.nazev?._$$list?.join(", ")}
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
                  {/* pozadovaneMistoPomoci used to be a string historically */}
                  {labelVisitLocationTypes(
                    item.fields.posledniZmenaLink
                      ? item.fields.posledniZmenaLink.fields.osobnevzdalene
                      : item.fields?.pozadovaneMistoPomoci
                  )}
                </span>
                {item.fields.posledniZmenaLink?.fields.osobnevzdalene !==
                  MeetingLocationType.REMOTE &&
                !!item.fields.posledniZmenaLink?.fields.mistoNavstevy ? (
                  <span style={{ fontWeight: "normal" }}>
                    {" "}
                    ({item.fields.posledniZmenaLink?.fields.mistoNavstevy})
                  </span>
                ) : null}
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
