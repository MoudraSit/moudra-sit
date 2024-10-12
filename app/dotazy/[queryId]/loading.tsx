import { CircularProgress, Grid } from "@mui/material";

export default function Loading() {
  return (
    <Grid height={"50vh"} container justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" size={100} />
    </Grid>
  );
}
