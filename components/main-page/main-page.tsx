import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { appTheme } from "../theme/theme";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Copyright() {
  return (
    <Typography variant="body2" color="secondary.contrastText" align="center">
      Moudrá Síť {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4];

export default function Album() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
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
              fontSize: "45px",
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
              fontSize: "45px",
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
            sx={{ fontWeight: "bold", fontSize: "45px" }}
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
            {cards.map((card) => (
              <Grid item key={card} xs={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      Telefon
                    </Typography>
                    <Typography align="center">
                      Mám potíže s telefonem.
                    </Typography>
                    <Box
                      textAlign="center"
                      sx={{
                        pt: 2,
                      }}
                    >
                      <Button
                        color="info"
                        size="large"
                        variant="contained"
                        fullWidth
                      >
                        Vybrat
                      </Button>
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
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: "#E4E4E4",
            pt: 5,
            pb: 5,
            borderRadius: 15,
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
                <img src="images/tabidoo-logo.png" width={150} />
              </a>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <a href="https://www.nadacevodafone.cz/">
                <img src="images/vodafone-logo.png" width={150} />
              </a>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <a href="https://www.moudrasovicka.cz/">
                <img src="images/ms-logo.png" width={150} />
              </a>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <a href="https://cesko.digital/">
                <img src="images/cd-logo.png" width={150} />
              </a>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <a href="https://www.hellichovka.cz/">
                <img src="images/graficka-logo.png" width={150} />
              </a>
            </Grid>
            <Grid item xs={4} md={4} lg={2}>
              <a href="https://www.ssps.cz/">
                <img src="images/smich-logo.png" width={150} />
              </a>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          pt: 10,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Chci pomáhat
          </Typography>
          <Typography
            variant="h5"
            align="left"
            color="text.secondary"
            paragraph
          >
            Staň se digitálním asistentem a pomáhej seniorům bezpečně ovládnout
            technologie.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="left"
          >
            <Button color="secondary" variant="contained">
              Kontaktujte nás
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
      </Container>

      <Box sx={{ bgcolor: "black", p: 6 }} component="footer">
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          color="secondary.contrastText"
        >
          Patička
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
