import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import Link from "next/link";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";

// TODO: set max height and use this here
export const QUERY_CARD_HEIGHT = 160;
const CARD_SPACING = "1rem";

type Props = {
  style: JSObject;
  item: SeniorQuery;
};

function QueryCard({ style, item }: Props) {
  return (
    <Card
      style={{
        ...style,
        height: `calc(${QUERY_CARD_HEIGHT}px - ${CARD_SPACING})`,
        marginBottom: CARD_SPACING,
      }}
    >
      <CardContent>
        <Typography variant="body2">{item.fields.popis}</Typography>
        <CardActions>
          <Button
            LinkComponent={Link}
            href={`${AssistantPagePaths.SENIOR_QUERIES}/${item.id}/detail`}
            variant="outlined"
            color="info"
          >
            Zobrazit Detail
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default QueryCard;
