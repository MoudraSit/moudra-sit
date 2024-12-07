import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { appTheme } from "components/theme/theme";
import Image from "next/image";
import Link from "next/link";

import logo from "public/images/logo/logo.png";

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
            <Box
              textAlign="center"
              sx={{
                pt: 2,
              }}
            >
              <Link href="https://moudrasit.cz/">
                <Image src={logo} alt={"Moudrá Síť logo"} height="35" />
              </Link>
            </Box>
            <Typography
              sx={{ fontWeight: "bold", mt: 5 }}
              variant="h1"
              align="center"
              color="#3e3e3e"
              gutterBottom
            >
              Pomáháme seniorům bezpečně
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h1"
              align="center"
              color="#3e3e3e"
              gutterBottom
            >
              a správně ovládat techologie
            </Typography>

            <Stack
              sx={{ pt: 4, mb: 15 }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Link href="https://moudrasit.cz/">
                <Button
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  Přejít na náš web
                </Button>
              </Link>
              <Link href="/prihlaseni">
                <Button
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  Přejít do aplikace
                </Button>
              </Link>
              <Link href="/form">
                <Button
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  Vyplnit formulář
                </Button>
              </Link>
            </Stack>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default MainPage;
