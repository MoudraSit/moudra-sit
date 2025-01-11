"use server";

import { AssistantAPI } from "backend/assistant";
import { callTabidoo } from "backend/tabidoo";
import { AssistantPagePaths } from "helper/consts";
import { assistantDetailsSchema } from "helper/schemas/assistant-details-schema";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { removeSpaces } from "helper/utils";
import { revalidatePath } from "next/cache";
import { District } from "types/assistant";
import { JSObject } from "types/common";

export async function saveAssistantDetails(
  assistantId: string,
  details: JSObject
) {
  const detailValues = await assistantDetailsSchema.validate(details);

  const payload: JSObject = {
    titul: detailValues.title,
    statusAsistenta: detailValues.assistantStatus,
    telefon: detailValues.phone
      ? detailValues.phoneCountryCode.concat(removeSpaces(detailValues.phone))
      : "",
    email: detailValues.email,
  };

  if (detailValues.photoFileBase64) {
    payload.fotografie = {
      remove: detailValues.currentPhotoId ? [detailValues.currentPhotoId] : [],
      add: [
        {
          filename: detailValues.photoFileName,
          mimetype: detailValues.photoFileType,
          filedata: detailValues.photoFileBase64,
        },
      ],
    };
  } else if (detailValues.deleteCurrentPhoto) {
    payload.fotografie = {
      remove: detailValues.currentPhotoId ? [detailValues.currentPhotoId] : [],
    };
  }

  await callTabidoo(`/tables/uzivatel/data/${assistantId}`, {
    method: "PATCH",
    body: { fields: payload },
  });

  revalidatePath(
    `${AssistantPagePaths.ASSISTANT_PROFILE_PERSONAL_INFORMATION}`
  );
}

export async function saveAssistantSettings(
  assistantId: string,
  details: Record<string, any>
) {
  const settingsValues = await assistantSettingsSchema.validate(details);

  const payload: JSObject = {};

  // Because this is a boolean flag
  if ("sendScoreEmailNotification" in settingsValues)
    payload.noveHodnoceniOdSenioraEmail =
      settingsValues.sendScoreEmailNotification;

  if (settingsValues.mainArea)
    payload.hlavniMistoPusobeni = { id: settingsValues.mainArea.id };

  if (settingsValues.notificationDistricts) {
    const assistant = await AssistantAPI.getAssistantDetails(assistantId);
    let previousNotificationDistricts: Array<District> = [];
    if (assistant.fields.okresyProOdesilaniNotifikaci?.url)
      previousNotificationDistricts = await AssistantAPI.getAssistantDistricts(
        assistant.fields.okresyProOdesilaniNotifikaci?.url
      );
    payload.okresyProOdesilaniNotifikaci = {
      remove: previousNotificationDistricts.map((district) => district.id),
      add: settingsValues.notificationDistricts.map((district) => district.id),
    };
  }

  await callTabidoo(`/tables/uzivatel/data/${assistantId}`, {
    method: "PATCH",
    body: { fields: payload },
  });
}

export async function fetchAutocompleteCities(inputValue: string) {
  return await AssistantAPI.getCitiesByNameOrPostalCode(inputValue);
}
