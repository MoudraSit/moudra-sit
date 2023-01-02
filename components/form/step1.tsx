import { Box, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import BasicForm from "./hook";

function Step1Form() {
  const currentYear: number = new Date().getFullYear();
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const basicForm = BasicForm();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "45px" }}
          variant="h2"
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
          <DatePicker
            views={["year"]}
            label="Rok narození"
            value={value}
            maxDate={dayjs(currentYear.toString())}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  basicForm.touched.year && basicForm.errors.year ? true : false
                }
                helperText={
                  basicForm.errors.year && basicForm.touched.year
                    ? basicForm.errors.year
                    : "Napište rok Vašeho narození"
                }
                variant="outlined"
                color="secondary"
                id="year"
                type="year"
                onChange={basicForm.handleChange}
                onBlur={basicForm.handleBlur}
                value={basicForm.values.year}
                required
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
}

export default Step1Form;
