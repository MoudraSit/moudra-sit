import { Button } from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import Link from "next/link";

type Props = {
  queryId: string;
  label?: string;
};

function QueryDetailButton({ queryId, label = "Zobrazit detail" }: Props) {
  return (
    <Button
      LinkComponent={Link}
      href={`${AssistantPagePaths.SENIOR_QUERIES}/${queryId}/detail`}
      variant="outlined"
      color="info"
      fullWidth
    >
      {label}
    </Button>
  );
}

export default QueryDetailButton;
