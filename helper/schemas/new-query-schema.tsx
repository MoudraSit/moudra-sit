import * as yup from "yup";
import { newSeniorSchema } from "./new-senior-schema";

// schema for form validation
export const newQuerySchema = yup.object({
  preexistingSeniorId: yup.string(),
  senior: newSeniorSchema,
  title: yup.string().required("Napište název dotazu"),
  description: yup.string().required("Napište popis dotazu"),
  deviceTypes: yup.array(yup.string()).min(1, "Zadejte aspon 1 typ zařízení").required(),
  meetLocationType: yup.string().required("Zadejte místo setkání"),
});

export type NewQueryValues = yup.InferType<typeof newQuerySchema>;
