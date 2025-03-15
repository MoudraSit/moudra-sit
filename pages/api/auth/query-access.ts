import { SeniorQueriesGetter } from "backend/senior-queries";
import { QueryStatus, WITHOUT_SOLVER_STATUSES } from "helper/consts";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (!token) return res.status(401).json({ access: false });

  const { queryId } = req.query;

  try {
    const query = await SeniorQueriesGetter.getSeniorQueryById(
      queryId as string
    );
    const hasAccess =
      query.fields.resitelLink?.id === token.id ||
      WITHOUT_SOLVER_STATUSES.includes(query.fields.stavDotazu as QueryStatus);

    return res.json({ access: hasAccess });
  } catch (error) {
    console.error("Query access API error:", error);
    return res.status(500).json({ access: false });
  }
}
