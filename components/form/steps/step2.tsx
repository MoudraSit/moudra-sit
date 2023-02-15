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

function Step2Form(props: any) {
  const [checkedPhone, setCheckedPhone] = React.useState(false);
  const [checkedPc, setCheckedPc] = React.useState(false);
  const [checkedPrinter, setCheckedPrinter] = React.useState(false);
  const [checkedOther, setCheckedOther] = React.useState(false);

  useEffect(() => {
    console.log(checkedPhone);
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
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        align="center"
        color="primary.contrastText"
        gutterBottom
      >
        Vyberte s čím potřebujete pomoct
      </Typography>
      <Typography
        sx={{ pb: 6 }}
        variant="h5"
        align="center"
        color="primary.contrastText"
        paragraph
      >
        V případě potřeby klikněte na více možností
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
              backgroundColor: checkedPhone ? "#babbc2" : "white",
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
                    src={Phone}
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
              //onChange={handleChangePhone}
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
              backgroundColor: checkedPc ? "#babbc2" : "white",
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
                    src={Pc}
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
              //onChange={handleChangePc}
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
              backgroundColor: checkedPrinter ? "#babbc2" : "white",
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
                    src={Printer}
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
              //onChange={handleChangePrinter}
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
              backgroundColor: checkedOther ? "#babbc2" : "white",
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
                    src={Other}
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
              //nChange={handleChangeOther}
              color="secondary"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Step2Form;
