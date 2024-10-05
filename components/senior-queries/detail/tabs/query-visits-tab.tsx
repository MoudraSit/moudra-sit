import {
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SeniorQuery } from "types/seniorQuery";
import { ReadOnlyBox } from "./helper-components";
import { formatDate } from "helper/utils";
import { Visit } from "types/visit";
import { ListItemContent } from "@mui/joy";
import NextLink from "next/link";
import { AssistantPagePaths } from "helper/consts";

type Props = {
  seniorQuery: SeniorQuery;
  visits: Array<Visit>;
};

function QueryVisitsTab({ seniorQuery, visits }: Props) {
  return (
    <>
      <Stack spacing={2}>
        <ReadOnlyBox label="Počet návštěv">
          {seniorQuery.fields.pocetNavstev}
        </ReadOnlyBox>

        <ReadOnlyBox label="Počet hodin celkem">
          {seniorQuery.fields.pocetHodinCelkem}
        </ReadOnlyBox>
        <ReadOnlyBox label="První kontakt seniora">
          {formatDate(seniorQuery.fields.prvniKontaktSeniora)}
        </ReadOnlyBox>
      </Stack>
      <Box>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", marginBottom: "0.5rem" }}
        >
          Historie návštěv
        </Typography>
        <List>
          {visits.map((visit) => (
            <NextLink key={visit.id} href={`${AssistantPagePaths.VISITS}/${visit.id}`}>
              <ListItem sx={{ padding: "0.5rem" }} button component={Link}>
                <ListItemContent>
                  {/* <Box display="flex" flexGrow="1" flexDirection="column"> */}
                  <Typography>{visit.fields.stav}</Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption">
                      {visit.fields.iDUzivatele.fields.email}
                    </Typography>
                    <Typography variant="caption">
                      {formatDate(visit.fields.vlozeniZaznamu)}
                    </Typography>
                  </Stack>
                  {/* </Box> */}
                </ListItemContent>
                <ListItemAvatar
                  sx={{ minWidth: "0.5rem", marginRight: "-0.5rem" }}
                >
                  <ChevronRightIcon />
                </ListItemAvatar>
              </ListItem>
            </NextLink>
          ))}
        </List>
      </Box>
    </>
  );
}

export default QueryVisitsTab;
