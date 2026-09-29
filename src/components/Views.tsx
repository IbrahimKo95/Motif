import { KITS } from "../lib/data/kits.mjs";
import { useEffect, useState } from "react";
import { THEMES, themeById, customTheme, NEUTRALS, isHex } from "../lib/data/themes.mjs";
import { auditTheme } from "../lib/engine/color.mjs";
import { TYPES, typeById } from "../lib/data/typography.mjs";
import { SHAPE_GROUPS, byId } from "../lib/data/shape.mjs";
import { FAMILIES, familyById, variantOf } from "../lib/data/catalog.mjs";
import { colorVars, typeVars, resolveCfg } from "../lib/engine/tokens.mjs";
import { variantFit, energyLabel } from "../lib/engine/coherence.mjs";
import { useApp, set, go, pick, unpick, toggleFav, toggleLock, applyKit, surprise, toast, setUi, copyOrShow, AppState } from "../store";
import { Ic, VariantStage, KitStage, ShapeStage, PageStage, ModeSeg, ViewportSeg, Head } from "./bits";
import { PAGES } from "../lib/preview";

const cssVars = (o: Record<string, string>): React.CSSProperties => o as any;

/* ---------------- carte de variante ---------------- */
export function VariantCard({ fam, v }: { fam: any; v: any }) {
  const s = useApp();
  const picked = s.picks[fam.id] === v.id;
  const fav = s.favs.includes(fam.id + ":" + v.id);
  const fit = variantFit(s, fam.id, v);
  const open = () => setUi({ dialog: { fam: fam.id, var: v.id, tab: "html" }, palette: false });
  return (
    <article className={"u-card" + (picked ? " is-picked" : "")}>
      <VariantStage fam={fam} v={v} />
      <div className="u-acts">
        <button className="u-act" onClick={open} aria-label="Agrandir"><Ic name="expand" size={15} /></button>
        <button className={"u-act" + (fav ? " on" : "")} onClick={() => toggleFav(fam.id, v.id)} aria-label="Favori" aria-pressed={fav}><Ic name="heart" size={15} /></button>
        <button className="u-act" onClick={() => copyOrShow((v.snippet || fam.snippet).trim(), "HTML copié")} aria-label="Copier le HTML"><Ic name="copy" size={15} /></button>
        <button className={"u-act pick" + (picked ? " on" : "")} onClick={() => pick(fam.id, v.id)} aria-pressed={picked}><Ic name={picked ? "check" : "plus"} size={15} /><span>{picked ? "Choisi" : "Choisir"}</span></button>
      </div>
      <div className="u-meta" onClick={open}>
        <div className="u-meta-t"><b>{v.name}</b>
          {fit === "good" && <span className="u-fit" title="S'accorde avec le reste de ton style">Accord</span>}
          {fit === "clash" && <span className="u-fit clash" title="Détonne avec le reste de ton style">Détonne</span>}
        </div>
        <p>{v.desc}</p>
        <div className="u-tags">{v.tags.map((t: string) => <span className="u-tag" key={t}>{t}</span>)}</div>
      </div>
    </article>
  );
}

/* ---------------- famille ---------------- */
export function FamilyView({ id }: { id: string }) {
  const s = useApp();
  const fam = familyById[id];
  const flt = s.filters[id] || "";
  const counts: Record<string, number> = {};
  fam.variants.forEach((v: any) => v.tags.forEach((t: string) => (counts[t] = (counts[t] || 0) + 1)));
  const tags = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 9).map(([t]) => t);
  const list = fam.variants.filter((v: any) => !flt || v.tags.includes(flt));
  const picked = variantOf(id, s.picks[id]);
  const setFlt = (t: string) => set((st) => ({ filters: { ...st.filters, [id]: t } }));
  return (
    <>
      <Head title={fam.label} desc={fam.desc} right={<>{picked && <><LockBtn k={id} /><button className="ub" onClick={() => unpick(id)}><Ic name="x" size={15} />Retirer « {picked.name} »</button></>}<ViewportSeg /><ModeSeg /></>} />
      <div className="u-filters" role="group" aria-label="Filtrer">
        <button className="u-chip" aria-pressed={!flt} onClick={() => setFlt("")}>Tous · {fam.variants.length}</button>
        {tags.map((t) => <button key={t} className="u-chip" aria-pressed={flt === t} onClick={() => setFlt(t)}>{t}</button>)}
      </div>
      <div className={"u-grid " + (s.vp === "mobile" && fam.size === "lg" ? "md" : fam.size || "sm")}>{list.map((v: any) => <VariantCard key={v.id} fam={fam} v={v} />)}</div>
    </>
  );
}

