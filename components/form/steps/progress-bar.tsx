import { CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import loading from "../../../public/images/form/loading.gif"

function ProgressBarComponent() {
  return (
    <>
      {/* <CircularProgress
        sx={{
          margin: "10px",
          color: "#e25b5b",
          position: "relative",
          top: "20%",
          left: "46%",
        }}
      /> */}
      <Image src={loading} alt={""} style={{
          margin: "10px",
          color: "#e25b5b",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}/>
    <Typography
        variant="h5"
        align="center"
        color="#3e3e3e"
        paragraph
        fontWeight="bold"
      >
        Zasílání požadavku...
      </Typography>
    </>
  );
}

export default ProgressBarComponent;
