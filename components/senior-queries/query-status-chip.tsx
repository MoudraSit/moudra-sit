import { Chip } from "@mui/material";
import {
  QueryStatus,
  QueryStatusColors,
  QueryStatusLabels,
} from "helper/consts";

type Props = {
  queryStatus: QueryStatus;
  sx?: any;
};

function QueryStatusChip({ queryStatus, sx }: Props) {
  function selectChipColor(queryStatus: string) {
    if (queryStatus in QueryStatusColors)
      //@ts-ignore
      return QueryStatusColors[queryStatus];
    return "grey";
  }

  return (
    <Chip
      size="small"
      label={QueryStatusLabels[queryStatus] ?? queryStatus}
      sx={{
        backgroundColor: selectChipColor(queryStatus),
        color: "white",
        height: "18px",
        ...sx,
      }}
    />
  );
}

export default QueryStatusChip;
