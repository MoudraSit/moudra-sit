import * as React from "react";
import styles from "./vertical-stepper.module.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../theme/theme";
import { CircularProgress, Container } from "@mui/material";
import Step1Form from "./steps/step1";
import Step2Form from "./steps/step2";
import Step3Form from "./steps/step3";
import Step4Form from "./steps/step4";
import Link from "next/link";
import { defaultSchema } from "./schemas/default-schema";
import {
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  useFormikContext,
} from "formik";
import Step5Form from "./steps/step5";
import ApiRequestSenior from "./api/proxy-request-senior";
import ApiRequestRequirment from "./api/proxy-request-requirment";
import ApiRequestCategory from "./api/proxy-request-category";
import ApiGetRequestSenior from "./api/proxy-request-get-senior";
import StepSuccess from "./steps/step-success";
import ErrorMessageStep from "./steps/error-message";
import ErrorMessageComponent from "./steps/error-message";
import ProgressBarComponent from "./steps/progress-bar";
import { ImageType } from "react-images-uploading";

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
  image: URL;
}

let lastStep = false;

const pcCategory = "Počítač";
const phoneCategory = "Mobil";
const printerCategory = "Tiskárna";
const otherCategory = "Jiné IT zařízení";

const steps = [
  {
    label: "Váš rok narození",
  },
  {
    label: "S čím potřebujete pomoct",
  },
  {
    label: "Popis Vašeho problému",
  },
  {
    label: "Kontakt na Vás",
  },
  {
    label: "Shrnutí",
  },
];

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
  image: null,
};

function scrollIntoView() {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}

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
  const divRef = React.useRef<HTMLDivElement | null>(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const [progressBar, setProgressbBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const currentValidationSchema = defaultSchema[activeStep];

  async function handleSend(
    index: number,
    values: IValues,
    actions: FormikHelpers<IValues>
  ) {
    if (index === steps.length - 1) {
      try {
        //alert(JSON.stringify(values, null, 2));

        setProgressbBar(true);
        //console.log("PROgress bar");

        //await new Promise((resolve) => setTimeout(resolve, 3000));

        let idRequirment = null;

        // GET method to check if the record is already in the table
        let idSenior = await ApiGetRequestSenior(values);

        // POST method to create new senior record
        if (!idSenior) {
          idSenior = await ApiRequestSenior(values);
        }

        // POST method to create new requirment record
        if (idSenior) {
          idRequirment = await ApiRequestRequirment(values, idSenior);
        }

        // POST method to connect requirment to multiple categories
        if (idRequirment) {
          if (values.phoneCheckbox) {
            await ApiRequestCategory(values, idRequirment, phoneCategory);
          }

          if (values.pcCheckbox) {
            await ApiRequestCategory(values, idRequirment, pcCategory);
          }

          if (values.printerCheckbox) {
            await ApiRequestCategory(values, idRequirment, printerCategory);
          }

          if (values.otherCheckbox) {
            await ApiRequestCategory(values, idRequirment, otherCategory);
          }
        }

        setProgressbBar(false);
        lastStep = true;

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        lastStep = false;
        setProgressbBar(false);
        setErrorMessage(true);
        actions.setTouched({});
        actions.setSubmitting(false);
        console.log("error");
      }
    } else {
      // go to next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log(values);

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
            bgcolor: "#028790",
            pt: 8,
            pb: 6,
          }}
        >
          <Formik
            initialValues={intial}
            validationSchema={currentValidationSchema}
            onSubmit={(values: IValues, actions) => {
              handleSend(activeStep, values, actions);
              scrollIntoView();
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form autoComplete="on">
                <Container maxWidth="xl">
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
                              fill: "black", // circle's number (DISABLED)
                            },
                          "& .MuiStepLabel-root .Mui-active": {
                            color: "white", // circle color (ACTIVE)
                          },
                          "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text":
                            {
                              fill: "black", // circle's text (ACTIVE)
                            },
                          "& .MuiStepLabel-root .Mui-completed": {
                            color: "#f5f3ee", // circle color (COMPLETED)
                          },
                          "& .MuiStepLabel-label": {
                            fontSize: 20,
                          },
                          "& .MuiStepContent-root": {
                            paddingLeft: 0, // circle color (COMPLETED)
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: 14, // circle color (COMPLETED)
                          },
                          // plusCode styles
                          "& .MuiFormLabel-root": {
                            fontSize: 20, // circle color (COMPLETED)
                          },
                          "& .MuiSelect-select": {
                            fontSize: 20, // circle color (COMPLETED)
                          },
                          "& .MuiInputBase-root": {
                            fontSize: 20, // circle color (COMPLETED)
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
                              <Container maxWidth="md">
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
                                    textAlign: "center",
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
                                          bgcolor: "#e25b5b",
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
                                        bgcolor: "#e25b5b",
                                        color: "white",
                                      }}
                                    >
                                      Odeslat
                                    </Button>
                                  )}
                                </Box>
                              </Container>
                            </Box>
                          </Container>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  <div ref={divRef}>
                    {activeStep === steps.length && <StepSuccess />}
                  </div>
                </Container>
              </Form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>
    </>
  );
}
