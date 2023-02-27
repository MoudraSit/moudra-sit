import { CircularProgress, Typography } from "@mui/material";
import * as React from "react";

function ProgressBarComponent() {
  return (
    <>
      <CircularProgress
        sx={{
          margin: "10px",
          color: "#e25b5b",
          position: "relative",
          top: "20%",
          left: "46%",
        }}
      />
    </>
  );
}

export default ProgressBarComponent;
