import { CircularProgress, Grid } from "@mui/material";

export default function Loading() {
  return (
    <Grid height={"80vh"} container justifyContent="center" alignItems="center">
      <CircularProgress color="warning" size={100} />
    </Grid>
  );
}
