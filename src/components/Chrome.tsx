import { FAMILIES, GROUPS } from "../lib/data/catalog.mjs";
import { KITS } from "../lib/data/kits.mjs";
import { THEMES } from "../lib/data/themes.mjs";
import { TYPES } from "../lib/data/typography.mjs";
import { SHAPE_GROUPS } from "../lib/data/shape.mjs";
import { coherence } from "../lib/engine/coherence.mjs";
import { useApp, useUi, go, setUi, openDrawer, uiTheme, setUiTheme, completionCount } from "../store";
import { Ic } from "./bits";

export function Top() {
  const s = useApp(); const ui = useUi();
  const done = FAMILIES.filter((f: any) => s.picks[f.id]).length;
  return (
    <header className="u-top">
      <button className="u-icon u-menu" onClick={() => setUi({ side: !ui.side })} aria-label="Menu"><Ic name="menu" size={18} /></button>
      <div className="u-brand"><span className="u-mark" aria-hidden /><span>Motif</span><small>v2</small></div>
      <button className="u-search" onClick={() => setUi({ palette: true })} aria-label="Rechercher"><Ic name="search" />
        <span>Rechercher un composant, une palette, une police…</span><kbd className="u-kbd">⌘ K</kbd></button>
      <div className="u-actions">
        <button className="u-icon" onClick={() => setUiTheme(uiTheme() === "dark" ? "light" : "dark")} aria-label="Changer le thème de l'interface" title="Thème de l'interface"><Ic name={uiTheme() === "dark" ? "sun" : "moon"} size={17} /></button>
        <button className="ub u-pagebtn" onClick={() => go("page")} title="Voir tes choix assemblés sur une page"><Ic name="eye" size={16} /><span className="lbl">Voir sur une page</span></button>
        <button className="ub ub-fill" onClick={openDrawer}><Ic name="sparkle" /><span className="lbl">Mon style</span><span className="u-count-pill">{done}/{FAMILIES.length}</span></button>
      </div>
    </header>
  );
}

function Nav({ view, label, icon, count, dot }: { view: string; label: string; icon: string; count: number; dot?: boolean }) {
  const s = useApp();
  return (
    <button className="u-nav" aria-current={s.view === view ? "page" : undefined} onClick={() => go(view)}>
      <Ic name={icon} /><span className="u-nav-t">{label}</span>{dot && <i className="u-dot" title="Variante choisie" />}<span className="u-n">{count}</span>
    </button>
  );
}

export function Side() {
  const s = useApp(); const ui = useUi();
  const done = completionCount();
  const coh = coherence(s);
  return (
    <nav className={"u-side" + (ui.side ? " open" : "")} aria-label="Navigation">
      <div className="u-side-scroll">
        <div className="u-group"><h6>Démarrer</h6><Nav view="kits" label="Kits" icon="layers" count={KITS.length} /><Nav view="page" label="Aperçu sur une page" icon="eye" count={3} /></div>
        <div className="u-group"><h6>Fondations</h6>
          <Nav view="colors" label="Couleurs" icon="palette" count={THEMES.length} />
          <Nav view="type" label="Typographie" icon="type" count={TYPES.length} />
          <Nav view="shape" label="Forme" icon="shapes" count={SHAPE_GROUPS.length} /></div>
        {GROUPS.map((g: string) => (
          <div className="u-group" key={g}><h6>{g}</h6>
            {FAMILIES.filter((f: any) => f.group === g).map((f: any) => <Nav key={f.id} view={"fam:" + f.id} label={f.label} icon={f.icon} count={f.variants.length} dot={!!s.picks[f.id]} />)}</div>
        ))}
        <div className="u-group"><h6>Bibliothèque</h6><Nav view="favs" label="Favoris" icon="heart" count={s.favs.length} /></div>
      </div>
      <div className="u-side-foot">
        <div className="u-prog"><div className="u-prog-l"><span><b>{done}</b> sur {FAMILIES.length} composants définis</span><span>{coh.score != null ? coh.score + "%" : ""}</span></div>
          <div className="u-bar"><i style={{ width: Math.round((done / FAMILIES.length) * 100) + "%" }} /></div></div>
        <button className="ub ub-fill ub-block" onClick={openDrawer}><Ic name="download" />Exporter DESIGN.md</button>
      </div>
    </nav>
  );
}
