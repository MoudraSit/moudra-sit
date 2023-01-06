import { PhoneIphone } from "@mui/icons-material";
import ComputerIcon from "@mui/icons-material/Computer";
import PrintIcon from "@mui/icons-material/Print";
import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

type Props = {
  id: string | string[] | undefined;
};

function deviceById(id: string | string[] | undefined) {
  switch (id) {
    case "1":
      return (
        <>
          <PhoneIphone sx={{ color: "white", fontSize: 60 }} />
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            align="center"
            color="secondary.contrastText"
            gutterBottom
          >
            Popište nám prosím problém s Vaším telefonem
          </Typography>
        </>
      );
    case "2":
      return (
        <>
          <ComputerIcon sx={{ color: "white", fontSize: 60 }} />
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            align="center"
            color="secondary.contrastText"
            gutterBottom
          >
            Popište nám prosím problém s Vaším počítačem
          </Typography>
        </>
      );
    case "3":
      return (
        <>
          <PrintIcon sx={{ color: "white", fontSize: 60 }} />
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            align="center"
            color="secondary.contrastText"
            gutterBottom
          >
            Popište nám prosím problém s Vaší tiskárnou
          </Typography>
        </>
      );
    case "4":
      return (
        <>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            align="center"
            color="secondary.contrastText"
            gutterBottom
          >
            Popište nám prosím problém s Vaším zařízením
          </Typography>
        </>
      );
    default:
      return <div>Not Found</div>;
  }
}

const UnderNavbar: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#2F68C4",
          pt: 2,
          pb: 2,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {deviceById(id)}
        </div>
      </Box>
    </>
  );
};

export default UnderNavbar;
