import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { IValues } from "components/form/vertical-stepper";
import { FormikErrors, useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { MunicipalityDto } from "../../../pages/api/address/get-cities";

type Props = {
  defaultValue: string;
  errors: FormikErrors<IValues>;
};

export default function CityAutosuggest({ defaultValue, errors }: Props) {
  const { setFieldValue } = useFormikContext();
  const [{ value: zipCode }] = useField<string>({ name: "zipCode" });

  const [city, setCity] = React.useState(defaultValue ?? "");

  const { data: municipalities, isLoading } = useQuery({
    queryKey: ["form/city-autosuggest", zipCode],
    enabled: zipCode?.length === 5,
    queryFn: () =>
      axios
        .get<MunicipalityDto[]>(`/api/address/get-cities`, {
          params: { zipCode },
        })
        .then((res) => {
          return res.data;
        }),
    retry: true,
  });

  // useEffect to update formik field values when city changes
  useEffect(() => {
    if (city) {
      const selectedMunicipality = municipalities?.find((m) => m.name === city);
      setFieldValue("city", city);
      setFieldValue("zkratka", selectedMunicipality?.zkratka);
      console.log("city", city);
      console.log("zkratka", selectedMunicipality?.zkratka);
    }
  }, [city, municipalities, setFieldValue, errors]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel
          required
          color="info"
          variant="outlined"
          id="city-select"
          error={errors != null && errors.zipCode == null && errors.city != null}
        >
          Město/obec
        </InputLabel>
        <Select
          labelId="city-select"
          id="city"
          color="info"
          variant="outlined"
          name="city"
          label="Obec/město"
          required
          value={city}
          onChange={(e) => setCity(e.target.value as string)}
          error={errors != null && errors.zipCode == null && errors.city != null}
        >
          {isLoading && <MenuItem disabled>Počkejte prosím...</MenuItem>}
          {municipalities?.map((m) => (
            <MenuItem key={m.name} value={m.name}>
              {m.name}
            </MenuItem>
          )) ?? []}
        </Select>
      </FormControl>
      {errors != null && errors.zipCode == null && errors.city != null && (
        <Typography color="error">{errors.city}</Typography>
      )}
    </>
  );
}
