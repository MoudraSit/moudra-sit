import { useFormik } from "formik";
import { defaultSchema } from "schemas";

const BasicForm = () => {
  const formik = useFormik({
    initialValues: {
      year: "",
      description: "",
      surname: "",
      givenname: "",
      zipCode: "",
      countryCode: "+420",
      phoneNumber: "",
      email: "",
    },
    validationSchema: defaultSchema,
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    },
    validateOnMount: true,
    validateOnChange: true,
  });

  return formik;
};

export default BasicForm;
