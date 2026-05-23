/** Property slugs are numeric ids only: design1, design28, design003 — no text names */

export const DESIGN_SLUG_PREFIX = "design";

const NUMERIC_SLUG_RE = /^design\d+$/i;

export function getDesignNumber(slug) {
  const canonical = canonicalDesignSlug(slug);
  if (!canonical) return null;
  return Number.parseInt(canonical.slice(DESIGN_SLUG_PREFIX.length), 10);
}

/** Display label: "1", "2", "3" — never the full slug string */
export function formatDesignNumber(slug) {
  const n = getDesignNumber(slug);
  return n != null ? String(n) : "—";
}

export function isValidDesignSlug(slug) {
  const s = typeof slug === "string" ? slug.trim() : "";
  return NUMERIC_SLUG_RE.test(s);
}

/** Lowercase canonical slug, or null if not a valid numeric design id */
export function canonicalDesignSlug(slug) {
  const s = typeof slug === "string" ? slug.trim().toLowerCase() : "";
  if (!NUMERIC_SLUG_RE.test(s)) return null;
  return s;
}

/** Accepts design28 or bare number "28" for URLs / search */
export function resolveDesignSlug(input) {
  const s = typeof input === "string" ? input.trim() : "";
  if (!s) return null;
  if (/^\d+$/.test(s)) return `${DESIGN_SLUG_PREFIX}${s}`;
  return canonicalDesignSlug(s);
}

function trailingDigitWidth(slugs) {
  let maxLen = 0;
  for (const slug of slugs) {
    const c = canonicalDesignSlug(slug);
    if (!c) continue;
    const tail = c.slice(DESIGN_SLUG_PREFIX.length);
    maxLen = Math.max(maxLen, tail.length);
  }
  return maxLen;
}

/** Next sequential slug (e.g. design27 → design28) */
export function getNextDesignSlug(designs) {
  const slugs = (Array.isArray(designs) ? designs : [])
    .map((d) => (typeof d === "string" ? d : d?.slug))
    .filter(Boolean);

  let maxNum = 0;
  for (const slug of slugs) {
    const n = getDesignNumber(slug);
    if (n != null && n > maxNum) maxNum = n;
  }

  const existing = new Set(
    slugs.map((s) => canonicalDesignSlug(s)).filter(Boolean),
  );
  const pad = trailingDigitWidth(slugs);

  for (let attempt = 0; attempt < 500; attempt += 1) {
    const nextNum = maxNum + 1 + attempt;
    const numStr =
      pad > 1 ? String(nextNum).padStart(pad, "0") : String(nextNum);
    const candidate = `${DESIGN_SLUG_PREFIX}${numStr}`;
    if (!existing.has(candidate)) return candidate;
  }

  return `${DESIGN_SLUG_PREFIX}${maxNum + 1}`;
}

export function assertValidDesignSlug(slug) {
  const canonical = canonicalDesignSlug(slug);
  if (!canonical) {
    throw new Error(
      "Slug must be a numeric design id (e.g. design28). Text names are not allowed.",
    );
  }
  return canonical;
}
