"use client";

import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  newQuerySchema,
  NewQueryValues,
} from "helper/schemas/new-query-schema";
import { createQuery, searchSeniorsByPhoneNumber } from "./actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "components/form-inputs/FormInputText";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/form-inputs/FormInputDropdown";
import {
  PhoneCountryCodes,
  phoneRegexWithCountryCode,
  QueryDeviceCategory,
  VisitMeetLocation,
} from "helper/consts";
import { THEME_COLORS } from "components/theme/colors";
import { SeniorQuery } from "types/seniorQuery";

function FormHeadline({ text }: { text: string }) {
  return (
    <Typography
      sx={{
        background: "#F4F4F4",
        padding: "0.5rem",
        fontSize: "16px",
        fontWeight: "bold",
      }}
      variant="h2"
    >
      {text}
    </Typography>
  );
}

const seniorInitialValues = {
  phoneCountryCode: PhoneCountryCodes.CZ as string,
  phone: "",
  name: "",
  surname: "",
  year: 1950,
  email: "",
  city: "",
};

function highlightOption(option: string, values?: Array<string>) {
  if (!values || !values.includes(option)) return {};

  return {
    color: THEME_COLORS.primary,
  };
}

function parsePrefilledQuery(prefilledQuery?: SeniorQuery): NewQueryValues {
  const initialValues = {
    senior: seniorInitialValues,
    deviceTypes: [],
    meetLocationType: VisitMeetLocation.AT_SENIOR,
    title: "",
    description: "",
  };

  if (!prefilledQuery) return initialValues;

  // eslint-disable-next-line no-unused-vars
  const [_, countryCode, phoneNumber] =
    prefilledQuery.fields.iDSeniora.fields.telefon.match(
      phoneRegexWithCountryCode
    ) as string[];

  return {
    ...initialValues,
    preexistingSeniorId: prefilledQuery.fields.iDSeniora.id,
    senior: {
      phoneCountryCode: Object.values(PhoneCountryCodes).includes(
        countryCode as PhoneCountryCodes
      )
        ? countryCode
        : PhoneCountryCodes.CZ,
      phone: phoneNumber,
      name: prefilledQuery.fields.iDSeniora.fields.jmeno,
      surname: prefilledQuery.fields.iDSeniora.fields.prijmeni,
      year: prefilledQuery.fields.iDSeniora.fields.rokNarozeni,
      email: prefilledQuery.fields.iDSeniora.fields.email,
      city: prefilledQuery.fields.iDSeniora.fields.mesto,
    },
  };
}

type Props = {
  prefilledQuery?: SeniorQuery;
};

// TODO (nice-to-have): loading for the senior form part (for preexisting)
function NewQueryForm({ prefilledQuery }: Props) {
  const { handleSubmit, watch, getValues, setValue, control } = useForm({
    resolver: yupResolver(newQuerySchema),
    defaultValues: {
      ...parsePrefilledQuery(prefilledQuery),
    },
  });

  // Rerenders the form in case device types changed
  // This allows applying the right styles to the selected and unselected options
  // eslint-disable-next-line no-unused-vars
  const watchDeviceTypes = watch("deviceTypes");
  // eslint-disable-next-line no-unused-vars
  const watchPreexistingSenior = watch("preexistingSeniorId");

  // const [seniorFound, setIsSeniorFound] = React.useState(false);

  const handlePhoneBlur = async () => {
    const seniorsWithSamePhone = await searchSeniorsByPhoneNumber(
      getValues("senior.phoneCountryCode") + getValues("senior.phone")
    );

    if (!seniorsWithSamePhone.length) {
      setValue("preexistingSeniorId", "");
      setValue("senior.name", seniorInitialValues.name);
      setValue("senior.surname", seniorInitialValues.surname);
      setValue("senior.year", seniorInitialValues.year);
      setValue("senior.email", seniorInitialValues.email);
      setValue("senior.city", seniorInitialValues.city);
      return;
    }

    setValue("preexistingSeniorId", seniorsWithSamePhone[0].id);
    setValue("senior.name", seniorsWithSamePhone[0].fields.jmeno);
    setValue("senior.surname", seniorsWithSamePhone[0].fields.prijmeni);
    setValue("senior.year", seniorsWithSamePhone[0].fields.rokNarozeni);
    setValue("senior.email", seniorsWithSamePhone[0].fields.email);
    setValue("senior.city", seniorsWithSamePhone[0].fields.mesto);
  };

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function submit(values: NewQueryValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await createQuery(values);
      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <Stack spacing={3} sx={{ marginBottom: "3rem" }}>
          <FormHeadline text="Senior" />
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <FormInputDropdown
                name="senior.phoneCountryCode"
                sx={{ paddingRight: "0.5rem" }}
                control={control}
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
              />
            </Grid>
          </Grid>

          {!!getValues("preexistingSeniorId") ? (
            <Alert severity="success">Senior nalezen, pole předvyplněna.</Alert>
          ) : null}

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
          {/* TODO: Should be selected from a list eventually */}
          {/* TODO: If not, zip code needs to be added */}
          <FormInputText
            name="senior.city"
            control={control}
            label="Obec/město"
            disabled={!!getValues("preexistingSeniorId")}
          />
        </Stack>
        <Stack spacing={3}>
          <FormHeadline text="Dotaz" />
          <FormInputText name="title" control={control} label="Název dotazu" />
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
            {Object.values(QueryDeviceCategory).map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  ...highlightOption(
                    option,
                    getValues("deviceTypes") as string[]
                  ),
                }}
              >
                {option}
              </MenuItem>
            ))}
          </FormInputDropdown>

          {/* TODO: Should have multiple options eventually */}
          <FormInputDropdown
            name="meetLocationType"
            control={control}
            label="Místo setkání"
          >
            {renderFlatOptions(Object.values(VisitMeetLocation))}
          </FormInputDropdown>
        </Stack>

        {isError ? (
          <Alert severity="error">
            Při vytváření dotazu nastala chyba, opakujte prosím akci později.
            Pokud problém přetrvává, kontaktujte prosím{" "}
            <a href="mailto:support@moudrasit.cz">support@moudrasit.cz</a>.
          </Alert>
        ) : null}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
          sx={{
            mt: 3,
            mb: 3,
            bgcolor: "#D3215D !important",
            color: "white",
          }}
        >
          Uložit
        </Button>
      </Stack>
    </form>
  );
}

export default NewQueryForm;
