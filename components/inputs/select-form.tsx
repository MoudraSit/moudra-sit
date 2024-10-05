"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

type Props<T> = {
  id: string;
  name: string;
  label: string;
  value: T;
  onChange: Function;
  onBlur?: Function;
  error: boolean;
  helperText?: string;
  options: Array<T>;
  [key: string]: any;
};

function SelectForm<T>({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  options,
  ...props
}: Props<T>) {
  return (
    <FormControl {...props}>
      <InputLabel id={`select-${name}`}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        labelId={`select-${name}`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
