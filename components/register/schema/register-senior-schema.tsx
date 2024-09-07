import * as yup from "yup";

const phoneRegex = /^\d{3}[ ]?\d{3}[ ]?\d{3}$/;
const pscRegex = /^\d{3}[ ]?\d{2}$/;

// schema for form validation
export const registerSeniorSchema = yup.object({}).shape({
  name: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím vložte jméno ve správném tvaru")
    .max(40)
    .required("Napište Vaše jméno"),
  surname: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím vložte příjmení ve správném tvaru")
    .max(40)
    .required("Napište Vaše příjmení"),
  email: yup
    .string()
    .email("Napište správně Váš kontaktní email")
    .required("Napište Váš email"),
  year: yup
    .number()
    .min(1900, "Napište správný rok Vašeho narození")
    .max(
      new Date().getFullYear() - 60,
      "Služba je určena pouze pro seniory s věkem 60 let a více"
    )
    .required("Napište rok Vašeho narození")
    .typeError("Napište rok Vašeho narození"),
  // address: yup
  //   .string()
  //   .matches(
  //     /^[A-Ža-ž ]*[ ][0-9]+[/]?[0-9]*$/,
  //     "Prosím vložte příjmení ve správném tvaru"
  //   )
  //   .required("Napište ulici a číslo popisné"),
  zipCode: yup
    .string()
    .matches(pscRegex, "Špatný tvar PSČ")
    .required("Napište Vaše PSČ"),
  city: yup
    .string()
    .matches(/^[A-Ža-ž]*$/, "Prosím napište správně název obce/města")
    .required("Napište název obce/města"),
  region: yup.string().required("Zvolte kraj Vašeho bydliště"),
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
  agreement: yup
    .boolean()
    .required("Prosím potvrďte souhlas se zpracováním osobních údajů"),
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
