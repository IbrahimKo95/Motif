import { createRoot } from "react-dom/client";
import App from "./App";
import { previewCss } from "./lib/data/catalog.mjs";
import { fontsHref } from "./lib/data/typography.mjs";
import { initUiTheme } from "./store";
import "./index.css";

initUiTheme();
const style = document.createElement("style");
style.id = "pv-css"; style.textContent = previewCss(); document.head.appendChild(style);
const link = document.createElement("link");
link.rel = "stylesheet"; link.href = fontsHref(); document.head.appendChild(link);
createRoot(document.getElementById("root")!).render(<App />);
