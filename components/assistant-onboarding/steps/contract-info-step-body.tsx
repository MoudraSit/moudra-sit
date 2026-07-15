"use client";

import { Alert, Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { submitContractInfo } from "../actions";
import { AdminFlagsV2, City } from "types/assistant";
import { phoneRegexWithCountryCode } from "helper/consts";
import PrimaryButton from "../primary-button";
import { FormInputText } from "components/app-forms/inputs/FormInputText";
import { FormInputCity } from "components/app-forms/inputs/FormInputCity";

interface Props {
  flags: AdminFlagsV2;
  isUnder18: boolean;
  initialValues: {
    titul: string;
    jmeno: string;
    prijmeni: string;
    denNarozeni: string;
    telefon: string;
    ulice: string;
    PSC: string;
    initialCity: City | null;
    jsemClenemDofE: boolean;
  };
}

type ContractInfoFormValues = {
  titul: string;
  jmeno: string;
  prijmeni: string;
  denNarozeni: string;
  telefon: string;
  ulice: string;
  PSC: string;
  city: City | null;
  jsemClenemDofE: boolean;
  jmenoZakonnyZastupce: string;
  prijmeniZakonnyZastupce: string;
  telefonZakonnyZastupce: string;
  emailZakonnyZastupce: string;
};

function isUnder18FromDob(dob: string): boolean {
  if (!dob) return false;
  const birth = new Date(dob + "T00:00:00");
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();
  return age - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0) < 18;
}

const schema = yup.object({
  titul: yup.string().trim().optional(),
  jmeno: yup.string().trim().required("Doplňte jméno."),
  prijmeni: yup.string().trim().required("Doplňte příjmení."),
  denNarozeni: yup.string().trim().required("Doplňte datum narození."),
  telefon: yup
    .string()
    .trim()
    .matches(phoneRegexWithCountryCode, "Napište správný tvar telefonního čísla")
    .required("Doplňte telefonní číslo."),
  ulice: yup.string().trim().required("Doplňte ulici a číslo popisné."),
  PSC: yup.string().trim().required("Doplňte PSČ."),
  city: yup
    .object({ id: yup.string().required() })
    .nullable()
    .required("Vyberte město nebo obec."),
  jsemClenemDofE: yup.boolean().required(),
  jmenoZakonnyZastupce: yup.string().trim().when("denNarozeni", {
    is: isUnder18FromDob,
    then: (s) => s.required("Doplňte jméno zákonného zástupce."),
    otherwise: (s) => s.optional(),
  }),
  prijmeniZakonnyZastupce: yup.string().trim().when("denNarozeni", {
    is: isUnder18FromDob,
    then: (s) => s.required("Doplňte příjmení zákonného zástupce."),
    otherwise: (s) => s.optional(),
  }),
  telefonZakonnyZastupce: yup.string().trim().when("denNarozeni", {
    is: isUnder18FromDob,
    then: (s) =>
      s
        .matches(phoneRegexWithCountryCode, "Napište správný tvar telefonního čísla")
        .required("Doplňte telefon zákonného zástupce."),
    otherwise: (s) => s.optional(),
  }),
  emailZakonnyZastupce: yup.string().trim().when("denNarozeni", {
    is: isUnder18FromDob,
    then: (s) => s.email("Neplatný e-mail.").required("Doplňte e-mail zákonného zástupce."),
    otherwise: (s) => s.optional(),
  }),
});

function toDateInputValue(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(iso);
  return m ? m[1] : "";
}

