import React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";

type Props = {
  title: string;
  open: boolean;
  handleClose: Function;
  options: Array<string>;
  value: string;
};

type Option = {
  value: string;
  selected: boolean;
};

function prepareOptions(currentValue: string, options: Array<string>) {
  const currentValuesList = currentValue.split(",");
  return options.slice().map((option) => ({
    value: option,
    selected: currentValuesList.includes(option),
  }));
}

function FilterSelectPopup({ title, open, handleClose, options, value }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<Array<Option>>(
    prepareOptions(value, options)
  );

  const toggleCheckboxValue = (index: number) => {
    setSelectedOptions(
      selectedOptions.map((v, i) => {
        if (i === index) v.selected = !v.selected;
        return v;
      })
    );
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        <span>{title}</span>
        <IconButton
          size="small"
          sx={{ float: "right" }}
          onClick={() => handleClose()}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack>
          {selectedOptions.map((option, index) => (
            <FormControlLabel
              key={option.value}
              label={option.value}
              control={
                <Checkbox
                  checked={option.selected}
                  color="warning"
                  onClick={() => toggleCheckboxValue(index)}
                />
              }
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          color="info"
          variant="outlined"
          onClick={() =>
            handleClose(
              selectedOptions
                .slice()
                .filter((option) => option.selected)
                .map((option) => option.value)
                .join(",")
            )
          }
        >
          Použít
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterSelectPopup;
