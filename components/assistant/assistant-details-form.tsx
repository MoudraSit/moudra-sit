"use client";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import {
  AssistantStatus,
  PhoneCountryCodes,
  phoneRegexWithCountryCode,
} from "helper/consts";
import * as React from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputDate } from "components/app-forms/inputs/FormInputDate";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/app-forms/inputs/FormInputDropdown";
import dayjs from "dayjs";
import { Assistant } from "types/assistant";
import { assistantDetailsSchema } from "helper/schemas/assistant-details-schema";
import AssistantStatusChip from "./assistant-status-chip";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { THEME_COLORS } from "components/theme/colors";
import { saveAssistantDetails } from "./actions";

function getInitials(assistant: Assistant) {
  return (
    assistant.fields.jmeno?.at(0) ??
    "" + assistant.fields.prijmeni?.at(0) ??
    "NA"
  );
}

type AssistantValues = yup.InferType<typeof assistantDetailsSchema>;

type Props = {
  assistant: Assistant;
};

function AssistantDetailsForm({ assistant }: Props) {
  // eslint-disable-next-line no-unused-vars
  const [_, countryCode, phoneNumber] = assistant.fields.telefon.match(
    phoneRegexWithCountryCode
  ) as string[];

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(assistantDetailsSchema),
    defaultValues: {
      title: assistant.fields.titul ?? "",
      firstName: assistant.fields.jmeno,
      lastName: assistant.fields.prijmeni,
      // Yup schema expects JS native Date, but the input works with dayjs
      //@ts-ignore
      birthDate: dayjs(assistant.fields.denNarozeni ?? ""),
      phoneCountryCode: Object.values(PhoneCountryCodes).includes(
        countryCode as PhoneCountryCodes
      )
        ? countryCode
        : PhoneCountryCodes.CZ,
      phone: phoneNumber,
      assistantStatus:
        assistant.fields.statusAsistenta ?? AssistantStatus.AVAILABLE,
      email: assistant.fields.email ?? "",
      city: assistant.fields.mesto ?? "",
      address: assistant.fields.ulice ?? "",
      organization: assistant.fields.organizace?.fields.nazev ?? "",
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function submit(data: AssistantValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await saveAssistantDetails(assistant.id, data);
      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3} sx={{ marginTop: "1rem" }}>
        <div>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            Profilová fotka
          </Typography>
          <Badge
            badgeContent={
              <CameraAltIcon
                sx={{
                  background: THEME_COLORS.primary,
                  borderRadius: "50%",
                  color: "white",
                  padding: "0.25rem",
                  fontSize: "1.5rem",
                }}
              />
            }
            overlap="circular"
          >
            <Avatar
              sx={{ width: 64, height: 64 }}
              src={
                assistant.fields.fotografie &&
                assistant.fields.fotografie.length
                  ? assistant.fields.fotografie[0].thumbnailUrl
                  : ""
              }
            >
              {getInitials(assistant)}
            </Avatar>
          </Badge>
        </div>

        <FormInputText name="title" control={control} label="Titul" />
        <FormInputText
          name="firstName"
          disabled
          control={control}
          label="Jméno"
        />
        <FormInputText
          name="lastName"
          disabled
          control={control}
          label="Příjmení"
        />

        <FormInputDropdown
          name="assistantStatus"
          control={control}
          label="Status asistenta"
        >
          {Object.values(AssistantStatus).map((option) => (
            <MenuItem key={option} value={option} dense>
              <AssistantStatusChip status={option} />
            </MenuItem>
          ))}
        </FormInputDropdown>

        <FormInputDate
          name="birthDate"
          disabled
          control={control}
          label="Datum narození"
        />

        <Grid container spacing={0}>
          <Grid item xs={4}>
            <FormInputDropdown
              name="phoneCountryCode"
              sx={{ paddingRight: "0.5rem" }}
              control={control}
            >
              {renderFlatOptions(Object.values(PhoneCountryCodes))}
            </FormInputDropdown>
          </Grid>

          <Grid item xs={8}>
            <FormInputText name="phone" control={control} label="Telefon" />
          </Grid>
        </Grid>
        <FormInputText name="email" control={control} label="E-mail" />

        <FormInputText
          name="city"
          disabled
          control={control}
          label="Bydliště"
        />
        <FormInputText
          name="address"
          disabled
          control={control}
          label="Ulice a číslo popisné"
        />
        <FormInputText
          name="organization"
          disabled
          control={control}
          label="Organizace / škola"
        />

        {isError ? (
          <Alert severity="error">
            Při ukládání osobních údajů nastala chyba, opakujte prosím akci
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
        </Stack>
      </Stack>
    </form>
  );
}

export default AssistantDetailsForm;
