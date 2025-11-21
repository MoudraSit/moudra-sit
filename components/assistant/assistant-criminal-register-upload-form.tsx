"use client";

import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import * as React from "react";

import { saveAssistanCriminalRegisterFile } from "./actions";
import SubmitButton from "components/buttons/submit-button";
import FloatingAlert from "components/alerts/floating-alert";
import SuccessAlert from "components/alerts/success-alert";
import { Assistant } from "types/assistant";
import { useSession } from "next-auth/react";
import { AssistantPagePaths } from "helper/consts";
import { useRouter } from "next/navigation";
import { FormInputFile } from "components/app-forms/inputs/FormInputFile";

function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve((reader.result as string).split(",")[1]); // strip "data:…;base64,"
      } else {
        reject(new Error("FileReader result is null"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type Props = {
  assistant: Assistant;
};

function AssistantCriminalRegisterUploadForm({ assistant }: Props) {
  const { update } = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fileBase64: "",
      mimetype: "",
      filename: "",
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const filenameWatch = watch("filename");

  function handleSelect(onChange: Function) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Always notify RHF of the new value
      trigger('fileBase64');

      // If file invalid -> stop here, let RHF show error
      if (!file) {
        setValue("filename", "");
        setValue("fileBase64", "");
        setValue("mimetype", "");
        return;
      }
      const base64 = await fileToBase64(file);

      // update RHF values
      onChange(file);
      setValue("fileBase64", base64 as string);
      setValue("filename", file.name);
      setValue("mimetype", file.type);
    };
  }

  async function submit(data: Record<string, any>) {
    try {
      setIsSuccess(false);
      setIsError(false);
      setIsPending(true);

      delete data.file;

      await saveAssistanCriminalRegisterFile(assistant.id, data);
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
      <Stack spacing={3}>
        <FormInputFile
          filename={getValues("filename")}
          control={control}
          handleSelect={handleSelect}
          errors={errors}
        />
        <SubmitButton
          disabled={isPending || !getValues("filename")}
          label="Nahrát rejstřík"
        />

        <SuccessAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        <FloatingAlert
          floatingAlertOpen={isError}
          onFloatingAlertClose={() => setIsError(false)}
        />
      </Stack>
    </form>
  );
}

export default AssistantCriminalRegisterUploadForm;
