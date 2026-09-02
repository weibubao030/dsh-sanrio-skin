/**
 * dsh-sanrio-skin — theme token tables.
 *
 * Ported from the browser-layer skin's sanrio-skin.css palettes: each
 * character x mode is one registered ThemeRuntime theme ({ id, colorScheme,
 * tokens }). Tokens are the same --dsw-alias-* / --dsw-specific-* / --shiki-*
 * custom properties the browser-layer skin overrode via stylesheets; the
 * ThemeRuntime applies them inline on <body> and colorScheme drives
 * body[data-ds-dark-theme].
 *
 * Unspecified tokens fall through to the built-in DSH theme, matching the
 * browser-layer behavior (it only overrode the keys below). Expanding a
 * character's key set toward the full alias/specific/shiki tables (see the
 * Solarized-dsh-theme template) is a polish item, not required for parity.
 */

export type ColorScheme = "light" | "dark";
export type Mode = ColorScheme;

export interface Character {
  id: string;
  label: string;
  name: string;
  emoji: string;
}

export interface ThemeDefinition {
  id: string;
  colorScheme: ColorScheme;
  tokens: Record<string, string>;
}

export const CHARACTERS: Character[] = [
  { id: "kitty", label: "Hello Kitty", name: "Hello Kitty", emoji: "🎀" },
  { id: "kuromi", label: "Kuromi", name: "Kuromi", emoji: "🖤" },
  { id: "cinna", label: "玉桂狗", name: "Cinnamoroll", emoji: "🦴" },
  { id: "melody", label: "My Melody", name: "My Melody", emoji: "🐰" },
  { id: "pudding", label: "布丁狗", name: "Pompompurin", emoji: "🍮" }
];

/** localStorage mode sentinel for "follow the OS light/dark". */
export type FollowMode = Mode | "auto";

export function themeId(characterId: string, mode: Mode): string {
  return `sanrio-${characterId}-${mode}`;
}

export function parseThemeId(id: string): { character: string; mode: Mode } | null {
  const match = /^sanrio-([a-z]+)-(light|dark)$/.exec(id);
  if (match === null) return null;
  return { character: match[1], mode: match[2] as Mode };
}

