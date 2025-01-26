import { Typography } from "@mui/material";
import DynamicListSkeleton, { Props } from "./dynamic-list-skeleton";

export default function QueryCardDynamicListSkeleton(props: Props) {
  return (
    <>
      <Typography variant="caption" sx={{ margin: "3px" }}>
        Výsledky: ...
      </Typography>

      <DynamicListSkeleton {...props} />
    </>
  );
}
