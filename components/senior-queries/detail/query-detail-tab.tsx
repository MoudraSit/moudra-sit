import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { SeniorQuery } from "types/seniorQuery";
import { BORDER_COLOR, ReadOnlyBox, ReadOnlyField } from "./helper-components";
import { formatDate, labelVisitLocationTypes } from "helper/utils";
import QueryStatusChip from "../query-status-chip";
import QueryDetailCommentsSection from "./query-detail-comments-section";
import {
  AssistantPagePaths,
  FINISHED_STATUSES,
  QueryStatus,
} from "helper/consts";
import { THEME_COLORS } from "components/theme/colors";
import QueryDetailScoreSection from "./query-detail-score-section";
import QueryDetailChangeSection from "./query-detail-change-section";

type Props = {
  seniorQuery: SeniorQuery;
};

async function QueryDetailTab({ seniorQuery }: Props) {
  const comments = seniorQuery.fields?.komentare?.messages;
  const sortedComments = [...(comments ?? [])].sort((a, b) =>
    new Date(a.created) < new Date(b.created) ? 1 : -1
  );

  const isQueryFinished = FINISHED_STATUSES.includes(
    seniorQuery.fields.stavDotazu as QueryStatus
  );

  return (
    <>
      <Grid container spacing={1} sx={{ marginLeft: "-8px !important" }}>
        {isQueryFinished ? null : (
          <Grid item xs={12} sm={6}>
            <Button
              LinkComponent={Link}
              href={`${AssistantPagePaths.NEW_CHANGE}?queryId=${seniorQuery.id}`}
              variant="contained"
              fullWidth
              color="warning"
            >
              {seniorQuery.fields.stavDotazu === QueryStatus.NEW
                ? "+ Převzít dotaz"
                : "Přidat změnu"}
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Button
            LinkComponent={Link}
            href={`${AssistantPagePaths.NEW_SENIOR_QUERY}?prefill=${seniorQuery.id}`}
            fullWidth
            color="info"
            variant="outlined"
          >
            + Předvyplnit další dotaz
          </Button>
        </Grid>
      </Grid>
      <Stack spacing={2}>
        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Datum vložení:
          <span style={{ marginLeft: "0.5rem", fontWeight: "normal" }}>
            {formatDate(seniorQuery.fields.datumVytvoreni)}
          </span>
        </Typography>
        <ReadOnlyBox label="Stav dotazu">
          <QueryStatusChip
            queryStatus={seniorQuery.fields.stavDotazu as QueryStatus}
          />
        </ReadOnlyBox>

        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            {seniorQuery.fields.popis}
          </Typography>
          <Typography>{seniorQuery.fields.podrobnosti}</Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "0.5rem",
            }}
          >
            Senior
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{
              width: "100%",
              border: `1px ${BORDER_COLOR} solid`,
              padding: "0.5rem",
              margin: 0,
            }}
          >
            <Grid item xs={12}>
              <Typography>
                {seniorQuery.fields.iDSeniora.fields.prijmeniJmeno}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="Lokalita"
                value={seniorQuery.fields.iDSeniora.fields.mestoObecCalc}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
              >
                Telefon
              </Typography>
              <Typography
                sx={{
                  overflowWrap: "break-word",
                  color: THEME_COLORS.primary,
                  textDecoration: "underline",
                }}
              >
                <a href={`tel:${seniorQuery.fields.iDSeniora.fields.telefon}`}>
                  {seniorQuery.fields.iDSeniora.fields.telefon}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="Věk"
                value={
                  new Date().getFullYear() -
                  seniorQuery.fields.iDSeniora.fields.rokNarozeni
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
              >
                E-mail
              </Typography>
              <Typography
                sx={{
                  overflowWrap: "break-word",
                  textDecoration: "underline",
                }}
              >
                <a href={`mailto:${seniorQuery.fields.iDSeniora.fields.email}`}>
                  {seniorQuery.fields.iDSeniora.fields.email}
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <ReadOnlyBox label="Zařízení">
          {seniorQuery.fields.kategorieMultichoice?.join(", ")}
        </ReadOnlyBox>
        {!isQueryFinished ? (
          <ReadOnlyBox label="Preferované místo setkání">
            {/* This field used to be a string historically */}
            {labelVisitLocationTypes(seniorQuery.fields?.pozadovaneMistoPomoci)}
          </ReadOnlyBox>
        ) : null}
        <ReadOnlyBox label="Řešitel dotazu">
          {seniorQuery.fields.resitelLink?.fields.prijmeniAJmeno}
        </ReadOnlyBox>
        {isQueryFinished ? (
          <QueryDetailChangeSection
            lastChange={seniorQuery.fields.posledniZmenaLink!}
          />
        ) : null}
      </Stack>
      {isQueryFinished ? (
        <QueryDetailScoreSection
          lastChange={seniorQuery.fields.posledniZmenaLink!}
        />
      ) : null}
      <QueryDetailCommentsSection
        queryId={seniorQuery.id}
        comments={sortedComments}
      />
    </>
  );
}

export default QueryDetailTab;
