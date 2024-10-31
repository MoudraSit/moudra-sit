import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { appTheme } from "components/theme/theme";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import * as React from "react";

import { Role } from "backend/role";
import { useRouter } from "next/router";
import logo from "public/images/logo/logo.png";

function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const router = useRouter();
  const session = useSession();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.get("email"),
      password: data.get("password"),
    });

    if (!result?.error) {
      console.log(result);

      // otherwise show error to user
    } else {
      console.log(result);
      setErrorMessage(result.error);
    }
  }

  React.useEffect(() => {
    // succesfully singed in, redirect to profile
    if (session?.data?.user?.role === Role.SENIOR) {
      router.replace("/senior");
    }
    if (session?.data?.user?.role === Role.DA) {
      router.replace("/asistent");
    }
  }, [router, session]);

  return (
    <ThemeProvider theme={appTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Image
            src="/images/sign-in/welcome.jpg"
            alt="Uvodni foto - Moudra sit"
            style={{ objectFit: "cover" }}
            quality={75}
            fill
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={logo} alt={"Moudrá Síť logo"} height="35" />
            <Typography variant="h1" sx={{ mt: 3, mb: 3, fontWeight: "bold" }}>
              Přihlašování do účtu
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              {errorMessage ? (
                <>
                  <Typography
                    sx={{
                      pt: 5,
                      color: "red",
                      fontWeight: "bold",
                    }}
                    variant="h5"
                    align="center"
                    color="primary.main"
                  >
                    {errorMessage}
                  </Typography>
                </>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 3,
                  bgcolor: "#D3215D !important",
                  color: "white",
                }}
              >
                Přihlásit se
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="#000000">
                    <Typography align="left" paragraph>
                      Zapomněli jste heslo?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" color="#000000">
                    <Typography align="right" paragraph>
                      Nemáte účet? Zaregistrujte se zde
                    </Typography>
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
