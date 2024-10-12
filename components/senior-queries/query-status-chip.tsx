import { Chip } from "@mui/material";
import { QueryStatusColors } from "helper/consts";

type Props = {
  queryStatus: string;
};

function QueryStatusChip({ queryStatus }: Props) {
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
      }}
    />
  );
}

export default QueryStatusChip;
