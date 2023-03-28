import { createTheme } from "@mui/material/styles";

export let appTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      light: "#5884b9",
      main: "#028790",
      contrastText: "#ffffff",
    },
    warning: { main: "#D20000" },
    info: { main: "#000000" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Roboto",
  },
});

appTheme = createTheme(appTheme, {
  typography: {
    h2: {
      fontSize: "45px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "35px",
      },
    },
    h4: {
      fontSize: "32px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "26px",
      },
    },
    h5: {
      fontSize: "24px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
    h6: {
      fontSize: "20px",
      [appTheme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
    },
  },
});
