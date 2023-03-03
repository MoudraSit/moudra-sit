import {
  Button,
  Grid,
  IconButton,
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
import styles from "./step5.module.css";

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
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="#3e3e3e"
        gutterBottom
      >
        Zkontrolujte uvedené údaje
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="#3e3e3e"
        sx={{ pb: 2 }}
        paragraph
      >
        Prosím, ještě jednou si projděte vyplněné údaje a dobře je zkontrolujte
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
        sx={{ pt: 5 }}
        variant="h5"
        align="center"
        color="#3e3e3e"
        paragraph
      >
        Pokud je vše správně, klikněte na Odeslat
      </Typography>
    </>
  );
}

export default Step5Form;
