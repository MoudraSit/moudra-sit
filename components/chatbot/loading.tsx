/**
 *
 * chatIcon - free icon created by Freepik - Flaticon
 * Free for personal and commercial use with attribution
 *
 * Flaticon license:
 * https://www.freepikcompany.com/legal?_gl=1*wlrn0w*test_ga*MTA0Nzc2OTQ5LjE2ODA0MjY0MjY.*test_ga_523JXC6VL7*MTY4NDE1NTQ3Ni4xMC4xLjE2ODQxNTU1MTQuMjIuMC4w*fp_ga*MTA0Nzc2OTQ5LjE2ODA0MjY0MjY.*fp_ga_1ZY8468CQB*MTY4NDE1NTQ3Ni4xMC4xLjE2ODQxNTU1MTQuMjIuMC4w&_ga=2.204569112.985862183.1684155476-104776949.1680426426#nav-flaticon
 *
 * loading - free gif created by Yogesh Pal - LottieFiles
 * https://lottiefiles.com/99680-3-dots-loading
 *
 * Gif under Lottie Simple License:
 * https://lottiefiles.com/page/license
 *
 */

import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import chatIcon from "../../public/images/chatbot/bot.png";
import loading from "../../public/images/chatbot/loading.gif";

function LoadingComponent() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          mb: 2,
        }}
      >
        <Avatar sx={{ mr: 1, backgroundColor: "#e3d65b" }}>
          <Image src={chatIcon} alt={""} height="30" />
        </Avatar>
        <Box
          sx={{
            bgcolor: "#e3d65b",
            p: 2,
            borderRadius: "20px 20px 20px 0px",
            maxWidth: "80%",
            wordWrap: "break-word",
          }}
        >
          <Image src={loading} alt={""} height="50" />
        </Box>
      </Box>
    </>
  );
}

export default LoadingComponent;
