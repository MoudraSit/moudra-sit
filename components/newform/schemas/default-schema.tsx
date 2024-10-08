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
      .required("Kliknutím do pole vepište rok narození.")
      .typeError("Kliknutím do pole vepište rok narození."),
  }),
  yup.object().shape({
    year: yup
      .number()
      .min(1900, "Napište správný rok Vašeho narození")
      .max(
        new Date().getFullYear() - 60,
        "Služba je určena pouze pro seniory s věkem 60 let a více"
      )
      .required("Kliknutím do pole vepište rok narození.")
      .typeError("Kliknutím do pole vepište rok narození."),
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
      .required("Kliknutím do pole vepište rok narození.")
      .typeError("Kliknutím do pole vepište rok narození."),
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš požadavek"),
    description: yup.string().required("Prosím popište textem Váš požadavek"),
  }),
  yup.object().shape({
    year: yup
      .number()
      .min(1900, "Napište správný rok Vašeho narození")
      .max(
        new Date().getFullYear() - 60,
        "Služba je určena pouze pro seniory s věkem 60 let a více"
      )
      .required("Kliknutím do pole vepište rok narození.")
      .typeError("Kliknutím do pole vepište rok narození."),
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš požadavek"),
    description: yup.string().required("Prosím popište textem Váš požadavek"),
    homeCheckbox: yup.boolean(),
    libraryCheckbox: yup.boolean(),
    publicPlaceCheckbox: yup.boolean(),
    virtualCheckbox: yup.boolean(),
    place_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno preferované místo setkání"),
  }),
  yup.object().shape({
    year: yup
      .number()
      .min(1900, "Napište správný rok Vašeho narození")
      .max(
        new Date().getFullYear() - 60,
        "Služba je určena pouze pro seniory s věkem 60 let a více"
      )
      .required("Kliknutím do pole vepište rok narození.")
      .typeError("Kliknutím do pole vepište rok narození."),
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš požadavek"),
    description: yup.string().required("Prosím popište textem Váš požadavek"),
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
      .required("Napište Vaše PSČ")
      .typeError("Napište Vaše PSČ"),
    city: yup
      .string()
      .required("Vyberte název obce/města ze seznamu")
      .typeError("Vyberte název obce/města ze seznamu"),
    plusCode: yup.string().required("Napište správný tvar předvolby (např. +420)"),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, "Napište správný tvar telefonního čísla (např. 123456789)")
      .required("Napište Váš kontaktní telefon (např. 123456789)"),
    email: yup.string().email("Napište správně Váš kontaktní e-mail"),
    zkratka: yup.string(),
    homeCheckbox: yup.boolean(),
    libraryCheckbox: yup.boolean(),
    publicPlaceCheckbox: yup.boolean(),
    virtualCheckbox: yup.boolean(),
    place_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno preferované místo setkání"),
  }),
  yup.object().shape({
    year: yup
      .number()
      .min(1900, "Napište správný rok Vašeho narození")
      .max(
        new Date().getFullYear() - 60,
        "Služba je určena pouze pro seniory s věkem 60 let a více"
      )
      .required("Kliknutím do pole vepište rok narození.")
      .typeError("Kliknutím do pole vepište rok narození."),
    phoneCheckbox: yup.boolean(),
    pcCheckbox: yup.boolean(),
    printerCheckbox: yup.boolean(),
    otherCheckbox: yup.boolean(),
    checkbox_selection: yup.boolean().oneOf([true], "Označte prosím alespoň jedno zařízení"),
    requirmentName: yup.string().required("Prosím nazvěte Váš požadavek"),
    description: yup.string().required("Prosím popište textem Váš požadavek"),
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
      .required("Napište Vaše PSČ")
      .typeError("Napište Vaše PSČ"),
    city: yup
      .string()
      .required("Vyberte název obce/města ze seznamu")
      .typeError("Vyberte název obce/města ze seznamu"),
    plusCode: yup.string().required("Napište správný tvar předvolby (např. +420)"),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, "Napište správný tvar telefonního čísla (např. 123456789)")
      .required("Napište Váš kontaktní telefon (např. 123456789)"),
    email: yup.string().email("Napište správně Váš kontaktní e-mail"),
    zkratka: yup.string().required("Vyberte název obce/města ze seznamu"),
    homeCheckbox: yup.boolean(),
    libraryCheckbox: yup.boolean(),
    publicPlaceCheckbox: yup.boolean(),
    virtualCheckbox: yup.boolean(),
    place_selection: yup
      .boolean()
      .required()
      .oneOf([true], "Označte prosím alespoň jedno preferované místo setkání"),
  }),
];
