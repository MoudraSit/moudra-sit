import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { IValues } from "../form-builder";
import TextFieldForm from "../model/input-form";

function Step1Form(props: { values: IValues }) {
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const handleClick = () => {
    setButtonOpacity(1);
  };

  return (
    <>
      <div id="section1" />
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Rok narození
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
        }}
      ></Box>
      <Typography variant="h2" align="left" color="#3e3e3e" fontWeight="bold">
        Službu poskytujeme zdarma seniorům starším 60 let, proto potřebujeme ověřit Váš věk.
      </Typography>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
        }}
      >
        <div onClick={handleClick}>
          <TextFieldForm
            id="year"
            label="Rok narození"
            name="year"
            type="tel"
            color="info"
            variant="outlined"
            inputhelper="Napište rok Vašeho narození"
            inputProps={{
              maxLength: 4,
            }}
            sx={{ maxWidth: 230 }}
            required
          />
        </div>
      </Box>

      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 8,
          textAlign: "left",
          opacity: props.values.year === "" ? buttonOpacity : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            mr: 1,
            bgcolor: "#D3215D !important",
            color: "white",
          }}
        >
          Pokračovat
        </Button>
      </Box>
    </>
  );
}

export default Step1Form;