/* ---------------- verrou ---------------- */
export function LockBtn({ k, small }: { k: string; small?: boolean }) {
  const s = useApp();
  const on = s.locks.includes(k);
  const tip = on ? "Verrouillé : « Surprends-moi » n'y touche pas" : "Verrouiller pour « Surprends-moi »";
  if (small) return <button className={"u-icon u-lock" + (on ? " on" : "")} onClick={() => toggleLock(k)} aria-pressed={on} aria-label={tip} title={tip}><Ic name={on ? "lock" : "unlock"} size={14} /></button>;
  return <button className={"ub u-lockb" + (on ? " on" : "")} onClick={() => toggleLock(k)} aria-pressed={on} title={tip}><Ic name={on ? "lock" : "unlock"} size={15} /><span className="lbl">{on ? "Verrouillé" : "Verrouiller"}</span></button>;
}

/* ---------------- contenu réel ---------------- */
/** Réduit le logo à 160 px max pour que localStorage le garde sans peine. */
function readLogo(f: File): Promise<string> {
  return new Promise((ok, ko) => {
    const rd = new FileReader();
    rd.onerror = ko;
    rd.onload = () => {
      const url = rd.result as string;
      if (f.type === "image/svg+xml" && url.length < 80000) return ok(url);
      const img = new Image();
      img.onerror = ko;
      img.onload = () => {
        const k = Math.min(1, 160 / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(img.width * k)); cv.height = Math.max(1, Math.round(img.height * k));
        cv.getContext("2d")!.drawImage(img, 0, 0, cv.width, cv.height);
        ok(cv.toDataURL("image/png"));
      };
      img.src = url;
    };
    rd.readAsDataURL(f);
  });
}
export function ContentFields({ withName = true }: { withName?: boolean }) {
  const s = useApp();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; e.target.value = "";
    if (!f) return;
    readLogo(f).then((logo) => { set({ logo }); toast("Logo appliqué aux aperçus"); }).catch(() => toast("Image illisible", { err: true }));
  };
  return (
    <div className="u-content">
      {withName && <div className="u-field"><label htmlFor="c-name">Nom du projet</label><input className="u-input" id="c-name" value={s.name} onChange={(e) => set({ name: e.target.value })} placeholder="Nomade" maxLength={40} /></div>}
      <div className="u-field"><label htmlFor="c-hl">Accroche (titre du hero)</label><input className="u-input" id="c-hl" value={s.headline} onChange={(e) => set({ headline: e.target.value })} placeholder="Vos factures, payées plus vite." maxLength={90} /></div>
      <div className="u-field"><label htmlFor="c-pt">Texte d'accompagnement</label><textarea className="u-input u-ta" id="c-pt" rows={3} value={s.pitch} onChange={(e) => set({ pitch: e.target.value })} placeholder="Créez un devis, envoyez la facture et relancez automatiquement." maxLength={220} /></div>
      <div className="u-field"><label>Logo</label>
        <div className="u-logo-row"><span className="u-logo-prev">{s.logo ? <img src={s.logo} alt="Logo" /> : <Ic name="image" size={18} />}</span>
          <label className="ub ub-sm">Importer<input type="file" accept="image/*" hidden onChange={onFile} /></label>
          {s.logo && <button className="ub ub-sm ub-ghost" onClick={() => set({ logo: "" })}>Retirer</button>}</div></div>
      {(s.name || s.headline || s.pitch || s.logo) && <button className="ub ub-sm ub-ghost" style={{ justifySelf: "start" }} onClick={() => set({ name: "", headline: "", pitch: "", logo: "" })}><Ic name="reset" size={14} />Revenir à « Nomade »</button>}
    </div>
  );
}

