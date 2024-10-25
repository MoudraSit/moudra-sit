import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import * as React from "react";
import { ImageType } from "react-images-uploading";
import ProgressBarComponent from "../form/steps/progress-bar";
import { defaultSchema } from "../newform/schemas/default-schema";
import { appTheme } from "../theme/theme";
import ErrorMessageComponent from "./components/error-message";
import TestInfoLine from "./components/test-info-line";
import { scrollIntoView, scrollToTop } from "./helpers/scroll-into-view";
import submitHelperTest from "./helpers/submit-helper";
import { FormContainer, formSteps, initialValues, IValues } from "./model/constants";
import { BirthStep } from "./steps/birth-step";
import { ContactStep } from "./steps/contact-step";
import { DescriptionStep } from "./steps/description-step";
import { DeviceStep } from "./steps/device-step";
import { FinalStep } from "./steps/final-step";
import { PlaceStep } from "./steps/place-step";
import StepSuccess from "./steps/step-success";

export default function FormBuilder() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [progressBar, setProgressbBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const currentValidationSchema = defaultSchema[activeStep];

  // onSubmit handler function
  async function handleSendToDevTabidoo(
    index: number,
    values: IValues,
    actions: FormikHelpers<IValues>
  ) {
    if (index === formSteps.length - 1) {
      try {
        // show progress bar
        setProgressbBar(true);
        await submitHelperTest(index, values, actions);
        // switch off progress bar
        setProgressbBar(false);
        // fold steps
        // show content of last step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log("API communication - OK");
      } catch (error) {
        setProgressbBar(false);
        setErrorMessage(true);
        // set submit button to default position
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    } else {
      // go to next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

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
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={(values: IValues, actions) => {
              handleSendToDevTabidoo(activeStep, values, actions);
              if (activeStep !== formSteps.length - 1) {
                if (window.matchMedia("(max-width: 600px)").matches) scrollToTop();
                else scrollIntoView();
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form autoComplete="on">
                <FormContainer maxWidth="xl" sx={{ p: 0 }}>
                  <Typography
                    sx={{ pl: { xs: 2, sm: 4, md: 8 } }}
                    variant="h1"
                    align="left"
                    color="primary"
                    fontWeight="bold"
                  >
                    Kontaktní formulář
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "#ffffff",
                      mt: 4,
                      pt: { xs: 4, sm: 4, md: 8 },
                      pl: { xs: 4, sm: 4, md: 8 },
                      pr: { xs: 4, sm: 4, md: 8 },
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      boxShadow: 4,
                    }}
                  >
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      sx={{
                        pb: { xs: 2, sm: 2, md: 4 },
                      }}
                    >
                      {formSteps.map((step, index) => (
                        <Step
                          sx={{
                            "& .MuiStepLabel-labelContainer": {
                              color: "white", // circle's text (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root": {
                              fill: "#C5C5C6", // circle's color (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text": {
                              fill: "white", // circle's number (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-disabled": {
                              color: "#C5C5C6", // text color (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-active": {
                              color: "#D3215D", // circle color (ACTIVE)
                            },
                            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                              fill: "white", // circle's text (ACTIVE)
                            },
                            "& .MuiStepLabel-root .Mui-completed": {
                              color: "#D3215D", // circle color (COMPLETED)
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                            "& .MuiStepIcon-text": {
                              fontSize: 18,
                              fontWeight: "bold",
                            },
                            "& .MuiStepLabel-label": {
                              fontSize: {
                                xs: 0,
                                sm: 0,
                                md: 20,
                              },
                            },
                            "& .MuiStepContent-root": {
                              paddingLeft: 0,
                            },
                          }}
                          key={step.label}
                          active={activeStep === index}
                        >
                          <StepLabel>{step.label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#f5f3ee",
                      pt: { xs: 2, sm: 2, md: 4 },
                      pl: { xs: 4, sm: 4, md: 8 },
                      pr: { xs: 4, sm: 4, md: 8 },
                      pb: 4,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
                    }}
                  >
                    {renderStepContent(activeStep, values, errors, setFieldValue, setActiveStep)}
                    {progressBar ? <ProgressBarComponent /> : null}
                    {errorMessage ? <ErrorMessageComponent /> : null}
                  </Box>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>
    </>
  );
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
      return <BirthStep values={values} />;
    case 1:
      return (
        <DeviceStep
          errors={errors}
          values={values}
          setActiveStep={setActiveStep}
          setFieldValue={setFieldValue}
        />
      );
    case 2:
      return (
        <DescriptionStep
          values={values}
          uploadedImage={uploadedImage}
          setActiveStep={setActiveStep}
        />
      );
    case 3:
      return (
        <PlaceStep
          values={values}
          setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          errors={errors}
        />
      );
    case 4:
      return (
        <ContactStep
          values={values}
          setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          errors={errors}
        />
      );

    case 5:
      return (
        <FinalStep
          setFieldValue={setFieldValue}
          values={values}
          setActiveStep={setActiveStep}
          errors={errors}
        />
      );
    case 6:
      return <StepSuccess />;
    default:
      return <div>Not Found</div>;
  }
}
