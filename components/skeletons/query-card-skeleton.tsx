import { Card, Skeleton } from "@mui/material";

type Props = {
  height?: number;
  fontSize?: string;
};

export default function QueryCardSkeleton({
  height = 60,
  fontSize = "1.5rem",
}: Props) {
  return (
    <Card
      style={{
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div>
        <Skeleton variant="text" sx={{ fontSize, width: "50%" }} />
        <Skeleton variant="rectangular" sx={{ fontSize, width: "60%" }} />
      </div>
      <Skeleton variant="rectangular" sx={{ fontSize }} />
    </Card>
  );
}
