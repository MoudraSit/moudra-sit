import {
  Box,
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

function QueryChangesTab({ seniorQuery, visits }: Props) {
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
          Přehled změn
        </Typography>
        <List>
          {visits.map((visit) => (
            <NextLink
              key={visit.id}
              href={`${AssistantPagePaths.VISITS}/${visit.id}`}
            >
              <ListItem sx={{ padding: "0.5rem" }}>
                <ListItemContent>
                  <Stack direction="column">
                    <Typography variant="body2">
                      {/* TODO: chip */}
                      Stav: {visit.fields.stav}
                    </Typography>
                    <Typography variant="body2">
                      Termín návštěvy:{" "}
                      {formatDate(visit.fields.datumUskutecneneNavstevy)}
                    </Typography>
                  </Stack>
                  {/* TODO: ellipsis on too long texts */}
                  {visit.fields.poznamkaAsistentem}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption">
                      {visit.fields.iDUzivatele?.fields.email}
                    </Typography>
                    <Typography variant="caption">
                      {formatDate(visit.fields.vlozeniZaznamu)}
                    </Typography>
                  </Stack>
                </ListItemContent>
                <ListItemAvatar
                  sx={{
                    minWidth: "0.5rem",
                    marginRight: "-0.5rem",
                    color: "black",
                  }}
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

export default QueryChangesTab;
