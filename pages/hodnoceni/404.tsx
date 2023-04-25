import { Container, Typography } from "@mui/material";

function NotFoundRatingPage() {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h6"
        component="h6"
        mt="2rem"
        alignItems="center"
        display="flex"
      >
        <div style={{ marginLeft: "0.5rem" }}>Dotazník nenalezen</div>
      </Typography>
    </Container>
  );
}

export default NotFoundRatingPage;
