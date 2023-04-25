import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { appTheme } from "components/theme/theme";
import { useFormik } from "formik";
import Image from "next/image";

type FormValues = {
  spokojenostSenior: number | null;
  problemVyresenHodnoceni: number | null;
  poznamkaSeniorem: string | null;
};

function RatingPage() {
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
  });

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
                    Jan Novák
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    fontSize={16}
                    fontWeight="regular"
                  >
                    Brno-Město
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
