import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormInputSwitch } from "components/app-forms/inputs/FormInputSwitch";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import CancelButton from "components/buttons/cancel-button";
import SubmitButton from "components/buttons/submit-button";
import { useQueryFilters } from "helper/hooks";
import {
  buildAssistantFilterSchema,
  checkFilterNameUnique,
  NewAssistantFilterValues,
} from "helper/schemas/assistant-filter-schema";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FilterChip from "./filter-chip";
import { MeetingLocationTypeLabels, QueryStatusLabels } from "helper/consts";
import { createAssistantFilter } from "./actions";
import FloatingAlert from "components/alerts/floating-alert";

type Props = {
  open: boolean;
  handleClose: Function;
  defaultAssistantFilterExists: boolean;
};

function SaveAssistantFilterDialog({
  open,
  handleClose,
  defaultAssistantFilterExists,
}: Props) {
  const searchParams = useSearchParams()!;

  const {
    assistantFilter,
    queryStatuses,
    locations,
    deviceCategories,
    senior,
    meetLocationTypes,
    userAssigned,
  } = useQueryFilters(searchParams);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(buildAssistantFilterSchema(checkFilterNameUnique)),
    defaultValues: {
      name: "",
      isDefaultFilter: !defaultAssistantFilterExists,
    },
  });

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  async function submit(values: NewAssistantFilterValues) {
    try {
      setIsError(false);
      setIsPending(true);
      await createAssistantFilter(values, {
        assistantFilter,
        queryStatuses,
        locations,
        deviceCategories,
        senior,
        meetLocationTypes,
        userAssigned: userAssigned,
      });
      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
    handleClose();
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} sx={{ m: "0rem" }}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle sx={{ fontSize: "1rem", textAlign: "center" }}>
          Chystáte se uložit následující filtr:
        </DialogTitle>
        <DialogContent sx={{ p: "1rem" }}>
          <Stack gap={3}>
            <Box>
              {queryStatuses && (
                <FilterChip
                  readOnly
                  labels={QueryStatusLabels}
                  value={queryStatuses}
                />
              )}
              {locations && <FilterChip readOnly value={locations} />}
              {deviceCategories && (
                <FilterChip readOnly value={deviceCategories} />
              )}
              {senior && <FilterChip readOnly value={senior} />}
              {meetLocationTypes && (
                <FilterChip
                  readOnly
                  value={meetLocationTypes}
                  labels={MeetingLocationTypeLabels}
                />
              )}
            </Box>
            <FormInputText name="name" control={control} label="Název filtru" />
            <FormInputSwitch
              hiddenBottomBorder
              name="isDefaultFilter"
              control={control}
              label="Zobrazit jako výchozí"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={() => handleClose()} />
          <SubmitButton disabled={isPending || isSubmitting} />
        </DialogActions>
      </form>
      <FloatingAlert
        errorMessage={"Při přidávání filtru nastala chyba."}
        floatingAlertOpen={isError}
        onFloatingAlertClose={() => setIsError(false)}
      />
    </Dialog>
  );
}

export default SaveAssistantFilterDialog;
