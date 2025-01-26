import { Stack } from "@mui/material";
import TextFieldSkeleton from "./text-field-skeleton";

export type Props = {
  height?: number;
  SkeletonComponent?: React.ComponentType<{ height: number }>;
};

export default function SeniorFieldsSkeleton({
  height = 32,
  SkeletonComponent = TextFieldSkeleton,
}: Props) {
  return (
    <Stack spacing={2}>
      <SkeletonComponent height={height} />
      <SkeletonComponent height={height} />
      <SkeletonComponent height={height} />
      <SkeletonComponent height={height} />
    </Stack>
  );
}
