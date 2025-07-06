"use server";

import { AssistantAPI } from "backend/assistant";
import { callTabidoo } from "backend/tabidoo";
import { AssistantPagePaths } from "helper/consts";
import { assistantDetailsSchema } from "helper/schemas/assistant-details-schema";
import { assistantFilterPartialSchema } from "helper/schemas/assistant-filter-schema";
import { assistantSettingsSchema } from "helper/schemas/assistant-settings-schema";
import { removeSpaces } from "helper/utils";
import { revalidatePath } from "next/cache";
import { AssistantFilter, District } from "types/assistant";
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

  if ("mainArea" in settingsValues)
    payload.hlavniMistoPusobeni = settingsValues.mainArea?.id
      ? { id: settingsValues.mainArea.id }
      : null;

  if (settingsValues.notificationDistricts) {
    const assistant = await AssistantAPI.getAssistantDetails(assistantId);
    let previousNotificationDistricts: Array<District> = [];
    if (assistant.fields.preferovaneOkresy?.url)
      previousNotificationDistricts = await AssistantAPI.getAssistantDistricts(
        assistant.fields.preferovaneOkresy?.url
      );
    payload.preferovaneOkresy = {
      remove: previousNotificationDistricts.map((district) => district.id),
      add: settingsValues.notificationDistricts.map((district) => district.id),
    };
  }

  await callTabidoo(`/tables/uzivatel/data/${assistantId}`, {
    method: "PATCH",
    body: { fields: payload },
  });

  revalidatePath(`${AssistantPagePaths.ASSISTANT_PROFILE_SETTINGS}`, "page");
}

export async function saveAssistantFilter(
  filterId: string,
  values: Record<string, any>
) {
  const filterValues = await assistantFilterPartialSchema.validate(values);

  const payload = {
    vychoziFiltr: filterValues.isDefaultFilter,
  };

  if (payload.vychoziFiltr) {
    const existingFilters = await AssistantAPI.getAssistantFilters();
    const defaultFilter = existingFilters.find(
      (filter) => filter.fields.vychoziFiltr
    );
    if (defaultFilter) {
      // Remove the default filter flag from the existing default filter
      await callTabidoo<AssistantFilter>(
        `/tables/uzivatelskeFiltry/data/${defaultFilter.id}`,
        {
          method: "PATCH",
          body: { fields: { vychoziFiltr: false } },
        }
      );
    }
  }

  await callTabidoo(`/tables/uzivatelskeFiltry/data/${filterId}`, {
    method: "PATCH",
    body: { fields: payload },
  });

  revalidatePath(`${AssistantPagePaths.ASSISTANT_PROFILE_FILTERS}`, "page");
}
export async function deleteAssistantFilter(filterId: string) {
  await callTabidoo(`/tables/uzivatelskeFiltry/data/${filterId}`, {
    method: "DELETE",
  });

  revalidatePath(`${AssistantPagePaths.ASSISTANT_PROFILE_FILTERS}`, "page");
}

export async function fetchAutocompleteCities(inputValue: string) {
  return await AssistantAPI.getCitiesByNameOrPostalCode(inputValue);
}
