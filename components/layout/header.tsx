import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import ContactLine from "./contact-line";
import Link from "next/link";

import logo from "public/images/logo/logo.svg";
import Image from "next/image";
import InformationLine from "./information-line";
import { useSession, signOut } from "next-auth/react";

function ResponsiveAppBar() {
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const { status, data } = useSession();

  //console.log(status);
  //console.log(data);

  function logoutHandler() {
    signOut();
  }

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="https://moudrasit.cz/">
            <Image src={logo} alt={""} height="30" />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "none", lg: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Box>
          <Stack direction="row" spacing={2}>
            {/* {status === "unauthenticated" && (
              <Link href="/register">
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
                >
                  REGISTROVAT SE
                </Button>
              </Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/sing-in">
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
                >
                  PŘIHLÁSIT SE
                </Button>
              </Link>
            )}
            {status === "authenticated" && (
              <Link href="/profile">
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
                >
                  PROFIL
                </Button>
              </Link>
            )}
            {status === "authenticated" && (
              <Button
                variant="outlined"
                onClick={logoutHandler}
                color="secondary"
                sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
              >
                ODHLÁSIT SE
              </Button>
            )} */}
          </Stack>
          {/*<Box
            justifyContent="flex-end"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex", lg: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className="navbar-menu"
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
      <InformationLine />
    </AppBar>
  );
}
export default ResponsiveAppBar;
