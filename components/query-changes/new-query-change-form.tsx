"use client";

import { Alert, Button, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { QueryStatus, VisitMeetLocation } from "helper/consts";
import { newQueryChangeSchema } from "helper/schemas/new-query-change-schema";
import * as React from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputDate } from "components/app-forms/inputs/FormInputDate";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/app-forms/inputs/FormInputDropdown";
import { createQueryChange } from "./actions";
import { SeniorQuery } from "types/seniorQuery";
import QueryStatusChip from "components/senior-queries/query-status-chip";
import { Visit } from "types/visit";
import dayjs from "dayjs";
import FormHeadline from "components/app-forms/FormHeadline";

const QUERY_STATUSES_FOR_ASSISTANT = [
  QueryStatus.IN_PROGRESS,
  QueryStatus.FOR_HANDOVER,
  QueryStatus.SOLVED,
  QueryStatus.UNSOLVED,
  QueryStatus.POSTPONED,
];

type NewVisitValues = yup.InferType<typeof newQueryChangeSchema>;

type Props = {
  query: SeniorQuery;
  lastVisit?: Visit;
};

function NewQueryChangeForm({ query, lastVisit }: Props) {
  const router = useRouter();

  const { handleSubmit, control, getValues, watch } = useForm({
    resolver: yupResolver(newQueryChangeSchema),
    defaultValues: {
      isInitialChange: query.fields.stavDotazu == QueryStatus.NEW,
      queryStatus: QueryStatus.IN_PROGRESS,
      meetLocationType: lastVisit
        ? lastVisit.fields?.osobnevzdalene ?? VisitMeetLocation.AT_SENIOR
        : VisitMeetLocation.AT_SENIOR,
      address: lastVisit ? lastVisit.fields?.mistoNavstevy ?? "" : "",
      // Yup schema expects JS native Date, but the input works with dayjs
      //@ts-ignore
      date: lastVisit
        ? dayjs(lastVisit.fields.datumUskutecneneNavstevy ?? "")
        : undefined,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const queryStatusWatch = watch("queryStatus");

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function submit(data: NewVisitValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await createQueryChange(query.id, data);
      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={2} sx={{ marginTop: "1rem" }}>
        <FormInputDropdown
          name="queryStatus"
          control={control}
          label="Stavu dotazu"
        >
          {QUERY_STATUSES_FOR_ASSISTANT.map((option) => (
            <MenuItem key={option} value={option} dense>
              <QueryStatusChip queryStatus={option} />
            </MenuItem>
          ))}
        </FormInputDropdown>

        <FormInputDropdown
          name="meetLocationType"
          control={control}
          label="Místo setkání"
        >
          {renderFlatOptions(Object.values(VisitMeetLocation))}
        </FormInputDropdown>

        <FormInputText
          name="address"
          control={control}
          label="Adresa návštěvy"
        />

        <FormInputDate name="date" control={control} label="Datum návštěvy" />

        <FormInputText
          name="duration"
          control={control}
          label="Délka řešení (minuty)"
        />

        {getValues("queryStatus") === QueryStatus.SOLVED ? (
          <>
            <FormHeadline text="Hodnocení asistenta" />

            <FormInputText
              name="assistantScore"
              control={control}
              label="Hodnocení (1-5 jako ve škole)"
            />

            <FormInputText
              name="summary"
              control={control}
              label="Poznámka asistenta"
              multiline
              minRows={6}
              maxRows={10}
            />
          </>
        ) : (
          <>
            <FormInputText
              name="summary"
              control={control}
              label="Shrnutí setkání"
              multiline
              minRows={6}
              maxRows={10}
            />
          </>
        )}

        {isError ? (
          <Alert severity="error">
            Při přidávání změny dotazu nastala chyba, opakujte prosím akci
            později. Pokud problém přetrvává, kontaktujte prosím{" "}
            <a href="mailto:support@moudrasit.cz">support@moudrasit.cz</a>.
          </Alert>
        ) : null}

        <Stack spacing={1}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            disabled={isPending}
          >
            Uložit
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            onClick={() => {
              router.back();
            }}
          >
            Zrušit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default NewQueryChangeForm;
