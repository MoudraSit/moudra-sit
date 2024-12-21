import React, { useEffect } from "react";
import { Box, Button, InputAdornment, Menu, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: Function;
  handleSave: Function;
  value: string;
};

function FilterSearchMenu({
  anchorEl,
  open,
  handleClose,
  handleSave,
  value,
}: Props) {
  const [currentValue, setCurrentValue] = React.useState(value);

  useEffect(() => {
    if (open) setCurrentValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Menu
      sx={{ marginTop: "2px" }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
    >
      <Box sx={{ padding: "0 0.5rem" }}>
        <TextField
          fullWidth
          color="info"
          sx={{
            marginBottom: "0.5rem",
            "& .MuiInputBase-root": {
              fontSize: "16px !important",
              padding: 0,
              paddingLeft: "0.5rem",
            },
            "& .MuiInputBase-input": {
              padding: "8.5px 14px",
              paddingLeft: "0rem",
            },
          }}
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
        <Button
          variant="contained"
          fullWidth
          color="warning"
          onClick={() => {
            handleSave(currentValue);
            handleClose();
          }}
        >
          Použít
        </Button>
      </Box>
    </Menu>
  );
}

export default FilterSearchMenu;
