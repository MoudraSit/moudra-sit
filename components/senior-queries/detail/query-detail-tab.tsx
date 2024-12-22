import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { SeniorQuery } from "types/seniorQuery";
import { ReadOnlyBox } from "./helper-components";
import { formatDate, labelVisitLocationTypes } from "helper/utils";
import QueryStatusChip from "../query-status-chip";
import QueryDetailCommentsSection from "./query-detail-comments-section";
import {
  AssistantPagePaths,
  FINISHED_STATUSES,
  QueryStatus,
} from "helper/consts";
import QueryDetailScoreSection from "./query-detail-score-section";
import QueryDetailChangeSection from "./query-detail-change-section";
import { QueryDetailSeniorSection } from "./query-detail-senior-section";
import { getSeniorCity as getSeniorCityById } from "../actions";

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

  const seniorCity = seniorQuery.fields.iDSeniora.fields?.mestoLink?.id
    ? await getSeniorCityById(
        seniorQuery.fields.iDSeniora.fields?.mestoLink?.id
      )
    : undefined;

  return (
    <>
      <Grid container spacing={1} sx={{ marginLeft: "-8px !important" }}>
        {isQueryFinished ? null : (
          <Grid item xs={12} sm={6}>
            <Button
              id="primary-button"
              LinkComponent={Link}
              href={`${AssistantPagePaths.NEW_CHANGE}?queryId=${seniorQuery.id}`}
              variant="contained"
              fullWidth
              color="warning"
            >
              {seniorQuery.fields.stavDotazu === QueryStatus.NEW
                ? "Převzít dotaz"
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
            Předvyplnit další dotaz
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
          <QueryDetailSeniorSection
            seniorCity={seniorCity}
            seniorQuery={seniorQuery}
          />
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
