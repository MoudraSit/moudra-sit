export function normalizeExternalUrl(raw?: unknown): string | undefined {
  let candidate: string | undefined;
  if (typeof raw === "string") {
    candidate = raw;
  } else if (raw && typeof raw === "object") {
    const href = (raw as { href?: unknown }).href;
    if (typeof href === "string") candidate = href;
  }
  if (!candidate) return undefined;
  const trimmed = candidate.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^\/\//.test(trimmed)) return `https:${trimmed}`;
  return `https://${trimmed}`;
}
