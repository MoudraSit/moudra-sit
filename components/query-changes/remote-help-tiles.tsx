import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
} from "@mui/material";
import { FormInputProps } from "components/app-forms/inputs/FormInputProps";
import { RemoteHelpTypes } from "helper/consts";
import { Controller } from "react-hook-form";

const REMOTE_HELP_OPTIONS = [
  {
    id: RemoteHelpTypes.GOOGLE_MEET,
    label: "Google Meet",
    imagePath: "/images/app/google_meet.png",
  },
  {
    id: RemoteHelpTypes.QUICK_ASSIST,
    label: "Rychlý pomocník",
    imagePath: "/images/app/quick_assist.png",
  },
  {
    id: RemoteHelpTypes.WHATSAPP,
    label: "WhatsApp",
    imagePath: "/images/app/whatsapp.png",
  },
];

function RemoteHelpTiles({ name, control }: FormInputProps) {
  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">{label}</FormLabel> */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value: selectedValue } }) => (
          <Grid container spacing={2}>
            {REMOTE_HELP_OPTIONS.map(({ id, label, imagePath }) => (
              <Grid key={id} item xs={4}>
                <FormControlLabel
                  value={id}
                  label=""
                  control={
                    <Card
                      data-active={selectedValue === id ? "" : undefined}
                      onClick={() => onChange(id)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "1rem !important",
                        "&[data-active]": {
                          backgroundColor: "action.selected",
                          "&:hover": {
                            backgroundColor: "action.selectedHover",
                          },
                        },
                      }}
                    >
                      <CardMedia
                        sx={{ height: "64px", width: "64px" }}
                        image={imagePath}
                      />
                      <CardContent>{label}</CardContent>
                    </Card>
                  }
                />
              </Grid>
            ))}
          </Grid>
        )}
      />
    </FormControl>
  );
}

export default RemoteHelpTiles;
