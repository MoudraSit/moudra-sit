import * as yup from "yup";

const phoneRegExp = /^[0-9]{9}$/;

export const defaultSchema = [
  yup.object().shape({
    year: yup
      .number()
      .min(1900, "Napište správný rok Vašeho narození")
      .max(
        new Date().getFullYear() - 60,
        "Služba je určena pouze pro seniory s věkem 60 let a více"
      )
      .required("Napište rok Vašeho narození")
      .typeError("Napište rok Vašeho narození"),
  }),
  yup.object().shape({
    description: yup.string().required("Prosím popište textem Váš problém"),
  }),
  yup.object().shape({
    surname: yup
      .string()
      .matches(/^[A-Ža-ž ]*$/, "Prosím vložte jméno ve správném tvaru")
      .max(40)
      .required("Napište Vaše jméno"),
    givenname: yup
      .string()
      .matches(/^[A-Ža-ž ]*$/, "Prosím vložte příjmení ve správném tvaru")
      .max(40)
      .required("Napište Vaše příjmení"),
    zipCode: yup
      .string()
      .length(5, "PSČ musí mít délku 5")
      .matches(/^[0-9]{5}/, "Špatný tvar PSČ")
      .required("Napište Vaše PSČ"),
    countryCode: yup
      .string()
      .matches(/^(\+420|\+421)$/, "Špatné číslo předvolby")
      .required("Napište správný tvar předvolby (např. +420)"),
    phoneNumber: yup
      .string()
      .matches(
        phoneRegExp,
        "Napište správný tvar telefonního čísla (např. +420123456789)"
      )
      .required("Napište Váš kontaktní telefon (např. +420123456789)"),
    email: yup.string().email().required("Napište Váš kontaktní email"),
    agreement: yup.boolean().oneOf([true], "Souhlas"),
  }),
];
