import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "components/theme/theme";
import Image from "next/image";

import logo from "public/images/logo/logo.svg";

function Profile() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        sx={{
          bgcolor: "#F5F3EE",
          p: 6,
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm={12} md={8}>
            <Box
              sx={{
                bgcolor: "#ffffff",
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
                Přehled dotazů
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow
                      key={"1"}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        component="th"
                        scope="row"
                      >
                        Problém s tiskárnou
                      </TableCell>

                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        align="left"
                      >
                        Nový
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        align="left"
                      >
                        2.4.2023
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            mt: 1,
                            mr: 1,
                            bgcolor: "#D3215D",
                            color: "white",
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={"2"}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        component="th"
                        scope="row"
                      >
                        Nefunguje mi wifi u počítače
                      </TableCell>

                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        align="left"
                      >
                        Nový
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        align="left"
                      >
                        12.4.2023
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            mt: 1,
                            mr: 1,
                            bgcolor: "#D3215D",
                            color: "white",
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={"3"}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        component="th"
                        scope="row"
                      >
                        Zaseknutá obrazovka na PC
                      </TableCell>

                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        align="left"
                      >
                        Nový
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          fontSize: "18px",
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                        align="left"
                      >
                        14.4.2023
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            mt: 1,
                            mr: 1,
                            bgcolor: "#D3215D",
                            color: "white",
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={"3"}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        style={{ borderBottom: "none" }}
                        sx={{
                          display: { xs: "flex", sm: "table-cell" },
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            mt: 1,
                            mr: 1,
                            bgcolor: "#D3215D",
                            color: "white",
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                bgcolor: "#ffffff",
                mt: 5,
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
                Meeting
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={4}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src={logo} alt={""} height="30" />
              <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 3 }}>
                Toto je skrytý obsah, který vidí pouze přihlášení uživatelé
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
