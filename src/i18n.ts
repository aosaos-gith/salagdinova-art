/**
 * Interface text that belongs to the site rather than to the content.
 * Content (projects, About, Contact) is translated in the admin.
 */

export const LOCALES = ["en", "it", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
	en: "English",
	it: "Italiano",
	ru: "Русский",
};

const STRINGS = {
	en: {
		projects: "Projects",
		about: "About",
		contact: "Contact",
		context: "Context",
		year: "Year",
		course: "Course",
		professors: "Professors",
		team: "Team",
		next: "Next project",
		back: "All projects",
		notFound: "This page does not exist.",
		home: "Back to the home page",
		skip: "Skip to content",
		language: "Language",
		comingSoon: "Content coming soon.",
	},
	it: {
		projects: "Progetti",
		about: "Chi sono",
		contact: "Contatti",
		context: "Contesto",
		year: "Anno",
		course: "Corso",
		professors: "Docenti",
		team: "Gruppo",
		next: "Progetto successivo",
		back: "Tutti i progetti",
		notFound: "Questa pagina non esiste.",
		home: "Torna alla home",
		skip: "Vai al contenuto",
		language: "Lingua",
		comingSoon: "Contenuti in arrivo.",
	},
	ru: {
		projects: "Проекты",
		about: "Обо мне",
		contact: "Контакты",
		context: "Контекст",
		year: "Год",
		course: "Курс",
		professors: "Преподаватели",
		team: "Команда",
		next: "Следующий проект",
		back: "Все проекты",
		notFound: "Такой страницы нет.",
		home: "На главную",
		skip: "К содержимому",
		language: "Язык",
		comingSoon: "Скоро здесь появится содержание.",
	},
} satisfies Record<Locale, Record<string, string>>;

export type StringKey = keyof (typeof STRINGS)["en"];

export function isLocale(value: string | undefined): value is Locale {
	return LOCALES.includes(value as Locale);
}

export function toLocale(value: string | undefined): Locale {
	return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function t(locale: Locale, key: StringKey): string {
	return STRINGS[locale][key] ?? STRINGS.en[key];
}

/** A site path for the locale: "/about" → "/it/about". */
export function localePath(locale: Locale, path = "/"): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	if (locale === DEFAULT_LOCALE) return clean;
	return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
}

/** The path without its locale prefix: "/ru/projects/brick" → "/projects/brick". */
export function stripLocale(pathname: string): string {
	const match = pathname.match(/^\/(it|ru)(\/.*)?$/);
	if (!match) return pathname || "/";
	return match[2] || "/";
}

/** Pick the caption written for the locale, falling back to English. */
export function localizedCaption(
	locale: Locale,
	item: { caption?: string | null; caption_it?: string | null; caption_ru?: string | null },
): string | undefined {
	const value =
		locale === "it" ? item.caption_it : locale === "ru" ? item.caption_ru : item.caption;
	return (value || item.caption || undefined)?.trim() || undefined;
}
