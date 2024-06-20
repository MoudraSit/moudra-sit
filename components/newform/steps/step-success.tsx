import { Box, Button, Container, Typography } from "@mui/material";

function StepSuccess() {
  return (
    <>
      <Box
        sx={{
          pt: 6,
        }}
      ></Box>
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "#f5f3ee",
            pt: 6,
            pb: 6,
            pl: 4,
            pr: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              sx={{ fontWeight: "bold", pb: 4 }}
              variant="h1"
              align="left"
              color="#3e3e3e"
              gutterBottom
            >
              Děkujeme!
            </Typography>
            <Typography
              variant="h2"
              align="left"
              color="#3e3e3e"
              sx={{ fontWeight: "bold", pb: 2 }}
            >
              Váš dotaz jsme přijali ke zpracování. Do 5 dnů Vás budeme telefonicky kontaktovat.
            </Typography>
            <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 4 }}>
              Pokud jste zadali e-mail, poslali jsme Vám do něj souhrn Vašeho dotazu. Pokud ho tam
              nevidíte, zkontrolujte si posím složku Spam.
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
              }}
            >
              Zavřít a zpět na hlavní stránku
            </Button>
          </Container>
        </Box>
      </Container>
    </>
  );
}

export default StepSuccess;
