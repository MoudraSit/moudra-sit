import { CircularProgress, Grid } from "@mui/material";

export default function Loading() {
  return (
    <Grid height={"80vh"} container justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" size={100} />
    </Grid>
  );
}
