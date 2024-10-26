import { Button } from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import Link from "next/link";
import { SeniorQuery } from "types/seniorQuery";

type Props = {
  item: SeniorQuery;
  label?: string;
};

// TODO: pass just the queryId
function QueryDetailButton({ item, label = "Zobrazit detail" }: Props) {
  return (
    <Button
      LinkComponent={Link}
      href={`${AssistantPagePaths.SENIOR_QUERIES}/${item.id}/detail`}
      variant="outlined"
      color="info"
      fullWidth
    >
      {label}
    </Button>
  );
}

export default QueryDetailButton;
