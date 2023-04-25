import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import { appTheme } from "components/theme/theme";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VisitDTO } from "../api/rating/getVisit";
import { useRouter } from "next/router";
import * as yup from "yup";

const ratingError = "Zvolte hodnocení 1-5";

const validationSchema = yup.object().shape({
  spokojenostSenior: yup.number().integer().min(1).max(5).required(),
  problemVyresenHodnoceni: yup.number().integer().min(1).max(5).required(),
  poznamkaSeniorem: yup.string().optional().nullable(),
});

type FormValues = {
  spokojenostSenior: number | null;
  problemVyresenHodnoceni: number | null;
  poznamkaSeniorem: string | null;
};

function RatingPage() {
  const [assistantDetails, setAssistantDetails] = useState<VisitDTO | null>(
    null
  );
  const isSmallScreen = useMediaQuery(appTheme.breakpoints.down("sm"));
  const formik = useFormik<FormValues>({
    initialValues: {
      spokojenostSenior: null,
      problemVyresenHodnoceni: null,
      poznamkaSeniorem: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
    validateOnBlur: false,
  });

  const { query } = useRouter();

  useEffect(() => {
    if (!query.klic) {
      return;
    }

    fetch(`/api/rating/getVisit?ratingKey=${query.klic}`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setAssistantDetails(data);
        });
      }
    });
  }, [query.klic]);

  if (!assistantDetails) {
    return (
      <Container maxWidth="md">
        <Grid container justifyContent="center" my="4rem">
          <CircularProgress color="secondary" />
        </Grid>
      </Container>
    );
  }

  if (assistantDetails.ratingAlreadyDone) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6" component="h6" mt="2rem">
          Hodnocení již bylo provedeno. Děkujeme.
        </Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="md" component="form" onSubmit={formik.handleSubmit}>
        <Box my="1rem">
          <Typography variant="h6" component="h6">
            Hodnocení digitálního asistenta
          </Typography>
        </Box>
        <Box my="2rem">
          <Typography variant="h4" component="h4" fontWeight="bold">
            Ohodnoťte prosím spolupráci
          </Typography>
        </Box>
        <Grid container justifyContent="flex-start" columns={16}>
          <Grid item xs={16} md={10}>
            <Box p="2rem" bgcolor="#F5F3EE" maxWidth="sm" pr={[""]}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Image
                    alt="Logo Circle"
                    src="/images/logo/logo-circle.svg"
                    width={isSmallScreen ? 64 : 85}
                    height={isSmallScreen ? 64 : 85}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4" component="h4" fontWeight="bold">
                    {assistantDetails?.assistant.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    fontSize={16}
                    fontWeight="regular"
                  >
                    {assistantDetails?.assistant.city}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid container columns={16} mt="2rem" rowSpacing="2rem">
          <Grid item xs={16} md={8}>
            <Typography variant="h6" component="h6">
              Jak hodnotíte komunikaci?
            </Typography>
            <Box mt="1rem">
              <Grid
                container
                columns={16}
                spacing="8px"
                justifyContent={isSmallScreen ? "center" : "flex-start"}
              >
                {[
                  { image: "frown.png", value: 5 },
                  { image: "meh.png", value: 4 },
                  { image: "neutral.png", value: 3 },
                  { image: "smile.png", value: 2 },
                  { image: "love.png", value: 1 },
                ].map((item) => (
                  <Grid item key={item.value}>
                    <button
                      style={{
                        padding: isSmallScreen ? "6px" : "10px",
                        backgroundColor:
                          formik.values.spokojenostSenior === item.value
                            ? "#0056B2"
                            : "#EFF0F6",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "100%",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onClick={() =>
                        formik.setFieldValue("spokojenostSenior", item.value)
                      }
                    >
                      <Image
                        alt={item.image}
                        src={`/images/smiles/${item.image}`}
                        width={isSmallScreen ? 32 : 40}
                        height={isSmallScreen ? 32 : 40}
                      />
                    </button>
                  </Grid>
                ))}
              </Grid>
              {formik.errors.spokojenostSenior && (
                <FormHelperText error>{ratingError}</FormHelperText>
              )}
            </Box>
          </Grid>
          <Grid item xs={16} md={8}>
            <Typography variant="h6" component="h6">
              Podařilo se vyřešit dotaz?
            </Typography>
            <Box mt="1rem">
              <TextField
                fullWidth
                type="number"
                placeholder="ohodnoťte 1-5 jako ve škole *"
                name="problemVyresenHodnoceni"
                value={formik.values.problemVyresenHodnoceni}
                onChange={formik.handleChange}
                error={!!formik.errors.problemVyresenHodnoceni}
                helperText={
                  formik.errors.problemVyresenHodnoceni ? ratingError : null
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Box mt="3rem">
          <Typography variant="h6" component="h6">
            Chcete nám ještě něco sdělit?
          </Typography>
          <Box mt="1rem">
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Zde vepište Vaši zprávu *"
              name="poznamkaSeniorem"
              value={formik.values.poznamkaSeniorem}
              onChange={formik.handleChange}
              error={!!formik.errors.poznamkaSeniorem}
              helperText={formik.errors.poznamkaSeniorem}
            />
          </Box>
        </Box>
        <Box my="2rem">
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#e25b5b !important",
              color: "white",
            }}
          >
            ODESLAT HODNOCENÍ
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RatingPage;
