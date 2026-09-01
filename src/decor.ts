/**
 * dsh-sanrio-skin — decor layer (browser side).
 *
 * DOM decorations injected on top of the theme tokens: the brand text over
 * the header (every character) plus per-character decorations (mascot,
 * right-edge peek, friends row, brand box covering the whale logo). These
 * cannot be expressed as tokens, so they are absolutely-positioned overlays,
 * cleaned up when the active theme is not one of ours.
 *
 * Each decorated character maps to its own asset set (see DECOR_ASSETS);
 * the layout is uniform (Pompompurin arrangement) and only the images differ.
 */
import type { Character } from "./themes";

/** Asset URL served by the host half at /sanrio-skin-assets/<name>. */
export function decorAsset(name: string): string {
  return `/sanrio-skin-assets/${name}`;
}

const DECOR_IDS = [
  "sk-mascot",
  "sk-peek",
  "sk-brandtext",
  "sk-font",
  "sk-friends-row",
  "sk-brandbox"
];

/** Per-character decor asset set. Absent characters get brand text only. */
const DECOR_ASSETS: Record<
  string,
  { mascot: string; peek: string; brand: string; friends: string[]; peekFade?: string; peekZ?: number; mascotSize?: { w: number; h: number; left: number; bottom: number } }
> = {
  pudding: {
    mascot: "mascot.gif",
    mascotSize: { w: 140, h: 140, left: 70, bottom: 84 },
    peek: "peek.png",
    brand: "brandlogo.png",
    friends: [...Array(15).keys()].map((i) => `friend-${i}.png`),
    peekFade:
      "-webkit-mask-image:linear-gradient(to bottom, black 0%, black 72%, transparent 100%);mask-image:linear-gradient(to bottom, black 0%, black 72%, transparent 100%);",
    peekZ: 0
  },
  kitty: {
    mascot: "kitty-mascot.gif",
    mascotSize: { w: 190, h: 190, left: 46, bottom: 70 },
    peek: "kitty-peek.png",
    brand: "kitty-brandlogo.png",
    friends: [...Array(12).keys()].map((i) => `kitty-friend-${i}.png`),
    peekFade: "-webkit-mask-image:none;mask-image:none;",
    peekZ: 40
  }
};

/** Remove every decor element (and the friends row's children). */
export function removeDecor(): void {
  for (const id of DECOR_IDS) {
    const el = document.getElementById(id);
    if (el !== null) el.remove();
  }
  document.querySelectorAll(".sk-f").forEach((el) => el.remove());
  document.body.style.removeProperty("--sk-img-avatar");
}

/** Add one fixed-position overlay div to <body>. */
function add(id: string, style: string): void {
  const existing = document.getElementById(id);
  if (existing !== null) existing.remove();
  const div = document.createElement("div");
  div.id = id;
  div.setAttribute("style", style);
  document.body.appendChild(div);
}

/**
 * Mount the decorations for one character. Callers must call removeDecor()
 * when the active theme stops being one of ours.
 */
