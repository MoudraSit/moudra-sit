import { Autocomplete } from "@mui/material";
import axios from "axios";
import { useField, useFormikContext } from "formik";
import { useQuery } from "react-query";
import { MunicipalityDto } from "../../../pages/api/address/get-cities";
import TextFieldForm from "../model/input-form";

type Props = {
  defaultValue: string;
};

export default function CityAutosuggest({ defaultValue }: Props) {
  const { setFieldValue } = useFormikContext();
  const [{ value: zipCode }] = useField<string>({ name: "zipCode" });

  const { data: municipalities, isLoading } = useQuery({
    queryKey: ["form/city-autosuggest", zipCode],
    enabled: zipCode?.length === 5,
    queryFn: () =>
      axios
        .get<MunicipalityDto[]>(`/api/address/get-cities`, {
          params: { zipCode },
        })
        .then((res) => res.data),
    retry: false,
  });

  return (
    <Autocomplete
      id="city"
      freeSolo
      value={defaultValue || ""}
      loading={isLoading}
      options={municipalities?.map((m) => m.name) ?? []}
      onChange={(_, val) => setFieldValue("city", val ?? "")}
      renderInput={(params) => (
        <TextFieldForm
          label="Obec/město"
          name="city"
          inputhelper="Pro nalezení nejbližšího dobrovolníka"
          variant="outlined"
          color="info"
          required
          {...params}
          fullWidth
        />
      )}
    />
  );
}
