import { ReadOnlyBox } from "./helper-components";
import { Visit } from "types/visit";
import { formatDateTime } from "helper/utils";

type Props = {
  lastVisit?: Visit;
};

function QueryDetailVisitSection({ lastVisit }: Props) {
  return (
    <>
      <ReadOnlyBox label="Místo setkání">
        {lastVisit?.fields.osobnevzdalene}
      </ReadOnlyBox>
      <ReadOnlyBox label="Adresa setkání">
        {lastVisit?.fields.mistoNavstevy}
      </ReadOnlyBox>
      <ReadOnlyBox label="Datum a čas setkání">
        {formatDateTime(lastVisit?.fields.datumUskutecneneNavstevy)}
      </ReadOnlyBox>
    </>
  );
}

export default QueryDetailVisitSection;
