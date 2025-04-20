"use client";

import { createTheme } from "@mui/material/styles";
import { THEME_COLORS } from "./colors";

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
    warning: { main: THEME_COLORS.primary },
    info: { main: "#000000" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Roboto",
    allVariants: {
      color: "#000000",
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

export const mobileAppTheme = createTheme(appTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "none", // 👈 This removes the all-caps styling
        },
      },
    },
  },
});

// Default theme color is white, the input then does not display everything properly
export const mobileAppTabsTheme = createTheme(appTheme, {
  palette: {
    primary: {
      main: THEME_COLORS.primary,
    },
  },
});
