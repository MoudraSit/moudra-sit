import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

import Phone from "public/images/form/phone.svg";
import Pc from "public/images/form/pc.svg";
import Printer from "public/images/form/printer.svg";
import Other from "public/images/form/other.svg";
import CheckboxForm from "../model/checkbox-form";

import PhoneDef from "public/images/form/phone-black.svg";
import PcDef from "public/images/form/pc-black.svg";
import PrinterDef from "public/images/form/printer-black.svg";
import OtherDef from "public/images/form/other-black.svg";

function Step2Form(props: any) {
  const [checkedPhone, setCheckedPhone] = React.useState(false);
  const [checkedPc, setCheckedPc] = React.useState(false);
  const [checkedPrinter, setCheckedPrinter] = React.useState(false);
  const [checkedOther, setCheckedOther] = React.useState(false);

  useEffect(() => {
    //console.log(checkedPhone);
    checkboxValidation();
  }, [checkedPhone, checkedPc, checkedPrinter, checkedOther]);

  const checkboxValidation = () => {
    if (checkedPhone || checkedPc || checkedPrinter || checkedOther) {
      props.setFieldValue("checkbox_selection", true);
      //console.log("yes");
    } else {
      props.setFieldValue("checkbox_selection", false);
      //console.log("no");
    }
  };

  return (
    <>
      <div id="section2" />
      <Typography
        sx={{ pb: 6, fontWeight: "bold" }}
        variant="h5"
        align="left"
        color="#3e3e3e"
        paragraph
      >
        S čím potřebujete pomoci? Můžete vybrat více možností.
      </Typography>
      <Grid container alignItems="stretch" spacing={1.5}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: 2,
              backgroundColor: checkedPhone ? "#e25b5b" : "white",
            }}
          >
            <ButtonBase
              sx={{ marginTop: "auto" }}
              onClick={() => {
                setCheckedPhone(!checkedPhone);
                props.setFieldValue("phoneCheckbox", !checkedPhone);
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                  sx={{ color: checkedPhone ? "white" : "black" }}
                >
                  Mobilní telefon
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    pt: 2,
                  }}
                >
                  <Image
                    src={checkedPhone ? Phone : PhoneDef}
                    alt={""}
                    max-width="100px"
                    max-height="100px"
                  />
                </Box>
              </CardContent>
            </ButtonBase>
            <CheckboxForm
              id="phoneCheckbox"
              name="phoneCheckbox"
              sx={{
                display: "none",
              }}
              checked={checkedPhone}
              color="secondary"
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: 2,
              backgroundColor: checkedPc ? "#e25b5b" : "white",
            }}
          >
            <ButtonBase
              sx={{ marginTop: "auto" }}
              onClick={() => {
                setCheckedPc(!checkedPc);
                props.setFieldValue("pcCheckbox", !checkedPc);
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                  sx={{ color: checkedPc ? "white" : "black" }}
                >
                  Počítač
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    pt: 2,
                  }}
                >
                  <Image
                    src={checkedPc ? Pc : PcDef}
                    alt={""}
                    max-width="100px"
                    max-height="100px"
                  />
                </Box>
              </CardContent>
            </ButtonBase>
            <CheckboxForm
              id="pcCheckbox"
              name="pcCheckbox"
              sx={{
                display: "none",
              }}
              checked={checkedPc}
              color="secondary"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: 2,
              backgroundColor: checkedPrinter ? "#e25b5b" : "white",
            }}
          >
            <ButtonBase
              sx={{ marginTop: "auto" }}
              onClick={() => {
                setCheckedPrinter(!checkedPrinter);
                props.setFieldValue("printerCheckbox", !checkedPrinter);
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                  sx={{ color: checkedPrinter ? "white" : "black" }}
                >
                  Tiskárna
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    pt: 2,
                  }}
                >
                  <Image
                    src={checkedPrinter ? Printer : PrinterDef}
                    alt={""}
                    max-width="100px"
                    max-height="100px"
                  />
                </Box>
              </CardContent>
            </ButtonBase>
            <CheckboxForm
              id="printerCheckbox"
              name="printerCheckbox"
              sx={{
                display: "none",
              }}
              checked={checkedPrinter}
              color="secondary"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: 2,
              backgroundColor: checkedOther ? "#e25b5b" : "white",
            }}
          >
            <ButtonBase
              sx={{ marginTop: "auto" }}
              onClick={() => {
                setCheckedOther(!checkedOther);
                props.setFieldValue("otherCheckbox", !checkedOther);
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                  sx={{ color: checkedOther ? "white" : "black" }}
                >
                  Jiné IT zařízení
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    pt: 2,
                  }}
                >
                  <Image
                    src={checkedOther ? Other : OtherDef}
                    alt={""}
                    max-width="100px"
                    max-height="100px"
                  />
                </Box>
              </CardContent>
            </ButtonBase>
            <CheckboxForm
              id="otherCheckbox"
              name="otherCheckbox"
              sx={{
                display: "none",
              }}
              checked={checkedOther}
              color="secondary"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Step2Form;
