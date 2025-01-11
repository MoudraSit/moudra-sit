import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, Stack } from "@mui/material";
import FloatingAlert from "components/alerts/floating-alert";
import { FormInputCity } from "components/app-forms/inputs/FormInputCity";
import {
  FormInputDropdown,
  renderFlatOptions,
} from "components/app-forms/inputs/FormInputDropdown";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import CancelButton from "components/buttons/cancel-button";
import SubmitButton from "components/buttons/submit-button";
import { PhoneCountryCodes } from "helper/consts";
import {
  editSeniorSchema,
  EditSeniorValues,
} from "helper/schemas/edit-senior-schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editSenior } from "../actions";
import { prefillSenior } from "../new-query-form";
import { BORDER_COLOR } from "./helper-components";
import { City } from "types/assistant";
import { SeniorQuery } from "types/seniorQuery";

type Props = {
  seniorQuery: SeniorQuery;
  seniorCity?: City;
  onEditCancel: Function;
};

export async function EditSeniorForm({
  seniorQuery,
  seniorCity,
  onEditCancel,
}: Props) {
  const { handleSubmit, getValues, control } = useForm({
    resolver: yupResolver(editSeniorSchema),
    defaultValues: {
      ...prefillSenior(seniorQuery.fields.iDSeniora),
      city: seniorCity,
    },
  });

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  async function submit(values: EditSeniorValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await editSenior(seniorQuery.fields.iDSeniora.id, values);
      setIsPending(false);
      onEditCancel();
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid
        container
        gap={3}
        sx={{
          width: "100%",
          border: `1px ${BORDER_COLOR} solid`,
          padding: "0.5rem",
          margin: 0,
          position: "relative",
        }}
      >
        <Grid item xs={12}>
          <Typography>
            {seniorQuery.fields.iDSeniora.fields.prijmeniJmeno}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormInputCity
            name="city"
            control={control}
            getValues={getValues}
            isPending={isPending}
          />
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <FormInputDropdown
              name="phoneCountryCode"
              label="Předvolba"
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

        <FormInputText name="year" disabled control={control} label="Rok narození" />

        <FormInputText name="email" control={control} label="E-mail" />

        <Grid item xs={12} sx={{ paddingLeft: "0 !important" }}>
          <Stack direction="row" spacing={1}>
            <CancelButton
              sx={{ mt: 0, mb: 0 }}
              onClick={() => onEditCancel()}
            />
            <SubmitButton sx={{ mt: 0, mb: 0 }} disabled={isPending} />
          </Stack>
        </Grid>

        <FloatingAlert
          errorMessage="Při přidávání změny seniora nastala chyba."
          floatingAlertOpen={isError}
          onFloatingAlertClose={() => setIsError(false)}
        />
      </Grid>
    </form>
  );
}
