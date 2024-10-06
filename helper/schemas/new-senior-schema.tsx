import { phoneRegexWithCountryCode } from "helper/consts";
import * as yup from "yup";

// schema for form validation
export const newSeniorSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím vložte jméno ve správném tvaru")
    .max(40)
    .required("Napište jméno seniora"),
  surname: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím příjmení ve správném tvaru")
    .max(40)
    .required("Napište příjmení seniora"),
  email: yup
    .string()
    .email("Napište správně kontaktní e-mail seniora")
    .required("Napište e-mail seniora"),
  year: yup
    .number()
    .integer()
    .min(1900, "Napište správný rok narození seniora")
    .max(
      new Date().getFullYear() - 60,
      "Služba je určena pouze pro seniory s věkem 60 let a více"
    )
    .required("Napište rok narození seniora")
    .typeError("Napište rok narození seniora"),
  phoneCountryCode: yup
    .string()
    .required("Napište správný tvar předvolby (např. +420)"),
  phone: yup
    .string()
    .matches(
      phoneRegexWithCountryCode,
      "Napište správný tvar telefonního čísla (např. 123456789)"
    )
    .required("Napište seniorův kontaktní telefon (např. 123456789)"),
  city: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím napište správně název obce/města")
    .required("Napište název obce/města"),
});

export type NewSeniorValues = yup.InferType<typeof newSeniorSchema>;
