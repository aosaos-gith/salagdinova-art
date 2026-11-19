import { getEmDashCollection, getEmDashEntry } from "emdash";
import type { Locale } from "../i18n";

/** Published projects for the locale, in the order set by the "Order" field. */
export async function getProjects(locale: Locale) {
	const result = await getEmDashCollection("projects", { locale, status: "published" });
	let entries = result.entries ?? [];
	// A locale without its own translations shows the English projects.
	if (entries.length === 0 && locale !== "en") {
		const fallback = await getEmDashCollection("projects", { locale: "en", status: "published" });
		entries = fallback.entries ?? [];
	}
	const sorted = [...entries].sort(
		(a, b) =>
			(a.data.order ?? 999) - (b.data.order ?? 999) ||
			String(b.data.year ?? "").localeCompare(String(a.data.year ?? "")),
	);
	return { entries: sorted, error: result.error, cacheHint: result.cacheHint };
}

export async function getPage(slug: string, locale: Locale) {
	return getEmDashEntry("pages", slug, { locale });
}

export async function getProject(slug: string, locale: Locale) {
	return getEmDashEntry("projects", slug, { locale });
}

/** Split "A, B, C" into names. */
export function names(value?: string | null): string[] {
	return (value ?? "")
		.split(/[,;\n]/)
		.map((s) => s.trim())
		.filter(Boolean);
}
