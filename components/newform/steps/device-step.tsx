import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { FormikErrors } from "formik/dist/types";
import OtherDef from "public/images/form/device-checkboxes/other-black.svg";
import Other from "public/images/form/device-checkboxes/other.svg";
import PcDef from "public/images/form/device-checkboxes/pc-black.svg";
import Pc from "public/images/form/device-checkboxes/pc.svg";
import PhoneDef from "public/images/form/device-checkboxes/phone-black.svg";
import Phone from "public/images/form/device-checkboxes/phone.svg";
import PrinterDef from "public/images/form/device-checkboxes/printer-black.svg";
import Printer from "public/images/form/device-checkboxes/printer.svg";
import { CheckboxCard } from "../model/checkbox-card";
import { IValues } from "../model/constants";

type Props = {
  values: IValues;
  errors: FormikErrors<IValues>;
  setActiveStep: (val: number) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
};

export const DeviceStep: React.FC<Props> = ({ values, errors, setActiveStep, setFieldValue }) => {
  const [checkedPhone, setCheckedPhone] = React.useState(values.phoneCheckbox);
  const [checkedPc, setCheckedPc] = React.useState(values.pcCheckbox);
  const [checkedPrinter, setCheckedPrinter] = React.useState(values.printerCheckbox);
  const [checkedOther, setCheckedOther] = React.useState(values.otherCheckbox);
  const anyButtonChecked = checkedPhone || checkedPc || checkedPrinter || checkedOther;

  useEffect(() => {
    setFieldValue("checkbox_selection", anyButtonChecked);
  }, [checkedPhone, checkedPc, checkedPrinter, checkedOther, anyButtonChecked, setFieldValue]);

  const handleClickBack = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
          Výběr zařízení
        </Typography>
      </Stack>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 3,
          textAlign: "left",
        }}
      />
      <Typography sx={{ pb: 2, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
        S čím potřebujete pomoci? Můžete vybrat více možností.
      </Typography>

      <Grid container alignItems="stretch" spacing={1.5}>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={checkedPhone}
            imageAlt="Mobilní telefon"
            checkedImage={Phone}
            uncheckedImage={PhoneDef}
            label="Mobilní telefon"
            checkboxName="phoneCheckbox"
            onClick={() => setCheckedPhone(!checkedPhone)}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={checkedPc}
            imageAlt="Počítač"
            checkedImage={Pc}
            uncheckedImage={PcDef}
            label="Počítač"
            checkboxName="pcCheckbox"
            onClick={() => setCheckedPc(!checkedPc)}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={checkedPrinter}
            imageAlt="Tiskárna"
            checkedImage={Printer}
            uncheckedImage={PrinterDef}
            label="Tiskárna"
            checkboxName="printerCheckbox"
            onClick={() => setCheckedPrinter(!checkedPrinter)}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={checkedOther}
            imageAlt="Jiné zařízení"
            checkedImage={Other}
            uncheckedImage={OtherDef}
            label="Jiné zařízení"
            checkboxName="otherCheckbox"
            onClick={() => setCheckedOther(!checkedOther)}
            setFieldValue={setFieldValue}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 3,

          textAlign: "left",
          opacity: anyButtonChecked ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            mr: 1,
            letterSpacing: 0.5,
            bgcolor: "#D3215D !important",
            color: "white",
            fontSize: 20,
          }}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Pokračovat
        </Button>
      </Box>
      <Button
        style={{ textTransform: "none" }}
        variant="text"
        onClick={handleClickBack}
        color="secondary"
        sx={{
          mt: 2,
          color: "#3e3e3e",
          letterSpacing: 0.5,
          fontSize: 20,
          textDecoration: "underline",
        }}
        startIcon={<KeyboardArrowLeftIcon />}
      >
        Zpět na rok narození
      </Button>
    </>
  );
};
