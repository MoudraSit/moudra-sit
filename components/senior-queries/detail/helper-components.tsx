import { Box, Typography } from "@mui/material";

export const BORDER_COLOR = "#F5F3EE";

export function ReadOnlyBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactElement | string | number;
}) {
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        {label}
      </Typography>
      <div
        style={{
          border: `1px ${BORDER_COLOR} solid`,
          padding: "0.5rem",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

export function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
      >
        {label}
      </Typography>
      <Typography sx={{ overflowWrap: "break-word" }}>{value}</Typography>
    </Box>
  );
}
