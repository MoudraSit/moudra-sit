import { Box, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import BasicForm from "../hook";
import TextFieldForm from "../model/inputForm";

function Step1Form() {
  const currentYear: number = new Date().getFullYear();
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const basicForm = BasicForm();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="h4"
          align="center"
          color="primary.contrastText"
          gutterBottom
        >
          Službu poskytujeme seniorům 60+ let zdarma
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="primary.contrastText"
          paragraph
        >
          Pro zadání dotazu prosím vyplňte Váš ročník narození
        </Typography>
        <Box
          sx={{
            bgcolor: "primary.main",
            pt: 4,
            textAlign: "center",
          }}
        >
          <TextFieldForm
            id="year"
            label="Rok narození"
            name="year"
            color="secondary"
            variant="outlined"
            inputhelper="Napište rok Vašeho narození"
            required
          />
        </Box>
      </LocalizationProvider>
    </>
  );
}

export default Step1Form;
