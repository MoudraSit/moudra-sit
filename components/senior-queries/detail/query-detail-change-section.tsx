import { FINISHED_STATUSES, MeetingLocationType } from "helper/consts";
import { ReadOnlyBox } from "./helper-components";
import { formatDateTime } from "helper/utils";
import { QueryChange } from "types/queryChange";
import { Box, Typography } from "@mui/material";
import RemoteHelpSection from "./remote-help-section";

type Props = {
  lastChange: QueryChange;
};

async function QueryDetailChangeSection({ lastChange }: Props) {
  if (!lastChange) return <></>;

  return (
    <>
      <ReadOnlyBox label="Místo setkání">
        {lastChange.fields.osobnevzdalene}
      </ReadOnlyBox>

      <ReadOnlyBox label="Datum a čas setkání">
        {formatDateTime(
          lastChange.fields.stav in FINISHED_STATUSES
            ? lastChange.fields.datumUskutecneneNavstevy
            : lastChange.fields.datumPlanovanaNavsteva
        )}
      </ReadOnlyBox>

      {lastChange.fields.osobnevzdalene === MeetingLocationType.REMOTE ? (
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "0.5rem",
            }}
          >
            Pomoc na dálku
          </Typography>
          <RemoteHelpSection queryChange={lastChange} />
        </Box>
      ) : (
        <ReadOnlyBox label="Adresa setkání">
          {lastChange.fields.mistoNavstevy}
        </ReadOnlyBox>
      )}
    </>
  );
}

export default QueryDetailChangeSection;
