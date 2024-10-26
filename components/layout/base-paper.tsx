import { Paper } from "@mui/material";
import { JSObject } from "types/common";

type Props = {
  children: React.ReactNode;
  sx?: JSObject;
};

function BasePaper({ sx, children }: Props) {
  return (
    <Paper sx={{ padding: "0.75rem", marginTop: "1rem", ...sx }}>
      {children}
    </Paper>
  );
}

export default BasePaper;
