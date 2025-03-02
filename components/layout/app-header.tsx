"use client";

import { ListItemIcon, Stack, Tooltip, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import * as React from "react";

import GoogleBodyScript from "components/scripts/google-body";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logout, Person } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "public/images/logo/logo.png";
import InformationLine from "./information-line";
import { isUserAssistant, isUserSenior } from "helper/auth";
import {
  AssistantPagePaths,
  SeniorPagePaths,
  TOO_SMALL_HEIGHT,
} from "helper/consts";
import { useRouter } from "next/navigation";

function AppHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isVisible, setIsVisible] = React.useState(false);
  const isSmallScreen = useMediaQuery(`(max-height: ${TOO_SMALL_HEIGHT}px)`);

  const router = useRouter();

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

  function routeToProfile() {
    const route = isUserAssistant(data?.user)
      ? AssistantPagePaths.ASSISTANT_PROFILE
      : SeniorPagePaths.SENIOR_PROFILE;
    router.push(route);
  }

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 10) {
        setIsVisible(true); // Show header when hovering near the top of the screen
      } else if (event.clientY > 60) {
        setIsVisible(false); // Hide header when moving away
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Hover Zone - Invisible Area to Detect Hovering Near Top */}
      {isSmallScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "10px",
            zIndex: 1500, // Above everything
          }}
        />
      )}
      <AppBar
        position={isSmallScreen ? "absolute" : "sticky"}
        color="primary"
        sx={{
          ...(isSmallScreen && {
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: "transform 0.3s ease-in-out",
            transform: !isVisible ? "translateY(-100%)" : "translateY(0)",
            height: "48px",
            padding: "4px 0",
          }),
          ...(!isSmallScreen && {
            height: "64px",
            padding: "8px 0",
          }),
        }}
        onMouseEnter={() => isSmallScreen && setIsVisible(true)}
        onMouseLeave={() => isSmallScreen && setIsVisible(false)}
      >
        <Container maxWidth="xl">
          <GoogleBodyScript />
          <Toolbar
            disableGutters
            sx={{
              [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
                minHeight: "inherit !important",
              },
            }}
          >
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href={AssistantPagePaths.DASHBOARD}>
                <Image
                  src={logo}
                  alt={"Moudrá Síť logo"}
                  height="32"
                  style={{ marginTop: "6px" }}
                />
              </Link>

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
                      LinkComponent={Link}
                      href={
                        isUserAssistant(data.user)
                          ? AssistantPagePaths.ASSISTANT_PROFILE
                          : SeniorPagePaths.SENIOR_PROFILE
                      }
                    >
                      {data.user?.name}
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
                        <AccountCircleIcon fontSize="large" />
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
                      onClick={routeToProfile}
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
            </Stack>
          </Toolbar>
        </Container>
        {isUserSenior(data?.user) ? <InformationLine /> : null}
      </AppBar>
    </>
  );
}
export default AppHeader;
