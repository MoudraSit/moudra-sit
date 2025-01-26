"use client";

import { Alert, Grid, Stack } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  newQuerySchema,
  NewQueryValues,
} from "helper/schemas/new-query-schema";
import { createQuery, searchSeniorsByPhoneNumber } from "../actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/app-forms/inputs/FormInputDropdown";
import {
  AssistantPagePaths,
  PhoneCountryCodes,
  phoneRegexWithCountryCode,
  QUERY_DETAIL_TAB,
  QueryDeviceCategory,
  MeetingLocationType,
  MeetingLocationTypeLabels,
} from "helper/consts";
import FormHeadline from "components/app-forms/FormHeadline";
import SubmitButton from "components/buttons/submit-button";
import { useRouter } from "next/navigation";
import { FormInputCity } from "components/app-forms/inputs/FormInputCity";
import { Senior } from "types/senior";
import { NewSeniorValues } from "helper/schemas/new-senior-schema";
import SeniorFieldsSkeleton from "components/skeletons/senior-fields-skeleton";

const seniorEmptyValues = {
  phoneCountryCode: PhoneCountryCodes.CZ as string,
  phone: "",
  name: "",
  surname: "",
  year: 1950,
  email: "",
  city: null,
};

function highlightOption(option: string, values?: Array<string>) {
  return values && values.includes(option);
}

export function prefillSenior(prefilledSenior?: Senior): NewSeniorValues {
  if (!prefilledSenior) return seniorEmptyValues;

  // eslint-disable-next-line no-unused-vars
  const [_, countryCode, phoneNumber] = prefilledSenior.fields.telefon.match(
    phoneRegexWithCountryCode
  ) as string[];

  return {
    ...seniorEmptyValues,
    phoneCountryCode: Object.values(PhoneCountryCodes).includes(
      countryCode as PhoneCountryCodes
    )
      ? countryCode
      : PhoneCountryCodes.CZ,
    phone: phoneNumber,
    name: prefilledSenior.fields.jmeno,
    surname: prefilledSenior.fields.prijmeni,
    year: prefilledSenior.fields.rokNarozeni,
    email: prefilledSenior.fields.email,
    city: prefilledSenior.fields?.mestoLink ?? null,
  };
}

type Props = {
  prefilledSenior?: Senior;
};

