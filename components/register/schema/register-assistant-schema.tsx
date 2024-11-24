import { City } from "types/assistant";
import * as yup from "yup";

const phoneRegex = /^\d{3}[ ]?\d{3}[ ]?\d{3}$/;

// schema for form validation
export const registerAssistantSchema = yup.object({}).shape({
  name: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím vložte jméno ve správném tvaru")
    .max(40)
    .required("Napište Vaše jméno"),
  surname: yup
    .string()
    .matches(/^[A-Ža-ž\s]*$/, "Prosím vložte příjmení ve správném tvaru")
    .max(40)
    .required("Napište Vaše příjmení"),
  email: yup
    .string()
    .email("Napište správně Váš kontaktní e-mail")
    .required("Napište Váš e-mail"),
  birthDate: yup
    .date()
    .min(new Date(1900, 0, 1), "Napište správné datum Vašeho narození")
    .required("Napište datum Vašeho narození")
    .typeError("Napište datum Vašeho narození"),
  // The required check is made conditional to allow both being initially null and validated upon submitting at the same time
  city: new yup.ObjectSchema<City>().nullable().when("phoneNumber", {
    is: (val: string) => val,
    then: (schema) => schema.required("Zadejte město"),
  }),
  plusCode: yup
    .string()
    .required("Napište správný tvar předvolby (např. +420)"),
  phoneNumber: yup
    .string()
    .matches(
      phoneRegex,
      "Napište správný tvar telefonního čísla (např. 123456789)"
    )
    .required("Napište Váš kontaktní telefon (např. 123456789)"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Heslo musí mít minimálně 8 znaků a obsahovat alespoň 1 číslo"
    )
    .required("Prosím zvolte Vaše heslo"),
  confirmPwd: yup
    .string()
    .required("Prosím napište Vaše heslo ještě jednou")
    .oneOf([yup.ref("password")], "Hesla se neshodují"),
});
