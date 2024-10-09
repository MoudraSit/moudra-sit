import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip
} from "@mui/material";
import { AssistantPagePaths, QueryDeviceCategory, QueryStatus, QueryStatusColors } from "helper/consts";
import Link from "next/link";
import { JSObject } from "types/common";
import { SeniorQuery } from "types/seniorQuery";

// TODO: set max height and use this here
export const QUERY_CARD_HEIGHT = 245;
const CARD_SPACING = "1rem";

type Props = {
  style: JSObject;
  item: SeniorQuery;
  device : QueryDeviceCategory
};

function QueryCard({ style, item , device }: Props) {
  return (
    <Card
      style={{
        ...style,
        height : `calc(${QUERY_CARD_HEIGHT}px - ${CARD_SPACING})`,
        marginBottom: CARD_SPACING,
      }}
    >
      <CardContent sx={{height : "245px",borderRadius : "6px"}}>

       <Chip
        label={item.fields.stavDotazu}
        sx={{
          backgroundColor: QueryStatusColors.NEW, 
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "16px", 
          paddingX: "12px",
          paddingY: "6px"
        }}
      />

        <Typography fontFamily={"Roboto Condensed"} fontSize={"21px"} variant="h2" fontWeight={"bold"}>{item.fields.popis}</Typography>
        <Typography fontFamily={"Roboto Condensed"} fontSize={"19px"} variant="body2">{item.fields.iDSeniora.fields.prijmeniJmeno}</Typography>
        <Typography fontFamily={"Roboto Condensed"} fontSize={"19px"} variant="body2">{item.fields.iDSeniora.fields.mesto}</Typography>
        <Typography fontFamily={"Roboto Condensed"} fontSize={"19px"} variant="body2" fontWeight={"bold"}>
          Zařízení : <span style={{fontWeight : "normal"}}>{device}</span>
        </Typography>
        <Typography fontFamily={"Roboto Condensed"} fontSize={"19px"} fontWeight={"bold"} variant="body2">
          Místo Pomoci : <span style={{fontWeight : "normal",fontFamily : "Roboto Condensed"}}>{device}</span>
        </Typography>
        {/* <Typography variant="body2">{item.fields.pozadovaneMistoPomoci}</Typography> */}
        <CardActions>
          <Button
            LinkComponent={Link}
            href={`${AssistantPagePaths.SENIOR_QUERIES}/${item.id}/detail`}
            variant="outlined"
            color="info"
            sx={
              {
                width : "100%",
                fontFamily : "Roboto"
              }
            }
          >
            Zobrazit Detail
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default QueryCard;
