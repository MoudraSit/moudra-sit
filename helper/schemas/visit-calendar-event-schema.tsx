import * as yup from "yup";

// schema for form validation
export const visitCalendarEventSchema = yup.object({}).shape({
  dateTime: yup.date().required(),
  description: yup.string(),
  location: yup.string(),
});
