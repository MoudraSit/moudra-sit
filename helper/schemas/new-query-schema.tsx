import * as yup from "yup";
import { newSeniorSchema } from "./new-senior-schema";

// schema for form validation
export const newQuerySchema = yup.object({
  preexistingSeniorId: yup.string(),
  senior: newSeniorSchema.concat(
    // Email is not required unlike during senior registration (in the app, not the help form)
    yup.object({
      email: yup.string().email("Napište správně kontaktní e-mail seniora"),
    })
  ),
  title: yup.string().required("Napište název dotazu"),
  description: yup.string().required("Napište popis dotazu"),
  deviceTypes: yup
    .array(yup.string())
    .min(1, "Zadejte aspoň 1 typ zařízení")
    .required(),
  preferredMeetLocations: yup
    .array(yup.string())
    .min(1, "Zadejte aspoň 1 preferované místo setkání")
    .required(),
});

export type NewQueryValues = yup.InferType<typeof newQuerySchema>;
