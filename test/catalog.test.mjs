import { ok as _ok, done } from "./engine.test.mjs";
const ok = (c, name) => _ok(name, () => { if (!c) throw new Error("assertion"); });
import { FAMILIES, variantOf, exportCss } from "../src/lib/data/catalog.mjs";
import { KITS } from "../src/lib/data/kits.mjs";
import { buildDesignMd } from "../src/lib/engine/export.mjs";
import { coherence } from "../src/lib/engine/coherence.mjs";
const ctx = { uid: "t-", scope: (_, h) => h };
for (const f of FAMILIES) {
  ok(f.variants.length >= 4, `${f.id} a >=4 variantes`);
  ok(new Set(f.variants.map((v) => v.id)).size === f.variants.length, `${f.id} ids uniques`);
  for (const v of f.variants) {
    ok(typeof (v.demo || f.demo)(ctx) === "string", `${f.id}/${v.id} demo`);
    ok(v.spec.length >= 2 && v.attrs && exportCss(f.id, v.id).length > 50, `${f.id}/${v.id} complet`);
    ok(!exportCss(f.id, v.id).includes("&"), `${f.id}/${v.id} css export sans &`);
  }
}
for (const k of KITS) {
  ok(Object.keys(k.picks).length >= 28 && Object.entries(k.picks).every(([f, v]) => variantOf(f, v)), `kit ${k.id} complet`);
  const md = buildDesignMd({ ...k, stack: "html", name: "T" });
  ok(md.includes("## Appendix A") && md.includes("--accent:") && md.includes("Appendix B"), `kit ${k.id} export`);
  ok(coherence(k).score >= 80, `kit ${k.id} cohérent`);
}
const messy = { theme: "cobalt", type: "schibsted", mode: "light", shape: { radius: "sharp", density: "normal", border: "hairline", depth: "flat", motion: "smooth" }, picks: { buttons: "pill", inputs: "brut", cards: "glass", tabs: "brackets", modals: "sheet" } };
ok(coherence(messy).score < 75, "mélange incohérent détecté");
done();
