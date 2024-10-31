import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import CheckboxForm from "./checkbox-form";

type CardItemProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export const CardItem: React.FC<CardItemProps> = ({ id, name, label, checked, onToggle }) => {
  const backgroundColor = checked ? "#D3215D" : "white";
  const textColor = checked ? "white" : "black";

  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: 1,
          backgroundColor: `${backgroundColor} !important`,
        }}
      >
        <Button
          sx={{
            marginTop: "auto",
            p: 0,
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
            backgroundColor: `${backgroundColor} !important`,
            letterSpacing: 0.5,
          }}
          variant="contained"
          onClick={onToggle}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" align="center" sx={{ color: textColor }}>
              {label}
            </Typography>
          </CardContent>
        </Button>
        <CheckboxForm
          id={id}
          name={name}
          sx={{ display: "none" }}
          checked={checked}
          color="secondary"
        />
      </Card>
    </Grid>
  );
};
