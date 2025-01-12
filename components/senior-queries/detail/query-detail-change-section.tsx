import { ReadOnlyBox } from "./helper-components";
import { formatDateTime } from "helper/utils";
import { QueryChange } from "types/queryChange";

type Props = {
  lastChange: QueryChange;
};

async function QueryDetailChangeSection({ lastChange }: Props) {
  return (
    <>
      <ReadOnlyBox label="Místo setkání">
        {lastChange?.fields.osobnevzdalene}
      </ReadOnlyBox>
      <ReadOnlyBox label="Adresa setkání">
        {lastChange?.fields.mistoNavstevy}
      </ReadOnlyBox>
      <ReadOnlyBox label="Datum a čas setkání">
        {formatDateTime(lastChange?.fields.datumUskutecneneNavstevy)}
      </ReadOnlyBox>
    </>
  );
}

export default QueryDetailChangeSection;
