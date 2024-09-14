import { Box, Typography } from "@mui/material";
import * as React from "react";

import { getNewSeniorRequests } from "backend/senior-requests";
import DynamicList from "components/dynamic-list/dynamic-list";

// TODO: back button (to "/prehled")

async function NewRequestsList() {
  const requests = await getNewSeniorRequests();

  return (
    <Box
      sx={{
        bgcolor: "#F5F3EE",
        padding: "1rem",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
        Dotazy ({requests.length})
      </Typography>
      <div style={{ flex: "1 1 auto" }}>
        <DynamicList items={requests} />
      </div>
    </Box>
  );
}

export default NewRequestsList;
