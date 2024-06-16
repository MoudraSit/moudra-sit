import { Container, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import TestInfoLine from "components/newform/test-info-line";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import * as React from "react";
import { ImageType } from "react-images-uploading";
import { defaultSchema } from "../form/schemas/default-schema";
import ProgressBarComponent from "../form/steps/progress-bar";
import Step2Form from "../form/steps/step2";
import Step3Form from "../form/steps/step3";
import Step4Form from "../form/steps/step4";
import Step5Form from "../form/steps/step5";
import { appTheme } from "../theme/theme";
import Step1Form from "./steps/step1";
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
  handleClick: () => void
) {
  const uploadedImage = (image: ImageType) => {
    setFieldValue("image", image);
  };

  switch (step) {
    case 0:
      return <Step1Form onClick={handleClick} />;
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

export default function FormBuilder() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [progressBar, setProgressbBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [buttonOpacity, setButtonOpacity] = React.useState(0);
  const currentValidationSchema = defaultSchema[activeStep];

  const handleClick = () => {
    setButtonOpacity(1);
  };

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

                  <Box
                    sx={{
                      bgcolor: "#f5f3ee",
                      mt: 8,
                      pt: 8,
                      pl: 8,
                      pb: 6,
                      borderRadius: 2,
                    }}
                  >
                    {renderStepContent(activeStep, values, errors, setFieldValue, handleClick)}
                    {progressBar ? <ProgressBarComponent /> : null}
                    {activeStep === 0 && (
                      <Box
                        sx={{
                          bgcolor: "#f5f3ee",
                          pt: 8,
                          textAlign: "left",
                          opacity: buttonOpacity,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                      >
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
                      </Box>
                    )}
                  </Box>
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
