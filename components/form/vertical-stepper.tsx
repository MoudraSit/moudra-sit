import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import { Container, Grid, TextField } from "@mui/material";
import Step1Form from "./step1";
import Step2Form from "./step2";
import Step3Form from "./step3";
import BasicForm from "./hook";
import Step4Form from "./step4";
import Link from "next/link";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const divRef = React.useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    divRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSend = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    lastStep = true;
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const basicForm = BasicForm();

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
          <Container maxWidth="xl">
            <form onSubmit={basicForm.handleSubmit}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step
                    sx={{
                      "& .MuiStepLabel .Mui-disabled": {
                        fill: "white", // circle's number
                      },
                      "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root": {
                        fill: "white", // circle's color
                      },
                      "& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text": {
                        fill: "black", // circle's number
                      },
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "info.main", // circle color (ACTIVE)
                      },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "black", // circle's number (ACTIVE)
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
                                      onClick={handleNext}
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
                                    onClick={handleSend}
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
                        sx={{ fontWeight: "bold", fontSize: "45px" }}
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
                        Váš dotaz jsme přijali ke zpracování. Do 2 dnů Vás bude
                        telefonicky kontaktovat digitální asistent, který Vám
                        pomůže situaci vyřešit. Společně se domluvíte, zda bude
                        potřeba osobní návštěva, nebo to zvládnete po telefonu.
                        Do e-mailu Vám přišel souhrn Vašeho dotazu. Pokud ho tam
                        nevidíte, zkontrolujte si prosím složku Spam.
                      </Typography>
                      <Link href="/">
                        <Button
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
                      <Button
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
                      </Button>
                    </Container>
                  </Box>
                </Container>
              )}
            </form>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}
