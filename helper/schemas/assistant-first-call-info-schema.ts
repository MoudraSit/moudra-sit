import * as yup from "yup";

const phoneRegex = /^\d{3}[ ]?\d{3}[ ]?\d{3}$/;

export const assistantFirstCallInfoSchema = yup.object({}).shape({
  uliceACisloPopisne: yup
    .string()
    .required("Vyplňte ulici a číslo popisné"),
  isUnder18: yup.boolean(),
  jmenoZakonnyZastupce: yup
    .string()
    .when("isUnder18", {
      is: true,
      then: (schema) => schema.required("Vyplňte jméno zákonného zástupce"),
      otherwise: (schema) => schema.optional(),
    }),
  prijmeniZakonnyZastupce: yup
    .string()
    .when("isUnder18", {
      is: true,
      then: (schema) => schema.required("Vyplňte příjmení zákonného zástupce"),
      otherwise: (schema) => schema.optional(),
    }),
  telefonZakonnyZastupce: yup
    .string()
    .when("isUnder18", {
      is: true,
      then: (schema) =>
        schema
          .matches(
            phoneRegex,
            "Napište správný tvar telefonního čísla (např. 123456789)"
          )
          .required("Vyplňte telefon zákonného zástupce"),
      otherwise: (schema) => schema.optional(),
    }),
  emailZakonnyZastupce: yup
    .string()
    .when("isUnder18", {
      is: true,
      then: (schema) =>
        schema
          .email("Napište správně kontaktní e-mail zákonného zástupce")
          .required("Vyplňte e-mail zákonného zástupce"),
      otherwise: (schema) => schema.optional(),
    }),
});
