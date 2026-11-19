import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { github } from "emdash/auth/providers/github";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	// English is the default and has no prefix; Italian and Russian live under
	// /it/ and /ru/. Do not prefix the default locale: it breaks the admin.
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it", "ru"],
		fallback: { it: "en", ru: "en" },
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
			// Sign in with GitHub as well as passkeys: passkeys cannot be saved
			// on Alex's work PC. Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
			// as Worker secrets (Cloudflare → Settings → Variables and Secrets).
			authProviders: [github()],
		}),
	],
	devToolbar: { enabled: false },
});
