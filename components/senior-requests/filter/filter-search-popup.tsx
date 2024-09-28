import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";

type Props = {
  title: string;
  open: boolean;
  handleClose: Function;
  value: string;
};

function FilterSearchPopup({ title, open, handleClose, value }: Props) {
  const [currentValue, setCurrentValue] = React.useState(value);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={() => handleClose(currentValue)}
    >
      <DialogTitle>
        <span>{title}</span>
        <IconButton
          size="small"
          sx={{ float: "right" }}
          onClick={() => handleClose(currentValue)}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          color="info"
          variant="outlined"
          onClick={() => handleClose(currentValue)}
        >
          Použít
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterSearchPopup;
