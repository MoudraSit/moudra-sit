import { Box, Button, Typography } from "@mui/material";
import React from "react";

function InfoLine() {
  const [hideInfo, setHideInfo] = React.useState("");

  return (
    <Box display={hideInfo} sx={{ bgcolor: "#e25b5b", padding: 1 }}>
      <Typography variant="h6" align="center" color="white">
        Upozornění: Tato služba je v pilotním provozu a návštěvy digitálních
        asistentů fungují zatím pouze v Praze.
      </Typography>
      <Button
        sx={{ float: "right", mt: 1 }}
        type="button"
        variant="contained"
        onClick={() => setHideInfo("none")}
      >
        Zavřít
      </Button>
    </Box>
  );
}

export default InfoLine;
