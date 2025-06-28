import "styles/globals.css";

import { Box } from "@mui/material";
import { innerBoxStyles, outerBoxStyles } from "styles/common-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        ...outerBoxStyles,
        bgcolor: "white",
      }}
    >
      <Box sx={innerBoxStyles}>{children}</Box>
    </Box>
  );
}
