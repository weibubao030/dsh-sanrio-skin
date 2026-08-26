/**
 * dsh-sanrio-skin — browser half (client plugin bundle).
 *
 * Loaded by dsh-client-modules at /plugins/dsh-sanrio-skin/client.js and
 * executed through the vendored cordis Loader's module table
 * (window.__ModuleLoader__.load). The factory body is plain CJS with
 * require() resolved against the shell's module table — the same shape the
 * shipped ui-* packages' bundles emit.
 *
 * What this plugin does:
 *  - registers 10 themes (5 characters x light/dark) into the ThemeRuntime
 *    via ctx.theme.register({ id, colorScheme, tokens });
 *  - adds a skin-management tab into the Plugins section
 *    (settings.plugins.tab), so the skin switcher lives under 插件 -> 三丽鸥皮肤
 *    instead of replacing the built-in Appearance row;
 *  - persists the preference in localStorage (the Host settings wire only
 *    exposes an allowlisted set of namespaces to browser clients);
 *  - mounts a small base stylesheet (rounding / scrollbar / motion) only
 *    while one of our themes is active;
 *  - "auto" mode follows prefers-color-scheme live.
 */
import { defineStore } from "@deepseek-ai/dsh-client-runtime/client";
import { mountDecor, removeDecor } from "./decor";
import {
  CHARACTERS,
  THEMES,
  isSanrioThemeId,
  parseThemeId,
  resolveThemeId,
  type FollowMode
} from "./themes";

/** The settings row's locale namespace. */
const SETTINGS_NS = "settings.sanrio";
/** localStorage keys holding the saved preference. */
const STORAGE_ENABLED = "sanrio-skin:enabled";
const STORAGE_CHAR = "sanrio-skin:character";
const STORAGE_MODE = "sanrio-skin:mode";

const DEFAULT_CHARACTER = "pudding";
const DEFAULT_MODE: FollowMode = "auto";

/* ------------------------------------------------------------------ */
/* Locale                                                              */
/* ------------------------------------------------------------------ */

/** Simplified Chinese dictionary (key-set source of truth). */
const zh: Record<string, string> = {
  "tab.label": "三丽鸥皮肤",
  "panel.title": "三丽鸥皮肤",
  "panel.intro": "选择一个角色应用皮肤，再选择该角色的 白天 / 黑夜 / 跟随系统。",
  "panel.charTitle": "选择角色",
  "panel.modeTitle": "白天 / 黑夜 / 跟随系统",
  "mode.auto": "跟随系统",
  "mode.light": "白天",
  "mode.dark": "黑夜",
  "panel.restore": "还原系统皮肤"
};

/** English dictionary, checked complete against the zh key set. */
const en: Record<string, string> = {
  "tab.label": "Sanrio skin",
  "panel.title": "Sanrio skin",
  "panel.intro": "Pick a character to apply its skin, then choose light / dark / follow system.",
  "panel.charTitle": "Choose a character",
  "panel.modeTitle": "Light / dark / follow system",
  "mode.auto": "Follow system",
  "mode.light": "Light",
  "mode.dark": "Dark",
  "panel.restore": "Restore system skin"
};

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null): void {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable / quota — the preference stays process-local
  }
}

interface SavedPreference {
  /** Whether a sanrio skin is currently active (on). Fresh install defaults to on. */
  enabled: boolean;
  character: string;
  mode: FollowMode;
}

function readSaved(): SavedPreference {
  const enabledRaw = readStorage(STORAGE_ENABLED);
  const character = readStorage(STORAGE_CHAR);
  const mode = readStorage(STORAGE_MODE);
  const validCharacter = CHARACTERS.some((c) => c.id === character);
  const validMode = mode === "auto" || mode === "light" || mode === "dark";
  return {
    enabled: enabledRaw === null ? true : enabledRaw === "on",
    character: validCharacter ? (character as string) : DEFAULT_CHARACTER,
    mode: validMode ? (mode as FollowMode) : DEFAULT_MODE
  };
}

function writeSaved(saved: SavedPreference): void {
  writeStorage(STORAGE_ENABLED, saved.enabled ? "on" : "off");
  writeStorage(STORAGE_CHAR, saved.character);
  writeStorage(STORAGE_MODE, saved.mode);
}

