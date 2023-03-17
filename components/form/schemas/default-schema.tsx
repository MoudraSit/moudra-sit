import * as yup from "yup";

const phoneRegex = /^\d{3}[ ]?\d{3}[ ]?\d{3}$/;
const pscRegex = /^\d{3}[ ]?\d{2}$/;

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
    year: yup
      .number()
      .min(1900, "Napište správný rok Vašeho narození")
      .max(
        new Date().getFullYear() - 60,
        "Služba je určena pouze pro seniory s věkem 60 let a více"
      )
      .required("Napište rok Vašeho narození")
      .typeError("Napište rok Vašeho narození"),
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
  }),
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
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš problém"),
    description: yup.string().required("Prosím popište textem Váš problém"),
  }),
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
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš problém"),
    description: yup.string().required("Prosím popište textem Váš problém"),
    name: yup
      .string()
      .matches(/^[A-Ža-ž ]*$/, "Prosím vložte jméno ve správném tvaru")
      .max(40)
      .required("Napište Vaše jméno"),
    surname: yup
      .string()
      .matches(/^[A-Ža-ž ]*$/, "Prosím vložte příjmení ve správném tvaru")
      .max(40)
      .required("Napište Vaše příjmení"),
    zipCode: yup
      .string()
      .matches(pscRegex, "Napište správný tvar PSČ (např. 60200)")
      .required("Napište Vaše PSČ"),
    city: yup.string().required("Napište název obce/města"),
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
    email: yup.string().email("Napište správně Váš kontaktní email"),
    agreement: yup
      .boolean()
      .required()
      .oneOf([true], "Prosím potvrďte souhlas se zpracováním osobních údajů"),
  }),
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
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš problém"),
    description: yup.string().required("Prosím popište textem Váš problém"),
    name: yup
      .string()
      .matches(/^[A-Ža-ž ]*$/, "Prosím vložte jméno ve správném tvaru")
      .max(40)
      .required("Napište Vaše jméno"),
    surname: yup
      .string()
      .matches(/^[A-Ža-ž ]*$/, "Prosím vložte příjmení ve správném tvaru")
      .max(40)
      .required("Napište Vaše příjmení"),
    zipCode: yup
      .string()
      .matches(pscRegex, "Špatný tvar PSČ")
      .required("Napište Vaše PSČ"),
    city: yup.string().required("Napište název obce/města"),
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
    email: yup.string().email("Napište správně Váš kontaktní email"),
    agreement: yup
      .boolean()
      .oneOf([true], "Prosím potvrďte souhlas se zpracováním osobních údajů"),
  }),
];
