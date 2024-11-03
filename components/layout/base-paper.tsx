import { Paper } from "@mui/material";
import { JSObject } from "types/common";

type Props = {
  children: React.ReactNode;
  sx?: JSObject;
  elevation?: number;
};

function BasePaper({ sx, children, elevation }: Props) {
  return (
    <Paper elevation={elevation} sx={{ padding: "0.75rem", marginTop: "1rem", ...sx }}>
      {children}
    </Paper>
  );
}

export default BasePaper;
