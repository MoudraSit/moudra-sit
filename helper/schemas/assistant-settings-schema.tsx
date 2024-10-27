import { City, District } from "types/assistant";
import * as yup from "yup";

// schema for form validation
export const assistantSettingsSchema = yup.object({}).shape({
  sendScoreEmailNotification: yup.boolean(),
  mainArea: new yup.ObjectSchema<City>(),
  notificationDistricts: yup.array(new yup.ObjectSchema<District>()),
});
