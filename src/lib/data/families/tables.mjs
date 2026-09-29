const base = `
& .table-wrap{width:100%;overflow-x:auto;font-family:var(--font-body)}
& .table{width:100%;border-collapse:collapse;font-size:var(--fs-sm);color:var(--text)}
& .table th{text-align:left;padding:10px 14px;font:600 var(--fs-xs)/1.2 var(--font-body);color:var(--text-muted);white-space:nowrap}
& .table td{padding:12px 14px;vertical-align:middle;white-space:nowrap}
& .table .num{text-align:right;font-variant-numeric:tabular-nums}
& .status{display:inline-flex;align-items:center;gap:7px;font-size:var(--fs-xs);font-weight:500}
& .status::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--c,var(--text-muted))}
& .status.s-ok{--c:var(--success)}
& .status.s-wait{--c:var(--warning)}
& .status.s-late{--c:var(--danger)}
& .table .name{font-weight:600}
`;

const demo = () => `<div class="table-wrap"><table class="table"><thead><tr><th>Client</th><th>Statut</th><th class="num">Montant</th><th>Échéance</th></tr></thead><tbody>
<tr><td class="name">Atelier Norel</td><td><span class="status s-ok">Payée</span></td><td class="num">1 240,00 €</td><td>12 sept.</td></tr>
<tr><td class="name">Maison Vasseur</td><td><span class="status s-wait">En attente</span></td><td class="num">860,50 €</td><td>28 sept.</td></tr>
<tr><td class="name">Studio Lumen</td><td><span class="status s-late">En retard</span></td><td class="num">2 310,00 €</td><td>02 sept.</td></tr>
<tr><td class="name">Brasserie du Port</td><td><span class="status s-ok">Payée</span></td><td class="num">415,90 €</td><td>30 août</td></tr>
</tbody></table></div>`;