export function systemDark(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/** Resolve a character + follow-mode to a concrete registered theme id. */
export function resolveThemeId(characterId: string, follow: FollowMode): string {
  if (follow === "auto") return themeId(characterId, systemDark() ? "dark" : "light");
  return themeId(characterId, follow);
}

/* ================= Hello Kitty — red / white / soft pink ================= */

const KITTY_LIGHT: Record<string, string> = {
  "--dsw-alias-brand-primary": "#e63950",
  "--dsw-alias-brand-text": "#fff6f7",
  "--dsw-alias-bg-base": "#fff6f5",
  "--dsw-alias-bg-layer-1": "#fffdfc",
  "--dsw-alias-bg-layer-2": "#fff1f2",
  "--dsw-alias-bg-layer-3": "#ffeced",
  "--dsw-alias-bg-overlay": "#fff8f8",
  "--dsw-alias-label-primary": "#3a3032",
  "--dsw-alias-label-secondary": "#8a7c7f",
  "--dsw-alias-label-tertiary": "#b09ba0",
  "--dsw-alias-border-l1": "#f3d8db",
  "--dsw-alias-border-l2": "#ecc9cd",
  "--dsw-alias-interactive-bg-hover": "#fde8ea",
  "--dsw-alias-interactive-bg-active": "#f9d2d6",
  "--dsw-alias-interactive-bg-hover-solid": "#fbdadd",
  "--dsw-alias-button-primary-fill": "#e63950",
  "--dsw-alias-button-primary-hover": "#d11f38",
  "--dsw-alias-state-error-primary": "#e63950",
  "--dsw-alias-state-warn-primary": "#f2a54c",
  "--dsw-alias-state-success-primary": "#57b56b",
  "--dsw-specific-sidebar-fill": "#fdeff0",
  "--dsw-alias-scrollbar-bg-l1": "#e8b3bc",
  "--dsw-alias-scrollbar-hover-l1": "#d98a97",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "#e63950",
  "--dsw-alias-label-primary-bluish": "#5a2028",
  "--dsw-alias-state-business-primary": "#e63950",
  "--dsw-alias-state-business-tertiary": "#fde7ea",
  "--dsw-alias-button-info-fill": "#e63950",
  "--dsw-alias-button-info-hover": "#d11f38",
  "--dsw-alias-interactive-bg-hover-accent": "#fce4e8",
  "--dsw-specific-bubble": "#fdecf0",
  "--dsw-specific-bubble-highlight": "#f9d9df",
  "--dsw-specific-sidebar-nav-item-active-accent": "#fbdde3",
  "--dsw-specific-sidebar-nav-item-active": "#fce9ed",
  "--dsw-specific-sidebar-nav-item-hover": "#f9e3e7",
  "--dsw-specific-tip": "#f9e8ec",
  "--dsw-alias-markdown-citation": "#fbe4e8",
  "--dsw-alias-markdown-inline-code": "#fbeaee",
  "--dsw-alias-markdown-placeholder": "#fae6ea",
  "--dsw-alias-markdown-tag": "#f9e3e7",
  "--dsw-alias-toast-bg": "#5a2028",
  "--dsw-alias-tooltip-bg": "#5a2028",
  "--shiki-token-constant": "#c0392b",
  "--shiki-token-link": "#c0564a"
};

const KITTY_DARK: Record<string, string> = {
  "--dsw-alias-brand-primary": "#ff6b81",
  "--dsw-alias-brand-text": "#241318",
  "--dsw-alias-bg-base": "#1d1416",
  "--dsw-alias-bg-layer-1": "#251a1c",
  "--dsw-alias-bg-layer-2": "#2c2023",
  "--dsw-alias-bg-layer-3": "#332427",
  "--dsw-alias-bg-overlay": "#3a2a2d",
  "--dsw-alias-label-primary": "#f6eef0",
  "--dsw-alias-label-secondary": "#bca9ad",
  "--dsw-alias-label-tertiary": "#8f777c",
  "--dsw-alias-border-l1": "#3a2a2d",
  "--dsw-alias-border-l2": "#4a3438",
  "--dsw-alias-interactive-bg-hover": "#2f1d20",
  "--dsw-alias-interactive-bg-active": "#3f272b",
  "--dsw-alias-interactive-bg-hover-solid": "#3a2226",
  "--dsw-alias-button-primary-fill": "#ff6b81",
  "--dsw-alias-button-primary-hover": "#ff8f9e",
  "--dsw-alias-state-error-primary": "#ff8f9e",
  "--dsw-alias-state-warn-primary": "#f6b45a",
  "--dsw-alias-state-success-primary": "#6fcf7f",
  "--dsw-specific-sidebar-fill": "#24181a",
  "--dsw-alias-scrollbar-bg-l1": "#6b3a42",
  "--dsw-alias-scrollbar-hover-l1": "#8a4b55",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "#ff6b81",
  "--dsw-alias-state-business-primary": "#ff6b81",
  "--dsw-alias-state-business-tertiary": "#4a2a30",
  "--dsw-alias-button-info-fill": "#ff8f9e",
  "--dsw-alias-button-info-hover": "#ffb3bd",
  "--dsw-alias-interactive-bg-hover-accent": "#3a2226",
  "--dsw-specific-bubble": "#2f1c20",
  "--dsw-specific-bubble-highlight": "#4a2a30",
  "--dsw-specific-sidebar-nav-item-active-accent": "#41242a",
  "--dsw-specific-sidebar-nav-item-active": "#3a2226",
  "--dsw-specific-sidebar-nav-item-hover": "#332024",
  "--dsw-specific-tip": "#362226",
  "--dsw-alias-markdown-citation": "#3b2428",
  "--dsw-alias-markdown-inline-code": "#382226",
  "--dsw-alias-markdown-placeholder": "#362226",
  "--dsw-alias-markdown-tag": "#331f23",
  "--dsw-alias-toast-bg": "#4a2a30",
  "--dsw-alias-tooltip-bg": "#4a2a30",
  "--shiki-token-constant": "#ff8f9e",
  "--shiki-token-link": "#ffb3bd"
};

/* ================= Kuromi — aubergine / hot pink ================= */

const KUROMI_LIGHT: Record<string, string> = {
  "--dsw-alias-brand-primary": "#c2447f",
  "--dsw-alias-brand-text": "#fff3f9",
  "--dsw-alias-bg-base": "#f7f4f8",
  "--dsw-alias-bg-layer-1": "#ffffff",
  "--dsw-alias-bg-layer-2": "#f4eef6",
  "--dsw-alias-bg-layer-3": "#efe6f2",
  "--dsw-alias-bg-overlay": "#fbf8fc",
  "--dsw-alias-label-primary": "#2f2836",
  "--dsw-alias-label-secondary": "#7e7286",
  "--dsw-alias-label-tertiary": "#a295ad",
  "--dsw-alias-border-l1": "#e6dfec",
  "--dsw-alias-border-l2": "#d9ccdf",
  "--dsw-alias-interactive-bg-hover": "#fbe6f1",
  "--dsw-alias-interactive-bg-active": "#f4d3e5",
  "--dsw-alias-interactive-bg-hover-solid": "#f7dceb",
  "--dsw-alias-button-primary-fill": "#c2447f",
  "--dsw-alias-button-primary-hover": "#a63669",
  "--dsw-specific-sidebar-fill": "#f2edf6",
  "--dsw-alias-scrollbar-bg-l1": "#d78cc0",
  "--dsw-alias-scrollbar-hover-l1": "#c063a6",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "#c2447f",
  "--dsw-alias-label-primary-bluish": "#5a2a44",
  "--dsw-alias-state-business-primary": "#c2447f",
  "--dsw-alias-state-business-tertiary": "#f7e5f0",
  "--dsw-alias-button-info-fill": "#c2447f",
  "--dsw-alias-button-info-hover": "#a63669",
  "--dsw-alias-interactive-bg-hover-accent": "#f6e0ee",
  "--dsw-specific-bubble": "#f9e7f2",
  "--dsw-specific-bubble-highlight": "#efd0e5",
  "--dsw-specific-sidebar-nav-item-active-accent": "#f4d9ea",
  "--dsw-specific-sidebar-nav-item-active": "#f8e5f1",
  "--dsw-specific-sidebar-nav-item-hover": "#f6e0ee",
  "--dsw-specific-tip": "#f5e3ee",
  "--dsw-alias-markdown-citation": "#f5dcea",
  "--dsw-alias-markdown-inline-code": "#f7e4ef",
  "--dsw-alias-markdown-placeholder": "#f6e0ed",
  "--dsw-alias-markdown-tag": "#f5e3ee",
  "--dsw-alias-toast-bg": "#4a2440",
  "--dsw-alias-tooltip-bg": "#4a2440",
  "--shiki-token-constant": "#b8306f",
  "--shiki-token-link": "#a93a66"
};

const KUROMI_DARK: Record<string, string> = {
  "--dsw-alias-brand-primary": "#e96fb1",
  "--dsw-alias-brand-text": "#1c1220",
  "--dsw-alias-bg-base": "#14111a",
  "--dsw-alias-bg-layer-1": "#1c1823",
  "--dsw-alias-bg-layer-2": "#221d2b",
  "--dsw-alias-bg-layer-3": "#2a2337",
  "--dsw-alias-bg-overlay": "#302842",
  "--dsw-alias-label-primary": "#f3eef7",
  "--dsw-alias-label-secondary": "#b8aec6",
  "--dsw-alias-label-tertiary": "#8f83a3",
  "--dsw-alias-border-l1": "#342d40",
  "--dsw-alias-border-l2": "#463b55",
  "--dsw-alias-interactive-bg-hover": "#2a1f31",
  "--dsw-alias-interactive-bg-active": "#3a2a47",
  "--dsw-alias-interactive-bg-hover-solid": "#362740",
  "--dsw-alias-button-primary-fill": "#e96fb1",
  "--dsw-alias-button-primary-hover": "#f08cc4",
  "--dsw-alias-state-error-primary": "#f08cc4",
  "--dsw-specific-sidebar-fill": "#1b1722",
  "--dsw-alias-scrollbar-bg-l1": "#7a4a67",
  "--dsw-alias-scrollbar-hover-l1": "#9a5c84",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "#e96fb1",
  "--dsw-alias-state-business-primary": "#e96fb1",
  "--dsw-alias-state-business-tertiary": "#3a2233",
  "--dsw-alias-button-info-fill": "#e96fb1",
  "--dsw-alias-button-info-hover": "#f08cc4",
  "--dsw-alias-interactive-bg-hover-accent": "#3a2440",
  "--dsw-specific-bubble": "#2a1c28",
  "--dsw-specific-bubble-highlight": "#3f2a3a",
  "--dsw-specific-sidebar-nav-item-active-accent": "#372233",
  "--dsw-specific-sidebar-nav-item-active": "#2c1e2a",
  "--dsw-specific-sidebar-nav-item-hover": "#271c24",
  "--dsw-specific-tip": "#2a1e28",
  "--dsw-alias-markdown-citation": "#33232f",
  "--dsw-alias-markdown-inline-code": "#30222c",
  "--dsw-alias-markdown-placeholder": "#2f222a",
  "--dsw-alias-markdown-tag": "#2c1f27",
  "--dsw-alias-toast-bg": "#3a2233",
  "--dsw-alias-tooltip-bg": "#3a2233",
  "--shiki-token-constant": "#ff8cc4",
  "--shiki-token-link": "#ffb0d8"
};

/* ================= Cinnamoroll — cream / baby blue ================= */

const CINNA_LIGHT: Record<string, string> = {
  "--dsw-alias-brand-primary": "#7fc2e6",
  "--dsw-alias-brand-text": "#10222e",
  "--dsw-alias-bg-base": "#fbf7f1",
  "--dsw-alias-bg-layer-1": "#ffffff",
  "--dsw-alias-bg-layer-2": "#f3f9fc",
  "--dsw-alias-bg-layer-3": "#ecf5fa",
  "--dsw-alias-bg-overlay": "#f8fcfd",
  "--dsw-alias-label-primary": "#4a5665",
  "--dsw-alias-label-secondary": "#8ea1b3",
  "--dsw-alias-label-tertiary": "#adbdca",
  "--dsw-alias-border-l1": "#e6eef4",
  "--dsw-alias-border-l2": "#d5e2ec",
  "--dsw-alias-interactive-bg-hover": "#e9f4fb",
  "--dsw-alias-interactive-bg-active": "#d6ebf7",
  "--dsw-alias-interactive-bg-hover-solid": "#e3f1f9",
  "--dsw-alias-button-primary-fill": "#7fc2e6",
  "--dsw-alias-button-primary-hover": "#5fb0dd",
  "--dsw-specific-sidebar-fill": "#f3f8fb",
  "--dsw-alias-scrollbar-bg-l1": "#b5d9ed",
  "--dsw-alias-scrollbar-hover-l1": "#8fc1e0"
};

const CINNA_DARK: Record<string, string> = {
  "--dsw-alias-brand-primary": "#8fd0f0",
  "--dsw-alias-brand-text": "#10222e",
  "--dsw-alias-bg-base": "#1a2128",
  "--dsw-alias-bg-layer-1": "#222b33",
  "--dsw-alias-bg-layer-2": "#29343d",
  "--dsw-alias-bg-layer-3": "#303d47",
  "--dsw-alias-bg-overlay": "#374653",
  "--dsw-alias-label-primary": "#e6eef5",
  "--dsw-alias-label-secondary": "#93a7b8",
  "--dsw-alias-label-tertiary": "#6f8293",
  "--dsw-alias-border-l1": "#2c3842",
  "--dsw-alias-border-l2": "#3a4a56",
  "--dsw-alias-interactive-bg-hover": "#26333c",
  "--dsw-alias-interactive-bg-active": "#2f404b",
  "--dsw-alias-interactive-bg-hover-solid": "#2b3a45",
  "--dsw-alias-button-primary-fill": "#8fd0f0",
  "--dsw-alias-button-primary-hover": "#a6ddf7",
  "--dsw-specific-sidebar-fill": "#202931",
  "--dsw-alias-scrollbar-bg-l1": "#3d5b6e",
  "--dsw-alias-scrollbar-hover-l1": "#517b93"
};

/* ================= My Melody — pastel pink ================= */

const MELODY_LIGHT: Record<string, string> = {
  "--dsw-alias-brand-primary": "#f586ac",
  "--dsw-alias-brand-text": "#3a1f29",
  "--dsw-alias-bg-base": "#fdf3f6",
  "--dsw-alias-bg-layer-1": "#ffffff",
  "--dsw-alias-bg-layer-2": "#fbecf1",
  "--dsw-alias-bg-layer-3": "#f7e2ea",
  "--dsw-alias-bg-overlay": "#fcf2f6",
  "--dsw-alias-label-primary": "#5a4750",
  "--dsw-alias-label-secondary": "#b08a96",
  "--dsw-alias-label-tertiary": "#c7a6af",
  "--dsw-alias-border-l1": "#f5dfe7",
  "--dsw-alias-border-l2": "#eecdd9",
  "--dsw-alias-interactive-bg-hover": "#fce4ec",
  "--dsw-alias-interactive-bg-active": "#f8d1de",
  "--dsw-alias-interactive-bg-hover-solid": "#fadde6",
  "--dsw-alias-button-primary-fill": "#f586ac",
  "--dsw-alias-button-primary-hover": "#ee6f9a",
  "--dsw-specific-sidebar-fill": "#faeef3",
  "--dsw-alias-scrollbar-bg-l1": "#f0b9cc",
  "--dsw-alias-scrollbar-hover-l1": "#e090ab"
};

const MELODY_DARK: Record<string, string> = {
  "--dsw-alias-brand-primary": "#ffa7c6",
  "--dsw-alias-brand-text": "#261319",
  "--dsw-alias-bg-base": "#201a1f",
  "--dsw-alias-bg-layer-1": "#282024",
  "--dsw-alias-bg-layer-2": "#2f262b",
  "--dsw-alias-bg-layer-3": "#372d33",
  "--dsw-alias-bg-overlay": "#3e343a",
  "--dsw-alias-label-primary": "#f7edf1",
  "--dsw-alias-label-secondary": "#c2a7b1",
  "--dsw-alias-label-tertiary": "#967b85",
  "--dsw-alias-border-l1": "#382830",
  "--dsw-alias-border-l2": "#48333c",
  "--dsw-alias-interactive-bg-hover": "#2e2029",
  "--dsw-alias-interactive-bg-active": "#3d2833",
  "--dsw-alias-interactive-bg-hover-solid": "#37212c",
  "--dsw-alias-button-primary-fill": "#ffa7c6",
  "--dsw-alias-button-primary-hover": "#ffbcd3",
  "--dsw-specific-sidebar-fill": "#241c21",
  "--dsw-alias-scrollbar-bg-l1": "#7a4a5c",
  "--dsw-alias-scrollbar-hover-l1": "#9a5c73"
};

/* ================= Pompompurin — cream / custard / caramel ================= */

const PUDDING_LIGHT: Record<string, string> = {
  "--dsw-alias-brand-primary": "#8a5a3a",
  "--dsw-alias-brand-text": "#fff7ea",
  "--dsw-alias-bg-base": "#fdf6e8",
  "--dsw-alias-bg-layer-1": "#fffdf5",
  "--dsw-alias-bg-layer-2": "#fcf2d9",
  "--dsw-alias-bg-layer-3": "#f9ecca",
  "--dsw-alias-bg-overlay": "#fefaf1",
  "--dsw-alias-label-primary": "#4a3826",
  "--dsw-alias-label-secondary": "#9c815c",
  "--dsw-alias-label-tertiary": "#bfa578",
  "--dsw-alias-border-l1": "#eee0c2",
  "--dsw-alias-border-l2": "#e6d2a8",
  "--dsw-alias-interactive-bg-hover": "#f9e7bd",
  "--dsw-alias-interactive-bg-active": "#f2d98c",
  "--dsw-alias-interactive-bg-hover-solid": "#f6e2ad",
  "--dsw-alias-button-primary-fill": "#8a5a3a",
  "--dsw-alias-button-primary-hover": "#744a2c",
  "--dsw-alias-state-error-primary": "#cf5b45",
  "--dsw-alias-state-warn-primary": "#e0a33d",
  "--dsw-alias-state-success-primary": "#74b06a",
  "--dsw-specific-sidebar-fill": "#f9efd7",
  "--dsw-alias-scrollbar-bg-l1": "#e7c48b",
  "--dsw-alias-scrollbar-hover-l1": "#d3a85f",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "#8a5a3a",
  "--dsw-alias-label-primary-bluish": "#6b4a2a",
  "--dsw-alias-state-business-primary": "#8a5a3a",
  "--dsw-alias-state-business-tertiary": "#f6e6c8",
  "--dsw-alias-button-info-fill": "#8a5a3a",
  "--dsw-alias-button-info-hover": "#744a2c",
  "--dsw-alias-interactive-bg-hover-accent": "#f2deba",
  "--dsw-specific-bubble": "#fbeed3",
  "--dsw-specific-bubble-highlight": "#f5dfb2",
  "--dsw-specific-sidebar-nav-item-active-accent": "#f3e0bd",
  "--dsw-specific-sidebar-nav-item-active": "#f6e8c9",
  "--dsw-specific-sidebar-nav-item-hover": "#f8eeda",
  "--dsw-specific-tip": "#f6e9cd",
  "--dsw-alias-markdown-citation": "#faecd1",
  "--dsw-alias-markdown-inline-code": "#f6e9cd",
  "--dsw-alias-markdown-placeholder": "#f7ecd4",
  "--dsw-alias-markdown-tag": "#f8eeda",
  "--dsw-alias-toast-bg": "#6b4a2a",
  "--dsw-alias-tooltip-bg": "#6b4a2a",
  "--shiki-token-constant": "#8a5a3a",
  "--shiki-token-link": "#a8693a"
};

const PUDDING_DARK: Record<string, string> = {
  "--dsw-alias-brand-primary": "#e8b04c",
  "--dsw-alias-brand-text": "#2a1e0c",
  "--dsw-alias-bg-base": "#221b12",
  "--dsw-alias-bg-layer-1": "#2a2316",
  "--dsw-alias-bg-layer-2": "#33291a",
  "--dsw-alias-bg-layer-3": "#3b2f1e",
  "--dsw-alias-bg-overlay": "#463b26",
  "--dsw-alias-label-primary": "#f6ecd9",
  "--dsw-alias-label-secondary": "#c5ac82",
  "--dsw-alias-label-tertiary": "#9c845c",
  "--dsw-alias-border-l1": "#463a26",
  "--dsw-alias-border-l2": "#55462e",
  "--dsw-alias-interactive-bg-hover": "#3a2f1c",
  "--dsw-alias-interactive-bg-active": "#463a24",
  "--dsw-alias-interactive-bg-hover-solid": "#3f331e",
  "--dsw-alias-button-primary-fill": "#e8b04c",
  "--dsw-alias-button-primary-hover": "#f0bd5e",
  "--dsw-alias-state-error-primary": "#e08463",
  "--dsw-alias-state-warn-primary": "#e8b04c",
  "--dsw-alias-state-success-primary": "#7bbf75",
  "--dsw-specific-sidebar-fill": "#2a2316",
  "--dsw-alias-scrollbar-bg-l1": "#6f5a33",
  "--dsw-alias-scrollbar-hover-l1": "#8a7142",
  "--dsw-alias-brand-primary-new-colorprimary-new-color": "#e8b04c",
  "--dsw-alias-state-business-primary": "#e8b04c",
  "--dsw-alias-state-business-tertiary": "#4a3a22",
  "--dsw-alias-button-info-fill": "#e8b04c",
  "--dsw-alias-button-info-hover": "#f0bd5e",
  "--dsw-alias-interactive-bg-hover-accent": "#4a3a24",
  "--dsw-specific-bubble": "#2f2620",
  "--dsw-specific-bubble-highlight": "#4a3928",
  "--dsw-specific-sidebar-nav-item-active-accent": "#413628",
  "--dsw-specific-sidebar-nav-item-active": "#38301f",
  "--dsw-specific-sidebar-nav-item-hover": "#332b1c",
  "--dsw-specific-tip": "#332b1c",
  "--dsw-alias-markdown-citation": "#3b3222",
  "--dsw-alias-markdown-inline-code": "#3a3121",
  "--dsw-alias-markdown-placeholder": "#39301f",
  "--dsw-alias-markdown-tag": "#36301f",
  "--dsw-alias-toast-bg": "#4a3a22",
  "--dsw-alias-tooltip-bg": "#4a3a22",
  "--shiki-token-constant": "#e8b04c",
  "--shiki-token-link": "#f0bd5e"
};

const PALETTES: Record<string, Record<Mode, Record<string, string>>> = {
  kitty: { light: KITTY_LIGHT, dark: KITTY_DARK },
  kuromi: { light: KUROMI_LIGHT, dark: KUROMI_DARK },
  cinna: { light: CINNA_LIGHT, dark: CINNA_DARK },
  melody: { light: MELODY_LIGHT, dark: MELODY_DARK },
  pudding: { light: PUDDING_LIGHT, dark: PUDDING_DARK }
};

/** All 10 registered themes: one per character x mode. */
export const THEMES: ThemeDefinition[] = CHARACTERS.flatMap((character) =>
  (["light", "dark"] as Mode[]).map((mode) => ({
    id: themeId(character.id, mode),
    colorScheme: mode,
    tokens: PALETTES[character.id][mode]
  }))
);

export function isSanrioThemeId(id: string): boolean {
  return parseThemeId(id) !== null;
}
