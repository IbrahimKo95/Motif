import assert from "node:assert/strict";
import { THEMES, NEUTRALS, customTheme } from "../src/lib/data/themes.mjs";
import { auditTheme, contrast } from "../src/lib/engine/color.mjs";
import { tokensCss, allVars, DEFAULT_CFG } from "../src/lib/engine/tokens.mjs";

let failed = 0;
export const ok = (name, fn) => { try { fn(); console.log("ok   ", name); } catch (e) { failed++; console.log("FAIL ", name, "\n     ", e.message); } };
export const done = () => { console.log(failed ? `\n${failed} test(s) failed` : "\nAll tests passed"); if (failed) process.exitCode = 1; };

for (const t of THEMES) {
  ok(`theme ${t.id}: every required contrast pair passes (light + dark)`, () => {
    const fails = auditTheme(t).filter((r) => !r.pass).map((r) => `${r.mode} ${r.label} ${r.fgHex}/${r.bgHex} ${r.ratio}<${r.min}`);
    assert.deepEqual(fails, []);
  });
}
ok("custom palettes pass AA for any accent (sweep of hues, lightness, neutrals, mono)", () => {
  const fails = [];
  const hex = (n) => "#" + n.toString(16).padStart(6, "0");
  const accents = ["#FFFFFF", "#000000", "#FFFF00", "#00FFFF", "#808080", "#FB3201"];
  for (let i = 0; i < 400; i++) accents.push(hex((i * 2654435761) % 0xffffff)); // pseudo-aléatoire déterministe
  for (const accent of accents) for (const nt of NEUTRALS) for (const mono of [false, true]) {
    const t = customTheme({ accent, neutral: nt.id, mono, name: "t" });
    for (const r of auditTheme(t)) if (!r.pass) fails.push(`${accent}/${nt.id}${mono ? "/mono" : ""} ${r.mode} ${r.label} ${r.ratio}`);
  }
  assert.deepEqual(fails.slice(0, 5), []);
});
ok("custom palette keeps the exact accent when it already passes AA", () => assert.equal(customTheme({ accent: "#1D4ED8" }).light.accent, "#1D4ED8"));
ok("theme ids are unique", () => assert.equal(new Set(THEMES.map((t) => t.id)).size, THEMES.length));
ok("tokensCss has light default, dark media and data-theme override", () => {
  const css = tokensCss(DEFAULT_CFG, "both");
  assert.ok(css.includes(":root {") && css.includes("prefers-color-scheme: dark") && css.includes(':root[data-theme="dark"]'));
  assert.ok(css.includes("--control-h") && css.includes("--r-control") && css.includes("--shadow-md"));
});
ok("allVars exposes every token variants rely on", () => {
  const v = allVars(DEFAULT_CFG, "light");
  for (const k of ["--bg", "--accent-text", "--accent-soft", "--danger-contrast", "--r-control", "--r-surface", "--border-w", "--dur", "--font-display", "--fs-ctl", "--shadow-lg"]) assert.ok(k in v, k);
});
ok("contrast helper: black on white is 21:1", () => assert.equal(Math.round(contrast("#000000", "#FFFFFF")), 21));

if (import.meta.url === `file://${process.argv[1]}`) done();
