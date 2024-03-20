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
      <Typography variant="h6" align="center" color="white">
        TEST
      </Typography>
    </Box>
  );
}

export default TestInfoLine;
