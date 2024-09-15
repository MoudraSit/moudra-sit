import { Card, CardContent, Skeleton } from "@mui/material";

type Props = {
  height?: number;
  fontSize?: string;
};

export default function CardSkeleton({
  height = 60,
  fontSize = "1.5rem",
}: Props) {
  return (
    <Card style={{ height }}>
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize }} />
      </CardContent>
    </Card>
  );
}
