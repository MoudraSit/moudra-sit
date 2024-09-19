import {
  Button,
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
import { FormikErrors } from "formik";
import { useEffect } from "react";
import { IValues } from "../helpers/constants";
import { CardItem } from "../model/card-item";
import TextFieldForm from "../model/input-form";

export default function FinalStep(props: {
  errors: FormikErrors<IValues>;
  values: IValues;
  setActiveStep: (val: number) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) {
  const handleClickBack = () => {
    props.setActiveStep(4);
  };

  useEffect(() => {
    const anyDeviceChecked =
      props.values.phoneCheckbox ||
      props.values.pcCheckbox ||
      props.values.printerCheckbox ||
      props.values.otherCheckbox;

    props.setFieldValue("checkbox_selection", anyDeviceChecked);
  }, [
    props.values.phoneCheckbox,
    props.values.pcCheckbox,
    props.values.printerCheckbox,
    props.values.otherCheckbox,
    props.setFieldValue,
  ]);

  useEffect(() => {
    const anyPlaceChecked =
      props.values.homeCheckbox ||
      props.values.libraryCheckbox ||
      props.values.publicPlaceCheckbox ||
      props.values.virtualCheckbox;

    props.setFieldValue("place_selection", anyPlaceChecked);
  }, [
    props.values.homeCheckbox,
    props.values.libraryCheckbox,
    props.values.publicPlaceCheckbox,
    props.values.virtualCheckbox,
    props.setFieldValue,
  ]);

  const deviceItems = [
    { id: "phoneCheckbox", value: props.values.phoneCheckbox, label: "Mobilní telefon" },
    { id: "pcCheckbox", value: props.values.pcCheckbox, label: "Počítač" },
    { id: "printerCheckbox", value: props.values.printerCheckbox, label: "Tiskárna" },
    { id: "otherCheckbox", value: props.values.otherCheckbox, label: "Jiné zařízení" },
  ];

  const placeItems = [
    { id: "libraryCheckbox", value: props.values.libraryCheckbox, label: "V knihovně" },
    {
      id: "publicPlaceCheckbox",
      value: props.values.publicPlaceCheckbox,
      label: "Na veřejném místě",
    },
    { id: "virtualCheckbox", value: props.values.virtualCheckbox, label: "Na dálku" },
    { id: "homeCheckbox", value: props.values.homeCheckbox, label: "U mě doma" },
  ];

  return (
    <>
      {/* <Button
        variant="contained"
        onClick={handleClickBack}
        sx={{
          mt: 1,
          mr: 1,
          mb: 2,
          bgcolor: "#D3215D !important",
          color: "white",
          letterSpacing: 0.5,
        }}
      >
        Zpět
      </Button> */}
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Kontrola údajů
      </Typography>
      <Typography
        variant="h2"
        align="left"
        color="#3e3e3e"
        sx={{ pt: 4, pb: 4, fontWeight: "bold" }}
      >
        Nyní prosím zkontrolujte správnost vyplněných údajů (případně zde přímo upravte) a dole
        klikněte na tlačítko „Odeslat požadavek“
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: "white",
          pt: 1,
          pb: 1,
          mb: 8,
        }}
      >
        <TableContainer>
          <Grid container>
            <Table aria-label="shrnuti-dotazu">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="year"
                          name="year"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          fullWidth
                          value={props.values.year.toString()}
                          onChange={(e) => {
                            props.setFieldValue("year", e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                      {deviceItems.map((item) => (
                        <CardItem
                          key={item.id}
                          id={item.id}
                          name={item.id}
                          label={item.label}
                          checked={item.value}
                          onToggle={() => props.setFieldValue(item.id, !item.value)}
                        />
                      ))}
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                    Název požadavku *
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
                      name="requirmentName"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      required
                      fullWidth
                      value={props.values.requirmentName}
                      onChange={(e) => {
                        props.setFieldValue("requirmentName", e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                    Detaily požadavku *
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
                      name="description"
                      color="info"
                      inputhelper=""
                      variant="outlined"
                      multiline
                      rows={3}
                      required
                      fullWidth
                      value={props.values.description}
                      onChange={(e) => {
                        props.setFieldValue("description", e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="name"
                          name="name"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          fullWidth
                          value={props.values.name}
                          onChange={(e) => {
                            props.setFieldValue("name", e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="surname"
                          name="surname"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          fullWidth
                          value={props.values.surname}
                          onChange={(e) => {
                            props.setFieldValue("surname", e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="zipCode"
                          name="zipCode"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          fullWidth
                          value={props.values.zipCode}
                          onChange={(e) => {
                            props.setFieldValue("zipCode", e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="city"
                          name="city"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          fullWidth
                          value={props.values.city}
                          onChange={(e) => {
                            props.setFieldValue("city", e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="phoneNumber"
                          name="phoneNumber"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          required
                          fullWidth
                          value={props.values.phoneNumber}
                          onChange={(e) => {
                            props.setFieldValue("phoneNumber", e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4}>
                        <TextFieldForm
                          id="email"
                          name="email"
                          color="info"
                          inputhelper=""
                          variant="outlined"
                          fullWidth
                          value={props.values.email}
                          onChange={(e) => {
                            props.setFieldValue("email", e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, verticalAlign: "top" }}
                >
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
                    Místo setkání *
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
                      {placeItems.map((item) => (
                        <CardItem
                          key={item.id}
                          id={item.id}
                          name={item.id}
                          label={item.label}
                          checked={item.value}
                          onToggle={() => props.setFieldValue(item.id, !item.value)}
                        />
                      ))}
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
      </Box>

      <Link
        sx={{ mt: 8 }}
        color="#000000"
        href="https://moudrasit.cz/gdpr-zasady-ochrany-osobnich-udaju/"
        rel="noopener"
        target="_blank"
        fontSize={24}
        variant="h2"
      >
        Zpracování osobních údajů
      </Link>

      <Typography sx={{ pt: 4, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
        {" "}
        Kliknutím na „Odeslat požadavek“ souhlasíte se Zpracováním osobních údajů.
      </Typography>

      {/* Show error when occures */}
      {Object.values(props.errors)[0] != null ? (
        <Typography variant="h2" align="left" color="error" sx={{ pt: 8, fontStyle: "italic" }}>
          {Object.values(props.errors)[0].toString()}
        </Typography>
      ) : (
        <Box
          sx={{
            bgcolor: "#f5f3ee",
            pt: 7,
            textAlign: "left",
            opacity: Object.keys(props.errors).length === 0 ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              console.log(props.errors);
              console.log(props.values);
            }}
            sx={{
              mr: 1,
              bgcolor: "#D3215D !important",
              color: "white",
              letterSpacing: 0.5,
              fontSize: 20,
            }}
          >
            Odeslat formulář
          </Button>
        </Box>
      )}
    </>
  );
}
