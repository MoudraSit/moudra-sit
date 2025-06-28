"use server";

import { authOptions } from "app/lib/auth";
import { callTabidoo } from "backend/tabidoo";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { buildAssistantFilterSchema } from "helper/schemas/assistant-filter-schema";
import { AssistantFilter } from "types/assistant";
import { useQueryFilters } from "helper/hooks";
import { AssistantAPI } from "backend/assistant";

async function checkFilterNameUnique(name: string): Promise<boolean> {
  const assistantFilters = await AssistantAPI.getAssistantFilters();

  return !assistantFilters.some((filter) => filter.fields.nazev === name);
}

export async function createAssistantFilter(
  values: Record<string, any>,
  filters: ReturnType<typeof useQueryFilters>
) {
  const filterValues = await buildAssistantFilterSchema(
    checkFilterNameUnique
  ).validate(values);

  const session = await getServerSession(authOptions);

  const payload = {
    nazev: filterValues.name,
    vychoziFiltr: filterValues.isDefaultFilter,
    uzivatelLink: { id: session?.user?.id },
    // Saved as one string because Tabidoo does not hold all array options (unlike with multichoice known fields)
    lokalita: filters.locations,
    // Empty string would yield ['']
    stavDotazu: filters.queryStatuses ? filters.queryStatuses.split(",") : [],
    // Empty string would yield ['']
    zarizeni: filters.deviceCategories
      ? filters.deviceCategories.split(",")
      : [],
    // Empty string would yield ['']
    pozadovaneMistoPomoci: filters.meetLocationTypes
      ? filters.meetLocationTypes.split(",")
      : [],
    senior: filters.senior,
    jenMojeDotazy: filters.userAssigned === "true",
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

  await callTabidoo<AssistantFilter>(`/tables/uzivatelskeFiltry/data/`, {
    method: "POST",
    body: { fields: payload },
  });

  // Inefficient, but revalidate does not work with dynamic paths reliably
  revalidatePath(`/`, "layout");
}
