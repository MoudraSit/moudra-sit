import {
  FINISHED_STATUSES,
  QueryStatus,
  MeetingLocationType as MeetingLocationType,
} from "helper/consts";
import { Organization } from "types/assistant";
import * as yup from "yup";

// schema for form validation
export const newQueryChangeSchema = yup.object({}).shape({
  isInitialChange: yup.boolean(),
  calendarEventId: yup.string(),
  queryStatus: yup.string().required("Zadejete stav dotazu"),
  meetLocationType: yup.string().required("Zadejete místo setkání"),
  organization: new yup.ObjectSchema<Organization>()
    .when("meetLocationType", {
      is: (val: string) => val === MeetingLocationType.LIBRARY,
      then: (schema) => schema.required("Zadejte organizaci"),
    })
    .nullable(),
  address: yup.string().when("meetLocationType", {
    is: (val: string) =>
      val === MeetingLocationType.AT_SENIOR ||
      val === MeetingLocationType.OTHER,
    then: (schema) => schema.required("Zadejte adresu setkání"),
  }),
  dateTime: yup
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
    .integer("Zadejte celé číslo")
    .when("queryStatus", {
      is: (val: string) => FINISHED_STATUSES.includes(val as QueryStatus),
      then: (schema) => schema.required("Zadejte celkovou délku řešení"),
    }),
  summary: yup.string().required("Zadejte poznámku ke změně"),
  assistantScore: yup
    .number()
    .integer()
    .min(1, "Zadejte hodnocení 1-5")
    .max(5, "Zadejte hodnocení 1-5")
    .typeError("Zadejte hodnocení 1-5")
    .when("queryStatus", {
      is: (val: string) => FINISHED_STATUSES.includes(val as QueryStatus),
      then: (schema) => schema.required("Zadejte hodnocení"),
    }),
});
