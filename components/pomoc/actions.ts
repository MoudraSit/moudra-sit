"use server";

import { callTabidoo } from "backend/tabidoo";

export type HelpFormData = {
  typ: string;
  dotazText: string;
  vlozilEmail: string;
};

export async function submitHelpForm(data: HelpFormData): Promise<void> {
  await callTabidoo("/tables/dotazyPodpora/data", {
    method: "POST",
    body: {
      fields: {
        stav: "Nový",
        typ: data.typ,
        dotazText: data.dotazText,
        vlozilEmail: data.vlozilEmail,
      },
    },
  });
}
