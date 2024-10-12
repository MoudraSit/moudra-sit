"use client";

import { Alert, Button, Chip, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { QueryStatus, VisitMeetLocation } from "helper/consts";
import { newQueryChangeSchema } from "helper/schemas/new-query-change-schema";
import * as React from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputDate } from "components/form-inputs/FormInputDate";
import { FormInputText } from "components/form-inputs/FormInputText";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/form-inputs/FormInputDropdown";
import { createQueryChange } from "./actions";
import { SeniorQuery } from "types/seniorQuery";

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
};

// TODO: fetch last visit/change and prefill fields
function NewQueryChangeForm({ query }: Props) {
  const router = useRouter();

  const { handleSubmit, control, getValues, watch } = useForm({
    resolver: yupResolver(newQueryChangeSchema),
    defaultValues: {
      isInitialChange: query.fields.stavDotazu == QueryStatus.NEW,
      queryStatus: QueryStatus.IN_PROGRESS,
      meetLocationType: VisitMeetLocation.AT_SENIOR,
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
              <Chip label={option} size="small" />
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

        <FormInputText
          name="summary"
          control={control}
          label="Poznámka digitálního asistenta"
          multiline
          minRows={3}
          maxRows={6}
        />

        {getValues("queryStatus") === QueryStatus.SOLVED ? (
          <>
            <FormInputText
              name="assistantScore"
              control={control}
              label="Hodnocení asistentem (1-5 jako ve škole)"
            />

            <FormInputText
              name="assistantScoreDescription"
              control={control}
              label="Poznámka k hodnocení"
              multiline
              minRows={3}
              maxRows={6}
            />
          </>
        ) : null}

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
