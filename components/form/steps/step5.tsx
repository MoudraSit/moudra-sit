import {
  Button,
  FormControlLabel,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IValues } from "../vertical-stepper";
import EditIcon from "@mui/icons-material/Edit";
import CheckboxForm from "../model/checkbox-form";

function scrollIntoSection(elemId: string) {
  const element = document.getElementById(elemId);
  if (element) {
    // Will scroll smoothly to the top of the next section
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function createData(name: string, calories: string, edit: string, id: string) {
  return { name, calories, edit, id };
}

function Step5Form(props: { values: IValues }) {
  const rows = [
    createData(
      "Ročník narození",
      props.values.year.toString(),
      "Upravit",
      "section1"
    ),
    createData(
      "S čím je problém",
      (props.values.phoneCheckbox ? " Mobilní telefon" : "") +
        (props.values.pcCheckbox ? " Počítač" : "") +
        (props.values.printerCheckbox ? " Tiskárna" : "") +
        (props.values.otherCheckbox ? " Jiné IT zařízení" : ""),
      "Upravit",
      "section2"
    ),
    createData(
      "Název problému",
      props.values.requirmentName,
      "Upravit",
      "section3"
    ),
    createData(
      "Detaily problému",
      props.values.description,
      "Upravit",
      "section3"
    ),
    createData(
      "Jméno a příjmení",
      props.values.name + " " + props.values.surname,
      "Upravit",
      "section4"
    ),
    createData("PSČ", props.values.zipCode, "Upravit", "section4"),
    createData(
      "Telefonní číslo",
      props.values.plusCode + props.values.phoneNumber,
      "Upravit",
      "section4"
    ),
    createData("Kontaktní email", props.values.email, "Upravit", "section4"),
  ];

  return (
    <>
      <div id="section5" />
      <Typography
        variant="h5"
        align="left"
        color="#3e3e3e"
        sx={{ pb: 4, fontWeight: "bold" }}
        paragraph
      >
        Nyní prosím zkontrolujte správnost vyplněných údajů a níže klikněte na
        tlačítko “Odeslat požadavek“.
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "white",
          pt: 1,
          pb: 1,
        }}
      >
        <TableContainer>
          <Grid container>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ borderBottom: "none" }}
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        display: { xs: "flex", sm: "table-cell" },
                      }}
                      component="th"
                      scope="row"
                      onClick={() => {
                        scrollIntoSection(row.id);
                      }}
                    >
                      {row.name}
                    </TableCell>

                    <TableCell
                      style={{ borderBottom: "none" }}
                      sx={{
                        fontSize: "18px",
                        display: { xs: "flex", sm: "table-cell" },
                      }}
                      align="left"
                      onClick={() => {
                        scrollIntoSection(row.id);
                      }}
                    >
                      {row.calories}
                    </TableCell>

                    <TableCell
                      style={{ borderBottom: "none" }}
                      sx={{
                        display: { xs: "flex", sm: "table-cell" },
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          scrollIntoSection(row.id);
                        }}
                        sx={{
                          mt: 1,
                          mr: 1,
                          bgcolor: "#e25b5b",
                          color: "white",
                        }}
                        startIcon={<EditIcon />}
                      >
                        Upravit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
      </Box>
      <Typography
        sx={{ pt: 4, fontWeight: "bold" }}
        variant="h5"
        align="left"
        color="#3e3e3e"
        paragraph
      >
        Pokud je vše správně, potvrďte prosím souhlas se zpracováním osobních
        údajů a klikněte na tlačítko “Odeslat požadavek“.
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          sx={{ pt: 6 }}
          control={
            <CheckboxForm
              id="agreement"
              name="agreement"
              required
              sx={{
                color: "info.main",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label={
            <Link
              color="#000000"
              href="https://moudrasit.cz/gdpr-zasady-ochrany-osobnich-udaju/"
              rel="noopener"
              target="_blank"
              fontSize={24}
            >
              Souhlasím se zpracováním osobních údajů *
            </Link>
          }
        />
      </Grid>
    </>
  );
}

export default Step5Form;