/* ---------------- aperçu sur une page ---------------- */
export function PageView() {
  const s = useApp();
  const page = PAGES.find((p) => p.id === s.page) || PAGES[0];
  const missing = page.fams.filter((f) => !s.picks[f]);
  return (
    <>
      <Head title="Aperçu sur une page" desc="Tes choix assemblés en vraie page, pour juger l'ensemble et pas composant par composant." right={<><ViewportSeg noAuto /><ModeSeg /></>} />
      <div className="u-filters" role="group" aria-label="Type de page">
        {PAGES.map((p) => <button key={p.id} className="u-chip" aria-pressed={page.id === p.id} onClick={() => set({ page: p.id })}>{p.name}</button>)}
      </div>
      <div className="u-page">
        <div className="u-page-main">
          {missing.length > 0 && <p className="u-note"><Ic name="info" size={15} /><span>Pas encore choisis, affichés avec la variante par défaut : {missing.map((f, i) => <span key={f}>{i ? ", " : ""}<a href="#" onClick={(e) => { e.preventDefault(); go("fam:" + f); }}>{familyById[f].label}</a></span>)}.</span></p>}
          <div className="u-card u-page-card"><PageStage /></div>
        </div>
        <aside className="u-page-side">
          <h5>Ton contenu</h5>
          <p>Les aperçus utilisent ton nom, ton texte et ton logo au lieu de « Nomade ».</p>
          <ContentFields />
        </aside>
      </div>
    </>
  );
}

/* ---------------- kits ---------------- */
const sameAsKit = (s: AppState, k: any) =>
  s.theme === k.theme && s.type === k.type && Object.entries(k.shape).every(([a, b]) => s.shape[a] === b) && Object.entries(k.picks).every(([a, b]) => s.picks[a] === b);

