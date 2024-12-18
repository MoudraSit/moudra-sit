import { Chip } from "@mui/material";
import { AssistantStatusColors } from "helper/consts";

type Props = {
  status: string;
  sx?: any;
};

function AssistantStatusChip({ status, sx }: Props) {
  function selectChipColor(status: string) {
    if (status in AssistantStatusColors)
      //@ts-ignore
      return AssistantStatusColors[status];
    return "grey";
  }

  return (
    <Chip
      size="small"
      label={status}
      sx={{
        backgroundColor: selectChipColor(status),
        color: "white",
        ...sx,
      }}
    />
  );
}

export default AssistantStatusChip;
