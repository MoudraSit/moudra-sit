import { Button, Stack, Typography } from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import Link from "next/link";

function Page() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Stránka nenalezena
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        Tuto stránku se nepovedlo nalézt. Tlačítkem níže se dostanete na úvodní
        stránku.
      </Typography>

      <Button
        sx={{ alignSelf: "center" }}
        variant="contained"
        LinkComponent={Link}
        href={AssistantPagePaths.DASHBOARD}
      >
        Zpět
      </Button>
    </Stack>
  );
}

export default Page;
