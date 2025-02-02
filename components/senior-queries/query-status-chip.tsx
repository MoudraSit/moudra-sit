import { Chip } from "@mui/material";
import {
  QueryStatus,
  QueryStatusColors,
  QueryStatusFontColors,
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
  function selectFontColor(queryStatus: string) {
    if (queryStatus in QueryStatusFontColors)
      //@ts-ignore
      return QueryStatusFontColors[queryStatus];
    return "white";
  }

  return (
    <Chip
      size="small"
      label={QueryStatusLabels[queryStatus] ?? queryStatus}
      sx={{
        backgroundColor: selectChipColor(queryStatus),
        color: selectFontColor(queryStatus),
        fontWeight: "bold",
        height: "18px",
        ...sx,
      }}
    />
  );
}

export default QueryStatusChip;
