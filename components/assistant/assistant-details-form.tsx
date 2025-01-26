"use client";

import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import {
  AssistantStatus,
  EDITABLE_ASSISTANT_STATUSES,
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
import { saveAssistantDetails } from "./actions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SubmitButton from "components/buttons/submit-button";
import { resizeImage } from "helper/resizeImage";
import SuccessAlert from "components/alerts/success-alert";
import FloatingAlert from "components/alerts/floating-alert";

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

  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assistantDetailsSchema),
    defaultValues: {
      currentPhotoId: assistant.fields?.fotografie?.[0]?.fileId ?? "",
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
      city: assistant.fields.trvaleBydliste?.fields?.mestoObec ?? "",
      address: assistant.fields.ulice ?? "",
      organization: assistant.fields.organizace?.fields.nazev ?? "",
    },
  });

  // Rerenders the form in case device types changed
  // This allows showing the new profile photo as a preview
  // eslint-disable-next-line no-unused-vars
  const watchDeletePhoto = watch("deleteCurrentPhoto");
  // eslint-disable-next-line no-unused-vars
  const watchNewPhoto = watch("photoFileBase64");

  const [isDialOpen, setIsDialOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function submit(data: AssistantValues) {
    try {
      setIsError(false);
      setIsSuccess(false);
      setIsPending(true);
      await saveAssistantDetails(assistant.id, data);
      setIsPending(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  function getProfilePhotoUrl() {
    if (getValues("deleteCurrentPhoto")) return "";

    const newPhotoData = getValues("photoFileBase64");
    if (newPhotoData)
      return `data:${getValues("photoFileType")};base64, ${newPhotoData}`;

    const currentPhotoUrl =
      assistant.fields.fotografie && assistant.fields.fotografie.length
        ? assistant.fields.fotografie[0].thumbnailUrl
        : "";
    return currentPhotoUrl;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            Profilová fotka
          </Typography>
          <Stack direction="row" alignItems="center">
            <Badge
              badgeContent={
                <ClickAwayListener onClickAway={() => setIsDialOpen(false)}>
                  <SpeedDial
                    open={isDialOpen}
                    onClick={() => {
                      setIsDialOpen((prev) => !prev);
                    }}
                    direction="right"
                    ariaLabel="SpeedDial"
                    FabProps={{
                      size: "small",
                      color: "warning",
                      sx: {
                        width: "1.5rem",
                        height: "1.5rem",
                        minHeight: "unset",
                      },
                    }}
                    sx={{
                      position: "absolute",
                      left: 0,
                    }}
                    icon={<EditIcon sx={{ fontSize: "1rem" }} />}
                  >
                    <SpeedDialAction
                      icon={
                        <IconButton component="label" color="warning">
                          <input
                            onChange={async (e) => {
                              if (e.target.files?.length) {
                                const file = e.target.files[0];

                                try {
                                  // Resize and compress the image
                                  const resizedBlob = await resizeImage(file);

                                  // Convert to base64
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    // @ts-ignore
                                    const base64 = reader.result.split(",")[1];
                                    setValue("photoFileBase64", base64);
                                    trigger("photoFileBase64");
                                    setValue("photoFileName", file.name);
                                    setValue("photoFileType", file.type);
                                  };
                                  reader.readAsDataURL(resizedBlob as Blob);
                                } catch (error) {
                                  console.error(
                                    "Image processing failed:",
                                    error
                                  );
                                }
                              }
                            }}
                            type="file"
                            hidden
                            accept="image/*"
                          />
                          <CameraAltIcon />
                        </IconButton>
                      }
                      tooltipTitle={"Smazat fotku"}
                    ></SpeedDialAction>
                    <SpeedDialAction
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setValue("deleteCurrentPhoto", true);
                        setIsDialOpen(false);
                      }}
                      tooltipTitle={"Smazat fotku"}
                    />
                  </SpeedDial>
                </ClickAwayListener>
              }
              overlap="circular"
            >
              <Avatar sx={{ width: 64, height: 64 }} src={getProfilePhotoUrl()}>
                {getInitials(assistant)}
              </Avatar>
            </Badge>
            {errors.photoFileBase64 ? (
              <Typography sx={{ marginLeft: "1rem", color: "red" }}>
                {errors.photoFileBase64.message}
              </Typography>
            ) : null}
          </Stack>
        </Box>

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
          {EDITABLE_ASSISTANT_STATUSES.map((option) => (
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
              label="Předvolba"
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
        <FormInputText name="email" disabled control={control} label="E-mail" />

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

        <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        <FloatingAlert
          floatingAlertOpen={isError}
          onFloatingAlertClose={() => setIsError(false)}
        />

        <SubmitButton disabled={isPending} />
      </Stack>
    </form>
  );
}

export default AssistantDetailsForm;
