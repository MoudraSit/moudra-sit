import { CheckCircle } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

function ThankYouRatingPage() {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h6"
        component="h6"
        mt="2rem"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <div>
          <Image
            alt="Big Checkmark"
            src="/images/big-checkmark.svg"
            width={128}
            height={128}
          />
        </div>
        <div style={{ marginTop: "2rem" }}>Děkujeme za Vaše hodnocení!</div>
      </Typography>
    </Container>
  );
}

export default ThankYouRatingPage;