export function mountDecor(character: Character): void {
  removeDecor();
  const assets = DECOR_ASSETS[character.id];
  const bg = (url: string) => `url("${url}")`;

  // Mascot (sidebar, above the settings icon).
  if (assets !== undefined) {
    add(
      "sk-mascot",
      `position:fixed;left:${assets.mascotSize?.left ?? 64}px;bottom:${assets.mascotSize?.bottom ?? 80}px;width:${assets.mascotSize?.w ?? 150}px;height:${assets.mascotSize?.h ?? 150}px;pointer-events:none;z-index:6;opacity:.95;border-radius:22px;background-image:${bg(decorAsset(assets.mascot))};background-size:contain;background-position:center bottom;background-repeat:no-repeat;`
    );
  }

  const hdr = document.querySelector<HTMLElement>(
    'header[class*="wSkVaW"], [class*="wSkVaW_header"]'
  );
  if (hdr !== null) hdr.style.position = "relative";
  const baseY = hdr !== null ? hdr.getBoundingClientRect().bottom : 78;

  // Peek (bottom-right, head peeking out).
  if (assets !== undefined) {
    add(
      "sk-peek",
      `position:fixed;right:0;bottom:0;width:28vw;height:56vh;pointer-events:none;z-index:${assets.peekZ ?? 0};opacity:.92;background-image:${bg(decorAsset(assets.peek))};background-size:contain;background-position:right bottom;background-repeat:no-repeat;${assets.peekFade ?? ""}`
    );
  }

  if (document.getElementById("sk-font") === null) {
    const link = document.createElement("link");
    link.id = "sk-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }

  let brandText = document.getElementById("sk-brandtext") as HTMLElement | null;
  if (brandText === null) {
    brandText = document.createElement("div");
    brandText.id = "sk-brandtext";
    (hdr ?? document.body).appendChild(brandText);
  }
  brandText.textContent = character.name;
  const heart = document.createElement("span");
  heart.textContent = "\u2665";
  heart.style.cssText = "color:#e2574c;font-size:.8em;margin-left:8px;";
  brandText.appendChild(heart);
  brandText.style.cssText =
    `position:${hdr !== null ? "absolute" : "fixed"};left:50%;top:14px;` +
    "transform:translateX(-50%);z-index:4000;pointer-events:none;" +
    'font-family:"Baloo 2","Comic Sans MS","Chalkboard SE",cursive,sans-serif;' +
    "font-weight:700;font-size:44px;line-height:1;color:#7a5236;" +
    "letter-spacing:1px;text-shadow:0 2px 0 rgba(255,255,255,.45);white-space:nowrap;";

  if (assets !== undefined) {
    // Friends row along the bottom edge of the header.
    let row = document.getElementById("sk-friends-row") as HTMLElement | null;
    if (row === null) {
      row = document.createElement("div");
      row.id = "sk-friends-row";
      document.body.appendChild(row);
    }
    row.style.cssText = `position:fixed;left:280px;right:60px;top:${baseY}px;height:0;pointer-events:none;z-index:1;`;
    row.querySelectorAll(".sk-f").forEach((el) => el.remove());
    const n = assets.friends.length;
    const xs = [18, 23, 28, 33, 38, 62, 66, 70, 74, 78, 82, 86];
    assets.friends.forEach((name, i) => {
      const img = document.createElement("div");
      img.className = "sk-f";
      const x = xs[i % xs.length];
      const h = 32;
      img.style.cssText =
        `position:absolute;bottom:0;left:${x}%;height:${h}px;width:${h}px;` +
        `background-image:url("${decorAsset(name)}");background-size:contain;background-position:center bottom;background-repeat:no-repeat;opacity:.95;`;
      row!.appendChild(img);
    });

    // Brand box covering the whale logo in the sidebar header.
    let brandBox = document.getElementById("sk-brandbox") as HTMLElement | null;
    if (brandBox === null) {
      brandBox = document.createElement("div");
      brandBox.id = "sk-brandbox";
      document.body.appendChild(brandBox);
    }
    brandBox.style.cssText =
      "position:fixed;left:12px;top:10px;width:254px;height:48px;" +
      "background:var(--dsw-specific-sidebar-fill);border-radius:10px;z-index:40;" +
      "pointer-events:none;display:flex;align-items:center;padding:0 10px;box-sizing:border-box;";
    brandBox.innerHTML = "";
    const icon = document.createElement("div");
    icon.style.cssText =
      `height:38px;width:38px;flex:0 0 38px;background-image:url("${decorAsset(assets.brand)}");` +
      "background-size:contain;background-position:center;background-repeat:no-repeat;";
    const text = document.createElement("span");
    text.style.cssText =
      "font-weight:700;font-size:18px;color:#2b2b2b;font-family:inherit;margin-left:8px;white-space:nowrap;";
    text.innerHTML =
      'deepseek <span style="border:1px solid #2b2b2b;font-size:11px;font-weight:600;' +
      'padding:1px 5px;border-radius:4px;vertical-align:middle;margin-left:4px;">HARNESS</span>';
    brandBox.appendChild(icon);
    brandBox.appendChild(text);
  }

  // Avatar badge var used by the legacy skin's avatar decoration.
  document.body.style.setProperty("--sk-img-avatar", decorAsset("avatar.jpg"));
}
