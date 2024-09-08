import * as yup from "yup";

// schema for form validation
export const restorePasswordSchema = yup.object({}).shape({
  email: yup
    .string()
    .email("Napište správně Váš kontaktní e-mail")
    .required("Napište Váš e-mail"),
});
