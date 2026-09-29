import { useEffect, useMemo, useRef } from "react";
import { ic } from "../lib/data/icons.mjs";
import { fitAll, stageHtml, kitPreviewHtml, shapeSampleHtml, pageHtml, personalize, framed, contentKey, esc, VP_W, Content } from "../lib/preview";
import { styleAttr } from "../lib/engine/tokens.mjs";
import { useApp, set, AppState, Viewport } from "../store";

export const Ic = ({ name, size = 16 }: { name: string; size?: number }) => (
  <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: ic(name, size) }} />
);

/** Bloc HTML d'aperçu ; recalcule l'échelle des maquettes après rendu et au redimensionnement. */
function Live({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    fitAll(el);
    if (!("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => requestAnimationFrame(() => fitAll(el)));
    el.querySelectorAll(".fit, .fit-in").forEach((n) => ro.observe(n));
    if (document.fonts?.ready) document.fonts.ready.then(() => fitAll(el));
    return () => ro.disconnect();
  }, [html]);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}

export const contentOf = (s: AppState): Content => ({ name: s.name, headline: s.headline, pitch: s.pitch, logo: s.logo });

export function VariantStage({ fam, v, fitW }: { fam: any; v: any; fitW?: number }) {
  const s = useApp();
  const depKey = (fam.deps || []).map((d: string) => s.picks[d] || "").join("|");
  const shapeKey = JSON.stringify(s.shape);
  const cKey = contentKey(contentOf(s));
  const html = useMemo(
    () => stageHtml(fam, v, s, s.picks, s.mode, { fitW, vp: s.vp, content: contentOf(s) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fam.id, v.id, s.theme, s.type, shapeKey, s.mode, depKey, fitW, s.vp, cKey]
  );
  return <Live html={html} />;
}
export function KitStage({ kit }: { kit: any }) {
  const html = useMemo(() => kitPreviewHtml(kit), [kit.id]);
  return <Live html={html} />;
}
export function ShapeStage({ k, opt }: { k: string; opt: any }) {
  const s = useApp();
  const html = useMemo(() => shapeSampleHtml(k, { ...s, shape: { ...s.shape, [k]: opt.id } }, s.mode), [k, opt.id, s.theme, s.type, JSON.stringify(s.shape), s.mode]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export const ModeSeg = () => {
  const s = useApp();
  return (
    <div className="u-seg" role="group" aria-label="Mode de l'aperçu">
      {(["light", "dark"] as const).map((m) => (
        <button key={m} aria-pressed={s.mode === m} onClick={() => set({ mode: m })}>
          <Ic name={m === "light" ? "sun" : "moon"} size={15} /><span className="lbl">{m === "light" ? "Clair" : "Sombre"}</span>
        </button>
      ))}
    </div>
  );
};
/** Page complète assemblée avec les choix courants, dans un cadre d'écran. */
export function PageStage() {
  const s = useApp();
  const cKey = contentKey(contentOf(s));
  const html = useMemo(() => {
    const w = VP_W[s.vp === "auto" ? "desktop" : s.vp];
    return framed(w, esc(styleAttr(s, s.mode)), "", personalize(pageHtml(s.page, s.picks), contentOf(s)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.page, s.theme, s.type, JSON.stringify(s.shape), s.mode, JSON.stringify(s.picks), s.vp, cKey]);
  return <Live html={html} />;
}

const VPS: [Viewport, string, string][] = [["auto", "Auto", "expand"], ["mobile", "Mobile", "phone"], ["tablet", "Tablette", "tablet"], ["desktop", "Desktop", "monitor"]];
/** Bascule de taille d'écran des aperçus (partagée par toutes les vues). */
export const ViewportSeg = ({ noAuto }: { noAuto?: boolean }) => {
  const s = useApp();
  const cur = noAuto && s.vp === "auto" ? "desktop" : s.vp;
  return (
    <div className="u-seg" role="group" aria-label="Taille d'écran de l'aperçu">
      {VPS.filter(([id]) => !(noAuto && id === "auto")).map(([id, lbl, icon]) => (
        <button key={id} aria-pressed={cur === id} onClick={() => set({ vp: id })} title={id === "auto" ? "Largeur de la carte" : `${lbl} · ${VP_W[id as "mobile"]} px`}>
          <Ic name={icon} size={15} /><span className="lbl">{lbl}</span>
        </button>
      ))}
    </div>
  );
};

export const Head = ({ title, desc, right }: { title: string; desc: string; right?: React.ReactNode }) => (
  <div className="u-head"><div><h1>{title}</h1><p>{desc}</p></div><div className="u-head-r">{right}</div></div>
);
