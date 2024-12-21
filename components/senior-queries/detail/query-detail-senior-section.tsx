"use client";

import { SeniorQuery } from "types/seniorQuery";
import { startTransition, useState } from "react";
import { City } from "types/assistant";
import { EditSeniorForm } from "./edit-senior-form";
import SeniorInfo from "./senior-info";

type Props = {
  seniorQuery: SeniorQuery;
  seniorCity?: City;
};

export async function QueryDetailSeniorSection({
  seniorQuery,
  seniorCity,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <EditSeniorForm
      seniorQuery={seniorQuery}
      seniorCity={seniorCity}
      onEditCancel={() => startTransition(() => setIsEditing(false))}
    />
  ) : (
    <SeniorInfo
      seniorQuery={seniorQuery}
      onEdit={() => startTransition(() => setIsEditing(true))}
    />
  );
}
