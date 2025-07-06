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

function CardCaptionValue({
  caption,
  value = "",
}: {
  caption: string;
  value?: string;
}) {
  return (
    <Typography
      fontWeight="bold"
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {caption}: <span style={{ fontWeight: "normal" }}>{value}</span>
    </Typography>
  );
}

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
                  sx={{ marginBottom: "4px" }}
                />
                <Typography fontSize="14px">
                  {formatDate(item.fields.datumVytvoreni)}
                </Typography>
              </Stack>

              {checkIfQueryTooOld(item) ? <OldQueryChip /> : null}
              {checkIfVisitInThePast(item) && showVisitInfo ? (
                <OldVisitChip />
              ) : null}

              <Typography
                fontWeight="bold"
                sx={{
                  mt: "0",
                  fontSize: "18px",
                  fontFamily: "var(--font-roboto-condensed), Roboto",
                }}
              >
                {item.fields.popis}
              </Typography>
              <CardCaptionValue
                caption="Senior"
                value={item.fields.iDSeniora?.fields.prijmeniJmeno}
              />
              <CardCaptionValue
                caption="Lokalita"
                value={item.fields.iDSeniora?.fields.mestoObecCalc}
              />
              <CardCaptionValue
                caption="Zařízení"
                value={
                  item.fields?.kategorieMultichoice
                    ? item.fields?.kategorieMultichoice?.join(", ")
                    : item.fields?.kategorie?.fields.nazev?._$$list?.join(", ")
                }
              />

              {/* pozadovaneMistoPomoci used to be a string historically */}
              <CardCaptionValue
                caption="Místo setkání"
                value={`${labelVisitLocationTypes(
                  item.fields.posledniZmenaLink
                    ? item.fields.posledniZmenaLink.fields.osobnevzdalene
                    : item.fields?.pozadovaneMistoPomoci
                )}
                    ${
                      item.fields.posledniZmenaLink?.fields.osobnevzdalene !==
                        MeetingLocationType.REMOTE &&
                      !!item.fields.posledniZmenaLink?.fields.mistoNavstevy
                        ? " " +
                          item.fields.posledniZmenaLink?.fields.mistoNavstevy
                        : ""
                    }`}
              />

              {showVisitInfo ? (
                <>
                  <CardCaptionValue
                    caption="Datum a čas setkání"
                    value={formatDateTime(
                      item.fields.posledniZmenaLink?.fields
                        .datumPlanovanaNavsteva ?? ""
                    )}
                  />

                  {item.fields.posledniZmenaLink?.fields.poznamkaAsistentem ? (
                    <CardCaptionValue
                      caption="Poznámka k setkání"
                      value={removeHTMLTags(
                        item.fields.posledniZmenaLink?.fields.poznamkaAsistentem
                      )}
                    />
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
