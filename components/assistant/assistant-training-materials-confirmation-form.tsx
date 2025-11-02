"use client";

import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { saveAssistantTrainingMaterialConfirmation } from "./actions";
import SubmitButton from "components/buttons/submit-button";
import FloatingAlert from "components/alerts/floating-alert";
import SuccessAlert from "components/alerts/success-alert";
import { FormInputCheckbox } from "components/app-forms/inputs/FormInputCheckbox";
import { assistantTrainingMaterialsConfirmationSchema } from "helper/schemas/assistant-training-materials-confirmation-schema";
import { Assistant } from "types/assistant";
import { useSession } from "next-auth/react";
import { Assistant } from "next/font/google";
import { AssistantPagePaths } from "helper/consts";
import { useRouter } from "next/navigation";

type Props = {
  assistant: Assistant;
};

function AssistantTrainingMaterialsConfirmationForm({ assistant }: Props) {
  const { update } = useSession();
  const router = useRouter();

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(assistantTrainingMaterialsConfirmationSchema),
    defaultValues: {
      confirmedTrainingMaterials: false,
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  async function submit() {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);
      await saveAssistantTrainingMaterialConfirmation(assistant.id);
      setIsPending(false);
      setIsSuccess(true);

      // Refresh session so that user.status is ACTIVE
      await update();
      // Redirect user
      router.replace(AssistantPagePaths.ASSISTANT_PROFILE);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3} sx={{ marginTop: "2rem" }}>
        <FormInputCheckbox
          name="confirmedTrainingMaterials"
          control={control}
          setValue={setValue}
          label="Potvrzuji, že jsem si prostudoval/a školící materiály pro Digitální asistenty."
        />

        <SubmitButton disabled={isPending} />

        <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        <FloatingAlert
          floatingAlertOpen={isError}
          onFloatingAlertClose={() => setIsError(false)}
        />
      </Stack>
    </form>
  );
}

export default AssistantTrainingMaterialsConfirmationForm;
