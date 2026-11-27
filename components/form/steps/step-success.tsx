import { Button, Link, Typography } from "@mui/material";
import DonationQr from "../components/donation-qr";
import { DONATION_URL } from "../model/donation";
import SklikConversion from "../../scripts/sklik-conversion";

function StepSuccess() {
  return (
    <>
      <SklikConversion />
      <Typography
        sx={{ fontWeight: "bold", pb: 4 }}
        variant="h1"
        align="left"
        color="#3e3e3e"
        gutterBottom
      >
        Děkujeme!
      </Typography>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ fontWeight: "bold", pb: 2 }}>
        Váš dotaz jsme přijali ke zpracování.
      </Typography>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 2 }}>
        Jakmile pro Vás najdeme vhodného dobrovolníka, telefonicky Vás kontaktuje a&nbsp;bude se věnovat
        Vašemu požadavku. Doba vyřízení se může lišit podle místa a&nbsp;aktuální dostupnosti
        dobrovolníků.
      </Typography>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 2 }}>
        Pokud jste zadali e-mail, poslali jsme Vám na něj souhrn Vašeho dotazu. Pokud ho tam
        nevidíte, zkontrolujte si prosím složku Spam.
      </Typography>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 2 }}>
        Služba je pro seniory 60+ zdarma, a&nbsp;to díky lidem, kteří nás podporují. Chcete se k&nbsp;nim
        přidat? Budeme vděční za jakýkoli dar.
      </Typography>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 4 }}>
        Přispět můžete{" "}
        <Link href={DONATION_URL} target="_blank" rel="noopener" color="#D3215D">
          zde
        </Link>
        .
      </Typography>
      <DonationQr />

      <Button
        href="https://moudrasit.cz/"
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          mr: 1,
          bgcolor: "#D3215D !important",
          color: "secondary.contrastText",
          letterSpacing: 0.5,
          fontSize: 20,
        }}
      >
        Zpět na hlavní stránku
      </Button>
    </>
  );
}

export default StepSuccess;
