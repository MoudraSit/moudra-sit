"use client";

import { Button, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  AssistantPagePaths,
  FINISHED_STATUSES,
  QUERY_CHANGES_TAB,
  QueryStatus,
  MeetingLocationType,
  MeetingLocationTypeLabels,
} from "helper/consts";
import { newQueryChangeSchema } from "helper/schemas/new-query-change-schema";
import * as React from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputText } from "components/app-forms/inputs/FormInputText";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/app-forms/inputs/FormInputDropdown";
import {
  addEventToGoogleCalendar,
  createQueryChange,
  fetchAutocompleteOrganizations,
} from "./actions";
import { SeniorQuery } from "types/seniorQuery";
import QueryStatusChip from "components/senior-queries/query-status-chip";
import { QueryChange } from "types/queryChange";
import dayjs from "dayjs";
import FormHeadline from "components/app-forms/FormHeadline";
import SubmitButton from "components/buttons/submit-button";
import { Organization } from "types/assistant";
import { FormInputAsyncAutocomplete } from "components/app-forms/inputs/FormInputAsyncAutocomplete";
import { FormInputDateTime } from "components/app-forms/inputs/FormInputDateTime";
import { visitCalendarEventSchema } from "helper/schemas/visit-calendar-event-schema";
import ErrorAlert from "components/alerts/error-alert";

const QUERY_STATUSES_FOR_ASSISTANT = [
  QueryStatus.IN_PROGRESS,
  QueryStatus.FOR_HANDOVER,
  QueryStatus.SOLVED,
  QueryStatus.UNSOLVED,
];

type NewChangeValues = yup.InferType<typeof newQueryChangeSchema>;
type NewEventValues = yup.InferType<typeof visitCalendarEventSchema>;

type Props = {
  query: SeniorQuery;
  lastChange?: QueryChange;
};

