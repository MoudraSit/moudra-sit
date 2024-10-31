import { Button, Typography } from "@mui/material";
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
        Váš dotaz jsme přijali ke zpracování. Do 5 dnů Vás budeme telefonicky kontaktovat.
      </Typography>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 4 }}>
        Pokud jste zadali e-mail, poslali jsme Vám do něj souhrn Vašeho dotazu. Pokud ho tam
        nevidíte, zkontrolujte si prosím složku Spam.
      </Typography>

      <Button
        href="http://moudrasit.cz/"
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
