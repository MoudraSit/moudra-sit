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
import CheckboxForm from "../model/checkbox-form";
import TextFieldForm from "../model/input-form";
import { IValues } from "../vertical-stepper";

function scrollIntoSection(elemId: string) {
  const element = document.getElementById(elemId);
  if (element) {
    // Will scroll smoothly to the top of the next section
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function createData(name: string, value: string, edit: string, id: string, required: boolean) {
  return { name, value, edit, id, required };
}

function FinalStep(props: { values: IValues; setActiveStep: any }) {
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const handleClick = () => {
    setButtonOpacity(1);
  };

  const handleClickBack = () => {
    props.setActiveStep(3);
  };

  const rows = [
    createData("Ročník narození *", props.values.year.toString(), "Upravit", "section1", true),
    createData(
      "S čím je problém *",
      (props.values.phoneCheckbox ? " Mobilní telefon " : "") +
        (props.values.pcCheckbox ? " Počítač " : "") +
        (props.values.printerCheckbox ? " Tiskárna" : "") +
        (props.values.otherCheckbox ? " Jiné IT zařízení" : ""),
      "Upravit",
      "section2",
      true
    ),
    createData("Název problému *", props.values.requirmentName, "Upravit", "section3", true),
    createData("Detaily problému *", props.values.description, "Upravit", "section3", true),
    createData(
      "Jméno a příjmení *",
      props.values.name + " " + props.values.surname,
      "Upravit",
      "section4",
      true
    ),
    createData("PSČ *", props.values.zipCode, "Upravit", "section4", true),
    createData(
      "Telefonní číslo *",
      props.values.plusCode + props.values.phoneNumber,
      "Upravit",
      "section4",
      true
    ),
    createData("Kontaktní email", props.values.email, "Upravit", "section4", false),
  ];

  return (
    <>
      <div id="section5" />
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={handleClickBack}
          sx={{
            mt: 1,
            mr: 1,
            bgcolor: "#D3215D !important",
            color: "white",
          }}
        >
          Zpět
        </Button>
        <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
          Shrnutí
        </Typography>
      </div>
      <Typography variant="h2" align="left" color="#3e3e3e" sx={{ pb: 4, fontWeight: "bold" }}>
        Nyní prosím zkontrolujte správnost vyplněných údajů a níže klikněte na tlačítko “Odeslat
        požadavek“.
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
            <Table aria-label="shrnuti-dotazu">
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
                      <TextFieldForm
                        id={row.name}
                        name={row.name}
                        color="info"
                        inputhelper=""
                        variant="outlined"
                        {...(row.required ? require : "")}
                        fullWidth
                        defaultValue={row.value}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
      </Box>
      <Typography sx={{ pt: 4, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
        Pokud je vše správně, potvrďte prosím souhlas se zpracováním osobních údajů a klikněte na
        tlačítko “Odeslat požadavek“.
      </Typography>
      <Grid item xs={12}>
        <div onClick={handleClick}>
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
        </div>
      </Grid>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 8,
          textAlign: "left",
          opacity: buttonOpacity,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            mr: 1,
            bgcolor: "#D3215D !important",
            color: "white",
          }}
        >
          Odeslat formulář
        </Button>
      </Box>
    </>
  );
}

export default FinalStep;
