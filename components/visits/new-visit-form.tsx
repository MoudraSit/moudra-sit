"use client";

import { Button, Chip, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { QueryStatus, VisitMeetLocation } from "helper/consts";
import { newVisitSchema } from "helper/schemas/new-visit-schema";
import * as React from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormInputDate } from "components/form-inputs/FormInputDate";
import { FormInputText } from "components/form-inputs/FormInputText";
import { FormInputDropdown } from "components/form-inputs/FormInputDropdown";
import { createQueryVisit } from "./actions";

type NewVisitValues = yup.InferType<typeof newVisitSchema>;

type Props = {
  queryId: string;
};

function NewVisitForm({ queryId }: Props) {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newVisitSchema),
    defaultValues: {
      queryStatus: QueryStatus.IN_PROGRESS,
      meetLocationType: VisitMeetLocation.AT_SENIOR,
    },
  });

  const onSubmit = async (data: NewVisitValues) =>
    await createQueryVisit(queryId, data);

  //   const [isPending, setIsPending] = React.useState(false);

  // TODO: reduce font size

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInputDropdown
          name="queryStatus"
          control={control}
          label="Stavu dotazu"
        >
          {Object.values(QueryStatus).map((option) => (
            <MenuItem key={option} value={option}>
              <Chip label={option} />
            </MenuItem>
          ))}
        </FormInputDropdown>

        <FormInputDropdown
          name="meetLocationType"
          control={control}
          label="Místo setkání"
        >
          {Object.values(VisitMeetLocation).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
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
          label="Shrnutí návštěvy"
          multiline
          minRows={3}
          maxRows={6}
        />

        <Stack spacing={1}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            //   disabled={isPending}
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

export default NewVisitForm;
