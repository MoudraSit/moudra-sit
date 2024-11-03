import { ReadOnlyBox } from "./helper-components";
import { Stack } from "@mui/material";
import { Visit } from "types/visit";
import { formatDate } from "helper/utils";

type Props = {
  lastVisit?: Visit;
};

function QueryDetailVisitSection({ lastVisit }: Props) {
  return (
    <>
      <ReadOnlyBox label="Místo setkání">
        {lastVisit?.fields.osobnevzdalene}
      </ReadOnlyBox>
      <ReadOnlyBox label="Adresa návštěvy">
        {lastVisit?.fields.mistoNavstevy}
      </ReadOnlyBox>
      <ReadOnlyBox label="Datum návštěvy">
        {formatDate(lastVisit?.fields.datumUskutecneneNavstevy)}
      </ReadOnlyBox>
    </>
  );
}

export default QueryDetailVisitSection;
