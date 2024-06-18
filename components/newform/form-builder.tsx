import { Container, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import TestInfoLine from "components/newform/test-info-line";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import * as React from "react";
import { ImageType } from "react-images-uploading";
import { defaultSchema } from "../form/schemas/default-schema";
import ProgressBarComponent from "../form/steps/progress-bar";
import { appTheme } from "../theme/theme";
import FinalStep from "./steps/final-step";
import StepSuccess from "./steps/step-success";
import Step1Form from "./steps/step1";
import Step2Form from "./steps/step2";
import Step3Form from "./steps/step3";
import Step4Form from "./steps/step4";
import submitHelperTest from "./submit-helper";

let lastStep = false;

const steps = [
  {
    label: "Váš rok narození",
  },
  {
    label: "Výběr zařízení",
  },
  {
    label: "Popis Vašeho problému",
  },
  {
    label: "Vaše kontaktní údaje",
  },
  {
    label: "Shrnutí",
  },
];

export interface IValues {
  requirmentName: string;
  phoneCheckbox: boolean;
  pcCheckbox: boolean;
  printerCheckbox: boolean;
  otherCheckbox: boolean;
  checkbox_selection: boolean;
  year: string;
  description: string;
  name: string;
  surname: string;
  zipCode: string;
  plusCode: string;
  phoneNumber: string;
  email: string;
  agreement: boolean;
  image: string;
  city: string;
}

const intial = {
  requirmentName: "",
  phoneCheckbox: false,
  pcCheckbox: false,
  printerCheckbox: false,
  otherCheckbox: false,
  checkbox_selection: false,
  year: "",
  description: "",
  name: "",
  surname: "",
  plusCode: "+420",
  zipCode: "",
  phoneNumber: "",
  email: "",
  agreement: false,
  image: "",
  city: "",
};

export function scrollIntoView() {
  setTimeout(function () {
    window.scrollBy({
      top: 500,
      left: 0,
      behavior: "smooth",
    });
  }, 300);
}

// render step content based on form progress
function renderStepContent(
  step: number,
  values: IValues,
  errors: FormikErrors<IValues>,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  setActiveStep: (step: number) => void
) {
  const uploadedImage = (image: ImageType) => {
    setFieldValue("image", image);
  };

  switch (step) {
    case 0:
      return <Step1Form values={values} />;
    case 1:
      return (
        <Step2Form setFieldValue={setFieldValue} errors={errors} setActiveStep={setActiveStep} />
      );
    case 2:
      return (
        <Step3Form uploadedImage={uploadedImage} setActiveStep={setActiveStep} values={values} />
      );
    case 3:
      return (
        <Step4Form setFieldValue={setFieldValue} setActiveStep={setActiveStep} values={values} />
      );
    case 4:
      return <FinalStep values={values} setActiveStep={setActiveStep} />;
    default:
      return <div>Not Found</div>;
  }
}

export default function FormBuilder() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [progressBar, setProgressbBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const currentValidationSchema = defaultSchema[activeStep];

  // onSubmit handler function
  async function handleSendTest(index: number, values: IValues, actions: FormikHelpers<IValues>) {
    if (index === steps.length - 1) {
      try {
        // show progress bar
        setProgressbBar(true);

        await submitHelperTest(index, values, actions);

        // switch off progress bar
        setProgressbBar(false);

        // fold steps
        lastStep = true;

        // show content of last step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        console.log("API communication - OK");
      } catch (error) {
        lastStep = false;
        setProgressbBar(false);
        setErrorMessage(true);

        // set submit button to default position
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    } else {
      // go to next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      //console.log(values);

      // set submit button to default position
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <TestInfoLine></TestInfoLine>
        <Box
          sx={{
            bgcolor: "#037f87",
            pt: 4,
            pb: 6,
          }}
        >
          <Formik
            initialValues={intial}
            validationSchema={currentValidationSchema}
            onSubmit={(values: IValues, actions) => {
              handleSendTest(activeStep, values, actions);

              // scroll into new section
              //scrollIntoView();
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form autoComplete="on">
                <Container maxWidth="xl">
                  <Typography
                    sx={{ pl: 8 }}
                    variant="h1"
                    align="left"
                    color="primary"
                    fontWeight="bold"
                  >
                    Kontaktní formulář
                  </Typography>

                  {activeStep !== steps.length && (
                    <Box
                      sx={{
                        bgcolor: "#f5f3ee",
                        mt: 4,
                        pt: 8,
                        pl: 8,
                        pr: 8,
                        pb: 6,
                        borderRadius: 2,
                      }}
                    >
                      {renderStepContent(activeStep, values, errors, setFieldValue, setActiveStep)}
                      {progressBar ? <ProgressBarComponent /> : null}
                    </Box>
                  )}
                </Container>
                {activeStep === steps.length && <StepSuccess />}
              </Form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>
    </>
  );
}

const FormContainer = styled(Container)`
  .MuiInputBase-root {
    background-color: white;
  }

  //autocomplete overrides
  .MuiInputBase-input {
    -webkit-text-fill-color: black;
    box-shadow: 0 0 0 1000px white inset;
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
`;
