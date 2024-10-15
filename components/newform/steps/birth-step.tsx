import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Typography } from "@mui/material";
import { IValues } from "../model/constants";
import TextFieldForm from "../model/input-form";

type Props = {
  values: IValues;
};

export const BirthStep: React.FC<Props> = ({ values }) => {
  return (
    <>
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Rok narození
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 3,
          textAlign: "left",
        }}
      ></Box>
      <Typography variant="h2" align="left" color="#3e3e3e" fontWeight="bold">
        Službu poskytujeme zdarma seniorům starším 60 let, proto potřebujeme ověřit Váš věk.
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 2,
          textAlign: "left",
        }}
      >
        <TextFieldForm
          id="year"
          label="Rok narození"
          name="year"
          type="tel"
          color="info"
          variant="outlined"
          inputhelper="Kliknutím do pole vepište rok narození."
          inputProps={{
            maxLength: 4,
          }}
          sx={{ maxWidth: 250 }}
          required
        />
      </Box>
      <Typography
        sx={{ fontWeight: "bold", pb: 3, pt: 3 }}
        variant="h3"
        align="left"
        color="#3e3e3e"
      >
        Políčka označená * jsou povinná.
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 1,
          textAlign: "left",
          opacity: setOpacity(values.year),
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            mr: 1,
            letterSpacing: 0.5,
            bgcolor: "#D3215D !important",
            color: "white",
            fontSize: 20,
          }}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Pokračovat
        </Button>
      </Box>
    </>
  );
};

function setOpacity(year: string) {
  return year.length < 4 ? 0 : 1;
}
