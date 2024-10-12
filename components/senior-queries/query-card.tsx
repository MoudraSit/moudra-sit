import {
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { AssistantPagePaths } from "helper/consts";
import { formatDate } from "helper/utils";
import Link from "next/link";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";

export const MAX_QUERY_CARD_HEIGHT = 245;
export const MAX_QUERY_CARD_WIDTH = 500;
const CARD_SPACING = "1rem";

type Props = {
  style: JSObject;
  item: SeniorQuery;
};

// /* Náhled - se zařízením a místem setkání */

// box-sizing: border-box;

// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 10px;
// gap: 8px;

// width: 358px;
// height: 275px;

// background: #FFFFFF;
// box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
// border-radius: 6px;

// /* Inside auto layout */
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;

function QueryCard({ style, item }: Props) {
  return (
    <Card
      style={{
        ...style,
        height: `calc(${MAX_QUERY_CARD_HEIGHT}px - ${CARD_SPACING})`,
        maxWidth: MAX_QUERY_CARD_WIDTH,
        marginBottom: CARD_SPACING,
        display: "flex",
      }}
    >
      <Stack
        gap={1}
        justifyContent="space-between"
        flexGrow={1}
        sx={{
          borderRadius: "6px",
          paddingBottom: "0.5rem !important",
          padding: "0.5rem",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Chip
            size="small"
            label={item.fields.stavDotazu}
            sx={{
              //   backgroundColor: QueryStatusColors.NEW,
              color: "white",
              //   fontWeight: "bold",
              //   fontSize: "1rem",
              //   borderRadius: "16px",
              //   paddingX: "12px",
              //   paddingY: "6px",
            }}
          />

          <Typography variant="body1">
            {formatDate(item.fields.datumVytvoreni)}
          </Typography>
        </Stack>

        <Box>
          <Typography variant="h2" fontWeight={"bold"}>
            {item.fields.popis}
          </Typography>
          <Typography variant="body1">
            {item.fields.iDSeniora.fields.prijmeniJmeno}
          </Typography>
          <Typography variant="body1">
            {item.fields.iDSeniora.fields.mesto}
          </Typography>
          <Typography variant="body1" fontWeight="600">
            Zařízení:{" "}
            <span style={{ fontWeight: "normal" }}>
              {item.fields.kategorieDotazu}
            </span>
          </Typography>
          <Typography fontWeight="600" variant="body1">
            Místo setkání:{" "}
            <span style={{ fontWeight: "normal" }}>
              {item.fields.pozadovaneMistoPomoci}
            </span>
          </Typography>
        </Box>

        <Button
          LinkComponent={Link}
          href={`${AssistantPagePaths.SENIOR_QUERIES}/${item.id}/detail`}
          variant="outlined"
          color="info"
          fullWidth
        >
          Zobrazit Detail
        </Button>
      </Stack>
    </Card>
  );
}

export default QueryCard;
