import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import axios from "axios";

type Municipality = {
  hezkyNazev: string;
  souradnice: [number, number];
  adresaUradu: {
    PSC: string;
  };
};

const serializer = (mun: Municipality) => {
  return {
    name: mun.hezkyNazev,
    zipCode: mun.adresaUradu.PSC,
    coordinates: mun.souradnice,
  };
};

export type MunicipalityDto = ReturnType<typeof serializer>;

export const validationSchema = yup.object().shape({
  zipCode: yup.number().integer().min(10000).max(80000).required(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const values = await validationSchema.validate(req.query).catch((err) => {
    res.status(400).json({ message: err.message });
  });

  if (!values) {
    return;
  }

  const response = await axios<{
    municipalities: Municipality[];
  }>("https://data.cesko.digital/obce/1/obce.json");

  const fullMatchCities = response.data.municipalities.filter(
    (i) => i.adresaUradu.PSC === values.zipCode.toString()
  );

  if (fullMatchCities.length > 0) {
    return res.json(fullMatchCities.map(serializer));
  }

  const partialMatchCities = response.data.municipalities.filter((i) =>
    (i.adresaUradu.PSC ?? "").startsWith(values.zipCode.toString().slice(0, 2))
  );

  return res.json(partialMatchCities.map(serializer));
}

export default handler;
