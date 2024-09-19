import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Link } from "@mui/material";
import React from "react";

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
        bgcolor: "#D3215D",
        padding: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link variant="h5" href="https://moudrasit.cz/mapa">
        Upozornění - návštěvy digitálních asistentů fungují zatím pouze ve vybraných lokalitách. Pro
        zobrazení lokalit klikněte zde.
      </Link>
      <Button
        sx={{
          ml: 1,
          alignItems: "right",
        }}
        type="button"
        variant="outlined"
        startIcon={<CloseIcon />}
        onClick={() => setHideInfo("none")}
      >
        Zavřít
      </Button>
    </Box>
  );
}

export default InfoLine;
