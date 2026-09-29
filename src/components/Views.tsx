import { KITS } from "../lib/data/kits.mjs";
import { THEMES, themeById } from "../lib/data/themes.mjs";
import { TYPES, typeById } from "../lib/data/typography.mjs";
import { SHAPE_GROUPS, byId } from "../lib/data/shape.mjs";
import { FAMILIES, familyById, variantOf } from "../lib/data/catalog.mjs";
import { colorVars, typeVars, resolveCfg } from "../lib/engine/tokens.mjs";
import { variantFit, energyLabel } from "../lib/engine/coherence.mjs";
import { useApp, set, go, pick, unpick, toggleFav, applyKit, surprise, toast, setUi, copyOrShow, AppState } from "../store";
import { Ic, VariantStage, KitStage, ShapeStage, ModeSeg, Head } from "./bits";

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
      <Head title={fam.label} desc={fam.desc} right={<>{picked && <button className="ub" onClick={() => unpick(id)}><Ic name="x" size={15} />Retirer « {picked.name} »</button>}<ModeSeg /></>} />
      <div className="u-filters" role="group" aria-label="Filtrer">
        <button className="u-chip" aria-pressed={!flt} onClick={() => setFlt("")}>Tous · {fam.variants.length}</button>
        {tags.map((t) => <button key={t} className="u-chip" aria-pressed={flt === t} onClick={() => setFlt(t)}>{t}</button>)}
      </div>
      <div className={"u-grid " + (fam.size || "sm")}>{list.map((v: any) => <VariantCard key={v.id} fam={fam} v={v} />)}</div>
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
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><button className="ub ub-solid" onClick={() => go("fam:buttons")}>Commencer par les boutons <Ic name="arrow" size={15} /></button><button className="ub" onClick={surprise}><Ic name="sparkle" size={15} />Surprends-moi</button></div>
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
export function ColorsView() {
  const s = useApp();
  const ty = typeVars(resolveCfg(s).type);
  return (
    <>
      <Head title="Couleurs" desc="Dix-huit palettes générées avec un contraste vérifié (AA) en clair comme en sombre. L'accent définit ta marque." right={<ModeSeg />} />
      <div className="u-grid theme">
        {THEMES.map((t: any) => {
          const on = s.theme === t.id, c = t[s.mode];
          return (
            <article key={t.id} className={"u-card" + (on ? " is-picked" : "")} style={{ cursor: "pointer" }} onClick={() => { set({ theme: t.id }); toast(`Palette « ${t.name} » sélectionnée`); }}>
              <div className="tc" style={cssVars({ ...colorVars(t, s.mode), ...ty })}>
                <div className="tc-mock"><div className="tc-bar"><i /><i /><i /></div>
                  <div className="tc-body"><h4>Résumé du mois</h4><p>12 projets actifs, 3 en retard.</p>
                    <div className="tc-row"><span className="tc-btn">Voir</span><span className="tc-badge">Nouveau</span>
                      <span className="tc-sem">{[c.success, c.warning, c.danger, c.info].map((x: string) => <i key={x} style={{ background: x }} />)}</span></div></div></div>
              </div>
              <div className="u-info"><div><b>{t.name}</b><small>{t.mood}</small></div>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="u-sw" style={{ width: 84 }}>{[c.bg, c.surface, c.border, c.text, c.accent, c.accentSoft].map((x: string, i: number) => <i key={i} style={{ background: x }} />)}</span>
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
  const base = colorVars(themeById[s.theme], s.mode);
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
  return (<><Head title="Favoris" desc="Les variantes que tu as mises de côté pour y revenir." right={<ModeSeg />} />
    <div className="u-grid md">{items.map(([f, v]: any) => <VariantCard key={f.id + v.id} fam={f} v={v} />)}</div></>);
}
