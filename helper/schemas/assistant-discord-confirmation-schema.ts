import * as yup from "yup";

export const assistantDiscordConfirmationSchema = yup.object({}).shape({
  confirmedDiscord: yup.boolean().oneOf([true], "Zaškrtněte potvrzení pro pokračování."),
});
