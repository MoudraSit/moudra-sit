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
import { VisitDTO } from "../api/rating/getVisit";
import { useRouter } from "next/router";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { RatingButton } from "components/rating/RatingButton";
import { RatingNumber } from "components/rating/RatingNumber";

const ratingError = "Zvolte hodnocení 1-5";

export const validationSchema = yup.object().shape({
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
  const isSmallScreen = useMediaQuery(appTheme.breakpoints.down("sm"));
  const { push, query } = useRouter();

  const { mutate: submitRating, isLoading: isSubmitting } = useMutation({
    mutationFn: (values: FormValues) =>
      axios
        .post<VisitDTO>(
          `/api/rating/submit`,
          {
            spokojenostSenior: values.spokojenostSenior,
            problemVyresenHodnoceni: values.problemVyresenHodnoceni,
            poznamkaSeniorem: values.poznamkaSeniorem,
          },
          {
            params: { visitId: visitDetails?.id },
          }
        )
        .then((res) => res.data),
    retry: false,
    onSuccess: () => {
      push("/hodnoceni/diky");
    },
  });

  const { data: visitDetails, isLoading } = useQuery({
    queryKey: ["hodnoceni/senior", query.klic],
    enabled: !!query.klic,
    queryFn: () =>
      axios
        .get<VisitDTO>(`/api/rating/getVisit`, {
          params: { ratingKey: query.klic },
        })
        .then((res) => res.data),
    retry: false,
    onError: (err: AxiosError) => {
      if (err.response?.status === 404) {
        push("/hodnoceni/404");
      }
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      spokojenostSenior: null,
      problemVyresenHodnoceni: null,
      poznamkaSeniorem: null,
    },
    onSubmit: (values) => submitRating(values),
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  if (isLoading || !visitDetails) {
    return (
      <Container maxWidth="md">
        <Grid container justifyContent="center" my="4rem">
          <CircularProgress color="secondary" />
        </Grid>
      </Container>
    );
  }

  if (visitDetails.ratingAlreadyDone) {
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
                    {visitDetails?.assistant.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    fontSize={16}
                    fontWeight="regular"
                  >
                    {visitDetails?.assistant.city}
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
                    <RatingButton
                      isSelected={
                        formik.values.spokojenostSenior === item.value
                      }
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
                    </RatingButton>
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
              <Grid
                container
                columns={16}
                spacing="8px"
                justifyContent={isSmallScreen ? "center" : "flex-start"}
              >
                {[
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                ].map((item) => (
                  <Grid item key={item.value}>
                    <RatingButton
                      isSelected={
                        formik.values.problemVyresenHodnoceni === item.value
                      }
                      onClick={() =>
                        formik.setFieldValue(
                          "problemVyresenHodnoceni",
                          item.value
                        )
                      }
                    >
                      <RatingNumber>{item.value}</RatingNumber>
                    </RatingButton>
                  </Grid>
                ))}
              </Grid>
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
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#D3215D !important",
                color: "white",
              }}
              disabled={isSubmitting}
            >
              ODESLAT HODNOCENÍ
            </Button>
            {isSubmitting && (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RatingPage;
