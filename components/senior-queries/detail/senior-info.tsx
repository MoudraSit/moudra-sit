import { Edit } from "@mui/icons-material";
import { Grid, Typography, IconButton } from "@mui/material";
import { THEME_COLORS } from "components/theme/colors";
import { SeniorQuery } from "types/seniorQuery";
import { DEFAULT_BORDER_COLOR, ReadOnlyField } from "./helper-components";

function SeniorInfo({
  seniorQuery,
  onEdit,
}: {
  seniorQuery: SeniorQuery;
  onEdit: Function;
}) {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        width: "100%",
        border: `1px ${DEFAULT_BORDER_COLOR} solid`,
        padding: "0.5rem",
        margin: 0,
        position: "relative",
      }}
    >
      <Grid item xs={12}>
        <Typography>
          {seniorQuery.fields.iDSeniora.fields.prijmeniJmeno}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <ReadOnlyField
          label="Lokalita"
          value={seniorQuery.fields.iDSeniora.fields.mestoObecCalc}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="caption"
          sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
        >
          Telefon
        </Typography>
        <Typography
          sx={{
            overflowWrap: "break-word",
            color: THEME_COLORS.primary,
            textDecoration: "underline",
          }}
        >
          <a href={`tel:${seniorQuery.fields.iDSeniora.fields.telefon}`}>
            {seniorQuery.fields.iDSeniora.fields.telefon}
          </a>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <ReadOnlyField
          label="Rok narození"
          value={`${seniorQuery.fields.iDSeniora.fields.rokNarozeni} (${
            new Date().getFullYear() -
            seniorQuery.fields.iDSeniora.fields.rokNarozeni
          } let)`}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="caption"
          sx={{ color: "#A5A5A5", overflowWrap: "break-word" }}
        >
          E-mail
        </Typography>
        <Typography
          sx={{
            overflowWrap: "break-word",
            textDecoration: "underline",
          }}
        >
          <a href={`mailto:${seniorQuery.fields.iDSeniora.fields.email}`}>
            {seniorQuery.fields.iDSeniora.fields.email}
          </a>
        </Typography>
      </Grid>
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
        onClick={() => onEdit()}
      >
        <Edit color="warning" />
      </IconButton>
    </Grid>
  );
}

export default SeniorInfo;
