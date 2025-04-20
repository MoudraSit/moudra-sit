"use client";

import { Grid, Typography } from "@mui/material";
import { DEFAULT_BORDER_COLOR } from "./helper-components";
import { QueryChange } from "types/queryChange";
import { useState } from "react";
import { RemoteHelpTypeLabels, RemoteHelpTypes } from "helper/consts";
import { sendInstructionEmail as sendInstructionEmailAction } from "components/query-changes/actions";
import FloatingAlert from "components/alerts/floating-alert";
import SuccessAlert from "components/alerts/success-alert";
import SecondaryButton from "components/buttons/secondary-button";

function RemoteHelpSection({
  queryId,
  queryChange,
}: {
  queryId: string;
  queryChange: QueryChange;
}) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function sendInstructionEmail() {
    try {
      setIsSuccess(false);
      setIsError(false);
      setErrorMessage("");
      setIsPending(true);

      await sendInstructionEmailAction(queryId, {
        remoteHelpType: queryChange.fields.typPomociNaDalku as RemoteHelpTypes,
        googleMeetLink: queryChange.fields.googleMeetLink,
        dateTime: new Date(queryChange.fields.datumPlanovanaNavsteva),
      });

      setIsSuccess(true);
      setIsPending(false);
    } catch (error) {
      console.error(error);
      const errorMessage =
        typeof error === "string"
          ? error
          : // @ts-ignore
            error?.message || "Při odesílání e-mailu nastala chyba.";
      setErrorMessage(errorMessage);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <Grid
      container
      spacing={1}
      sx={{
        width: "100%",
        border: `1px ${DEFAULT_BORDER_COLOR} solid`,
        padding: "0.5rem",
        margin: 0,
        position: "relative",
      }}
    >
      <Grid item xs={6}>
        <Typography
          variant="caption"
          sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
        >
          Typ pomoci na dálku
        </Typography>
        <Typography>
          {
            RemoteHelpTypeLabels[
              queryChange.fields.typPomociNaDalku as RemoteHelpTypes
            ]
          }
        </Typography>
      </Grid>
      {queryChange.fields.typPomociNaDalku === RemoteHelpTypes.GOOGLE_MEET ? (
        <Grid item xs={6}>
          <Typography
            variant="caption"
            sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
          >
            Odkaz na Google Meet
          </Typography>
          <Typography
            sx={{
              overflowWrap: "break-word",
              textDecoration: "underline",
            }}
          >
            <a href={queryChange.fields.googleMeetLink}>
              {queryChange.fields.googleMeetLink}
            </a>
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <SecondaryButton
          onClick={sendInstructionEmail}
          fullWidth
          disabled={isPending}
          label="Poslat e-mail s instrukcemi"
          sx={{ m: 0 }}
        ></SecondaryButton>
      </Grid>
      <SuccessAlert
        errorMessage="E-mail odeslán"
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />

      <FloatingAlert
        errorMessage={errorMessage}
        floatingAlertOpen={isError}
        onFloatingAlertClose={() => setIsError(false)}
      />
    </Grid>
  );
}

export default RemoteHelpSection;
