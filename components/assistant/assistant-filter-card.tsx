"use client";

import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { MeetingLocationTypeLabels, QueryStatusLabels } from "helper/consts";
import * as React from "react";
import * as yup from "yup";

import { AssistantFilter } from "types/assistant";
import FilterChip from "components/senior-queries/filter/filter-chip";
import { FormInputSwitch } from "components/app-forms/inputs/FormInputSwitch";
import { yupResolver } from "@hookform/resolvers/yup";
import { assistantFilterPartialSchema } from "helper/schemas/assistant-filter-schema";
import { useForm } from "react-hook-form";
import { deleteAssistantFilter, saveAssistantFilter } from "./actions";
import FloatingAlert from "components/alerts/floating-alert";
import SuccessAlert from "components/alerts/success-alert";
import ConfirmDeleteFilterDialog from "./confirm-delete-filter-dialog";

type Props = {
  filter: AssistantFilter;
};

type FilterValues = yup.InferType<typeof assistantFilterPartialSchema>;

function AssistantFilterCard({ filter }: Props) {
  const { control, getValues, reset } = useForm({
    resolver: yupResolver(assistantFilterPartialSchema),
    defaultValues: {
      isDefaultFilter: filter.fields.vychoziFiltr,
    },
  });

  // Make sure the switch gets reset if default filter changes in another card
  React.useEffect(() => {
    reset({
      isDefaultFilter: filter.fields.vychoziFiltr,
    });
  }, [filter, reset]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function submit() {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);
      const isDefaultFilter = getValues(
        "isDefaultFilter"
      ) as FilterValues["isDefaultFilter"];
      await saveAssistantFilter(filter.id, { isDefaultFilter });
      setIsPending(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  async function submitDelete() {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);
      await deleteAssistantFilter(filter.id);
      setIsPending(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  const {
    stavDotazu: queryStatuses,
    lokalita: locations,
    zarizeni: deviceCategories,
    senior,
    pozadovaneMistoPomoci: meetLocationTypes,
    jenMojeDotazy: onlyMyQueries,
  } = filter.fields;

  return (
    <>
      <Card key={filter.fields.nazev} sx={{ padding: "10px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            {filter.fields.nazev}
          </Typography>
          <IconButton
            disabled={isPending}
            onClick={() => {
              setIsDeleteDialogOpen(true);
            }}
          >
            <DeleteIcon sx={{ color: "black" }} />
          </IconButton>
          <ConfirmDeleteFilterDialog
            open={isDeleteDialogOpen}
            handleClose={() => {
              setIsDeleteDialogOpen(false);
            }}
            handleConfirm={() => {
              setIsDeleteDialogOpen(false);
              submitDelete();
            }}
            filterName={filter.fields.nazev}
          />
        </Stack>
        <Box>
          {queryStatuses && (
            <FilterChip
              readOnly
              labels={QueryStatusLabels}
              value={queryStatuses.join(",")}
            />
          )}
          {locations && <FilterChip readOnly value={locations} />}
          {deviceCategories && deviceCategories.length ? (
            <FilterChip readOnly value={deviceCategories.join(",")} />
          ) : null}
          {senior && <FilterChip readOnly value={senior} />}
          {meetLocationTypes && meetLocationTypes.length ? (
            <FilterChip
              readOnly
              value={meetLocationTypes.join(",")}
              labels={MeetingLocationTypeLabels}
            />
          ) : null}
          {onlyMyQueries && (
            <FilterChip readOnly value={onlyMyQueries ? "Ano" : "Ne"} />
          )}
        </Box>
        <FormInputSwitch
          hiddenBottomBorder
          submitOnChange={submit}
          name="isDefaultFilter"
          control={control}
          label="Zobrazit jako výchozí"
        />
      </Card>
      <FloatingAlert
        floatingAlertOpen={isError}
        onFloatingAlertClose={() => setIsError(false)}
      />
      <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </>
  );
}

export default AssistantFilterCard;
