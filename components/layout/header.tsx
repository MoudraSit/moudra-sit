import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";

const pages = [
  "Jsem Senior 60+",
  "Chci Pomáhat",
  "O Moudré Síti",
  "Partneři",
  "Kontakty",
  "Gdpr",
];

function ResponsiveAppBar() {
  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 50,
              p: 1,
            }}
            src="../../images/logo/logo.png"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            fontWeight="fontWeightMedium"
            sx={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Moudrá Síť
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 3, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="warning"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              REGISTROVAT SE
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              PŘIHLÁSIT SE
            </Button>
            <IconButton sx={{ p: 0, display: { xs: "none", md: "flex" } }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Stack>
          <Box
            justifyContent="flex-end"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className="navbar-menu"
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              open={false}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
