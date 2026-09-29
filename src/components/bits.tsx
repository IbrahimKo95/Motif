import { useEffect, useMemo, useRef } from "react";
import { ic } from "../lib/data/icons.mjs";
import { fitAll, stageHtml, kitPreviewHtml, shapeSampleHtml } from "../lib/preview";
import { useApp, set } from "../store";

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

export function VariantStage({ fam, v, fitW }: { fam: any; v: any; fitW?: number }) {
  const s = useApp();
  const depKey = (fam.deps || []).map((d: string) => s.picks[d] || "").join("|");
  const shapeKey = JSON.stringify(s.shape);
  const html = useMemo(
    () => stageHtml(fam, v, s, s.picks, s.mode, fitW),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fam.id, v.id, s.theme, s.type, shapeKey, s.mode, depKey, fitW]
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
export const Head = ({ title, desc, right }: { title: string; desc: string; right?: React.ReactNode }) => (
  <div className="u-head"><div><h1>{title}</h1><p>{desc}</p></div><div className="u-head-r">{right}</div></div>
);