export default {
  id: "tables", label: "Tableaux", group: "Composants", icon: "f_tables", size: "lg", fit: 560, fitMax: 1,
  desc: "Listes de données : filets fins, zébrures, lignes-cartes, dense monospace, quadrillé.",
  base,
  snippet: `<div class="table-wrap"><table class="table">
  <thead><tr><th>Client</th><th>Status</th><th class="num">Amount</th></tr></thead>
  <tbody><tr><td class="name">Atelier Norel</td><td><span class="status s-ok">Paid</span></td><td class="num">€1,240.00</td></tr></tbody>
</table></div>   <!-- status: s-ok | s-wait | s-late -->`,
  rules: [
    "Use real <table> semantics. Sortable headers are buttons with aria-sort. Row actions live in an overflow menu.",
    "Numbers are right-aligned with tabular numerals; text is left-aligned. Keep column labels short nouns.",
    "Status is color plus text (dot + label), never color alone.",
    "Include loading (skeleton rows), empty and filtered-empty states. On mobile switch to stacked rows keeping the two key fields.",
  ],
  demo,
  variants: [
    {
      id: "lines", name: "Filets", desc: "Lignes séparées par un filet fin, en-tête discret.", tags: ["Net", "Standard"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["No outer box: a hairline under the header and between rows.", "Row hover applies a bg-subtle fill; header text is text-muted.", "Compact vertical rhythm."],
      css: `
& .table th{border-bottom:1px solid var(--border-strong)}
& .table td{border-bottom:1px solid var(--border)}
& .table tbody tr:hover td{background:var(--bg-subtle)}`,
    },
    {
      id: "zebra", name: "Zébré", desc: "Lignes alternées sur un panneau bordé.", tags: ["Lisible", "Dense"],
      attrs: { shape: "inherit", depth: "outline", energy: "calm" },
      spec: ["The table sits in a bordered rounded container with a bg-subtle header.", "Odd rows use a faint bg-subtle tint; no inner borders."],
      css: `
& .table-wrap{border:1px solid var(--border);border-radius:var(--r-surface);background:var(--surface)}
& .table th{background:var(--bg-subtle)}
& .table tbody tr:nth-child(even) td{background:color-mix(in srgb,var(--bg-subtle) 55%,transparent)}
& .table tbody tr:hover td{background:color-mix(in srgb,var(--accent) 8%,var(--surface))}`,
    },
    {
      id: "rows", name: "Lignes-cartes", desc: "Chaque ligne est une carte flottante espacée.", tags: ["Aéré", "Moderne"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Rows are separate surfaces with 8px vertical spacing; the first and last cells carry the rounded corners.", "No header fill; hover raises the row with a small shadow."],
      css: `
& .table{border-collapse:separate;border-spacing:0 8px}
& .table th{padding:0 14px 2px}
& .table td{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
& .table td:first-child{border-left:1px solid var(--border);border-radius:var(--r-control) 0 0 var(--r-control)}
& .table td:last-child{border-right:1px solid var(--border);border-radius:0 var(--r-control) var(--r-control) 0}
& .table tbody tr:hover td{border-color:var(--border-strong)}`,
    },
    {
      id: "dense", name: "Dense mono", desc: "Police mono, lignes serrées, chiffres alignés.", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Monospace text at 13px with tight 6px row padding.", "Header is text-muted with a strong bottom border; hover row shows an accent left bar.", "Numbers align perfectly thanks to the mono face."],
      css: `
& .table{font-family:var(--font-mono);font-size:12.5px}
& .table th{font-family:var(--font-mono);font-weight:500;padding:6px 12px;border-bottom:1px solid var(--border-strong)}
& .table td{padding:6px 12px;border-bottom:1px dashed var(--border)}
& .table tbody tr:hover td{background:var(--bg-subtle)}
& .table tbody tr:hover td:first-child{box-shadow:inset 2px 0 0 var(--accent)}
& .table .name{font-weight:500}`,
    },
    {
      id: "grid", name: "Quadrillé", desc: "Toutes les cellules bordées, façon tableur.", tags: ["Structuré", "Tableur"],
      attrs: { shape: "sharp", depth: "outline", energy: "crisp" },
      spec: ["Every cell has a hairline border and the header is a bg-subtle band with bold labels.", "Best for data entry and comparison tables where reading across rows matters."],
      css: `
& .table th,& .table td{border:1px solid var(--border)}
& .table th{background:var(--bg-subtle);color:var(--text);font-weight:700}
& .table tbody tr:hover td{background:color-mix(in srgb,var(--accent) 7%,var(--surface))}`,
    },
    {
      id: "inverted", name: "En-tête inversé", desc: "Bandeau d'en-tête plein et contrasté, corps clair.", tags: ["Marqué", "Lisible"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Header row is filled with the text color and uses the page background color for labels; the table sits in a clipped rounded container with a hairline border.", "Body rows are separated by hairlines and highlight with a bg-subtle fill on hover."],
      css: `
& .table-wrap{border:1px solid var(--border);border-radius:var(--r-surface);background:var(--surface);overflow:hidden}
& .table th{background:var(--text);color:var(--bg);font-weight:600;padding:11px 14px}
& .table td{border-bottom:1px solid var(--border)}
& .table tbody tr:last-child td{border-bottom:0}
& .table tbody tr:hover td{background:var(--bg-subtle)}`,
    },
    {
      id: "sticky", name: "Colonne fixe", desc: "Première colonne teintée et figée pendant le défilement.", tags: ["Analytique", "Large"],
      attrs: { shape: "inherit", depth: "outline", energy: "calm" },
      spec: ["The first column is sticky (left:0), filled with accent-soft and closed by a strong right border, so labels stay visible when the table scrolls horizontally.", "Header has a strong bottom rule; the outer container is bordered and rounded."],
      css: `
& .table-wrap{border:1px solid var(--border);border-radius:var(--r-surface);background:var(--surface)}
& .table th{border-bottom:1px solid var(--border-strong);background:var(--bg-subtle)}
& .table td{border-bottom:1px solid var(--border)}
& .table tbody tr:last-child td{border-bottom:0}
& .table th:first-child,& .table td:first-child{position:sticky;left:0;z-index:1;border-right:1px solid var(--border-strong)}
& .table td:first-child{background:color-mix(in srgb,var(--accent-soft) 70%,var(--surface))}
& .table th:first-child{background:color-mix(in srgb,var(--accent-soft) 100%,var(--bg-subtle))}
& .table tbody tr:hover td{background:color-mix(in srgb,var(--accent) 6%,var(--surface))}
& .table tbody tr:hover td:first-child{background:color-mix(in srgb,var(--accent) 14%,var(--surface))}`,
    },
    {
      id: "minimal", name: "Sans filets", desc: "Aucun trait : espace, petites capitales et survol arrondi.", tags: ["Aéré", "Épuré"],
      attrs: { shape: "round", depth: "flat", energy: "calm" },
      spec: ["No borders anywhere: labels are 11px uppercase with 0.06em tracking, rows get generous 16px vertical padding.", "Hover fills the whole row with bg-subtle, rounded at both ends by the first and last cells."],
      css: `
& .table th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;padding:8px 16px}
& .table td{padding:16px}
& .table tbody tr td{transition:background var(--dur) var(--ease)}
& .table tbody tr:hover td{background:var(--bg-subtle)}
& .table td:first-child,& .table th:first-child{border-radius:var(--r-control) 0 0 var(--r-control)}
& .table td:last-child,& .table th:last-child{border-radius:0 var(--r-control) var(--r-control) 0}`,
    },
    {
      id: "progress", name: "Badges & barres", desc: "Statuts en pastilles et colonne d'avancement en barre.", tags: ["Tableau de bord", "Visuel"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["Status becomes a tinted pill (semantic color at 13%, neutral text, dot kept) and a progress column shows a 6px rounded meter with a tabular percentage.", "Hairline rules between rows; the meter fill uses the semantic color of the row status."],
      demo: () => `<div class="table-wrap"><table class="table"><thead><tr><th>Client</th><th>Statut</th><th>Règlement</th><th class="num">Montant</th></tr></thead><tbody>
<tr><td class="name">Atelier Norel</td><td><span class="status s-ok">Payée</span></td><td><span class="meter s-ok" role="img" aria-label="100 %"><i style="width:100%"></i></span><span class="pct">100 %</span></td><td class="num">1 240,00 €</td></tr>
<tr><td class="name">Maison Vasseur</td><td><span class="status s-wait">En attente</span></td><td><span class="meter s-wait" role="img" aria-label="45 %"><i style="width:45%"></i></span><span class="pct">45 %</span></td><td class="num">860,50 €</td></tr>
<tr><td class="name">Studio Lumen</td><td><span class="status s-late">En retard</span></td><td><span class="meter s-late" role="img" aria-label="15 %"><i style="width:15%"></i></span><span class="pct">15 %</span></td><td class="num">2 310,00 €</td></tr>
<tr><td class="name">Brasserie du Port</td><td><span class="status s-ok">Payée</span></td><td><span class="meter s-ok" role="img" aria-label="100 %"><i style="width:100%"></i></span><span class="pct">100 %</span></td><td class="num">415,90 €</td></tr>
</tbody></table></div>`,
      snippet: `<table class="table">
  <thead><tr><th>Client</th><th>Status</th><th>Payment</th><th class="num">Amount</th></tr></thead>
  <tbody><tr><td class="name">Atelier Norel</td><td><span class="status s-ok">Paid</span></td>
    <td><span class="meter s-ok" role="img" aria-label="100%"><i style="width:100%"></i></span><span class="pct">100%</span></td>
    <td class="num">€1,240.00</td></tr></tbody>
</table>   <!-- meter: s-ok | s-wait | s-late, fill width = progress -->`,
      css: `
& .table th{border-bottom:1px solid var(--border-strong)}
& .table td{border-bottom:1px solid var(--border)}
& .table tbody tr:last-child td{border-bottom:0}
& .status{padding:3px 10px 3px 8px;border-radius:var(--r-full);background:color-mix(in srgb,var(--c,var(--text-muted)) 13%,var(--surface))}
& .meter{display:inline-block;vertical-align:middle;width:76px;height:6px;border-radius:var(--r-full);background:var(--bg-subtle);box-shadow:inset 0 0 0 1px var(--border);overflow:hidden}
& .meter i{display:block;height:100%;border-radius:var(--r-full);background:var(--c,var(--accent))}
& .meter.s-ok{--c:var(--success)}
& .meter.s-wait{--c:var(--warning)}
& .meter.s-late{--c:var(--danger)}
& .pct{display:inline-block;min-width:44px;margin-left:8px;font-size:var(--fs-xs);color:var(--text-muted);font-variant-numeric:tabular-nums}
& .table tbody tr:hover td{background:var(--bg-subtle)}`,
    },
    {
      id: "terminal", name: "Terminal", desc: "Panneau console : invite >, double filet, statuts carrés.", tags: ["Technique", "Console"],
      attrs: { shape: "sharp", depth: "outline", energy: "technical" },
      spec: ["Monospace panel on bg-subtle with a strong hairline border; header labels are accent-colored and closed by a 3px double rule.", "Each row starts with a muted '> ' prompt that turns accent on hover, and status uses a square marker with uppercase mono text."],
      css: `
& .table-wrap{background:var(--bg-subtle);border:1px solid var(--border-strong);border-radius:var(--r-sm);font-family:var(--font-mono)}
& .table{font-family:var(--font-mono);font-size:12.5px}
& .table th{font-family:var(--font-mono);font-weight:600;color:var(--accent-text);padding:8px 12px;border-bottom:3px double var(--border-strong)}
& .table td{padding:7px 12px}
& .table td:first-child::before{content:'> ';color:var(--text-muted)}
& .table tbody tr:hover td{background:color-mix(in srgb,var(--accent) 9%,transparent)}
& .table tbody tr:hover td:first-child::before{color:var(--accent-text)}
& .status{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.05em;font-size:11px}
& .status::before{width:7px;height:7px;border-radius:0}`,
    },
  ],
};
