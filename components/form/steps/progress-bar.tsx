/**
 * loading - free gif created by Michael B. Myers Jr. - LottieFiles
 * https://lottiefiles.com/8414-lottie-doggie
 *
 * Gif under Lottie Simple License:
 * https://lottiefiles.com/page/license
 */

import { Typography } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import loading from "../../../public/images/form/loading.gif";

function ProgressBarComponent() {
  return (
    <>
      <Image
        src={loading}
        alt={""}
        style={{
          margin: "10px",
          color: "#D3215D",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Typography variant="h5" align="center" color="#3e3e3e" fontWeight="bold">
        Zasílání požadavku...
      </Typography>
    </>
  );
}

export default ProgressBarComponent;