export default function ContractInfoStepBody({
  flags,
  isUnder18: _isUnder18,
  initialValues,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, getValues, watch, setValue } =
    useForm<ContractInfoFormValues>({
      resolver: yupResolver(schema) as never,
      defaultValues: {
        titul: initialValues.titul ?? "",
        jmeno: initialValues.jmeno ?? "",
        prijmeni: initialValues.prijmeni ?? "",
        denNarozeni: toDateInputValue(initialValues.denNarozeni ?? ""),
        telefon: initialValues.telefon ?? "",
        ulice: initialValues.ulice ?? "",
        PSC: initialValues.PSC ?? "",
        city: initialValues.initialCity,
        jsemClenemDofE: initialValues.jsemClenemDofE ?? false,
        jmenoZakonnyZastupce: "",
        prijmeniZakonnyZastupce: "",
        telefonZakonnyZastupce: "",
        emailZakonnyZastupce: "",
      },
    });

  const jsemClenemDofE = watch("jsemClenemDofE");
  const denNarozeniWatch = watch("denNarozeni");
  const computedIsUnder18 = isUnder18FromDob(denNarozeniWatch);

  if (flags.contractInfoProvided) {
    return (
      <Alert severity="success">
        Údaje ke smlouvě jsou uložené. Koordinátor připravuje smlouvu.
      </Alert>
    );
  }

  const submit = (values: ContractInfoFormValues) => {
    startTransition(async () => {
      setError(null);
      const denNarozeniIso = values.denNarozeni
        ? new Date(values.denNarozeni + "T00:00:00.000Z").toISOString()
        : "";
      const under18AtSubmit = isUnder18FromDob(values.denNarozeni);
      const res = await submitContractInfo({
        titul: values.titul,
        jmeno: values.jmeno,
        prijmeni: values.prijmeni,
        denNarozeni: denNarozeniIso,
        telefon: values.telefon,
        ulice: values.ulice,
        PSC: values.PSC,
        mestoId: values.city!.id,
        isUnder18: under18AtSubmit,
        jmenoZakonnyZastupce: under18AtSubmit
          ? values.jmenoZakonnyZastupce
          : undefined,
        prijmeniZakonnyZastupce: under18AtSubmit
          ? values.prijmeniZakonnyZastupce
          : undefined,
        telefonZakonnyZastupce: under18AtSubmit
          ? values.telefonZakonnyZastupce
          : undefined,
        emailZakonnyZastupce: under18AtSubmit
          ? values.emailZakonnyZastupce
          : undefined,
        jsemClenemDofE: values.jsemClenemDofE,
      });
      if (!res.ok) setError(res.message);
    });
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(submit)}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box sx={{ maxWidth: { sm: 140 }, width: "100%" }}>
          <FormInputText name="titul" control={control} label="Titul" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormInputText
            name="jmeno"
            control={control}
            label="Jméno"
            required
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormInputText
            name="prijmeni"
            control={control}
            label="Příjmení"
            required
          />
        </Box>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box sx={{ flex: 1 }}>
          <FormInputText
            name="denNarozeni"
            control={control}
            label="Datum narození"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormInputText
            name="telefon"
            control={control}
            label="Telefon"
            required
          />
        </Box>
      </Stack>

      <FormInputText
        name="ulice"
        control={control}
        label="Ulice a číslo popisné"
        required
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box sx={{ maxWidth: { sm: 160 }, width: "100%" }}>
          <FormInputText name="PSC" control={control} label="PSČ" required />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormInputCity
            name="city"
            control={control}
            getValues={getValues}
            isPending={pending}
            label="Město / obec"
          />
        </Box>
      </Stack>

      <FormControlLabel
        control={
          <Checkbox
            checked={jsemClenemDofE}
            onChange={(e) => setValue("jsemClenemDofE", e.target.checked)}
          />
        }
        label="Jsem účastníkem programu DofE"
      />

      {computedIsUnder18 && (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Je ti méně než 18 let. Doplň prosím údaje zákonného zástupce.
          </Alert>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormInputText
                name="jmenoZakonnyZastupce"
                control={control}
                label="Jméno zákonného zástupce"
                required
              />
              <FormInputText
                name="prijmeniZakonnyZastupce"
                control={control}
                label="Příjmení zákonného zástupce"
                required
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormInputText
                name="telefonZakonnyZastupce"
                control={control}
                label="Telefon zákonného zástupce"
                required
              />
              <FormInputText
                name="emailZakonnyZastupce"
                control={control}
                label="E-mail zákonného zástupce"
                type="email"
                required
              />
            </Stack>
          </Stack>
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <PrimaryButton type="submit" disabled={pending}>
          Odeslat informace ke smlouvě
        </PrimaryButton>
      </Box>
    </Stack>
  );
}
