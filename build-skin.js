// Build: reads config + template -> sanrio-skin.js / sanrio-skin.user.js
const fs = require("fs");
const path = require("path");
const dir = __dirname;
const css = fs.readFileSync(path.join(dir, "sanrio-skin.css"), "utf8");
const manager = fs.readFileSync(path.join(dir, "skin-manager.css"), "utf8");
const assets = JSON.parse(fs.readFileSync(path.join(dir, "skin-assets.json"), "utf8").replace(/^\uFEFF/, ""));
let template = fs.readFileSync(path.join(dir, "skin-template.js"), "utf8");

template = template.replace("__COLOR_CSS__", "injectCss(" + JSON.stringify(css) + ", 'sk-color-css');");
template = template.replace("__MANAGER_CSS__", "injectCss(" + JSON.stringify(manager) + ", 'sk-manager-css');");
template = template.replace("__ASSETS__", JSON.stringify(assets));

const HEADER = "// ==UserScript==\n// @name         Sanrio Skin for DeepSeek Harness\n// @namespace    https://github.com/sanrio-skin\n// @version      0.3.0\n// @description  5-character Sanrio skin with mascot + light/dark + manual/daily.\n// @match        http://127.0.0.1:3080/*\n// @match        http://localhost:3080/*\n// @run-at       document-end\n// @grant        none\n// ==/UserScript==\n";

fs.writeFileSync(path.join(dir, "sanrio-skin.js"), template);
fs.writeFileSync(path.join(dir, "sanrio-skin.user.js"), HEADER + template);
console.log("built js", template.length, "user.js", (HEADER + template).length);