function NewQueryForm({ prefilledSenior }: Props) {
  const router = useRouter();

  const { handleSubmit, watch, getValues, setValue, control, formState } =
    useForm({
      resolver: yupResolver(newQuerySchema),
      defaultValues: {
        preexistingSeniorId: prefilledSenior?.id,
        senior: prefillSenior(prefilledSenior),
        deviceTypes: [],
        preferredMeetLocations: [],
        title: "",
        description: "",
      },
    });

  // Rerenders the form in case device types changed
  // This allows applying the right styles to the selected and unselected options
  // eslint-disable-next-line no-unused-vars
  const watchDeviceTypes = watch("deviceTypes");
  // eslint-disable-next-line no-unused-vars
  const watchPreferredMeetLocations = watch("preferredMeetLocations");
  // eslint-disable-next-line no-unused-vars
  const watchPreexistingSenior = watch("preexistingSeniorId");

  const { isDirty } = formState;

  const [isSeniorPrefetchPending, setIsSeniorPrefetchPending] =
    React.useState(false);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handlePhoneBlur = async () => {
    setIsSeniorPrefetchPending(true);
    const seniorsWithSamePhone = await searchSeniorsByPhoneNumber(
      getValues("senior.phoneCountryCode") + getValues("senior.phone")
    );

    if (seniorsWithSamePhone.length)
      populateSeniorFields(seniorsWithSamePhone[0]);
    else setValue("preexistingSeniorId", "");

    setIsSeniorPrefetchPending(false);

    //   setSeniorWithSamePhone(seniorsWithSamePhone[0]);
    // else setSeniorWithSamePhone(undefined);

    // setIsConfirmDialogOpen(true);
  };

  function populateSeniorFields(senior: Senior) {
    setValue("preexistingSeniorId", senior.id);
    setValue("senior.name", senior.fields.jmeno);
    setValue("senior.surname", senior.fields.prijmeni);
    setValue("senior.year", senior.fields.rokNarozeni);
    setValue("senior.email", senior.fields.email);
    setValue("senior.city", senior.fields?.mestoLink ?? null);
  }

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function submit(values: NewQueryValues) {
    try {
      setIsError(false);
      setIsPending(true);
      const newQueryId = await createQuery(values);
      setIsPending(false);
      router.replace(
        `${AssistantPagePaths.SENIOR_QUERIES}/${newQueryId}/${QUERY_DETAIL_TAB}`
      );
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Stack>
          <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
            <FormHeadline text="Senior" />
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <FormInputDropdown
                  name="senior.phoneCountryCode"
                  label="Předvolba"
                  sx={{ paddingRight: "0.5rem" }}
                  control={control}
                  onBlur={handlePhoneBlur}
                  disabled={isSeniorPrefetchPending}
                >
                  {renderFlatOptions(Object.values(PhoneCountryCodes))}
                </FormInputDropdown>
              </Grid>

              <Grid item xs={8}>
                <FormInputText
                  name="senior.phone"
                  control={control}
                  label="Telefon"
                  onBlur={handlePhoneBlur}
                  disabled={isSeniorPrefetchPending}
                />
              </Grid>
            </Grid>

            {isSeniorPrefetchPending ? (
              <SeniorFieldsSkeleton />
            ) : (
              <>
                {!!getValues("preexistingSeniorId") ? (
                  <Alert severity="success">
                    Senior nalezen, pole předvyplněna.
                  </Alert>
                ) : (
                  <Alert severity="warning">
                    Senior nebyl nalezen podle čísla. Prosím, doplňte údaje.
                  </Alert>
                )}

                <FormInputText
                  name="senior.name"
                  control={control}
                  label="Jméno"
                  disabled={!!getValues("preexistingSeniorId")}
                />
                <FormInputText
                  name="senior.surname"
                  control={control}
                  label="Příjmení"
                  disabled={!!getValues("preexistingSeniorId")}
                />
                <FormInputText
                  name="senior.year"
                  control={control}
                  label="Rok narození"
                  disabled={!!getValues("preexistingSeniorId")}
                />
                <FormInputText
                  name="senior.email"
                  control={control}
                  label="E-mail"
                  disabled={!!getValues("preexistingSeniorId")}
                />

                <FormInputCity
                  name="senior.city"
                  control={control}
                  getValues={getValues}
                  isPending={isPending}
                  disabled={!!getValues("preexistingSeniorId")}
                />
              </>
            )}
          </Stack>
          <Stack spacing={3}>
            <FormHeadline text="Dotaz" />
            <FormInputText
              name="title"
              control={control}
              label="Název dotazu"
            />
            <FormInputText
              name="description"
              control={control}
              multiline
              minRows={6}
              maxRows={10}
              label="Detailní popis dotazu"
            />

            <FormInputDropdown
              name="deviceTypes"
              control={control}
              label="Zařízení"
              multiple
            >
              {renderFlatOptions(
                Object.values(QueryDeviceCategory),
                {},
                (option: string) =>
                  highlightOption(option, getValues("deviceTypes") as string[])
              )}
            </FormInputDropdown>

            <FormInputDropdown
              name="preferredMeetLocations"
              control={control}
              label="Preferovaná místa setkání"
              multiple
              multiline
              renderValue={(vals: Array<MeetingLocationType>) =>
                vals
                  .map((val) => MeetingLocationTypeLabels[val] ?? val)
                  .join(", ")
              }
            >
              {renderFlatOptions(
                Object.values(MeetingLocationType),
                MeetingLocationTypeLabels,
                (option: string) =>
                  highlightOption(
                    option,
                    getValues("preferredMeetLocations") as string[]
                  )
              )}
            </FormInputDropdown>
          </Stack>
          {isError ? (
            <Alert severity="error">
              Při vytváření dotazu nastala chyba, opakujte prosím akci později.
              Pokud problém přetrvává, kontaktujte prosím{" "}
              <a href="mailto:support@moudrasit.cz">support@moudrasit.cz</a>.
            </Alert>
          ) : null}

          <SubmitButton disabled={isPending} />
        </Stack>
      </form>
    </>
  );
}

export default NewQueryForm;
