import * as yup from "yup";

// schema for form validation
export const visitCalendarEventSchema = yup.object({}).shape({
  eventId: yup.string(),
  seniorName: yup.string(),
  dateTime: yup.string().required(),
  description: yup.string(),
  location: yup.string(),
  isGoogleMeetRemoteHelp: yup.bool(),
});
