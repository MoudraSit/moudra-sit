import * as yup from "yup";

// schema for form validation
export const newVisitSchema = yup.object({}).shape({
  queryStatus: yup.string().required("Zadejete stav dotazu"),
  meetLocationType: yup.string().required("Zadejete místo setkání"),
  address: yup.string().optional(),
  date: yup
    .date()
    .min(new Date(2021, 0, 1), "Napište správné datum návštěvy")
    // .required("Napište datum návštěvy")
    .typeError("Napište datum návštěvy"),
  duration: yup
    .number()
    .typeError("Zadejte číslo")
    // .required("Zadejete číslo")
    .positive("Zadejte kladné číslo")
    .integer("Zadejte celé číslo"),
  summary: yup.string().required("Zadejte shrnutí návštěvy"),
});
