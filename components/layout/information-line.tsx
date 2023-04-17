import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function InfoLine() {
  const [hideInfo, setHideInfo] = React.useState("flex");

  // save closing info line to local storage
  React.useEffect(() => {
    const myState = window.localStorage.getItem("INFO_LINE");
    if (myState) {
      setHideInfo(JSON.parse(myState));
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("INFO_LINE", JSON.stringify(hideInfo));
  }, [hideInfo]);

  return (
    <Box
      display={hideInfo}
      sx={{
        bgcolor: "#e25b5b",
        padding: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" align="center" color="white">
        Upozornění: Tato služba je v pilotním provozu a návštěvy digitálních
        asistentů fungují zatím pouze v Praze.
      </Typography>
      <Button
        sx={{
          ml: 1,
          alignItems: "right",
        }}
        type="button"
        variant="text"
        startIcon={<CloseIcon />}
        onClick={() => setHideInfo("none")}
      ></Button>
    </Box>
  );
}

export default InfoLine;