/* ------------------------------------------------------------------ */
/* Base stylesheet (mounts only while a sanrio theme is active)        */
/* ------------------------------------------------------------------ */

const BASE_CSS_RULES = [
  [
    "body",
    '  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;'
  ],
  [
    "body :is(button, input, textarea)",
    "  border-radius: 12px;"
  ],
  [
    "body :is(button, [role=\"button\"], [class*=\"item\"], [class*=\"Item\"])",
    "  transition: transform .12s ease, background-color .12s ease;"
  ],
  [
    "body :is(button, [role=\"button\"]):hover:not(:disabled)",
    "  transform: translateY(-1px);"
  ],
  [
    "::-webkit-scrollbar",
    "  width: 10px; height: 10px;"
  ],
  [
    "::-webkit-scrollbar-thumb",
    "  background: var(--dsw-alias-scrollbar-bg-l1, #ccc); border-radius: 10px;"
  ],
  [
    "::-webkit-scrollbar-thumb:hover",
    "  background: var(--dsw-alias-scrollbar-hover-l1, #aaa);"
  ],
  [
    "::-webkit-scrollbar-track",
    "  background: transparent;"
  ]
].map(([selector, body]) => {
  const boosted = (selector as string)
    .split(",")
    .map((part) => `${part.trim()}:not(#dsh-sanrio)`)
    .join(",");
  return `${boosted} {\n${body}\n}`;
}).join("\n");

/* ------------------------------------------------------------------ */
/* Skin panel                                                          */
/* ------------------------------------------------------------------ */

/** Cube card style, matching the built-in AppearanceRow (figma 501:30015). */
const cubeBase: React.CSSProperties = {
  boxSizing: "border-box",
  border: "1px solid var(--dsw-alias-border-l2)",
  font: "inherit",
  color: "var(--dsw-alias-label-primary)",
  cursor: "pointer",
  background: "transparent",
  borderRadius: "16px",
  flexDirection: "column",
  flex: "180px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  padding: "20px 32px",
  fontSize: "14px",
  lineHeight: "22px",
  display: "flex",
  outline: "none"
};
const cubeSelected: React.CSSProperties = {
  background: "transparent",
  borderColor: "var(--dsw-alias-brand-primary)",
  boxShadow: "inset 0 0 0 2px var(--dsw-alias-brand-primary)"
};

function cubeStyle(active: boolean): React.CSSProperties {
  return active ? { ...cubeBase, ...cubeSelected } : cubeBase;
}

const panel: React.CSSProperties = {
  width: "100%",
  maxWidth: "720px",
  color: "var(--dsw-alias-label-primary)",
  flexDirection: "column",
  gap: "14px",
  display: "flex"
};
const heading: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: "28px",
  color: "var(--dsw-alias-label-primary)",
  margin: 0
};
const intro: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "var(--dsw-alias-label-secondary)",
  margin: 0
};
const subtitle: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "var(--dsw-alias-label-secondary)",
  margin: "0"
};
const cubeRow: React.CSSProperties = {
  flexWrap: "wrap",
  alignItems: "stretch",
  gap: "8px",
  display: "flex"
};

/* Segmented mode control — deliberately smaller + grouped, so it reads as a
   sub-option of the selected character, not another character card. */
const modeGroup: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  flexWrap: "wrap",
  background: "var(--dsw-alias-border-l1)",
  borderRadius: "12px",
  padding: "6px",
  maxWidth: "420px"
};
const modePillBase: React.CSSProperties = {
  border: "0",
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize: "13px",
  background: "transparent",
  color: "var(--dsw-alias-label-secondary)",
  cursor: "pointer",
  font: "inherit",
  flex: "1",
  minWidth: "96px",
  outline: "none"
};
const modePillSelected: React.CSSProperties = {
  background: "transparent",
  color: "var(--dsw-alias-label-primary)",
  boxShadow: "inset 0 0 0 2px var(--dsw-alias-brand-primary)"
};
function modePillStyle(active: boolean): React.CSSProperties {
  return active ? { ...modePillBase, ...modePillSelected } : modePillBase;
}

