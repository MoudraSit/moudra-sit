import { AssistantAPI } from "backend/assistant";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name)
    return NextResponse.json({ error: "Missing name" }, { status: 400 });

  const assistantFilters = await AssistantAPI.getAssistantFilters();

  const isUnique = !assistantFilters.some(
    (filter) => filter.fields.nazev === name
  );
  
  return NextResponse.json({ isUnique });
}
