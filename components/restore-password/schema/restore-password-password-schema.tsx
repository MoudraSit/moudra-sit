import * as yup from "yup";
import zxcvbn from "zxcvbn";

// TODO: unify with register-assistant-schema

// schema for form validation
export const restorePasswordPasswordSchema = yup.object({}).shape({
  password: yup
    .string()
    .test(
      "password-strength",
      "Napište dostatečně dlouhé a bezpečné heslo",
      (value) => {
        if (!value) return false;
        const result = zxcvbn(value);
        return result.score >= 3; // Scores from 0 to 4
      }
    )
    .required("Prosím zvolte Vaše heslo"),
  confirmPwd: yup
    .string()
    .required("Prosím napište Vaše heslo ještě jednou")
    .oneOf([yup.ref("password")], "Hesla se neshodují"),
});
