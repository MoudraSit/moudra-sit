import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import TestInfoLine from "components/newform/test-info-line";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import Cover from "public/images/form/background-net.svg";
import * as React from "react";
import { ImageType } from "react-images-uploading";
import ProgressBarComponent from "../form/steps/progress-bar";
import { defaultSchema } from "../newform/schemas/default-schema";
import { appTheme } from "../theme/theme";
import { FormContainer, formSteps, initialValues, IValues } from "./helpers/constants";
import { scrollIntoView } from "./helpers/scroll-into-view";
import BirthStep from "./steps/birth-step";
import ContactStep from "./steps/contact-step";
import DescriptionStep from "./steps/description-step";
import DeviceStep from "./steps/device-step";
import ErrorMessageComponent from "./steps/error-message";
import FinalStep from "./steps/final-step";
import PlaceStep from "./steps/place-step";
import StepSuccess from "./steps/step-success";
import submitHelperTest from "./submit-helper";

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
            backgroundImage: `url(${Cover.src})`,
            backgroundSize: "cover",
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
                scrollIntoView();
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form autoComplete="on">
                <FormContainer maxWidth="xl">
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
                      bgcolor: "#f5f3ee",
                      mt: 4,
                      pt: { xs: 2, sm: 4, md: 8 },
                      pl: { xs: 2, sm: 4, md: 8 },
                      pr: { xs: 2, sm: 4, md: 8 },
                      pb: 4,
                      borderRadius: 2,
                      boxShadow: 4,
                    }}
                  >
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      sx={{
                        pb: { xs: 2, sm: 4, md: 8 },
                      }}
                    >
                      {formSteps.map((step, index) => (
                        <Step
                          sx={{
                            "& .MuiStepLabel-labelContainer": {
                              color: "white", // circle's text (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root": {
                              fill: "#3e3e3e", // circle's color (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text": {
                              fill: "white", // circle's number (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-disabled": {
                              color: "#3e3e3e", // text color (DISABLED)
                            },
                            "& .MuiStepLabel-root .Mui-active": {
                              color: "#028790", // circle color (ACTIVE)
                            },
                            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                              fill: "white", // circle's text (ACTIVE)
                            },
                            "& .MuiStepLabel-root .Mui-completed": {
                              color: "#028790", // circle color (COMPLETED)
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
      return <BirthStep values={values} errors={errors} />;
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
