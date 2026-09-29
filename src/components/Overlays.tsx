import { useEffect, useMemo, useRef, useState } from "react";
import { FAMILIES, familyById, variantOf, exportCss } from "../lib/data/catalog.mjs";
import { THEMES, themeById } from "../lib/data/themes.mjs";
import { TYPES } from "../lib/data/typography.mjs";
import { KITS } from "../lib/data/kits.mjs";
import { resolveCfg } from "../lib/engine/tokens.mjs";
import { coherence, energyLabel, variantFit } from "../lib/engine/coherence.mjs";
import { buildDesignMd, STACK_LIST } from "../lib/engine/export.mjs";
import { useApp, useUi, set, setUi, closeAll, go, pick, unpick, toggleFav, applyKit, toast, copyOrShow, copyDesignMd, downloadDesignMd } from "../store";
import { Ic, VariantStage } from "./bits";

/* ---------------- fenêtre de détail ---------------- */
export function Dialog() {
  const s = useApp(); const ui = useUi();
  const d = ui.dialog!;
  const fam = familyById[d.fam], v = variantOf(d.fam, d.var);
  const idx = fam.variants.findIndex((x: any) => x.id === d.var);
  const picked = s.picks[d.fam] === d.var, fav = s.favs.includes(d.fam + ":" + d.var);
  const fit = variantFit(s, d.fam, v);
  const code = d.tab === "css" ? exportCss(d.fam, d.var) : (v.snippet || fam.snippet).trim();
  const nav = (n: number) => setUi({ dialog: { ...d, var: fam.variants[(idx + n + fam.variants.length) % fam.variants.length].id } });
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName)) return;
      if (e.key === "ArrowRight") nav(1); if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  });
  return (
    <>
      <div className="u-scrim" onClick={closeAll} />
      <div className="u-dlg" role="dialog" aria-modal="true" aria-label={`${fam.label} : ${v.name}`}>
        <div className="u-dlg-l">
          <VariantStage fam={fam} v={v} />
          <div className="u-code">
            <div className="u-code-h">
              <div className="u-seg">{(["html", "css"] as const).map((t) => <button key={t} aria-pressed={d.tab === t} onClick={() => setUi({ dialog: { ...d, tab: t } })}>{t.toUpperCase()}</button>)}</div>
              <button className="ub ub-sm" onClick={() => copyOrShow(code, d.tab === "css" ? "CSS copié" : "HTML copié")}><Ic name="copy" size={14} />Copier</button>
            </div>
            <pre>{code}</pre>
          </div>
        </div>
        <div className="u-dlg-r">
          <h3><small>{fam.label} · {idx + 1}/{fam.variants.length}</small>{v.name}</h3>
          <p>{v.desc}</p>
          <div className="u-tags">{v.tags.map((t: string) => <span className="u-tag" key={t}>{t}</span>)}<span className="u-tag">{energyLabel(v.attrs.energy)}</span></div>
          {fit && <p className={"u-fit " + (fit === "clash" ? "clash" : "")} style={{ margin: 0 }}>{fit === "good" ? "S'accorde bien avec le reste de ton style." : "Détonne avec le reste de ton style : à choisir en connaissance de cause."}</p>}
          <ul className="u-spec">{v.spec.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
          <div className="u-dlg-acts">
            <button className={"ub ub-lg " + (picked ? "ub-fill" : "ub-solid")} onClick={() => pick(d.fam, d.var)}><Ic name={picked ? "check" : "plus"} />{picked ? "Choisi pour mon style" : "Choisir pour mon style"}</button>
            <div className="row2">
              <button className="ub" onClick={() => toggleFav(d.fam, d.var)}><Ic name="heart" size={15} />{fav ? "Retirer" : "Favori"}</button>
              <div className="u-nav-arrows"><button className="ub" style={{ flex: 1 }} onClick={() => nav(-1)} aria-label="Précédent"><span style={{ display: "contents", transform: "rotate(180deg)" }}><Ic name="chevron" size={15} /></span></button>
                <button className="ub" style={{ flex: 1 }} onClick={() => nav(1)} aria-label="Suivant"><Ic name="chevron" size={15} /></button></div>
            </div>
          </div>
        </div>
        <button className="u-icon u-close" onClick={closeAll} aria-label="Fermer"><Ic name="x" size={17} /></button>
      </div>
    </>
  );
}

