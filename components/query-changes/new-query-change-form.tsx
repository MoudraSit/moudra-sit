"use client";

import { Alert, Button, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  FINISHED_STATUSES,
  QueryStatus,
  VisitMeetLocation,
} from "helper/consts";
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
import { createQueryChange, fetchAutocompleteOrganizations } from "./actions";
import { SeniorQuery } from "types/seniorQuery";
import QueryStatusChip from "components/senior-queries/query-status-chip";
import { Visit } from "types/visit";
import dayjs from "dayjs";
import FormHeadline from "components/app-forms/FormHeadline";
import SubmitButton from "components/buttons/submit-button";
import { Organization } from "types/assistant";
import { FormInputAsyncAutocomplete } from "components/app-forms/inputs/FormInputAsyncAutocomplete";

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

  const { handleSubmit, control, getValues, watch, setValue } = useForm({
    resolver: yupResolver(newQueryChangeSchema),
    defaultValues: {
      isInitialChange: query.fields.stavDotazu === QueryStatus.NEW,
      queryStatus:
        query.fields.stavDotazu === QueryStatus.IN_PROGRESS
          ? QueryStatus.SOLVED
          : QueryStatus.IN_PROGRESS,
      meetLocationType: lastVisit
        ? lastVisit.fields?.osobnevzdalene ?? VisitMeetLocation.AT_SENIOR
        : VisitMeetLocation.AT_SENIOR,
      address: lastVisit ? lastVisit.fields?.mistoNavstevy ?? "" : "",
      // Yup schema expects JS native Date, but the input works with dayjs
      organization: lastVisit
        ? lastVisit.fields?.spolupraceSOrganizaci ?? {}
        : {},
      //@ts-ignore
      date: lastVisit
        ? dayjs(lastVisit.fields.datumUskutecneneNavstevy ?? "")
        : undefined,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const queryStatusWatch = watch("queryStatus");
  // eslint-disable-next-line no-unused-vars
  const meetLocationTypeWatch = watch("meetLocationType");

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

  function getOrganizationLabel(option: Organization) {
    return option?.fields?.nazev ?? "";
  }

  function isOrganizationEqual(option: Organization, value: Organization) {
    return option.id === value.id;
  }

  const isMeetInOrganization =
    getValues("meetLocationType") === VisitMeetLocation.LIBRARY;

  const isQueryFinished = FINISHED_STATUSES.includes(
    getValues("queryStatus") as QueryStatus
  );

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

        {isMeetInOrganization ? (
          <FormInputAsyncAutocomplete<Organization>
            name="organization"
            control={control}
            getValues={getValues}
            disabled={isPending}
            label="Spolupracující organizace"
            fetchOptions={fetchAutocompleteOrganizations}
            getOptionLabel={getOrganizationLabel}
            isOptionEqualToValue={isOrganizationEqual}
            handleChange={(newValue: Organization) =>
              setValue("address", newValue.fields.adresa)
            }
            renderOption={(props: any, option: Organization) => {
              // Do not use the inbuilt key
              // eslint-disable-next-line no-unused-vars
              const { key, ...optionProps } = props;
              return (
                <MenuItem key={option.id} {...optionProps} value={option} dense>
                  {getOrganizationLabel(option)}
                </MenuItem>
              );
            }}
          />
        ) : null}

        <FormInputText
          name="address"
          control={control}
          label="Adresa návštěvy"
          disabled={isMeetInOrganization}
        />

        <FormInputDate name="date" control={control} label="Datum návštěvy" />

        {isQueryFinished ? (
          <FormInputText
            name="duration"
            control={control}
            label="Délka řešení (minuty)"
          />
        ) : null}

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
              label="Poznámka k setkání"
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
          <SubmitButton disabled={isPending} />
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
