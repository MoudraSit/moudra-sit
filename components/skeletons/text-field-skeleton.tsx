import { Skeleton, Box } from "@mui/material";

type Props = {
  width?: number | string;
  height?: number | string;
};

export default function TextFieldSkeleton({
  width = "100%",
  height = 56,
}: Props) {
  return (
    <Box>
      <Skeleton
        variant="text"
        width={80}
        height={20}
        sx={{ marginBottom: "4px" }}
      />
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        sx={{ borderRadius: "4px" }}
      />
    </Box>
  );
}
