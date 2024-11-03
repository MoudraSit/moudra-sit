import { ReadOnlyBox } from "./helper-components";
import FormHeadline from "components/app-forms/FormHeadline";
import { Stack } from "@mui/material";
import { Visit } from "types/visit";
import { removeHTMLTags } from "helper/utils";

type Props = {
  lastVisit: Visit;
};

function QueryDetailScoreSection({ lastVisit }: Props) {
  return (
    <>
      <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
        <FormHeadline text="Hodnocení asistentem" />
        <ReadOnlyBox
          label="Hodnocení"
          sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        >
          {lastVisit?.fields.hodnoceniAsistent}
        </ReadOnlyBox>

        <ReadOnlyBox label="Poznámka asistenta">
          {removeHTMLTags(lastVisit?.fields.poznamkaAsistentem)}
        </ReadOnlyBox>
      </Stack>
      <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
        <FormHeadline text="Hodnocení seniorem" />
        <ReadOnlyBox
          label="Byl problém vyřešen?"
          sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        >
          {lastVisit.fields?.problemVyresenHodnoceni}
        </ReadOnlyBox>
        <ReadOnlyBox
          label="Spokojenost seniora s asistentem"
          sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        >
          {lastVisit.fields?.spokojenostSenior}
        </ReadOnlyBox>
        <ReadOnlyBox label="Komentář od seniora">
          {lastVisit.fields?.poznamkaSeniorem}
        </ReadOnlyBox>
      </Stack>
    </>
  );
}

export default QueryDetailScoreSection;
