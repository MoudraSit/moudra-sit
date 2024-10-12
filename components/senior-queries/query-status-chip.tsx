import { Chip } from "@mui/material";
import { QueryStatusColors } from "helper/consts";

type Props = {
  queryStatus: string;
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
      label={queryStatus}
      sx={{
        backgroundColor: selectChipColor(queryStatus),
        color: "white",
        ...sx,
      }}
    />
  );
}

export default QueryStatusChip;
