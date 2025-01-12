import * as yup from "yup";
import { newSeniorSchema } from "./new-senior-schema";

// schema for form validation
export const editSeniorSchema = newSeniorSchema.concat(
  // Email is not required unlike during senior registration (in the app, not the help form)
  yup.object({
    email: yup.string().email("Napište správně kontaktní e-mail seniora"),
  })
);

export type EditSeniorValues = yup.InferType<typeof editSeniorSchema>;
