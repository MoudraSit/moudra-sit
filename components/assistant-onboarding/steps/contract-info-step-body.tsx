"use client";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useTransition, useMemo, useEffect } from "react";
import { debounce } from "@mui/material/utils";
import { fetchCityOptions, submitContractInfo } from "../actions";
import { AdminFlagsV2, City } from "types/assistant";

interface Props {
  flags: AdminFlagsV2;
  isUnder18: boolean;
  initialValues: {
    ulice: string;
    PSC: string;
    initialCity: City | null;
    jsemClenemDofE: boolean;
  };
}

function cityLabel(c: City | null) {
  if (!c) return "";
  const psc = c.fields.PSC ?? c.fields.okres ?? "";
  return `${c.fields.mestoObec} (${psc})`;
}

export default function ContractInfoStepBody({
  flags,
  isUnder18,
  initialValues,
}: Props) {
  const [ulice, setUlice] = useState(initialValues.ulice);
  const [psc, setPsc] = useState(initialValues.PSC);
  const [city, setCity] = useState<City | null>(initialValues.initialCity);
  const [cityInput, setCityInput] = useState(cityLabel(initialValues.initialCity));
  const [cityOptions, setCityOptions] = useState<City[]>(
    initialValues.initialCity ? [initialValues.initialCity] : []
  );
  const [cityLoading, setCityLoading] = useState(false);

  const [jsemClenemDofE, setJsemClenemDofE] = useState(
    initialValues.jsemClenemDofE
  );
  const [jmenoZZ, setJmenoZZ] = useState("");
  const [prijmeniZZ, setPrijmeniZZ] = useState("");
  const [telefonZZ, setTelefonZZ] = useState("");
  const [emailZZ, setEmailZZ] = useState("");

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useMemo(
    () =>
      debounce(async (q: string) => {
        if (!q.trim()) {
          setCityOptions(city ? [city] : []);
          setCityLoading(false);
          return;
        }
        try {
          const results = (await fetchCityOptions(q)) as City[];
          setCityOptions(
            city ? [city, ...results.filter((r) => r.id !== city.id)] : results
          );
        } finally {
          setCityLoading(false);
        }
      }, 400),
    [city]
  );

  useEffect(() => {
    if (flags.contractInfoProvided) return;
    setCityLoading(true);
    fetchCities(cityInput);
  }, [cityInput, fetchCities, flags.contractInfoProvided]);

  if (flags.contractInfoProvided) {
    return (
      <Alert severity="success">
        Údaje ke smlouvě jsou uložené. Koordinátor připravuje smlouvu.
      </Alert>
    );
  }

  const submit = () => {
    if (!ulice.trim() || !psc.trim() || !city?.id) {
      setError("Doplňte ulici, PSČ a město.");
      return;
    }
    if (isUnder18) {
      if (
        !jmenoZZ.trim() ||
        !prijmeniZZ.trim() ||
        !telefonZZ.trim() ||
        !emailZZ.trim()
      ) {
        setError("Vyplňte údaje zákonného zástupce.");
        return;
      }
    }
    startTransition(async () => {
      setError(null);
      const res = await submitContractInfo({
        ulice,
        PSC: psc,
        mestoId: city.id,
        isUnder18,
        jmenoZakonnyZastupce: isUnder18 ? jmenoZZ : undefined,
        prijmeniZakonnyZastupce: isUnder18 ? prijmeniZZ : undefined,
        telefonZakonnyZastupce: isUnder18 ? telefonZZ : undefined,
        emailZakonnyZastupce: isUnder18 ? emailZZ : undefined,
        jsemClenemDofE,
      });
      if (!res.ok) setError(res.message);
    });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Ulice a číslo popisné"
        value={ulice}
        onChange={(e) => setUlice(e.target.value)}
        fullWidth
        required
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="PSČ"
          value={psc}
          onChange={(e) => setPsc(e.target.value)}
          required
          sx={{ maxWidth: { sm: 160 } }}
        />
        <Autocomplete<City>
          sx={{ flex: 1 }}
          value={city}
          inputValue={cityInput}
          onChange={(_, newValue) => setCity(newValue)}
          onInputChange={(_, newInput) => setCityInput(newInput)}
          options={cityOptions}
          loading={cityLoading}
          filterOptions={(x) => x}
          getOptionLabel={cityLabel}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          noOptionsText="Začněte psát název obce"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Město / obec"
              required
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {cityLoading ? <CircularProgress size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Stack>

      <FormControlLabel
        control={
          <Checkbox
            checked={jsemClenemDofE}
            onChange={(e) => setJsemClenemDofE(e.target.checked)}
          />
        }
        label="Jsem účastníkem programu DofE"
      />

      {isUnder18 && (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Je ti méně než 18 let. Doplň prosím údaje zákonného zástupce.
          </Alert>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Jméno zákonného zástupce"
                value={jmenoZZ}
                onChange={(e) => setJmenoZZ(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Příjmení zákonného zástupce"
                value={prijmeniZZ}
                onChange={(e) => setPrijmeniZZ(e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Telefon zákonného zástupce"
                value={telefonZZ}
                onChange={(e) => setTelefonZZ(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="E-mail zákonného zástupce"
                type="email"
                value={emailZZ}
                onChange={(e) => setEmailZZ(e.target.value)}
                fullWidth
                required
              />
            </Stack>
          </Stack>
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <Button variant="contained" onClick={submit} disabled={pending}>
          Odeslat informace ke smlouvě
        </Button>
      </Box>
    </Stack>
  );
}
