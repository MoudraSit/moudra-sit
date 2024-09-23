import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const formSteps = [
  {
    label: "Rok narození",
  },
  {
    label: "Výběr zařízení",
  },
  {
    label: "Popis požadavku",
  },
  {
    label: "Místo setkání",
  },
  {
    label: "Kontaktní údaje",
  },
  {
    label: "Shrnutí",
  },
];

export interface IValues {
  requirmentName: string;
  phoneCheckbox: boolean;
  pcCheckbox: boolean;
  printerCheckbox: boolean;
  otherCheckbox: boolean;
  checkbox_selection: boolean;
  year: string;
  description: string;
  name: string;
  surname: string;
  zipCode: string;
  plusCode: string;
  phoneNumber: string;
  email: string;
  image: string;
  city: string;
  libraryCheckbox: boolean;
  homeCheckbox: boolean;
  publicPlaceCheckbox: boolean;
  virtualCheckbox: boolean;
  place_selection: boolean;
}

export const initialValues = {
  requirmentName: "",
  phoneCheckbox: false,
  pcCheckbox: false,
  printerCheckbox: false,
  otherCheckbox: false,
  checkbox_selection: false,
  year: "",
  description: "",
  name: "",
  surname: "",
  plusCode: "+420",
  zipCode: "",
  phoneNumber: "",
  email: "",
  image: "",
  city: "",
  libraryCheckbox: false,
  homeCheckbox: false,
  publicPlaceCheckbox: false,
  virtualCheckbox: false,
  place_selection: false,
};

export const FormContainer = styled(Container)`
  .MuiInputBase-root {
    background-color: white;
  }

  //autocomplete overrides
  .MuiInputBase-input {
    -webkit-text-fill-color: black;
    box-shadow: 0 0 0 1000px white inset;
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
`;
