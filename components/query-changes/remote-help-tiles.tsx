import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { FormInputProps } from "components/app-forms/inputs/FormInputProps";
import { RemoteHelpTypeLabels, RemoteHelpTypes } from "helper/consts";
import { Controller } from "react-hook-form";
import { THEME_COLORS } from "components/theme/colors";

const REMOTE_HELP_OPTIONS = [
  {
    id: RemoteHelpTypes.PHONE,
    imagePath: "/images/app/phone_icon.png",
  },
  {
    id: RemoteHelpTypes.GOOGLE_MEET,
    imagePath: "/images/app/google_meet.png",
  },
  {
    id: RemoteHelpTypes.QUICK_ASSIST,
    imagePath: "/images/app/quick_assist.png",
  },
  {
    id: RemoteHelpTypes.WHATSAPP,
    imagePath: "/images/app/whatsapp.png",
  },
];

function RemoteHelpTiles({ name, control }: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: selectedValue } }) => (
        <ImageList cols={2} gap={16} sx={{ width: "100%", padding: "0.5rem" }}>
          {REMOTE_HELP_OPTIONS.map(({ id, imagePath }) => {
            const label = RemoteHelpTypeLabels[id];
            return (
              <ImageListItem
                key={id}
                onClick={() => onChange(id)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: selectedValue === id ? `1px solid ${THEME_COLORS.primary}` : "none",
                  transition: "box-shadow 0.2s ease-in-out",
                  boxShadow: "0px 1px 4px 0px #00000040",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePath}
                  alt={label}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "64px",
                    objectFit: "contain",
                    padding: "8px",
                  }}
                />
                <ImageListItemBar
                  title={label}
                  position="below"
                  sx={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                    fontSize: "14px",
                  }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      )}
    />
  );
}

export default RemoteHelpTiles;
