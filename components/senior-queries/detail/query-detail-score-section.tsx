import { ReadOnlyBox } from "./helper-components";
import FormHeadline from "components/app-forms/FormHeadline";
import { Stack } from "@mui/material";
import { QueryChange } from "types/queryChange";

type Props = {
  lastChange: QueryChange;
};

function QueryDetailScoreSection({ lastChange }: Props) {
  return (
    <>
      <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
        <FormHeadline text="Hodnocení asistentem" />
        <ReadOnlyBox
          label="Hodnocení"
          sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        >
          {lastChange?.fields.hodnoceniAsistent}
        </ReadOnlyBox>
      </Stack>
      <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
        <FormHeadline text="Hodnocení seniorem" />
        <ReadOnlyBox
          label="Byl problém vyřešen?"
          sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        >
          {lastChange?.fields?.problemVyresenHodnoceni}
        </ReadOnlyBox>
        <ReadOnlyBox
          label="Spokojenost seniora s asistentem"
          sublabel="(jako ve škole, 1 nejlepší, 5 nejhorší)"
        >
          {lastChange?.fields?.spokojenostSenior}
        </ReadOnlyBox>
        <ReadOnlyBox label="Komentář od seniora">
          {lastChange?.fields?.poznamkaSeniorem}
        </ReadOnlyBox>
      </Stack>
    </>
  );
}

export default QueryDetailScoreSection;