function NewQueryChangeForm({ query, lastChange }: Props) {
  const router = useRouter();

  const { handleSubmit, control, getValues, watch, setValue } = useForm({
    resolver: yupResolver(newQueryChangeSchema),
    defaultValues: {
      isInitialChange: query.fields.stavDotazu === QueryStatus.NEW,
      calendarEventId: lastChange?.fields?.kalendarUdalostId ?? "",
      queryStatus:
        query.fields.stavDotazu === QueryStatus.IN_PROGRESS
          ? QueryStatus.SOLVED
          : QueryStatus.IN_PROGRESS,
      meetLocationType:
        lastChange?.fields?.osobnevzdalene ?? MeetingLocationType.AT_SENIOR,
      address: lastChange?.fields?.mistoNavstevy ?? "",
      // Yup schema expects JS native Date, but the input works with dayjs
      organization: lastChange?.fields?.spolupraceSOrganizaci ?? null,
      //@ts-ignore
      dateTime: dayjs(
        lastChange?.fields.datumPlanovanaNavsteva ??
          lastChange?.fields.datumUskutecneneNavstevy ??
          ""
      ),
    },
  });

  // eslint-disable-next-line no-unused-vars
  const queryStatusWatch = watch("queryStatus");
  // eslint-disable-next-line no-unused-vars
  const meetLocationTypeWatch = watch("meetLocationType");
  // eslint-disable-next-line no-unused-vars
  const visitDateWatch = watch("dateTime");

  React.useEffect(() => {
    // Skip the initial render
    if (getValues("meetLocationType") === lastChange?.fields.osobnevzdalene)
      return;
    // Reset the address, it will not be the same when the input changes
    setValue("address", "");
    // Reset the org input if other type of visit was selected
    if (getValues("meetLocationType") != MeetingLocationType.LIBRARY) {
      //@ts-ignore
      setValue("organization", { id: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetLocationTypeWatch]);

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [isCalendarPending, setIsCalendarPending] = React.useState(false);
  const [isCalendarError, setIsCalendarError] = React.useState(false);
  const [isCalendarSuccess, setIsCalendarSuccess] = React.useState(false);

  async function submit(data: NewChangeValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await createQueryChange(query.id, data);
      setIsPending(false);
      router.replace(
        `${AssistantPagePaths.SENIOR_QUERIES}/${query.id}/${QUERY_CHANGES_TAB}`
      );
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  async function handleAddEvent() {
    try {
      setIsCalendarSuccess(false);
      setIsCalendarError(false);
      setIsCalendarPending(true);

      const eventData: NewEventValues = {
        eventId: getValues("calendarEventId"),
        seniorName: query.fields.iDSeniora.fields.prijmeniJmeno,
        dateTime: getValues("dateTime")?.toISOString()!,
        description: getValues("summary"),
        location: getValues("address"),
      };

      const result = await addEventToGoogleCalendar(eventData);
      setValue("calendarEventId", result.id ?? "");

      setIsCalendarSuccess(true);
      setIsCalendarPending(false);
    } catch (error) {
      console.error(error);
      setIsCalendarError(true);
      setIsCalendarPending(false);
    }
  }

  function getOrganizationLabel(option: Organization) {
    return option?.fields?.nazev ?? "";
  }

  function isOrganizationEqual(option: Organization, value: Organization) {
    return option?.id === value?.id;
  }

  const isMeetInOrganization =
    getValues("meetLocationType") === MeetingLocationType.LIBRARY;

  const isMeetRemote =
    getValues("meetLocationType") === MeetingLocationType.REMOTE;

  const isQueryFinished = FINISHED_STATUSES.includes(
    getValues("queryStatus") as QueryStatus
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3} sx={{ marginTop: "1rem" }}>
        <FormInputDropdown
          name="queryStatus"
          control={control}
          label="Stavu dotazu"
          renderValue={(status: QueryStatus) => (
            <QueryStatusChip queryStatus={status} />
          )}
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
          renderValue={(val: MeetingLocationType) =>
            MeetingLocationTypeLabels[val] ?? val
          }
        >
          {renderFlatOptions(
            Object.values(MeetingLocationType),
            MeetingLocationTypeLabels
          )}
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

        {isMeetRemote ? null : (
          <FormInputText
            name="address"
            control={control}
            label="Adresa setkání"
            disabled={isMeetInOrganization}
          />
        )}

        <FormInputDateTime
          name="dateTime"
          control={control}
          label="Datum a čas setkání"
        />

        {isQueryFinished ? (
          <FormInputText
            name="duration"
            control={control}
            label="Délka řešení (minuty)"
          />
        ) : null}

        <FormInputText
          name="summary"
          control={control}
          label="Poznámka k setkání"
          multiline
          minRows={6}
          maxRows={10}
        />

        {getValues("queryStatus") === QueryStatus.SOLVED ? (
          <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
            <FormHeadline text="Hodnocení asistenta" />

            <FormInputText
              name="assistantScore"
              control={control}
              label="Hodnocení (1-5 jako ve škole)"
            />
          </Stack>
        ) : null}

        {isCalendarSuccess ? (
          <ErrorAlert
            errorMessage="Událost přidána/změněna."
            type="success"
            floatingAlert
            floatingAlertOpen={isCalendarSuccess}
            showContactSupportMessage={false}
            onFloatingAlertClose={() => setIsCalendarSuccess(false)}
          />
        ) : null}

        {isCalendarError ? (
          <ErrorAlert
            errorMessage="Při přidávání do kalendáře nastala chyba."
            floatingAlert
            floatingAlertOpen={isCalendarError}
            onFloatingAlertClose={() => setIsCalendarError(false)}
          />
        ) : null}

        {isError ? (
          <ErrorAlert
            errorMessage="Při přidávání změny dotazu nastala chyba."
            floatingAlert
            floatingAlertOpen={isError}
            onFloatingAlertClose={() => setIsError(false)}
          />
        ) : null}

        <Stack spacing={1}>
          {!FINISHED_STATUSES.includes(
            getValues("queryStatus") as QueryStatus
          ) && getValues("dateTime") ? (
            <Button
              color="warning"
              onClick={handleAddEvent}
              variant="contained"
              disabled={isCalendarPending}
              sx={{ backgroundColor: "#028790 !important" }}
            >
              + Přidat do kalendáře
            </Button>
          ) : null}
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
