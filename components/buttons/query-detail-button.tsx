import { AssistantPagePaths } from "helper/consts";
import Link from "next/link";
import SecondaryButton from "./secondary-button";

type Props = {
  queryId: string;
  label?: string;
};

function QueryDetailButton({ queryId, label = "Zobrazit detail" }: Props) {
  return (
    <SecondaryButton
      LinkComponent={Link}
      href={`${AssistantPagePaths.SENIOR_QUERIES}/${queryId}/detail`}
      sx={{ mt: 0, mb: 0 }}
      fullWidth
      label={label}
    />
  );
}

export default QueryDetailButton;
