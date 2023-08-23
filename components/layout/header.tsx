import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, ListItemIcon, Tooltip } from "@mui/material";
import Link from "next/link";

import logo from "public/images/logo/logo.svg";
import Image from "next/image";
import InformationLine from "./information-line";
import { useSession, signOut } from "next-auth/react";
import { Logout, Person } from "@mui/icons-material";

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { status, data } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <AppBar position="sticky" color="primary" sx={{ zIndex: 100 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="https://moudrasit.cz/">
            <Image src={logo} alt={"Moudrá Síť logo"} height="30" />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Box>
          {status === "authenticated" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Button
                  style={{ alignItems: "center" }}
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  variant="text"
                  color="secondary"
                  href="/profile"
                >
                  <Person style={{ marginRight: 6 }} /> {data.user?.name}
                </Button>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {data.user?.name?.charAt(0) ?? "M"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  href="/profile"
                  sx={{ display: { xs: "flex", sm: "none" } }}
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  {data.user?.name}
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Odhlásit se
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
      <InformationLine />
    </AppBar>
  );
}
export default ResponsiveAppBar;
