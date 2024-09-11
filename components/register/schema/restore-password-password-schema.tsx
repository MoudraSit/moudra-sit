import * as yup from "yup";

// schema for form validation
export const restorePasswordPasswordSchema = yup.object({}).shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Heslo musí mít minimálně 8 znaků a obsahovat alespoň 1 číslo"
    )
    .required("Prosím zvolte Vaše heslo"),
  confirmPwd: yup
    .string()
    .required("Prosím napište Vaše heslo ještě jednou")
    .oneOf([yup.ref("password")], "Hesla se neshodují"),
});
