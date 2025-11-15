import { Stack, Paper, MenuItem } from "@mui/material";

function AssistantTrainingLinks() {
  return (
    <Stack>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <h3>Proškolení Tabidoo</h3>
        <Stack spacing={1}>
          <MenuItem
            component="a"
            href="https://youtu.be/ligV7F_4a20"
            target="_blank"
          >
            Video proškolení Tabidoo I
          </MenuItem>
          <MenuItem
            component="a"
            href="https://youtu.be/-7K7uRILuXY"
            target="_blank"
          >
            Video proškolení Tabidoo mobilní aplikace II
          </MenuItem>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <h3>Vzdálená pomoc</h3>
        <Stack spacing={1}>
          <MenuItem
            component="a"
            href="https://youtu.be/-7K7uRILuXY"
            target="_blank"
          >
            Video ukázka vzdálené pomoci
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/file/d/1bBYD6mf9kWty__7po-BjsTq_kNZGwMYr/view"
            target="_blank"
          >
            Manuál vzdálené pomoci
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/drive/folders/1gunPXZ_DMiB3kfNfTRd6kVVIRbOWjLbc"
            target="_blank"
          >
            Vzdálená pomoc - moduly na dálku
          </MenuItem>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <h3>Manuály</h3>
        <Stack spacing={1}>
          <MenuItem
            component="a"
            href="https://docs.google.com/document/d/1KeTjG8_WQ7fK8_YYExXibPd2rNb1qeoB/edit"
            target="_blank"
          >
            Manuál Tabidoo I
          </MenuItem>
          <MenuItem
            component="a"
            href="https://docs.google.com/document/d/1gDxGcjNhMgL-H2S7K1m_hZkN1qSMV0p8350CL5iphEM/edit"
            target="_blank"
          >
            Manuál mobilní aplikace
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/file/d/1bBYD6mf9kWty__7po-BjsTq_kNZGwMYr/view?usp=drive_link"
            target="_blank"
          >
            Vzdálená pomoc
          </MenuItem>
          <MenuItem
            component="a"
            href="https://drive.google.com/drive/folders/1gunPXZ_DMiB3kfNfTRd6kVVIRbOWjLbc?usp=gmail"
            target="_blank"
          >
            Vzdálená pomoc - moduly na dálku
          </MenuItem>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default AssistantTrainingLinks;
