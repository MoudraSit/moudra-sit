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
import CityAutosuggest from "../components/CityAutosuggest";
import { PSCAutosuggest } from "../components/PSCAutosuggest";
import { CardItem } from "../model/card-item";
import { IValues } from "../model/constants";
import TextFieldForm from "../model/input-form";

type Props = {
  errors: FormikErrors<IValues>;
  values: IValues;
  setActiveStep: (val: number) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
};

export const FinalStep: React.FC<Props> = ({ values, errors, setActiveStep, setFieldValue }) => {
  useEffect(() => {
    const anyDeviceChecked =
      values.phoneCheckbox || values.pcCheckbox || values.printerCheckbox || values.otherCheckbox;

    setFieldValue("checkbox_selection", anyDeviceChecked);
  }, [
    values.phoneCheckbox,
    values.pcCheckbox,
    values.printerCheckbox,
    values.otherCheckbox,
    setFieldValue,
  ]);

  useEffect(() => {
    const anyPlaceChecked =
      values.homeCheckbox ||
      values.libraryCheckbox ||
      values.publicPlaceCheckbox ||
      values.virtualCheckbox;

    setFieldValue("place_selection", anyPlaceChecked);
  }, [
    values.homeCheckbox,
    values.libraryCheckbox,
    values.publicPlaceCheckbox,
    values.virtualCheckbox,
    setFieldValue,
  ]);

  const deviceItems = [
    { id: "phoneCheckbox", value: values.phoneCheckbox, label: "Mobilní telefon" },
    { id: "pcCheckbox", value: values.pcCheckbox, label: "Počítač" },
    { id: "printerCheckbox", value: values.printerCheckbox, label: "Tiskárna" },
    { id: "otherCheckbox", value: values.otherCheckbox, label: "Jiné zařízení" },
  ];

  const placeItems = [
    { id: "libraryCheckbox", value: values.libraryCheckbox, label: "V knihovně" },
    {
      id: "publicPlaceCheckbox",
      value: values.publicPlaceCheckbox,
      label: "Na veřejném místě",
    },
    { id: "virtualCheckbox", value: values.virtualCheckbox, label: "Na dálku" },
    { id: "homeCheckbox", value: values.homeCheckbox, label: "U mě doma" },
  ];

  return (
    <>
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Kontrola údajů
      </Typography>
      <Typography
        variant="h2"
        align="left"
        color="#3e3e3e"
        sx={{ pt: 3, pb: 3, fontWeight: "bold" }}
      >
        Nyní prosím zkontrolujte správnost vyplněných údajů (případně zde přímo upravte) a dole
        klikněte na tlačítko „Odeslat požadavek“.
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
                      pb: { xs: 0, sm: 2 },
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
                          value={values.year.toString()}
                          onChange={(e) => {
                            setFieldValue("year", e.target.value);
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
                      pb: { xs: 0, sm: 2 },
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
                          onToggle={() => setFieldValue(item.id, !item.value)}
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
                      pb: { xs: 0, sm: 2 },
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
                      value={values.requirmentName}
                      onChange={(e) => {
                        setFieldValue("requirmentName", e.target.value);
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
                      pb: { xs: 0, sm: 2 },
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
                      value={values.description}
                      onChange={(e) => {
                        setFieldValue("description", e.target.value);
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
                      pb: { xs: 0, sm: 2 },
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
                          onToggle={() => setFieldValue(item.id, !item.value)}
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
                      pb: { xs: 0, sm: 2 },
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
                          value={values.name}
                          onChange={(e) => {
                            setFieldValue("name", e.target.value);
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
                          value={values.surname}
                          onChange={(e) => {
                            setFieldValue("surname", e.target.value);
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
                      pb: { xs: 0, sm: 2 },
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
                        <PSCAutosuggest defaultValue={values.zipCode} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4}>
                        <CityAutosuggest defaultValue={values.city} errors={errors} />
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
                      pb: { xs: 0, sm: 2 },
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
                          value={values.phoneNumber}
                          inputProps={{
                            maxLength: 11,
                          }}
                          onChange={(e) => {
                            setFieldValue("phoneNumber", e.target.value);
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
                      pb: { xs: 0, sm: 2 },
                    }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    Kontaktní e-mail
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
                          value={values.email}
                          onChange={(e) => {
                            setFieldValue("email", e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
      </Box>

      <Typography sx={{ fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
        {" "}
        Kliknutím na „Odeslat požadavek“ souhlasíte se&nbsp;
        <Link
          sx={{ mt: 8, fontWeight: "bold" }}
          color="#3e3e3e"
          href="https://moudrasit.cz/gdpr-zasady-ochrany-osobnich-udaju/"
          rel="noopener"
          target="_blank"
          fontSize={24}
          variant="h2"
        >
          Zpracováním osobních údajů.
        </Link>
      </Typography>
      {/* Show error when occures */}
      {Object.values(errors)[0] != null ? (
        <Typography variant="h2" align="left" color="error" sx={{ pt: 8, fontStyle: "italic" }}>
          {Object.values(errors)[0].toString()}
        </Typography>
      ) : (
        <Box
          sx={{
            bgcolor: "#f5f3ee",
            pt: 4,
            textAlign: "left",
            opacity: Object.keys(errors).length === 0 ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              mr: 1,
              bgcolor: "#D3215D !important",
              color: "white",
              letterSpacing: 0.5,
              fontSize: 20,
            }}
          >
            Odeslat požadavek
          </Button>
        </Box>
      )}
    </>
  );
};
