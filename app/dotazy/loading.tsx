import { Box, CircularProgress, Grid } from "@mui/material";

export default function Loading() {
  return (
    <Grid height={"100vh"} container justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" size={100} />
    </Grid>
  );
}
