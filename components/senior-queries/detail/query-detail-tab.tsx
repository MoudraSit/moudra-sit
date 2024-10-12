import { Box, Grid, Stack, Typography } from "@mui/material";
import { SeniorQuery } from "types/seniorQuery";
import { BORDER_COLOR, ReadOnlyBox, ReadOnlyField } from "./helper-components";
import { formatDate } from "helper/utils";
import QueryStatusChip from "../query-status-chip";
import QueryDetailCommentsSection from "./query-detail-comments-section";

type Props = {
  seniorQuery: SeniorQuery;
};

function QueryDetailTab({ seniorQuery }: Props) {
  const comments = seniorQuery.fields?.komentare?.messages;
  const sortedComments = [...(comments ?? [])].sort((a, b) =>
    new Date(a.created) < new Date(b.created) ? 1 : -1
  );

  return (
    <>
      <Stack spacing={2}>
        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Datum vložení:
          <span style={{ marginLeft: "0.5rem", fontWeight: "normal" }}>
            {formatDate(seniorQuery.fields.datumVytvoreni)}
          </span>
        </Typography>
        <ReadOnlyBox label="Stav dotazu">
          <QueryStatusChip queryStatus={seniorQuery.fields.stavDotazu} />
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
                value={seniorQuery.fields.iDSeniora.fields.mesto}
              />
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="Telefon"
                value={seniorQuery.fields.iDSeniora.fields.telefon}
              />
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
              <ReadOnlyField
                label="E-mail"
                value={seniorQuery.fields.iDSeniora.fields.email}
              />
            </Grid>
          </Grid>
        </Box>
        <ReadOnlyBox label="Zařízení">
          {seniorQuery.fields.kategorieDotazu}
        </ReadOnlyBox>
        <ReadOnlyBox label="Preferované místo setkání">
          {seniorQuery.fields.pozadovaneMistoPomoci}
        </ReadOnlyBox>
        <ReadOnlyBox label="Řešitel dotazu">
          {seniorQuery.fields.resitelDotazu}
        </ReadOnlyBox>
      </Stack>
      <QueryDetailCommentsSection
        queryId={seniorQuery.id}
        comments={sortedComments}
      />
    </>
  );
}

export default QueryDetailTab;
