import { Box, Button, Container, Link, ThemeProvider, Typography } from "@mui/material";
import DonationQr from "components/form/components/donation-qr";
import { DONATION_URL } from "components/form/model/donation";
import { appTheme } from "components/theme/theme";
import Image from "next/image";

function ThankYouRatingPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="md" sx={{ my: "2rem" }}>
        <Box display="flex" justifyContent="center" mb="2rem">
          <Image alt="Big Checkmark" src="/images/big-checkmark.svg" width={128} height={128} />
        </Box>
        <Typography variant="h1" fontWeight="bold" color="#3e3e3e" sx={{ pb: 3 }}>
          Pomohli jsme vám? Pomozte i&nbsp;vy.
        </Typography>
        <Typography variant="h2" color="#3e3e3e" sx={{ pb: 2 }}>
          Chceme, aby služba zůstala pro seniory zdarma. Bez dárců to ale nejde. Každý dar pomůže
          dalšímu seniorovi poradit si s&nbsp;mobilem nebo počítačem.
        </Typography>
        <Typography variant="h2" color="#3e3e3e" sx={{ pb: 4 }}>
          Přispět můžete{" "}
          <Link href={DONATION_URL} target="_blank" rel="noopener" color="#D3215D">
            zde
          </Link>
          .
        </Typography>
        <DonationQr />

        <Typography variant="h2" color="#3e3e3e" sx={{ pb: 1 }}>
          Pomoci můžete i&nbsp;jinak:
        </Typography>
        <Box component="ul" sx={{ mt: 0, pb: 4, pl: 3 }}>
          <Typography component="li" variant="h2" color="#3e3e3e">
            řekněte o&nbsp;nás známým,
          </Typography>
          <Typography component="li" variant="h2" color="#3e3e3e">
            vyvěste naše letáky (rádi vám je pošleme poštou, stačí nám napsat na{" "}
            <Link href="mailto:info@moudrasit.cz" color="#D3215D">
              info@moudrasit.cz
            </Link>
            ),
          </Typography>
          <Typography component="li" variant="h2" color="#3e3e3e">
            dejte na úřadě vědět, že o&nbsp;naši službu máte zájem. Mohou ji pak podpořit ze svého
            rozpočtu.
          </Typography>
        </Box>

        <Button
          href="https://moudrasit.cz/"
          variant="contained"
          sx={{
            bgcolor: "#D3215D !important",
            color: "secondary.contrastText",
            letterSpacing: 0.5,
            fontSize: 20,
          }}
        >
          Zpět na hlavní stránku
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default ThankYouRatingPage;
