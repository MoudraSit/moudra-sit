import { Grid, Stack, Typography } from "@mui/material";
import { QueryComment } from "types/seniorQuery";
import { formatDateTime } from "helper/utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function QueryCommentCard({ text, authorName, created }: QueryComment) {
  return (
    <Grid
      container
      alignItems={"center"}
      sx={{
        background: "#F1F1F1",
        width: "100%",
        margin: 0,
        marginBottom: "0.5rem",
        padding: "0.5rem",
        borderRadius: "11px",
      }}
    >
      <Grid item xs={1}>
        <AccountCircleIcon />
      </Grid>
      <Grid item xs={11} sx={{ paddingLeft: "0.5rem" }}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="caption" sx={{ fontSize: "11px" }}>
            {authorName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "11px", color: "#9E9E9E", textAlign: "right" }}
          >
            {formatDateTime(created)}
          </Typography>
        </Stack>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  );
}

export default QueryCommentCard;
