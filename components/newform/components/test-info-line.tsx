import { Box, Typography } from "@mui/material";

function TestInfoLine() {
  return (
    <Box
      sx={{
        bgcolor: "#D3215D",
        padding: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" color="white">
        FORM 2.0
      </Typography>
    </Box>
  );
}

export default TestInfoLine;
