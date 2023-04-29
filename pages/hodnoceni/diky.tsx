import { CheckCircle } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";

function ThankYouRatingPage() {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h6"
        component="h6"
        mt="2rem"
        alignItems="center"
        display="flex"
      >
        <CheckCircle />
        <div style={{ marginLeft: "0.5rem" }}>
          Děkujeme za vyplnění dotazníku
        </div>
      </Typography>
    </Container>
  );
}

export default ThankYouRatingPage;