export function KitsView() {
  const s = useApp();
  return (
    <>
      <Head title="Kits de départ" desc="Des styles complets pour démarrer en un clic. Tout reste modifiable ensuite, élément par élément." />
      <div className="u-intro">
        <ol><li><b>Pars d'un kit</b> ou de zéro</li><li>Affine chaque <b>élément</b></li><li>Exporte un seul <b>DESIGN.md</b></li></ol>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><button className="ub ub-solid" onClick={() => go("fam:buttons")}>Commencer par les boutons <Ic name="arrow" size={15} /></button><button className="ub" onClick={surprise} title={s.locks.length ? "Les éléments verrouillés sont conservés" : "Verrouille des éléments (cadenas) pour les garder"}><Ic name="sparkle" size={15} />Surprends-moi{s.locks.length > 0 && <span className="u-lockn"><Ic name="lock" size={12} />{s.locks.length}</span>}</button><button className="ub" onClick={() => go("page")}><Ic name="eye" size={15} />Voir sur une page</button></div>
      </div>
      <div className="u-grid kits">
        {KITS.map((k: any) => {
          const th = themeById[k.theme], ty = typeById[k.type], on = sameAsKit(s, k), c = th[k.mode];
          return (
            <article key={k.id} className={"u-card" + (on ? " is-picked" : "")}>
              <KitStage kit={k} />
              <div className="u-kit-body">
                <div className="u-kit-h"><b>{k.name}</b><span className="u-dots" aria-hidden><i style={{ background: c.bg }} /><i style={{ background: c.surface }} /><i style={{ background: c.accent }} /><i style={{ background: c.text }} /></span></div>
                <p>{k.tagline}</p>
                <div className="u-chips"><span className="u-tag">{th.name}</span><span className="u-tag">{ty.name}</span><span className="u-tag">{byId(SHAPE_GROUPS[0].list, k.shape.radius).name}</span><span className="u-tag">{k.mode === "dark" ? "Sombre" : "Clair"}</span></div>
                <div className="u-kit-foot"><button className={"ub" + (on ? "" : " ub-solid")} disabled={on} onClick={() => applyKit(k.id)}>{on ? <><Ic name="check" size={15} />Appliqué</> : "Appliquer ce kit"}</button></div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- couleurs ---------------- */
const TcMock = ({ t, mode, ty, label }: { t: any; mode: string; ty: any; label?: string }) => {
  const c = t[mode];
  return (
    <div className="tc" style={cssVars({ ...colorVars(t, mode), ...ty })}>
      {label && <span className="tc-lbl">{label}</span>}
      <div className="tc-mock"><div className="tc-bar"><i /><i /><i /></div>
        <div className="tc-body"><h4>Résumé du mois</h4><p>12 projets actifs, 3 en retard.</p>
          <div className="tc-row"><span className="tc-btn">Voir</span><span className="tc-badge">Nouveau</span>
            <span className="tc-sem">{[c.success, c.warning, c.danger, c.info].map((x: string, i: number) => <i key={i} style={{ background: x }} />)}</span></div></div></div>
    </div>
  );
};
const Swatches = ({ c, w = 84 }: { c: any; w?: number }) => (
  <span className="u-sw" style={{ width: w }}>{[c.bg, c.surface, c.border, c.text, c.accent, c.accentSoft].map((x: string, i: number) => <i key={i} style={{ background: x }} />)}</span>
);

const QUICK = ["#E5484D", "#F76B15", "#FFC53D", "#46A758", "#12A594", "#0090FF", "#3E63DD", "#6D4AFF", "#D6409F", "#8D8D8D"];
/** Éditeur de palette perso : une couleur d'accent, une teinte de neutres ; le reste est généré (AA garanti). */
function CustomPalette() {
  const s = useApp();
  const c = s.custom;
  const t = customTheme(c);
  const on = s.theme === "custom";
  const ty = typeVars(resolveCfg(s).type);
  const [hex, setHex] = useState(c.accent);
  useEffect(() => setHex(c.accent), [c.accent]);
  const edit = (patch: Partial<typeof c>) => set((st) => ({ custom: { ...st.custom, ...patch }, theme: "custom" }));
  const fails = auditTheme(t).filter((r: any) => !r.pass).length;
  const adjusted = !c.mono && [["clair", t.light.accent], ["sombre", t.dark.accent]].filter(([, x]) => x.toUpperCase() !== t.source);
  return (
    <section className={"u-cp u-card" + (on ? " is-picked" : "")}>
      <div className="u-cp-l">
        <div className="u-cp-h"><b>Créer ma palette</b><span>Choisis ta couleur de marque : fonds, textes, bordures, états et mode sombre sont générés avec un contraste AA vérifié.</span></div>
        <div className="u-field"><label htmlFor="cp-name">Nom</label><input className="u-input" id="cp-name" value={c.name} maxLength={32} onChange={(e) => edit({ name: e.target.value })} /></div>
        <div className="u-field"><label htmlFor="cp-hex">Couleur d'accent</label>
          <div className="u-cp-acc">
            <input type="color" className="u-cp-pick" value={c.accent.toLowerCase()} onChange={(e) => edit({ accent: e.target.value.toUpperCase() })} aria-label="Choisir la couleur" />
            <input className="u-input u-mono" id="cp-hex" value={hex} maxLength={7} spellCheck={false}
              onChange={(e) => { let v = e.target.value.trim(); if (v && v[0] !== "#") v = "#" + v; setHex(v); if (isHex(v)) edit({ accent: v.toUpperCase() }); }}
              onBlur={() => setHex(c.accent)} />
          </div>
          <div className="u-cp-quick">{QUICK.map((q) => <button key={q} style={{ background: q }} aria-label={q} aria-pressed={c.accent === q} onClick={() => edit({ accent: q })} />)}</div>
        </div>
        <div className="u-field"><label>Neutres (fonds, bordures, textes)</label>
          <div className="u-seg" role="group">{NEUTRALS.map((n: any) => <button key={n.id} aria-pressed={c.neutral === n.id} onClick={() => edit({ neutral: n.id })}>{n.name}</button>)}</div></div>
        <label className="u-check"><input type="checkbox" checked={c.mono} onChange={(e) => edit({ mono: e.target.checked })} /><span>Monochrome : les boutons prennent la couleur du texte, l'accent ne sert qu'aux détails</span></label>
        {adjusted && adjusted.length > 0 && <p className="u-cp-note"><Ic name="info" size={14} />Pour rester lisible, l'accent devient {adjusted.map(([m, x], i) => <span key={m}>{i ? " et " : ""}<i style={{ background: x }} /><code>{x}</code> en {m}</span>)}.</p>}
        <div className="u-cp-foot">
          {on ? <span className="u-cp-on"><Ic name="check" size={15} />Palette utilisée</span> : <button className="ub ub-solid" onClick={() => { set({ theme: "custom" }); toast(`Palette « ${t.name} » sélectionnée`); }}>Utiliser cette palette</button>}
          <span className={"u-aa" + (fails ? " bad" : "")}>{fails ? `${fails} contraste(s) faible(s)` : "AA clair + sombre"}</span>
        </div>
      </div>
      <div className="u-cp-r">
        <TcMock t={t} mode="light" ty={ty} label="Clair" />
        <TcMock t={t} mode="dark" ty={ty} label="Sombre" />
        <div className="u-cp-sw"><Swatches c={t.light} w={120} /><Swatches c={t.dark} w={120} /></div>
      </div>
    </section>
  );
}

export function ColorsView() {
  const s = useApp();
  const ty = typeVars(resolveCfg(s).type);
  /* part d'une palette du catalogue pour l'affiner */
  const fork = (e: React.MouseEvent, t: any) => {
    e.stopPropagation();
    set((st) => ({ theme: "custom", custom: { ...st.custom, name: `${t.name} perso`, accent: t.light.accent.toUpperCase(), mono: t.id === "encre" } }));
    document.getElementById("main")?.scrollTo({ top: 0, behavior: "smooth" });
    toast(`« ${t.name} » copiée dans ta palette perso`);
  };
  return (
    <>
      <Head title="Couleurs" desc="Crée ta palette à partir de ta couleur de marque, ou pars d'une des dix-huit palettes. Le contraste (AA) est vérifié en clair comme en sombre." right={<ModeSeg />} />
      <CustomPalette />
      <h2 className="u-sub">Palettes prêtes</h2>
      <div className="u-grid theme">
        {THEMES.map((t: any) => {
          const on = s.theme === t.id, c = t[s.mode];
          return (
            <article key={t.id} className={"u-card" + (on ? " is-picked" : "")} style={{ cursor: "pointer" }} onClick={() => { set({ theme: t.id }); toast(`Palette « ${t.name} » sélectionnée`); }}>
              <TcMock t={t} mode={s.mode} ty={ty} />
              <div className="u-info"><div><b>{t.name}</b><small>{t.mood}</small></div>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Swatches c={c} />
                  <button className="u-icon u-lock" onClick={(e) => fork(e, t)} title="Personnaliser à partir de cette palette" aria-label={`Personnaliser ${t.name}`}><Ic name="wand" size={15} /></button>
                  {on ? <span style={{ color: "var(--u-acc)" }}><Ic name="check" size={17} /></span> : <span className="u-aa">AA</span>}
                </span></div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- typographie ---------------- */
const SAMPLES = ["Des interfaces qui se lisent d'un coup d'œil.", "Construit pour les équipes qui livrent.", "Moins de bruit, plus de clarté.", "Le détail fait la différence."];
export function TypeView() {
  const s = useApp();
  const base = colorVars(resolveCfg(s).theme, s.mode);
  return (
    <>
      <Head title="Typographie" desc="Douze associations de polices Google Fonts. Elles fixent la voix de l'interface plus que n'importe quel autre réglage." right={<ModeSeg />} />
      <div className="u-grid md">
        {TYPES.map((t: any, i: number) => {
          const on = s.type === t.id;
          return (
            <article key={t.id} className={"u-card" + (on ? " is-picked" : "")} style={{ cursor: "pointer" }} onClick={() => set({ type: t.id })}>
              <div className="ty" style={cssVars({ ...base, ...typeVars(t) })}>
                <div className="ty-h">{SAMPLES[i % SAMPLES.length]}</div>
                <p className="ty-p">Un texte courant reste lisible à petite taille, avec un interlignage généreux et des chiffres alignés pour les tableaux.</p>
                <div className="ty-row"><span className="ty-b">Créer un projet</span><span className="ty-n">1 249,00 €</span><span className="ty-m">id_9f3a</span></div>
              </div>
              <div className="u-info"><div><b>{t.name}</b><small>{t.mood}</small></div>{on && <span style={{ color: "var(--u-acc)" }}><Ic name="check" size={17} /></span>}</div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- forme ---------------- */
const SHAPE_DESC: Record<string, string> = { radius: "La forme des coins : c'est le premier signal de personnalité.", density: "La hauteur des contrôles et les espaces intérieurs.", border: "L'épaisseur des contours de tous les composants.", depth: "Comment les surfaces se détachent du fond.", motion: "La vitesse et la courbe des transitions." };
export function ShapeView() {
  const s = useApp();
  return (
    <>
      <Head title="Forme et sensations" desc="Rayons, densité, contours, profondeur et mouvement : la physique de ton interface, appliquée à tous les composants." right={<ModeSeg />} />
      {SHAPE_GROUPS.map((g: any) => (
        <section className="u-section" key={g.key}>
          <h2>{g.label}</h2><p>{SHAPE_DESC[g.key]}</p>
          <div className="u-grid shape">
            {g.list.map((o: any) => {
              const on = s.shape[g.key] === o.id;
              return (
                <article key={o.id} className={"u-card" + (on ? " is-picked" : "")} style={{ cursor: "pointer" }} onClick={() => set((st) => ({ shape: { ...st.shape, [g.key]: o.id } }))}>
                  <ShapeStage k={g.key} opt={o} />
                  <div className="u-info"><div><b>{o.name}</b><small>{o.desc}</small></div>{on && <span style={{ color: "var(--u-acc)" }}><Ic name="check" size={17} /></span>}</div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

/* ---------------- favoris ---------------- */
export function FavsView() {
  const s = useApp();
  const items = s.favs.map((k) => k.split(":")).map(([f, v]) => [familyById[f], variantOf(f, v)]).filter(([f, v]) => f && v);
  if (!items.length)
    return (<><Head title="Favoris" desc="Les variantes que tu as mises de côté pour y revenir." />
      <div className="u-empty"><Ic name="heart" size={26} /><b>Aucun favori pour l'instant</b><span>Survole une variante et clique sur le cœur pour la retrouver ici.</span><button className="ub" onClick={() => go("kits")}>Explorer les kits</button></div></>);
  return (<><Head title="Favoris" desc="Les variantes que tu as mises de côté pour y revenir." right={<><ViewportSeg /><ModeSeg /></>} />
    <div className="u-grid md">{items.map(([f, v]: any) => <VariantCard key={f.id + v.id} fam={f} v={v} />)}</div></>);
}
