import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import { FilterType, SeniorRequestType } from "helper/consts";


function newQueryCard() {
    return (
        <Card>
        <CardActionArea
          LinkComponent={Link}
          href={`/dotazy?${FilterType.REQUEST_TYPE}=${SeniorRequestType.MINE}`}
        >
          <CardContent>
            <Typography variant="body2" color={"#028790"} fontSize={"18px"} fontFamily={"roboto"}>
              Nový Dotaz
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default newQueryCard;