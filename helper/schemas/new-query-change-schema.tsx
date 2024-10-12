import { VisitMeetLocation } from "helper/consts";
import * as yup from "yup";

// schema for form validation
export const newQueryChangeSchema = yup.object({}).shape({
  isInitialChange: yup.boolean(),
  queryStatus: yup.string().required("Zadejete stav dotazu"),
  meetLocationType: yup.string().required("Zadejete místo setkání"),
  address: yup.string().when("meetLocationType", {
    is: (val: string) =>
      val === VisitMeetLocation.AT_SENIOR || val === VisitMeetLocation.OTHER,
    then: (schema) => schema.required("Zadejte adresu setkání"),
  }),
  date: yup
    .date()
    .when("isInitialChange", {
      is: true,
      then: (schema) =>
        schema.required(
          "Při převzetí dotazu je potřeba domluvit termín se seniorem"
        ),
    })
    .min(new Date(2021, 0, 1), "Napište správné datum návštěvy")
    .typeError("Napište datum návštěvy"),
  duration: yup
    .number()
    .typeError("Zadejte číslo")
    .positive("Zadejte kladné číslo")
    .integer("Zadejte celé číslo"),
  summary: yup.string().required("Zadejte poznámku ke změně"),
  assistantScore: yup
    .number()
    .optional()
    .integer()
    .min(1, "Zadejte hodnocení 1-5")
    .max(5, "Zadejte hodnocení 1-5")
    .typeError("Zadejte hodnocení 1-5"),
  assistantScoreDescription: yup.string().optional(),
});
