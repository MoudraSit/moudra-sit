import { Box, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { appTheme } from "components/theme/theme";
import Image from "next/image";

function RatingPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="md">
        <Box my="1rem">
          <Typography variant="h6" component="h6">
            Hodnocení digitálního asistenta
          </Typography>
        </Box>
        <Box my="2rem">
          <Typography variant="h4" component="h4" fontWeight="bold">
            Ohodnoťte prosím spolupráci
          </Typography>
        </Box>
        <Grid container justifyContent="flex-start" columns={16}>
          <Grid item xs={16} md={10}>
            <Box p="2rem" bgcolor="#F5F3EE" maxWidth="sm" pr={[""]}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Image
                    alt="Logo Circle"
                    src="/images/logo/logo-circle.svg"
                    width={85}
                    height={85}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4" component="h4" fontWeight="bold">
                    Jan Novák
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    fontSize={16}
                    fontWeight="regular"
                  >
                    Brno-Město
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default RatingPage;
