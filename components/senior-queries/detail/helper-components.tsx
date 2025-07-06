import { Box, Typography } from "@mui/material";

export const DEFAULT_BORDER_COLOR = "#DADADA";

export function ReadOnlyBoxLabel({
  label,
  sublabel,
}: {
  label: string;
  sublabel?: string;
}) {
  return (
    <>
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        {label}
      </Typography>
      {sublabel ? (
        <Typography variant="caption" sx={{ color: "#A5A5A5" }}>
          {sublabel}
        </Typography>
      ) : null}
    </>
  );
}

export function ReadOnlyBox({
  label,
  sublabel,
  children,
  borderColor = DEFAULT_BORDER_COLOR,
}: {
  label: string;
  sublabel?: string;
  borderColor?: string;
  children: React.ReactElement | string | number | undefined;
}) {
  return (
    <Box>
      <ReadOnlyBoxLabel label={label} sublabel={sublabel} />

      <div
        style={{
          border: `1px ${borderColor} solid`,
          padding: "0.5rem",
        }}
      >
        {![null, undefined, ""].includes(children as any) ? (
          children
        ) : (
          <span>&nbsp;</span>
        )}
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
