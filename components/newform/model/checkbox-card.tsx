import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CheckboxForm from "./checkbox-form";

type CheckboxCardProps = {
  checked: boolean;
  imageAlt: string;
  checkedImage: string;
  uncheckedImage: string;
  label: string;
  checkboxName: string;
  onClick: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const CheckboxCard: React.FC<CheckboxCardProps> = ({
  checked,
  imageAlt,
  checkedImage,
  uncheckedImage,
  label,
  checkboxName,
  onClick,
  setFieldValue,
}) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      border: 1,
      backgroundColor: checked ? "#D3215D !important" : "white",
    }}
  >
    <Button
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 0,
        textTransform: "none",
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
        backgroundColor: checked ? "#D3215D !important" : "white",
        letterSpacing: 0.5,
        width: "100%",
      }}
      onClick={() => {
        onClick();
        setFieldValue(checkboxName, !checked);
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          gutterBottom
          variant="h3"
          align="center"
          sx={{
            color: checked ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {label}
        </Typography>
        <Box
          textAlign="center"
          sx={{
            pt: 2,
          }}
        >
          <Image
            src={checked ? checkedImage : uncheckedImage}
            alt={imageAlt}
            max-width="100px"
            max-height="100px"
          />
        </Box>
      </CardContent>
    </Button>
    <CheckboxForm
      id={checkboxName}
      name={checkboxName}
      sx={{
        display: "none",
      }}
      checked={checked}
      color="secondary"
    />
  </Card>
);
