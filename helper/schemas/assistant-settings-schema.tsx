import * as yup from "yup";

// schema for form validation
export const assistantSettingsSchema = yup.object({}).shape({
  sendScoreEmailNotification: yup.boolean(),
  mainArea: yup.string(),
  notificationDistricts: yup.array(yup.string()),
});