/* ---------------- tiroir « Mon style » ---------------- */
export function Drawer() {
  const s = useApp();
  const coh = coherence(s), r = resolveCfg(s), th = r.theme, c = th[s.mode];
  const md = useMemo(() => buildDesignMd(s), [s]);
  const kb = Math.round(new Blob([md]).size / 1024), lines = md.split("\n").length;
  const done = FAMILIES.filter((f: any) => s.picks[f.id]).length;
  const goClose = (v: string) => { closeAll(); go(v); };
  return (
    <>
      <div className="u-scrim" onClick={closeAll} />
      <aside className="u-drawer" role="dialog" aria-modal="true" aria-label="Mon style">
        <div className="u-dr-h"><div><h3>Mon style</h3><p>Ce qui sera écrit dans ton DESIGN.md</p></div><button className="u-icon" onClick={closeAll} aria-label="Fermer"><Ic name="x" size={17} /></button></div>
        <div className="u-dr-b">
          <section className="u-dr-s"><h5>Identité</h5><div className="u-id">
            <div className="u-id-r"><span>Palette</span><b style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="u-sw" style={{ width: 96 }}>{[c.bg, c.surface, c.border, c.text, c.accent, c.accentSoft].map((x: string, i: number) => <i key={i} style={{ background: x }} />)}</span>{th.name}</b></div>
            <div className="u-id-r"><span>Typographie</span><b>{r.type.name}</b></div>
            <div className="u-id-r"><span>Forme</span><b>{r.radius.name} · {r.density.name}</b></div>
            <div className="u-id-r"><span>Relief</span><b>{r.border.name} · {r.depth.name} · {r.motion.name}</b></div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{[["colors", "Couleurs"], ["type", "Typo"], ["shape", "Forme"], ["kits", "Kits"]].map(([v, l]) => <button key={v} className="ub ub-sm" onClick={() => goClose(v)}>{l}</button>)}</div>
          </div></section>
          <section className="u-dr-s"><h5>Cohérence</h5>
            <div className={"u-meter tone-" + coh.tone}><div className="u-meter-h"><b>{coh.score != null ? coh.score : "–"}</b><span>{coh.label}{coh.dominant ? " · " + energyLabel(coh.dominant) : ""}</span></div><div className="u-bar"><i style={{ width: (coh.score || 0) + "%" }} /></div></div>
            {coh.issues.length ? <ul className="u-issues">{coh.issues.map((i: any, k: number) => <li key={k} className={i.level}>{i.text}{i.fam && <> <a href="#" onClick={(e) => { e.preventDefault(); goClose("fam:" + i.fam); }} style={{ color: "var(--u-tx)" }}>Voir</a></>}</li>)}</ul>
              : <p style={{ margin: "10px 0 0", color: "var(--u-tx2)" }}>{coh.score == null ? "Choisis au moins deux composants pour évaluer l'harmonie de ton style." : "Tes choix forment un ensemble harmonieux."}</p>}
          </section>
          <section className="u-dr-s"><h5>Composants <span>{done}/{FAMILIES.length}</span></h5>
            <div className="u-rows">{FAMILIES.map((f: any) => { const v = variantOf(f.id, s.picks[f.id]); return (
              <div className="u-row" key={f.id}><span className="ic-l"><Ic name={f.icon} /></span><span className="lbl">{f.label}</span><span className={"val" + (v ? "" : " none")}>{v ? v.name : "Non défini"}</span>
                {v && <button className="u-icon" style={{ width: 28, height: 28, border: 0, background: "none" }} onClick={() => unpick(f.id)} aria-label="Retirer"><Ic name="x" size={14} /></button>}
                <button className="ub ub-sm ub-ghost" onClick={() => goClose("fam:" + f.id)}>{v ? "Changer" : "Choisir"}</button></div>); })}</div>
          </section>
          <section className="u-dr-s"><h5>Fichier</h5>
            <div className="u-field"><label htmlFor="f-name">Nom du projet</label><input className="u-input" id="f-name" value={s.name} onChange={(e) => set({ name: e.target.value })} placeholder="Ex. Nomade" /></div>
            <div className="u-field"><label htmlFor="f-kind">Type de produit (facultatif)</label><input className="u-input" id="f-kind" value={s.kind} onChange={(e) => set({ kind: e.target.value })} placeholder="Ex. application de facturation pour freelances" /></div>
            <div className="u-field"><label htmlFor="f-stack">Stack</label><select className="u-input" id="f-stack" value={s.stack} onChange={(e) => set({ stack: e.target.value })}>{STACK_LIST.map((x: any) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
          </section>
        </div>
        <div className="u-dr-f">
          <button className="ub ub-fill ub-lg ub-block" onClick={copyDesignMd}><Ic name="copy" />Copier le DESIGN.md</button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button className="ub" onClick={() => setUi({ file: true })}><Ic name="code" size={15} />Voir le fichier</button>
            <button className="ub" onClick={downloadDesignMd}><Ic name="download" size={15} />Télécharger</button></div>
          <div style={{ textAlign: "center", color: "var(--u-tx3)", fontSize: 12 }}>{kb} Ko · {lines.toLocaleString("fr-FR")} lignes · à placer à la racine du projet</div>
        </div>
      </aside>
    </>
  );
}

export function FileModal() {
  const s = useApp();
  const md = useMemo(() => buildDesignMd(s), [s]);
  return (
    <>
      <div className="u-scrim" style={{ zIndex: 42 }} onClick={() => setUi({ file: false })} />
      <div className="u-file" role="dialog" aria-modal="true" aria-label="Aperçu du DESIGN.md">
        <div className="u-dr-h"><div><h3>DESIGN.md</h3><p>Aperçu du fichier généré</p></div>
          <div style={{ display: "flex", gap: 8 }}><button className="ub ub-fill" onClick={copyDesignMd}><Ic name="copy" size={15} />Copier</button><button className="u-icon" onClick={() => setUi({ file: false })} aria-label="Fermer"><Ic name="x" size={17} /></button></div></div>
        <textarea readOnly spellCheck={false} value={md} onFocus={(e) => e.currentTarget.select()} />
      </div>
    </>
  );
}

/* ---------------- palette de commandes ---------------- */
interface Item { sec: string; label: string; sub: string; icon: string; run: () => void; hay: string }
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
let cache: Item[] | null = null;
function items(): Item[] {
  if (cache) return cache;
  const out: Item[] = [];
  const add = (sec: string, label: string, sub: string, icon: string, run: () => void) => out.push({ sec, label, sub, icon, run, hay: norm(`${label} ${sub} ${sec}`) });
  const nav = (v: string) => () => { closeAll(); go(v); };
  add("Navigation", "Kits de départ", `${KITS.length} styles`, "layers", nav("kits"));
  add("Navigation", "Couleurs", `${THEMES.length} palettes`, "palette", nav("colors"));
  add("Navigation", "Typographie", `${TYPES.length} associations`, "type", nav("type"));
  add("Navigation", "Forme et sensations", "rayons, ombres…", "shapes", nav("shape"));
  add("Navigation", "Mon style", "exporter", "sparkle", () => setUi({ palette: false, drawer: true }));
  FAMILIES.forEach((f: any) => add("Familles", f.label, `${f.variants.length} variantes`, f.icon, nav("fam:" + f.id)));
  FAMILIES.forEach((f: any) => f.variants.forEach((v: any) => add("Variantes", `${f.label} · ${v.name}`, v.tags.join(", "), f.icon, () => setUi({ palette: false, dialog: { fam: f.id, var: v.id, tab: "html" } }))));
  THEMES.forEach((t: any) => add("Palettes", t.name, t.mood, "palette", () => { set({ theme: t.id }); closeAll(); go("colors"); toast(`Palette « ${t.name} » sélectionnée`); }));
  TYPES.forEach((t: any) => add("Polices", t.name, t.mood, "type", () => { set({ type: t.id }); closeAll(); go("type"); }));
  KITS.forEach((k: any) => add("Kits", k.name, "appliquer", "layers", () => { closeAll(); go("kits"); applyKit(k.id); }));
  return (cache = out);
}
export function Palette() {
  const [q, setQ] = useState(""); const [idx, setIdx] = useState(0);
  const res = useMemo(() => {
    const n = norm(q).trim();
    let l = items();
    if (n) { const parts = n.split(/\s+/); l = l.filter((i) => parts.every((p) => i.hay.includes(p))).sort((a, b) => +b.hay.startsWith(n) - +a.hay.startsWith(n)); }
    else l = l.filter((i) => i.sec === "Navigation" || i.sec === "Familles");
    return l.slice(0, 40);
  }, [q]);
  const sel = Math.min(idx, Math.max(0, res.length - 1));
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }); }, [sel, q]);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((sel + 1) % Math.max(1, res.length)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((sel - 1 + res.length) % Math.max(1, res.length)); }
    else if (e.key === "Enter") { e.preventDefault(); res[sel]?.run(); }
  };
  let last = "";
  return (
    <>
      <div className="u-scrim" style={{ zIndex: 42 }} onClick={closeAll} />
      <div className="u-pal" role="dialog" aria-modal="true" aria-label="Recherche">
        <div className="u-pal-in"><Ic name="search" size={18} />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} onKeyDown={onKey} placeholder="Bouton, navbar, Cobalt, Fraunces…" autoComplete="off" spellCheck={false} aria-label="Rechercher" /><kbd className="u-kbd">Échap</kbd></div>
        <div className="u-pal-list" role="listbox" ref={listRef}>
          {res.map((it, i) => { const head = it.sec !== last ? <div className="u-pal-sec" key={"h" + it.sec}>{it.sec}</div> : null; last = it.sec;
            return [head, <button key={it.sec + it.label} className="u-pal-item" role="option" aria-selected={i === sel} onMouseMove={() => setIdx(i)} onClick={it.run}><Ic name={it.icon} /><span>{it.label}</span><small>{it.sub}</small></button>]; })}
          {!res.length && <div className="u-pal-empty">Aucun résultat pour « {q} »</div>}
        </div>
      </div>
    </>
  );
}

export function Toast() {
  const ui = useUi();
  if (!ui.toast) return null;
  const t = ui.toast;
  return (
    <div className="u-toast" role="status"><span className="ok"><Ic name={t.err ? "info" : "circleCheck"} size={18} /></span><span>{t.msg}</span>
      {t.action && <button className="ub ub-sm" onClick={t.action.run}>{t.action.label}</button>}</div>
  );
}
