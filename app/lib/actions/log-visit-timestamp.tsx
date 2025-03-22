"use server";

import { callTabidoo } from "backend/tabidoo";
import { Assistant } from "types/assistant";

export async function logVisitTimestamp(userId: string) {
  await callTabidoo<Assistant[]>(`/tables/uzivatel/data/${userId}`, {
    method: "PATCH",
    body: {
      fields: {
        posledniOtevreniAplikace: new Date().toISOString(),
      },
    },
  });
}
