import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import Home from "public/images/form/meeting-places-checkboxes/home.svg";
import Library from "public/images/form/meeting-places-checkboxes/library.svg";
import PublicPlace from "public/images/form/meeting-places-checkboxes/public-place.svg";
import Virtual from "public/images/form/meeting-places-checkboxes/virtual-black.svg";

import { FormikErrors } from "formik";
import HomeDefault from "public/images/form/meeting-places-checkboxes/home-black.svg";
import LibraryDefault from "public/images/form/meeting-places-checkboxes/library-black.svg";
import PublicPlaceDefault from "public/images/form/meeting-places-checkboxes/public-place-black.svg";
import VirtualDefault from "public/images/form/meeting-places-checkboxes/virtual-black.svg";
import { IValues } from "../helpers/constants";
import { CheckboxCard } from "../model/checkbox-card";

export default function PlaceStep(props: {
  errors: FormikErrors<IValues>;
  values: IValues;
  setActiveStep: (val: number) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) {
  const [library, setLibrary] = React.useState(props.values.libraryCheckbox);
  const [publicPlace, setPublicPlace] = React.useState(props.values.publicPlaceCheckbox);
  const [virtually, setVirtually] = React.useState(props.values.virtualCheckbox);
  const [home, setHome] = React.useState(props.values.homeCheckbox);
  const anyButtonChecked = library || publicPlace || virtually || home;

  const handleClickBack = () => {
    props.setActiveStep(3);
  };

  useEffect(() => {
    checkboxValidation();
  }, [library, publicPlace, virtually, home]);

  const checkboxValidation = () => props.setFieldValue("place_selection", anyButtonChecked);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickBack}
        color="secondary"
        sx={{
          mt: 1,
          mr: 1,
          mb: 2,
          color: "white",
          letterSpacing: 0.5,
          fontSize: 20,
        }}
        startIcon={<KeyboardArrowLeftIcon />}
      >
        Zpět
      </Button>
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Místo setkání
      </Typography>

      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
        }}
      ></Box>
      <Typography sx={{ pb: 6, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
        Jaké místo setkání byste preferovali? Můžete vybrat více možností.
      </Typography>
      <Grid container alignItems="stretch" spacing={1.5}>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={library}
            imageAlt="Knihovna"
            checkedImage={Library}
            uncheckedImage={LibraryDefault}
            label="V knihovně"
            checkboxName="libraryCheckbox"
            onClick={() => setLibrary(!library)}
            setFieldValue={props.setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={publicPlace}
            imageAlt="Ve veřejném místě"
            checkedImage={PublicPlace}
            uncheckedImage={PublicPlaceDefault}
            label="Na jiném veřejném místě"
            checkboxName="publicPlaceCheckbox"
            onClick={() => setPublicPlace(!publicPlace)}
            setFieldValue={props.setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={virtually}
            imageAlt="Virtuálně"
            checkedImage={Virtual}
            uncheckedImage={VirtualDefault}
            label="Na dálku"
            checkboxName="virtualCheckbox"
            onClick={() => setVirtually(!virtually)}
            setFieldValue={props.setFieldValue}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CheckboxCard
            checked={home}
            imageAlt="U mě doma"
            checkedImage={Home}
            uncheckedImage={HomeDefault}
            label="U mě doma"
            checkboxName="homeCheckbox"
            onClick={() => setHome(!home)}
            setFieldValue={props.setFieldValue}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
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
    </>
  );
}
