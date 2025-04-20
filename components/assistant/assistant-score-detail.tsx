import { Box, Stack, Typography } from "@mui/material";
import { SeniorQuery } from "types/seniorQuery";
import { ReadOnlyBox } from "components/senior-queries/detail/helper-components";
import QueryDetailButton from "components/buttons/query-detail-button";
import { formatDate } from "helper/utils";

type Props = {
  seniorQuery: SeniorQuery;
};

function AssistantScoreDetail({ seniorQuery }: Props) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="caption"
          sx={{ color: "#A5A5A5", fontWeight: "300" }}
        >
          {seniorQuery.fields.iDSeniora?.fields.prijmeniJmeno}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#A5A5A5", fontWeight: "300" }}
        >
          {formatDate(
            seniorQuery.fields.posledniZmenaLink?.fields
              .datumUskutecneneNavstevy
          )}
        </Typography>
      </Stack>
      <Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #DADADA ",
          }}
        >
          {seniorQuery.fields.popis}
        </Typography>
      </Box>

      <ReadOnlyBox
        label="Byl problém vyřešen?"
        sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        borderColor="#DADADA"
      >
        {seniorQuery.fields.posledniZmenaLink?.fields.problemVyresenHodnoceni ??
          ""}
      </ReadOnlyBox>
      <ReadOnlyBox
        label="Spokojenost seniora s asistentem"
        sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        borderColor="#DADADA"
      >
        {seniorQuery.fields.posledniZmenaLink?.fields.spokojenostSenior ?? ""}
      </ReadOnlyBox>
      <ReadOnlyBox label="Komentář od seniora" borderColor="#DADADA">
        {seniorQuery.fields.posledniZmenaLink?.fields.poznamkaSeniorem ?? ""}
      </ReadOnlyBox>

      <QueryDetailButton queryId={seniorQuery.id} label="Přejít na dotaz" />
    </Stack>
  );
}

export default AssistantScoreDetail;
