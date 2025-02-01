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
    .test(
      "is-not-too-old",
      "Datum nesmí být více než měsíc v minulosti",
      function (value) {
        if (!value) return false;

        const now = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);

        return value >= oneMonthAgo;
      }
    )
    .when("queryStatus", {
      is: (val: string) => FINISHED_STATUSES.includes(val as QueryStatus),
      then: (schema) =>
        schema.test(
          "is-not-in-future",
          "U vyřešeného dotazu nemůže být návštěva v budoucnosti",
          (value) => {
            if (!value) return true;

            const now = new Date();

            return value <= now;
          }
        ),
    })
    .typeError("Napište datum návštěvy"),
  duration: yup
    .number()
    .required("Zadejte délku řešení")
    .typeError("Zadejte číslo")
    .integer("Zadejte celé číslo")
    .max(600, "Maximální délka řešení je 600 minut")
    .when("queryStatus", {
      is: (val: string) => FINISHED_STATUSES.includes(val as QueryStatus),
      then: (schema) => schema.positive("Zadejte kladné číslo"),
    }),
  summary: yup.string().required("Zadejte poznámku ke změně"),
  assistantScore: yup
    .number()
    .integer()
    .min(1, "Zadejte hodnocení 1-5")
    .max(5, "Zadejte hodnocení 1-5")
    .typeError("Zadejte hodnocení 1-5")
    .when("queryStatus", {
      is: (val: string) => val === QueryStatus.SOLVED,
      then: (schema) => schema.required("Zadejte hodnocení"),
    }),
});
