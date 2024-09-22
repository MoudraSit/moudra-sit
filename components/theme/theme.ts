"use client";

import { createTheme } from "@mui/material/styles";

export let appTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      light: "#5884b9",
      main: "#037f87",
      contrastText: "#ffffff",
    },
    warning: { main: "#D3215D" },
    info: { main: "#000000" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Roboto Condensed",
    allVariants: {
      color: "#3E3E3E",
    },
    fontWeightBold: 700,
    fontWeightMedium: 700,
  },
});

appTheme = createTheme(appTheme, {
  typography: {
    h1: {
      fontSize: "35px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "25px",
      },
    },
    h2: {
      fontSize: "24px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
    h3: {
      fontSize: "20px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    h4: {
      fontSize: "18px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
    },
    h5: {
      fontSize: "16px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
    h6: {
      fontSize: "14px",
    },
  },
});

export const colors = {
  primaryMain: appTheme.palette.primary.main,
  primaryContrastText: appTheme.palette.primary.contrastText,
  secondaryMain: appTheme.palette.secondary.main,
  secondaryLight: appTheme.palette.secondary.light,
  secondaryContrastText: appTheme.palette.secondary.contrastText,
  warningMain: appTheme.palette.warning.main,
  infoMain: appTheme.palette.info.main
};

// TODO: might be necessary because white primary color requires a lot of manual overrides
export const mobileAppTheme = createTheme(appTheme, {
  palette: {
    primary: {
      main: "#D3215D",
    },
  },
});
