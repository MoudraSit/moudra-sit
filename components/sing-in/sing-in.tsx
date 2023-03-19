import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import { Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldForm from "components/form/model/input-form";
import Image from "next/image";

import logo from "public/images/logo/logo.svg";
import singin from "public/images/sing-in/singin.jpg";

function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={logo} alt={""} height="30" />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                color="info"
                label="Emailová adresa"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                  style: {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "black",
                    fontSize: 20,
                  },
                }}
                InputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
              />
              {/* <TextFieldForm
                id="year"
                label="Rok narození"
                name="year"
                type="tel"
                color="info"
                variant="outlined"
                inputhelper="Napište rok Vašeho narození"
                inputProps={{
                  maxLength: 4,
                  style: {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "black",
                    fontSize: 20,
                  },
                }}
                InputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                sx={{ maxWidth: 230 }}
                required
              /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Heslo"
                id="password"
                color="info"
                autoComplete="current-password"
                inputProps={{
                  style: {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "black",
                    fontSize: 20,
                  },
                }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  style: { fontSize: 20 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 3,
                  bgcolor: "#e25b5b !important",
                  color: "white",
                }}
              >
                Přihlásit se
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="#000000">
                    Zapomněli jste heslo?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" color="#000000">
                    {"Nemáte účet? Zaregistrujte se zde"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
