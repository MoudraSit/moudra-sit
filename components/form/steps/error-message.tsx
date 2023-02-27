import { Typography } from "@mui/material";
import * as React from "react";

function ErrorMessageComponent() {
  return (
    <>
      <Typography
        sx={{
          pt: 5,
          color: "red",
          fontWeight: "bold",
        }}
        variant="h5"
        align="center"
        color="primary.main"
        paragraph
      >
        Omlouváme se, ale došlo k chybě. Zkontrolujte prosím internetové
        připojení a zkuste stisknout na Odeslat znovu. Pokud problémy nadále
        přetrvávají, zkuste prosím vyplnit a odeslat formulář později. Děkujeme
        za pochopení.
      </Typography>
    </>
  );
}

export default ErrorMessageComponent;
