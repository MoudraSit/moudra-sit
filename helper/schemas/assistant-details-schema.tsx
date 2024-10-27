import { phoneRegexWithCountryCode } from "helper/consts";
import * as yup from "yup";

// schema for form validation
export const assistantDetailsSchema = yup.object({}).shape({
  currentPhotoId: yup.string(),
  deleteCurrentPhoto: yup.boolean().default(false),
  photoFileBase64: yup
    .string()
    .test("length", "Fotka je přílíš velká (max 4 MB)", (value) =>
      value?.length ? value.length < 4 * (4_000_000 / 3) : true
    ),
  photoFileName: yup.string(),
  photoFileType: yup.string(),
  title: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  birthDate: yup.date(),
  assistantStatus: yup.string().required("Zadejete status asistenta"),
  email: yup
    .string()
    .email("Napište správně svůj kontaktní e-mail")
    .required("Napište svůj kontaktní e-mail"),
  phoneCountryCode: yup
    .string()
    .required("Napište správný tvar předvolby (např. +420)"),
  phone: yup
    .string()
    .matches(
      phoneRegexWithCountryCode,
      "Napište správný tvar telefonního čísla (např. 123456789)"
    ),
  // .required("Napište svůj kontaktní telefon (např. 123456789)"),
  city: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím napište správně název obce/města")
    .required("Napište název obce/města"),
  address: yup
    .string()
    .matches(
      /^[A-Ža-ž ]*[ ][0-9]+[/]?[0-9]*$/,
      "Prosím vložte příjmení ve správném tvaru"
    )
    .required("Napište ulici a číslo popisné"),
  organization: yup.string(),
});
