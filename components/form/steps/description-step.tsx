import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ImageType } from "react-images-uploading/dist/typings";
import { IValues } from "../model/constants";
import TextFieldForm from "../model/input-form";
import UploadPicture from "../modules/upload-picture";

type Props = {
  values: IValues;
  uploadedImage: (image: ImageType) => void;
  setActiveStep: (val: number) => void;
};

export const DescriptionStep: React.FC<Props> = ({ values, uploadedImage, setActiveStep }) => {
  const handleClickBack = () => {
    setActiveStep(1);
  };

  return (
    <>
      <Typography variant="h1" align="left" color="#3e3e3e" fontWeight="bold">
        Popis požadavku
      </Typography>
      <Grid item xs={12}>
        <Typography
          sx={{ pb: 2, pt: 3, fontWeight: "bold" }}
          variant="h2"
          align="left"
          color="#3e3e3e"
        >
          Detailně vysvětlete, s čím přesně potřebujete pomoct.
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextFieldForm
            id="description"
            label="Zde se rozepište"
            name="description"
            inputhelper=""
            variant="outlined"
            color="info"
            multiline
            rows={3}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="left"
            color="#3e3e3e"
            sx={{ fontWeight: "bold", pt: 3, pb: 1 }}
          >
            Název požadavku (max. 6 slov, např. „Nefunguje wifi”)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextFieldForm
            id="requirmentName"
            label="Napište několik slov"
            name="requirmentName"
            inputhelper=""
            variant="outlined"
            color="info"
            fullWidth
            required
            inputProps={{
              maxLength: 40,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ pt: 3, fontWeight: "bold" }} variant="h2" align="left" color="#3e3e3e">
            Máte fotografii, na které je vidět, o co se jedná? (nepovinné)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UploadPicture uploadedImage={uploadedImage} />
        </Grid>
      </Grid>
      <Box
        sx={{
          bgcolor: "#f5f3ee",
          pt: 4,
          textAlign: "left",
          opacity: setOpacity(values.requirmentName, values.description),
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
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
      <Button
        style={{ textTransform: "none" }}
        variant="text"
        onClick={handleClickBack}
        color="secondary"
        sx={{
          mt: 2,
          color: "#3e3e3e",
          letterSpacing: 0.5,
          fontSize: 20,
          textDecoration: "underline",
        }}
        startIcon={<KeyboardArrowLeftIcon />}
      >
        Zpět na výběr zařízení
      </Button>
    </>
  );
};

function setOpacity(requiredName: string, description: string) {
  return requiredName.length > 1 && description.length > 1 ? 1 : 0;
}
