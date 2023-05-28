import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../theme/theme";
import { Container, Typography, styled } from "@mui/material";
import Step1Form from "./steps/step1";
import Step2Form from "./steps/step2";
import Step3Form from "./steps/step3";
import Step4Form from "./steps/step4";
import { defaultSchema } from "./schemas/default-schema";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import Step5Form from "./steps/step5";
import StepSuccess from "./steps/step-success";
import ErrorMessageComponent from "./steps/error-message";
import ProgressBarComponent from "./steps/progress-bar";
import { ImageType } from "react-images-uploading";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import submitHelper from "./submit-helper";

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
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
) {
  const uploadedImage = (image: ImageType) => {
    setFieldValue("image", image);
  };

  switch (step) {
    case 0:
      return <Step1Form />;
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

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [progressBar, setProgressbBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const currentValidationSchema = defaultSchema[activeStep];

  const { executeRecaptcha } = useGoogleReCaptcha();

  // onSubmit handler function
  async function handleSend(
    index: number,
    values: IValues,
    actions: FormikHelpers<IValues>
  ) {
    if (index === steps.length - 1) {
      // is recpatcha check ready
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }

      try {
        // show progress bar
        setProgressbBar(true);

        // simulate API calling
        //await new Promise((resolve) => setTimeout(resolve, 3000));

        await submitHelper(index, values, actions, executeRecaptcha);

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

        //show error
        console.log(error);
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
              handleSend(activeStep, values, actions);

              // scroll into new section
              scrollIntoView();
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form autoComplete="on">
                <Container maxWidth="xl">
                  <Typography
                    variant="h1"
                    align="left"
                    color="primary"
                    fontWeight="bold"
                  >
                    Kontaktní formulář
                  </Typography>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step
                        sx={{
                          "& .MuiStepLabel-labelContainer": {
                            color: "white", // circle's text (DISABLED)
                          },
                          "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root":
                            {
                              fill: "white", // circle's color (DISABLED)
                            },
                          "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text":
                            {
                              fill: "#028790", // circle's number (DISABLED)
                            },
                          "& .MuiStepLabel-root .Mui-disabled": {
                            color: "white", // text color (DISABLED)
                          },
                          "& .MuiStepLabel-root .Mui-active": {
                            color: "white", // circle color (ACTIVE)
                          },
                          "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text":
                            {
                              fill: "#028790", // circle's text (ACTIVE)
                            },
                          "& .MuiStepLabel-root .Mui-completed": {
                            color: "white", // circle color (COMPLETED)
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 25,
                          },
                          "& .MuiStepIcon-text": {
                            fontSize: 18,
                            fontWeight: "bold",
                          },

                          "& .MuiStepLabel-label": {
                            fontSize: 20,
                          },
                          "& .MuiStepContent-root": {
                            paddingLeft: 0,
                          },
                        }}
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
                        <StepLabel>{step.label}</StepLabel>
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
                                <>
                                  {renderStepContent(
                                    index,
                                    values,
                                    errors,
                                    setFieldValue
                                  )}
                                </>
                                {progressBar ? <ProgressBarComponent /> : null}
                                {errorMessage ? (
                                  <ErrorMessageComponent />
                                ) : null}
                                <Box
                                  sx={{
                                    bgcolor: "#f5f3ee",
                                    pt: 8,
                                    textAlign: "left",
                                  }}
                                >
                                  {index === activeStep &&
                                    index < steps.length - 1 && (
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
                  </Stepper>
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
`;
