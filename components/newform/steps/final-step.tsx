import {
  Button,
  Card,
  CardContent,
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

function createData(name: string, value: string, edit: string, id: string, required: boolean) {
  return { name, value, edit, id, required };
}

function FinalStep(props: { values: IValues; setActiveStep: any; setFieldValue: any }) {
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const handleClick = () => {
    setButtonOpacity(1);
  };

  const handleClickBack = () => {
    props.setActiveStep(3);
  };

  const rows = [
    createData("Ročník narození *", props.values.year.toString(), "Upravit", "year", true),
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
    createData("Název problému *", props.values.requirmentName, "Upravit", "requirmentName", true),
    createData("Detaily problému *", props.values.description, "Upravit", "description", true),
    createData("Jméno *", props.values.name, "Upravit", "name", true),
    createData("Příjmení *", props.values.surname, "Upravit", "surname", true),
    createData("PSČ *", props.values.zipCode, "Upravit", "zipCode", true),
    createData("Obec/město *", props.values.city, "Upravit", "city", true),
    createData("Předvolba", props.values.plusCode, "Upravit", "plusCode", false),
    createData("Telefonní číslo *", props.values.phoneNumber, "Upravit", "phoneNumber", true),
    createData("Kontaktní email", props.values.email, "Upravit", "email", false),
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
          Kontrola údajů
        </Typography>
      </div>
      <Typography
        variant="h2"
        align="left"
        color="#3e3e3e"
        sx={{ pt: 4, pb: 4, fontWeight: "bold" }}
      >
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
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Ročník narození *
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <TextFieldForm
                      id="year"
                      name="Ročník narození *"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      required
                      defaultValue={props.values.year.toString()}
                      onChange={(e) => {
                        props.setFieldValue("year", e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    S čím je problém *
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <Grid container alignItems="stretch" spacing={1.5}>
                      <Grid item xs={3} md={3}>
                        <Card
                          sx={{
                            height: "70%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: 1,
                            backgroundColor: props.values.phoneCheckbox
                              ? "#D3215D !important"
                              : "white",
                          }}
                        >
                          <Button
                            sx={{
                              marginTop: "auto",
                              p: 0,
                              textTransform: "none",
                              "&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent",
                              },
                              backgroundColor: props.values.phoneCheckbox
                                ? "#D3215D !important"
                                : "white",
                            }}
                            variant="contained"
                            onClick={() => {
                              props.setFieldValue("phoneCheckbox", !props.values.phoneCheckbox);
                            }}
                          >
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h4"
                                align="center"
                                sx={{
                                  color: props.values.phoneCheckbox ? "white" : "black",
                                }}
                              >
                                Mobilní telefon
                              </Typography>
                            </CardContent>
                          </Button>
                          <CheckboxForm
                            id="phoneCheckbox"
                            name="phoneCheckbox"
                            sx={{
                              display: "none",
                            }}
                            checked={props.values.phoneCheckbox}
                            color="secondary"
                          />
                        </Card>
                      </Grid>

                      <Grid item xs={3} md={3}>
                        <Card
                          sx={{
                            height: "70%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: 1,
                            backgroundColor: props.values.pcCheckbox
                              ? "#D3215D !important"
                              : "white",
                          }}
                        >
                          <Button
                            sx={{
                              marginTop: "auto",
                              p: 0,
                              textTransform: "none",
                              "&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent",
                              },
                              backgroundColor: props.values.pcCheckbox
                                ? "#D3215D !important"
                                : "white",
                            }}
                            variant="contained"
                            onClick={() => {
                              props.setFieldValue("pcCheckbox", !props.values.pcCheckbox);
                            }}
                          >
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h4"
                                align="center"
                                sx={{
                                  color: props.values.pcCheckbox ? "white" : "black",
                                }}
                              >
                                Počítač
                              </Typography>
                            </CardContent>
                          </Button>
                          <CheckboxForm
                            id="pcCheckbox"
                            name="pcCheckbox"
                            sx={{
                              display: "none",
                            }}
                            checked={props.values.pcCheckbox}
                            color="secondary"
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={3} md={3}>
                        <Card
                          sx={{
                            height: "70%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: 1,
                            backgroundColor: props.values.printerCheckbox
                              ? "#D3215D !important"
                              : "white",
                          }}
                        >
                          <Button
                            sx={{
                              marginTop: "auto",
                              p: 0,
                              textTransform: "none",
                              "&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent",
                              },
                              backgroundColor: props.values.printerCheckbox
                                ? "#D3215D !important"
                                : "white",
                            }}
                            variant="contained"
                            onClick={() => {
                              props.setFieldValue("printerCheckbox", !props.values.printerCheckbox);
                            }}
                          >
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h4"
                                align="center"
                                sx={{
                                  color: props.values.printerCheckbox ? "white" : "black",
                                }}
                              >
                                Tiskárna
                              </Typography>
                              <Box
                                textAlign="center"
                                sx={{
                                  pt: 2,
                                }}
                              ></Box>
                            </CardContent>
                          </Button>
                          <CheckboxForm
                            id="printerCheckbox"
                            name="printerCheckbox"
                            sx={{
                              display: "none",
                            }}
                            checked={props.values.printerCheckbox}
                            color="secondary"
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={3} md={3}>
                        <Card
                          sx={{
                            height: "70%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: 1,
                            backgroundColor: props.values.otherCheckbox
                              ? "#D3215D !important"
                              : "white",
                          }}
                        >
                          <Button
                            sx={{
                              marginTop: "auto",
                              p: 0,
                              textTransform: "none",
                              "&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent",
                              },
                              backgroundColor: props.values.otherCheckbox
                                ? "#D3215D !important"
                                : "white",
                            }}
                            variant="contained"
                            onClick={() => {
                              props.setFieldValue("otherCheckbox", !props.values.otherCheckbox);
                            }}
                          >
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h4"
                                align="center"
                                sx={{
                                  color: props.values.otherCheckbox ? "white" : "black",
                                }}
                              >
                                Jiné zařízení
                              </Typography>
                            </CardContent>
                          </Button>
                          <CheckboxForm
                            id="otherCheckbox"
                            name="otherCheckbox"
                            sx={{
                              display: "none",
                            }}
                            checked={props.values.otherCheckbox}
                            color="secondary"
                          />
                        </Card>
                      </Grid>
                    </Grid>
                    {/* <TextFieldForm
                      id="section2"
                      name="S čím je problém *"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      required
                      fullWidth
                      defaultValue={
                        (props.values.phoneCheckbox ? " Mobilní telefon " : "") +
                        (props.values.pcCheckbox ? " Počítač " : "") +
                        (props.values.printerCheckbox ? " Tiskárna" : "") +
                        (props.values.otherCheckbox ? " Jiné IT zařízení" : "")
                      }
                      onChange={(e) => {
                        props.setFieldValue("section2", e.target.value);
                        console.log(e.target.value);
                      }}
                    /> */}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Název problému *
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <TextFieldForm
                      id="requirmentName"
                      name="Název problému *"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      required
                      fullWidth
                      defaultValue={props.values.requirmentName}
                      onChange={(e) => {
                        props.setFieldValue("requirmentName", e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Detaily problému *
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <TextFieldForm
                      id="description"
                      name="Detaily problému *"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      multiline
                      rows={3}
                      required
                      fullWidth
                      defaultValue={props.values.description}
                      onChange={(e) => {
                        props.setFieldValue("description", e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Jméno a příjmení*
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <Grid container spacing={1}>
                      <Grid item sm={12} md={3}>
                        <TextFieldForm
                          id="name"
                          name="Jméno *"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          defaultValue={props.values.name}
                          onChange={(e) => {
                            props.setFieldValue("name", e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item sm={12} md={3}>
                        <TextFieldForm
                          id="surname"
                          name="Příjmení *"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          defaultValue={props.values.surname}
                          onChange={(e) => {
                            props.setFieldValue("surname", e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    PSČ a obec *
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <Grid container spacing={1}>
                      <Grid item sm={12} md={3}>
                        <TextFieldForm
                          id="zipCode"
                          name="PSČ *"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          defaultValue={props.values.zipCode}
                          onChange={(e) => {
                            props.setFieldValue("zipCode", e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item sm={12} md={3}>
                        <TextFieldForm
                          id="city"
                          name="Obec/město *"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          defaultValue={props.values.city}
                          onChange={(e) => {
                            props.setFieldValue("city", e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Telefonní číslo *
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <TextFieldForm
                      id="phoneNumber"
                      name="Telefonní číslo *"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      required
                      defaultValue={props.values.phoneNumber}
                      onChange={(e) => {
                        props.setFieldValue("phoneNumber", e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Kontaktní email
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: "none" }}
                    sx={{
                      fontSize: "18px",
                      display: { xs: "flex", sm: "table-cell" },
                    }}
                    align="left"
                  >
                    <TextFieldForm
                      id="email"
                      name="Kontaktní email"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      defaultValue={props.values.email}
                      onChange={(e) => {
                        props.setFieldValue("email", e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
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
                onChange={(e: { target: { checked: any } }) =>
                  props.setFieldValue("agreement", e.target.checked)
                }
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
                Souhlasím se zpracováním osobních údajů
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
