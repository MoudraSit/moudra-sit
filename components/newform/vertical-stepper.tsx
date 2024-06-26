import { Container, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { ThemeProvider } from "@mui/material/styles";
import TestInfoLine from "components/newform/test-info-line";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import * as React from "react";
import { ImageType } from "react-images-uploading";
import { defaultSchema } from "../form/schemas/default-schema";
import ProgressBarComponent from "../form/steps/progress-bar";
import StepSuccess from "../form/steps/step-success";
import Step2Form from "../form/steps/step2";
import Step3Form from "../form/steps/step3";
import Step4Form from "../form/steps/step4";
import Step5Form from "../form/steps/step5";
import { appTheme } from "../theme/theme";
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
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
) {
  const uploadedImage = (image: ImageType) => {
    setFieldValue("image", image);
  };

  switch (step) {
    case 0:
      return <Step2Form setFieldValue={setFieldValue} errors={errors} />;
    case 1:
      return <Step2Form setFieldValue={setFieldValue} errors={errors} />;
    case 2:
      return <Step3Form uploadedImage={uploadedImage} />;
    case 3:
      return <Step4Form setFieldValue={setFieldValue} />;
    case 4:
      return <Step5Form values={values} />;
    default:
      return <div>Not Found</div>;
  }
}

export default function FormTest() {
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
            pt: 8,
            pb: 6,
          }}
        >
          <Formik
            initialValues={intial}
            validationSchema={currentValidationSchema}
            onSubmit={(values: IValues, actions) => {
              handleSendTest(activeStep, values, actions);

              // scroll into new section
              scrollIntoView();
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form autoComplete="on">
                <Container maxWidth="xl">
                  <Typography variant="h1" align="left" color="primary" fontWeight="bold">
                    Kontaktní formulář
                  </Typography>
                  {steps.map((step, index) => (
                    <Step
                      key={step.label}
                      active={
                        lastStep
                          ? index === activeStep
                          : index === activeStep - 4 ||
                            index === activeStep - 3 ||
                            index === activeStep - 2 ||
                            index === activeStep - 1 ||
                            index === activeStep
                      }
                    >
                      <StepContent>
                        <Container maxWidth="lg">
                          <Box
                            sx={{
                              bgcolor: "#f5f3ee",
                              pt: 8,
                              pb: 6,
                              borderRadius: 2,
                            }}
                          >
                            <FormContainer maxWidth="md">
                              <>{renderStepContent(index, values, errors, setFieldValue)}</>
                              {progressBar ? <ProgressBarComponent /> : null}
                              <Box
                                sx={{
                                  bgcolor: "#f5f3ee",
                                  pt: 8,
                                  textAlign: "left",
                                }}
                              >
                                {index === activeStep && index < steps.length - 1 && (
                                  <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                    sx={{
                                      mt: 1,
                                      mr: 1,
                                      bgcolor: "#D3215D !important",
                                      color: "white",
                                    }}
                                  >
                                    Pokračovat
                                  </Button>
                                )}
                                {index === steps.length - 1 && (
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{
                                      mt: 1,
                                      mr: 1,
                                      bgcolor: "#D3215D !important",
                                      color: "white",
                                    }}
                                  >
                                    Odeslat požadavek
                                  </Button>
                                )}
                              </Box>
                            </FormContainer>
                          </Box>
                        </Container>
                      </StepContent>
                    </Step>
                  ))}
                  {activeStep === steps.length && <StepSuccess />}
                </Container>
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
