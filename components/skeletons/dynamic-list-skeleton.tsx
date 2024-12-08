import { Stack } from "@mui/material";
import QueryCardSkeleton from "./query-card-skeleton";

type Props = {
  height?: number;
  SkeletonComponent?: React.ComponentType<{ height: number }>;
};

export default function DynamicListSkeleton({
  height = 150,
  SkeletonComponent = QueryCardSkeleton,
}: Props) {
  return (
    <Stack spacing={2}>
      <SkeletonComponent height={height} />
      <SkeletonComponent height={height} />
    </Stack>
  );
}
