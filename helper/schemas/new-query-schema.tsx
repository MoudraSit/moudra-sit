import * as yup from "yup";

// schema for form validation
export const newQuerySchema = yup.object({}).shape({
  queryTitle: yup
    .string()
    .required("Napište název dotazu"),
});