const restoreLink: React.CSSProperties = {
  border: "0",
  background: "transparent",
  color: "var(--dsw-alias-label-secondary)",
  cursor: "pointer",
  font: "inherit",
  fontSize: "13px",
  padding: "6px 10px",
  textDecoration: "underline",
  alignSelf: "flex-start"
};

interface PanelProps {
  t: (key: string) => string;
  setCharacter: (id: string) => void;
  setMode: (mode: FollowMode) => void;
  restore: () => void;
  useStore: (
    selector: (s: { preference: string; character: string; mode: FollowMode; revision: number }) => unknown
  ) => unknown;
}

function SanrioSkinPanel({ t, setCharacter, setMode, restore, useStore }: PanelProps) {
  const state = useStore((s) => s) as {
    preference: string;
    character: string;
    mode: FollowMode;
    revision: number;
  };
  const activeCharacter = parseThemeId(state.preference)?.character ?? null;
  return (
    <div style={panel}>
      <h2 style={heading}>{t("panel.title")}</h2>
      <p style={intro}>{t("panel.intro")}</p>

      <div style={subtitle}>{t("panel.charTitle")}</div>
      <div style={cubeRow}>
        {CHARACTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={activeCharacter === c.id}
            style={cubeStyle(activeCharacter === c.id)}
            onClick={() => setCharacter(c.id)}
          >
            <span style={{ fontSize: "20px" }}>{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {activeCharacter !== null && (
        <>
          <div style={subtitle}>{t("panel.modeTitle")}</div>
          <div style={modeGroup}>
            {(["auto", "light", "dark"] as FollowMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={state.mode === m}
                style={modePillStyle(state.mode === m)}
                onClick={() => setMode(m)}
              >
                {t("mode." + m)}
              </button>
            ))}
          </div>
        </>
      )}

      <button type="button" style={restoreLink} onClick={restore}>
        {t("panel.restore")}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

function createSkinStore() {
  return defineStore({
    init: () => ({
      preference: "system",
      character: DEFAULT_CHARACTER,
      mode: DEFAULT_MODE,
      revision: -1
    }),
    actions: {
      sync: (
        d: { preference: string; character: string; mode: FollowMode; revision: number },
        preference: string,
        character: string,
        mode: FollowMode,
        revision: number
      ) => {
        if (revision <= d.revision) return;
        d.preference = preference;
        d.character = character;
        d.mode = mode;
        d.revision = revision;
      }
    }
  });
}

/* ------------------------------------------------------------------ */
/* Client plugin body                                                  */
/* ------------------------------------------------------------------ */

interface ThemeServiceSnapshot {
  preference: string;
  revision?: number;
}

const inject = ["slots", "locale", "theme"];

function apply(ctx: {
  theme: {
    register: (definition: { id: string; colorScheme: string; tokens: Record<string, string> }) => () => void;
    getTheme: () => ThemeServiceSnapshot;
    setTheme: (id: string) => void;
  };
  slots: {
    inject: (slot: string, registrar: () => unknown) => unknown;
    register: (declaration: Record<string, unknown>, component: unknown) => unknown;
  };
  locale: {
    register: (ns: string, dict: Record<string, unknown>) => () => void;
    bind: (ns: string) => (key: string) => string;
  };
  effect: (fn: () => unknown, label?: string) => void;
  on: (event: string, handler: (snapshot: ThemeServiceSnapshot) => void) => unknown;
}) {
  console.log("[dsh-sanrio-skin] client plugin boot");

  const disposers = THEMES.map((theme) => ctx.theme.register(theme));
  ctx.effect(() => () => {
    for (const dispose of disposers) dispose();
  }, "dsh-sanrio-skin: theme registration");

  ctx.effect(
    () => ctx.locale.register(SETTINGS_NS, { zh, en }),
    "dsh-sanrio-skin: skin tab dictionaries"
  );

  /* ---- base stylesheet lifecycle ---- */
  const style = document.createElement("style");
  style.textContent = BASE_CSS_RULES;
  const syncBaseCss = (snapshot: ThemeServiceSnapshot) => {
    const active = isSanrioThemeId(snapshot.preference);
    if (active && !style.isConnected) document.head.appendChild(style);
    if (!active && style.isConnected) style.remove();
  };
  syncBaseCss(ctx.theme.getTheme());
  ctx.on("theme/change", syncBaseCss);
  ctx.effect(() => () => {
    style.remove();
  }, "dsh-sanrio-skin: base stylesheet lifecycle");

  /* ---- decor lifecycle ---- */
  const syncDecor = (snapshot: ThemeServiceSnapshot) => {
    const parsed = parseThemeId(snapshot.preference);
    if (parsed === null) {
      removeDecor();
      return;
    }
    const character = CHARACTERS.find((c) => c.id === parsed.character);
    if (character === undefined) {
      removeDecor();
      return;
    }
    mountDecor(character);
  };
  syncDecor(ctx.theme.getTheme());
  ctx.on("theme/change", syncDecor);
  ctx.effect(() => () => {
    removeDecor();
  }, "dsh-sanrio-skin: decor lifecycle");

  /* ---- skin store ---- */
  const skinStore = createSkinStore();
  let bound:
    | { sync: (preference: string, character: string, mode: FollowMode, revision: number) => void }
    | undefined;
  const syncStore = (snapshot: ThemeServiceSnapshot) => {
    const pref = snapshot.preference;
    const parsed = parseThemeId(pref);
    const saved = readSaved();
    const character = parsed !== null ? parsed.character : saved.character;
    const mode = parsed !== null ? (saved.mode === "auto" ? "auto" : saved.mode) : saved.mode;
    bound?.sync(pref, character, mode, snapshot.revision ?? 0);
  };
  ctx.on("theme/change", syncStore);
  ctx.effect(() => () => {
    bound = undefined;
  }, "dsh-sanrio-skin: skin store binding");

  const injected = (
    actions: { sync: (preference: string, character: string, mode: FollowMode, revision: number) => void }
  ) => {
    bound = actions;
    const saved = readSaved();
    bound.sync(ctx.theme.getTheme().preference, saved.character, saved.mode, -1);
    return {
      setCharacter: (id: string) => {
        const next = readSaved();
        next.enabled = true;
        next.character = id;
        writeSaved(next);
        ctx.theme.setTheme(resolveThemeId(id, next.mode));
      },
      setMode: (mode: FollowMode) => {
        const next = readSaved();
        next.enabled = true;
        next.mode = mode;
        writeSaved(next);
        ctx.theme.setTheme(resolveThemeId(next.character, mode));
      },
      restore: () => {
        writeSaved({ ...readSaved(), enabled: false });
        ctx.theme.setTheme("system");
      }
    };
  };

  /* ---- register the skin tab under Plugins -> 三丽鸥皮肤 ---- */
  ctx.slots.inject("settings.plugins.tab", () =>
    ctx.slots.register(
      {
        name: "settings.plugins.tab",
        id: "sanrio",
        order: 5,
        label: () => ctx.locale.bind(SETTINGS_NS)("tab.label"),
        locale: SETTINGS_NS,
        store: skinStore,
        inject: injected
      },
      SanrioSkinPanel
    )
  );

  /* ---- boot restore (only when a sanrio skin is enabled) ---- */
  const saved = readSaved();
  let bootGuard = saved.enabled ? 3 : 0;
  const reassertSaved = () => {
    if (bootGuard <= 0) return;
    const current = ctx.theme.getTheme().preference;
    const target = resolveThemeId(saved.character, saved.mode);
    if (current === target) return;
    bootGuard -= 1;
    ctx.theme.setTheme(target);
  };
  reassertSaved();
  const bootWindow = setTimeout(() => {
    bootGuard = 0;
  }, 5000);
  ctx.effect(() => () => {
    clearTimeout(bootWindow);
  }, "dsh-sanrio-skin: boot restore window");

  /* ---- auto mode: follow prefers-color-scheme live ---- */
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMediaChange = () => {
    const current = readSaved();
    if (!current.enabled || current.mode !== "auto") return;
    if (!isSanrioThemeId(ctx.theme.getTheme().preference)) return;
    ctx.theme.setTheme(resolveThemeId(current.character, "auto"));
  };
  media.addEventListener("change", onMediaChange);
  ctx.effect(() => () => {
    media.removeEventListener("change", onMediaChange);
  }, "dsh-sanrio-skin: auto mode media listener");
}

export { apply, inject };
