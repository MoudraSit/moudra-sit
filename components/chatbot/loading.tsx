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
          {/* <a href="https://www.flaticon.com/free-icons/bot" title="bot icons">
              Bot icons created by Freepik - Flaticon
            </a> */}
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
