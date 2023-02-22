import styles from "./main-page.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import newsDummy from "data/news-dummy.json";
import helpSectionJson from "data/help-section.json";
import Link from "next/link";

interface INewsSection {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface IHelpSection {
  id: number;
  title: string;
  description: string;
}

const news: INewsSection[] = JSON.parse(JSON.stringify(newsDummy));
const helpInfo: IHelpSection[] = JSON.parse(JSON.stringify(helpSectionJson));

function MainPage() {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box
          sx={{
            bgcolor: "primary.main",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                fontWeight: "fontWeightMedium",
                fontFamily: "Fira Code",
              }}
              variant="h2"
              align="center"
              color="text.primary"
            >
              Pomáháme seniorům bezpečně
            </Typography>
            <Typography
              sx={{
                fontWeight: "fontWeightMedium",
                fontFamily: "Fira Code",
              }}
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              a správně ovládat techologie
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Budeme vás kontaktovat do 2 dnů
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                color="secondary"
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
              >
                Více o moudré síti
              </Button>
            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            bgcolor: "secondary.main",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h2"
              align="center"
              color="secondary.contrastText"
              gutterBottom
            >
              Jste senior 60+ a potřebujete pomoct?
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary.contrastText"
              paragraph
            >
              Služba je zdarma pro seniory nad 60 let
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              {helpInfo.map((helpItem) => (
                <Grid item key={helpItem.id} xs={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "grid",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        alignSelf: "end",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                      >
                        {helpItem.title}
                      </Typography>
                      <Box
                        textAlign="center"
                        sx={{
                          pt: 2,
                        }}
                      >
                        <Typography align="center">
                          {helpItem.description}
                        </Typography>
                      </Box>
                      <Box
                        textAlign="center"
                        sx={{
                          pt: 2,
                          display: "flexend",
                        }}
                      >
                        <Link href={"/form/" + helpItem.id}>
                          <Button
                            color="info"
                            size="large"
                            variant="contained"
                            fullWidth
                          >
                            Vybrat
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            pt: 10,
            pb: 6,
            bgcolor: "primary.main",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              pt: 5,
              pb: 5,
            }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              align="center"
              fontWeight="bold"
              paragraph
            >
              Garantem projektu je spolek Moudrá Sovička ve spolupráci s
              Česko.Digital a Nadací Vodafone.
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4} md={4} lg={2}>
                <a href="https://tabidoo.cloud/">
                  <img
                    src="images/partners/tabidoo-logo.png"
                    className={styles.logo}
                  />
                </a>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <a href="https://www.nadacevodafone.cz/">
                  <img
                    src="images/partners/vodafone-logo.png"
                    className={styles.logo}
                  />
                </a>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <a href="https://www.moudrasovicka.cz/">
                  <img
                    src="images/partners/ms-logo.png"
                    className={styles.logo}
                  />
                </a>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <a href="https://cesko.digital/">
                  <img
                    src="images/partners/cd-logo.png"
                    className={styles.logo}
                  />
                </a>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <a href="https://www.hellichovka.cz/">
                  <img
                    src="images/partners/graficka-logo.png"
                    className={styles.logo}
                  />
                </a>
              </Grid>
              <Grid item xs={4} md={4} lg={2}>
                <a href="https://www.ssps.cz/">
                  <img
                    src="images/partners/smich-logo.png"
                    className={styles.logo}
                  />
                </a>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            bgcolor: "#2F68C4",
            backgroundSize: "",
            pt: 10,
            pb: 6,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              pt: 5,
              pb: 5,
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={12} lg={6}>
                <img
                  src="images/home-page/img1.png"
                  className={styles.images}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h2"
                  align="left"
                  color="secondary.contrastText"
                  gutterBottom
                >
                  Chci pomáhat
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  color="secondary.contrastText"
                >
                  Je ti 15 let a více? Máš chuť pomáhat seniorům používat
                  digitální technologie? Staň se digitálním asistentem a pomáhej
                  seniorům bezpečně ovládnout technologie ve svém bydlišti.
                  Kontaktujte našeho koordinátora a ten vám poví, co dál.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="left"
                >
                  <Button color="warning" variant="contained">
                    Kontaktujte nás
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            pt: 8,
            pb: 6,
            bgcolor: "#E0DDDD",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                fontWeight: "fontWeightMedium",

                fontFamily: "Fira Code",
                pb: 10,
              }}
              variant="h2"
              align="center"
              color="text.primary"
            >
              Aktuality
            </Typography>
            <Grid container spacing={2}>
              {news.map((myItem) => (
                <Grid item key={myItem.id} xs={12} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 5,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        align="left"
                        sx={{
                          fontFamily: "Fira Code",
                          fontWeight: "fontWeightBold",
                          fontSize: "19px",
                        }}
                      >
                        {myItem.title.toString()}
                      </Typography>
                      <Typography sx={{ color: "warning" }}>
                        {myItem.date.toString()}
                      </Typography>
                      <Typography align="left">
                        {myItem.description.toString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            pt: 8,
            pb: 6,
            bgcolor: "primary.main",
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={12} lg={6}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  component="h1"
                  variant="h2"
                  align="left"
                  color="primary.main"
                  gutterBottom
                >
                  O Moudré Síti
                </Typography>
                <Typography align="left" color="primary.main">
                  Moudrá Síť je platforma, která propojuje seniory s digitálními
                  asistenty. Jde o webovou službu, na kterou se mohou senioři
                  obracet, kdykoli potřebují pomoci s novými technologiemi.
                  Službu realizuje spolek Moudrá Síť z.s. Garantem a mentorem
                  webové aplikace je spolek Moudrá Sovička z.s., který už od
                  roku 2015 pomáhá seniory vzdělávat v oblasti digitálních a
                  komunikačních technologií.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="left"
                >
                  <Button color="warning" variant="contained">
                    Kontaktujte nás
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <img
                  src="images/home-page/img2.png"
                  className={styles.images}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md" />
      </ThemeProvider>
    </>
  );
}

export default MainPage;
