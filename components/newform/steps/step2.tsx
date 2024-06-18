import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

import Other from "public/images/form/other.svg";
import Pc from "public/images/form/pc.svg";
import Phone from "public/images/form/phone.svg";
import Printer from "public/images/form/printer.svg";
import CheckboxForm from "../model/checkbox-form";

import OtherDef from "public/images/form/other-black.svg";
import PcDef from "public/images/form/pc-black.svg";
import PhoneDef from "public/images/form/phone-black.svg";
import PrinterDef from "public/images/form/printer-black.svg";

function Step2Form(props: any) {
  const [checkedPhone, setCheckedPhone] = React.useState(false);
  const [checkedPc, setCheckedPc] = React.useState(false);
  const [checkedPrinter, setCheckedPrinter] = React.useState(false);
  const [checkedOther, setCheckedOther] = React.useState(false);
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const handleClick = () => {
    setButtonOpacity(1);
  };

  const handleClickBack = () => {
    props.setActiveStep(0);
  };

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
      {/* create back button */}
      <div style={{ display: "flex", paddingRight: 4 }}>
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
          Výběr zařízení
        </Typography>
      </div>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
        }}
      ></Box>
      <Typography sx={{ pb: 6, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
        S čím potřebujete pomoci? Můžete vybrat více možností.
      </Typography>
      <div onClick={handleClick}>
        <Grid container alignItems="stretch" spacing={1.5}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: 2,
                backgroundColor: checkedPhone ? "#D3215D !important" : "white",
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
                  backgroundColor: checkedPhone ? "#D3215D !important" : "white",
                }}
                variant="contained"
                onClick={() => {
                  setCheckedPhone(!checkedPhone);
                  props.setFieldValue("phoneCheckbox", !checkedPhone);
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    align="center"
                    sx={{
                      color: checkedPhone ? "white" : "black",
                      fontWeight: "bold",
                    }}
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
              </Button>
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
                backgroundColor: checkedPc ? "#D3215D !important" : "white",
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
                  backgroundColor: checkedPc ? "#D3215D !important" : "white",
                }}
                variant="contained"
                onClick={() => {
                  setCheckedPc(!checkedPc);
                  props.setFieldValue("pcCheckbox", !checkedPc);
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    align="center"
                    sx={{
                      color: checkedPc ? "white" : "black",
                      fontWeight: "bold",
                    }}
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
              </Button>
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
                backgroundColor: checkedPrinter ? "#D3215D !important" : "white",
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
                  backgroundColor: checkedPrinter ? "#D3215D !important" : "white",
                }}
                variant="contained"
                onClick={() => {
                  setCheckedPrinter(!checkedPrinter);
                  props.setFieldValue("printerCheckbox", !checkedPrinter);
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    align="center"
                    sx={{
                      color: checkedPrinter ? "white" : "black",
                      fontWeight: "bold",
                    }}
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
              </Button>
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
                backgroundColor: checkedOther ? "#D3215D !important" : "white",
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
                  backgroundColor: checkedOther ? "#D3215D !important" : "white",
                }}
                variant="contained"
                onClick={() => {
                  setCheckedOther(!checkedOther);
                  props.setFieldValue("otherCheckbox", !checkedOther);
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    align="center"
                    sx={{
                      color: checkedOther ? "white" : "black",
                      fontWeight: "bold",
                    }}
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
              </Button>
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
      </div>
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
          Pokračovat
        </Button>
      </Box>
    </>
  );
}

export default Step2Form;
