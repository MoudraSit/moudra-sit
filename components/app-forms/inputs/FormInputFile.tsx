import { Button, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useRef } from "react";

type InputFileProps = {
  control: any;
  label?: string;
  filename: string | null;
  handleSelect: Function;
  allowedTypes?: string[];
  maxSizeMb?: number;
  errors?: { [key: string]: any };
};

export function FormInputFile({
  control,
  handleSelect,
  label = "Vybrat soubor",
  filename,
  allowedTypes = ["application/pdf", "image/png", "image/jpeg"],
  maxSizeMb = 10,
  errors,
}: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name="file"
      control={control}
      defaultValue={null}
      rules={{
        validate: {
          required: (file) => !!file || "Soubor je povinný.",
          fileType: (file) => {
            console.log("hehe");
            return !file || allowedTypes.includes(file.type)
              ? true
              : `Povoleny jsou pouze ${allowedTypes
                  .map((type) => type.split("/")[1])
                  .join(", ")}.`;
          },
          fileSize: (file) =>
            !file || file.size <= maxSizeMb * 1024 * 1024
              ? true
              : `Maximální velikost je ${maxSizeMb} MB.`,
        },
      }}
      render={({ field: { onChange } }) => {

        const triggerSelect = () => {
          inputRef.current?.click();
        };

        return (
          <>
            <input
              type="file"
              ref={inputRef}
              onChange={handleSelect(onChange)}
              style={{ display: "none" }}
            />

            <Button variant="contained" onClick={triggerSelect}>
              {errors?.file ? (
                <Typography color="error" variant="body1" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
                  {errors.file?.message}
                </Typography>
              ) : filename ? (
                `📄 ${filename}`
              ) : (
                label
              )}
            </Button>
          </>
        );
      }}
    />
  );
}
