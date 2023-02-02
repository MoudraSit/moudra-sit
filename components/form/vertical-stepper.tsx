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
import { Container } from "@mui/material";
import Step1Form from "./steps/step1";
import Step2Form from "./steps/step2";
import Step3Form from "./steps/step3";
import Step4Form from "./steps/step4";
import Link from "next/link";
import { defaultSchema } from "./schemas/default-schema";
import { Form, Formik, FormikHelpers } from "formik";
import ApiRequest from "./api-request-senior";
import ApiRequestSenior from "./api-request-senior";
import ApiRequestRequirment from "./api-request-requirment";

export interface IValues {
  year: number;
  description: string;
  name: string;
  surname: string;
  zipCode: string;
  plusCode: string;
  phoneNumber: string;
  email: string;
  agreement: boolean;
}

let lastStep = false;

const steps = [
  {
    label: "Váš rok narození",
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
  year: "",
  description: "",
  name: "",
  surname: "",
  plusCode: "+420",
  zipCode: "",
  phoneNumber: "",
  email: "",
  agreement: false,
};

function renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <Step1Form />;
    case 1:
      return <Step2Form />;
    case 2:
      return <Step3Form />;
    case 3:
      return <Step4Form />;
    default:
      return <div>Not Found</div>;
  }
}

export default function VerticalLinearStepper() {
  const divRef = React.useRef<HTMLDivElement | null>(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = defaultSchema[activeStep];

  async function handleSend(
    index: number,
    values: IValues,
    actions: FormikHelpers<IValues>
  ) {
    divRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });

    if (index === steps.length - 1) {
      lastStep = true;
      alert(JSON.stringify(values, null, 2));

      const idSenior = await ApiRequestSenior(values);

      if (idSenior != null) {
        await ApiRequestRequirment(values, idSenior);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log(values);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  const handleReset = () => {
    //setActiveStep(0);
    lastStep = false;
  };

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box
          sx={{
            bgcolor: "secondary.main",
            pt: 8,
            pb: 6,
          }}
        >
          <Formik
            initialValues={intial}
            validationSchema={currentValidationSchema}
            onSubmit={(values: IValues, actions) => {
              handleSend(activeStep, values, actions);
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="on">
                <Container maxWidth="xl">
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step
                        sx={{
                          "& .MuiStepLabel-labelContainer": {
                            color: "white", // circle's number (DISABLED)
                          },
                          "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root":
                            {
                              fill: "white", // circle's color (DISABLED)
                            },
                          "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text":
                            {
                              fill: "black", // circle's text (DISABLED)
                            },
                          "& .MuiStepLabel-root .Mui-active": {
                            color: "info.main", // circle color (ACTIVE)
                          },
                          "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text":
                            {
                              fill: "black", // circle's text (ACTIVE)
                            },
                          "& .MuiStepLabel-root .Mui-completed": {
                            color: "green", // circle color (COMPLETED)
                          },
                        }}
                        key={step.label}
                        active={
                          lastStep
                            ? index === activeStep
                            : index === activeStep - 3 ||
                              index === activeStep - 2 ||
                              index === activeStep - 1 ||
                              index === activeStep
                        }
                      >
                        <div ref={divRef}>
                          <StepLabel>{step.label}</StepLabel>
                          <StepContent>
                            <Container maxWidth="lg">
                              <Box
                                sx={{
                                  bgcolor: "primary.main",
                                  pt: 8,
                                  pb: 6,
                                  borderRadius: 5,
                                }}
                              >
                                <Container maxWidth="md">
                                  <>{renderStepContent(index)}</>
                                  <Box
                                    sx={{
                                      bgcolor: "primary.main",
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
                                            bgcolor: "green",
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
                                          bgcolor: "green",
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
                        </div>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length && (
                    <Container maxWidth="md">
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          pt: 8,
                          pb: 6,
                          borderRadius: 5,
                          textAlign: "center",
                        }}
                      >
                        <Container maxWidth="md">
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="h2"
                            align="center"
                            color="primary.contrastText"
                            gutterBottom
                          >
                            Děkujeme
                          </Typography>
                          <Typography
                            variant="h6"
                            align="center"
                            color="primary.contrastText"
                            paragraph
                          >
                            Váš dotaz jsme přijali ke zpracování. Do 2 dnů Vás
                            bude telefonicky kontaktovat digitální asistent,
                            který Vám pomůže situaci vyřešit. Společně se
                            domluvíte, zda bude potřeba osobní návštěva, nebo to
                            zvládnete po telefonu. Do e-mailu Vám přišel souhrn
                            Vašeho dotazu. Pokud ho tam nevidíte, zkontrolujte
                            si prosím složku Spam.
                          </Typography>
                          <Link href="/">
                            <Button
                              onClick={handleReset}
                              type="submit"
                              variant="contained"
                              sx={{
                                mt: 1,
                                mr: 1,
                                bgcolor: "green",
                                color: "secondary.contrastText",
                              }}
                            >
                              Zavřít a zpět na hlavní stránku
                            </Button>
                          </Link>
                          {/* <Button
                            type="submit"
                            variant="contained"
                            onClick={handleReset}
                            sx={{
                              mt: 1,
                              mr: 1,
                              bgcolor: "secondary.main",
                              color: "secondary.contrastText",
                            }}
                          >
                            Zadat nový dotaz
                          </Button> */}
                        </Container>
                      </Box>
                    </Container>
                  )}
                </Container>
              </Form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>
    </>
  );
}
