import { useEffect } from "react";
import { useApp, useUi, closeAll, setUi } from "./store";
import { Top, Side } from "./components/Chrome";
import { KitsView, ColorsView, TypeView, ShapeView, FavsView, FamilyView } from "./components/Views";
import { Dialog, Drawer, FileModal, Palette, Toast } from "./components/Overlays";
import { familyById } from "./lib/data/catalog.mjs";

function Main() {
  const { view } = useApp();
  if (view === "colors") return <ColorsView />;
  if (view === "type") return <TypeView />;
  if (view === "shape") return <ShapeView />;
  if (view === "favs") return <FavsView />;
  if (view.startsWith("fam:") && familyById[view.slice(4)]) return <FamilyView id={view.slice(4)} />;
  return <KitsView />;
}

export default function App() {
  const ui = useUi();
  const s = useApp();
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const u = (window as any).__ui as typeof ui;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); u.palette ? closeAll() : setUi({ palette: true }); return; }
      if (e.key === "Escape") {
        if (u.file) setUi({ file: false }); else if (u.palette || u.dialog || u.drawer) closeAll(); else if (u.side) setUi({ side: false });
        return;
      }
      if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName) && !u.drawer && !u.palette) { e.preventDefault(); setUi({ palette: true }); }
    };
    /* Dans un aperçu : liens et formulaires ne naviguent jamais ; onglets et bascules restent vivants. */
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.(".stage .pv")) return;
      if (t.closest("a")) e.preventDefault();
      const tab = t.closest('[role="tab"]') as HTMLButtonElement | null;
      if (tab && !tab.disabled) tab.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]').forEach((x) => x.setAttribute("aria-selected", String(x === tab)));
      const rad = t.closest('.plans-toggle [role="radio"]');
      if (rad) rad.parentElement!.querySelectorAll('[role="radio"]').forEach((x) => x.setAttribute("aria-checked", String(x === rad)));
    };
    const submit = (e: Event) => { if ((e.target as HTMLElement).closest(".stage")) e.preventDefault(); };
    const outside = (e: MouseEvent) => { const u = (window as any).__ui; const t = e.target as HTMLElement; if (u.side && !t.closest(".u-side") && !t.closest(".u-menu")) setUi({ side: false }); };
    document.addEventListener("keydown", key); document.addEventListener("click", click); document.addEventListener("submit", submit); document.addEventListener("click", outside);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("click", click); document.removeEventListener("submit", submit); document.removeEventListener("click", outside); };
  }, []);
  (window as any).__ui = ui;
  return (
    <>
      <div className="app">
        <Top /><Side />
        <main className="u-main" id="main"><div className="u-main-in"><Main /></div></main>
      </div>
      {ui.dialog && <Dialog />}
      {ui.drawer && <Drawer />}
      {ui.palette && <Palette />}
      {ui.file && <FileModal />}
      <Toast />
    </>
  );
}
