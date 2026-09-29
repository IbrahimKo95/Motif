const base = `
& .av-demo{display:grid;gap:18px;font-family:var(--font-body);color:var(--text)}
& .av-cap{margin:0 0 8px;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
& .av-row{display:flex;align-items:center;flex-wrap:wrap;gap:14px}
& .av{--s:40px;--tone:var(--accent);--tone-c:var(--accent-contrast);flex:none;box-sizing:border-box;display:inline-grid;place-items:center;width:var(--s);height:var(--s);overflow:hidden;border-radius:var(--r-full);background:color-mix(in srgb,var(--tone) 18%,var(--surface));color:var(--text);font:600 calc(var(--s) * .38)/1 var(--font-body);letter-spacing:.02em;text-transform:uppercase;user-select:none}
& .av-xs{--s:24px}
& .av-sm{--s:32px}
& .av-md{--s:40px}
& .av-lg{--s:56px}
& .t1{--tone:var(--accent);--tone-c:var(--accent-contrast)}
& .t2{--tone:var(--success);--tone-c:var(--success-contrast)}
& .t3{--tone:var(--info);--tone-c:var(--info-contrast)}
& .t4{--tone:var(--warning);--tone-c:var(--warning-contrast)}
& .t5{--tone:var(--danger);--tone-c:var(--danger-contrast)}
& .av-group{display:inline-flex;align-items:center;gap:6px}
& .av-more{background:var(--bg-subtle);color:var(--text-muted);font-variant-numeric:tabular-nums;text-transform:none}
`;

const P = { cd: ["Camille Dupont", "CD", "t1"], yb: ["Yanis Benali", "YB", "t2"], lm: ["Léa Marchand", "LM", "t3"], hp: ["Hugo Petit", "HP", "t4"], ir: ["Inès Roux", "IR", "t5"] };
const av = (k, size = "md", extra = "") => `<span class="av av-${size} ${P[k][2]}" role="img" aria-label="${P[k][0]}${extra}">${P[k][1]}</span>`;
const more = (size = "md") => `<span class="av av-${size} av-more" role="img" aria-label="4 autres collaborateurs">+4</span>`;
const sizes = () => `<div class="av-row">${av("cd", "lg")}${av("yb", "md")}${av("lm", "sm")}${av("hp", "xs")}</div>`;
const group = (size = "md") => `<div class="av-group" role="group" aria-label="Équipe Nomade">${["cd", "yb", "lm", "hp"].map((k) => av(k, size)).join("")}${more(size)}</div>`;
const demo = () => `<div class="av-demo"><div><p class="av-cap">Tailles</p>${sizes()}</div><div><p class="av-cap">Équipe du projet</p>${group()}</div></div>`;

export default {
  id: "avatars", label: "Avatars", group: "Composants", icon: "f_avatars", size: "sm",
  desc: "Représenter une personne sans photo : initiales teintées, pile de groupe, présence, dégradé, brut.",
  base,
  snippet: `<span class="av av-md t1" role="img" aria-label="Camille Dupont">CD</span>

<div class="av-group" role="group" aria-label="Project team">
  <span class="av av-md t1" role="img" aria-label="Camille Dupont">CD</span>
  <span class="av av-md t2" role="img" aria-label="Yanis Benali">YB</span>
  <span class="av av-md av-more" role="img" aria-label="4 more people">+4</span>
</div>
<!-- Sizes: av-xs 24, av-sm 32, av-md 40, av-lg 56. Tones t1..t5 map to accent, success, info, warning, danger. -->`,
  rules: [
    "Initials are two uppercase letters, derived from the person's name; the accessible name is always the full name (role=img + aria-label).",
    "Assign a tone per person from a stable hash so the same person keeps the same color everywhere; never use the danger tone for a regular user.",
    "Use four sizes only (24, 32, 40, 56px); font size is 38% of the box so initials stay centered and legible.",
    "Group at most five avatars, then summarize the rest in a '+N' counter that names the hidden people in its label.",
  ],
  demo,
  variants: [
    {
      id: "tint", name: "Initiales teintées", desc: "Cercle pastel, initiales sombres : le classique.", tags: ["Standard", "Doux"],
      attrs: { shape: "round", depth: "flat", energy: "friendly" },
      spec: ["Perfect circle filled with 18% of a tone mixed into the surface, initials in the text color at 600 weight and 38% of the box size.", "A 1px inner ring of the same tone at 30% keeps the edge crisp on both light and dark surfaces."],
      css: `
& .av{box-shadow:inset 0 0 0 var(--border-w) color-mix(in srgb,var(--tone) 30%,transparent)}
& .av-more{box-shadow:inset 0 0 0 var(--border-w) var(--border)}`,
    },
    {
      id: "squircle", name: "Carré arrondi", desc: "Vignette pleine au rayon du thème, initiales contrastées.", tags: ["Net", "Moderne"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Rounded square whose radius is the surface radius capped at 30% of the box, filled with the solid tone color and initials in the matching contrast color.", "The counter tile stays neutral (bg-subtle, text-muted) so it never reads as a person."],
      css: `
& .av{border-radius:min(var(--r-surface),calc(var(--s) * .3));background:var(--tone);color:var(--tone-c)}
& .av-more{background:var(--bg-subtle);color:var(--text-muted);box-shadow:inset 0 0 0 var(--border-w) var(--border)}`,
    },
    {
      id: "stack", name: "Pile", desc: "Avatars qui se chevauchent, pastille « +4 » à la fin.", tags: ["Groupe", "Compact"],
      attrs: { shape: "round", depth: "outline", energy: "calm" },
      spec: ["Group avatars overlap by 18% of their width with a 2px surface-colored ring separating each from its neighbor; later avatars sit above earlier ones.", "On hover an avatar rises 2px above the pile; the last tile is a neutral '+N' counter with the same ring."],
      css: `
& .av-group{gap:0}
& .av{box-shadow:0 0 0 2px var(--surface);transition:transform var(--dur) var(--ease)}
& .av-group .av + .av{margin-left:calc(var(--s) * -.18)}
& .av-group .av:hover{transform:translateY(-2px)}
& .av-more{background:var(--bg-subtle);color:var(--text);border:var(--border-w) solid var(--border);font-weight:700}`,
    },
    {
      id: "status", name: "Présence", desc: "Anneau coloré et pastille en ligne / absent / hors ligne.", tags: ["Temps réel", "Collab"],
      attrs: { shape: "round", depth: "outline", energy: "technical" },
      spec: ["Each avatar wears a 2px ring offset by 2px of surface color; the ring and a small corner dot share the presence color: success online, warning away, border-strong offline.", "The dot scales with the size (8px on xs, 10px default, 14px on lg) with a 2px surface outline, and status is repeated in the accessible name."],
      demo: () => {
        const w = (k, size, st, label) => `<span class="av-wrap ${st}">${av(k, size, ", " + label)}<i class="av-dot av-dot-${size}" aria-hidden="true"></i></span>`;
        return `<div class="av-demo"><div><p class="av-cap">Tailles et présence</p><div class="av-row">${w("cd", "lg", "on", "en ligne")}${w("yb", "md", "away", "absent")}${w("lm", "sm", "off", "hors ligne")}${w("hp", "xs", "on", "en ligne")}</div></div><div><p class="av-cap">Équipe du projet</p><div class="av-group" role="group" aria-label="Équipe Nomade">${w("cd", "md", "on", "en ligne")}${w("yb", "md", "on", "en ligne")}${w("lm", "md", "away", "absent")}${w("hp", "md", "off", "hors ligne")}${more()}</div></div></div>`;
      },
      css: `
& .av-group{gap:12px}
& .av-wrap{--ring:var(--border-strong);position:relative;display:inline-flex}
& .av-wrap.on{--ring:var(--success)}
& .av-wrap.away{--ring:var(--warning)}
& .av-wrap .av{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--ring)}
& .av-dot{position:absolute;right:-3px;bottom:-3px;width:10px;height:10px;border-radius:var(--r-full);background:var(--ring);border:2px solid var(--surface);box-sizing:content-box}
& .av-dot-xs{width:7px;height:7px;right:-4px;bottom:-4px}
& .av-dot-lg{width:14px;height:14px;right:-2px;bottom:-2px}
& .av-more{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--border)}`,
    },
    {
      id: "gradient", name: "Dégradé", desc: "Disque lumineux en dégradé diagonal, ombre légère.", tags: ["Premium", "Vivant"],
      attrs: { shape: "round", depth: "soft", energy: "premium" },
      spec: ["Circle filled with a 140deg gradient from the tone to a 50% mix of the tone and the text color, initials in the tone's contrast color at 700 weight.", "A 1px inner highlight and the small shadow lift it off the surface; the counter stays a flat neutral disc."],
      css: `
& .av{background:linear-gradient(140deg,var(--tone),color-mix(in srgb,var(--tone) 50%,var(--text)));color:var(--tone-c);font-weight:700;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tone-c) 25%,transparent),var(--shadow-sm)}
& .av-more{background:var(--bg-subtle);color:var(--text-muted);box-shadow:inset 0 0 0 var(--border-w) var(--border)}`,
    },
    {
      id: "person", name: "Nom et rôle", desc: "Avatar suivi du nom et du rôle, en liste de contacts.", tags: ["Liste", "Informatif"],
      attrs: { shape: "round", depth: "outline", energy: "calm" },
      spec: ["Bordered list of rows separated by hairlines: 12px gap between a tinted circle, the name at 600 weight and the role below it in text-muted xs.", "Row height follows the avatar size (56, 40 or 32px); the smallest row drops the role and keeps only the name."],
      demo: () => {
        const row = (k, size, role) => `<li class="av-person av-person-${size}">${av(k, size)}<span class="av-id"><b>${P[k][0]}</b>${role ? `<small>${role}</small>` : ""}</span></li>`;
        return `<div class="av-demo"><ul class="av-people" aria-label="Collaborateurs">${row("cd", "lg", "Cheffe de projet · Paris")}${row("yb", "md", "Développeur")}${row("lm", "sm", "")}</ul><div class="av-row">${group("sm")}<span class="av-note">5 collaborateurs sur ce dossier</span></div></div>`;
      },
      css: `
& .av-people{list-style:none;margin:0;padding:0;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);overflow:hidden}
& .av-person{display:flex;align-items:center;gap:12px;padding:12px 14px}
& .av-person + .av-person{border-top:var(--border-w) solid var(--border)}
& .av-id{display:grid;gap:3px;min-width:0}
& .av-id b{font-weight:600;font-size:var(--fs-base);line-height:1.2;color:var(--text)}
& .av-person-sm .av-id b{font-size:var(--fs-sm)}
& .av-id small{font-size:var(--fs-xs);line-height:1.2;color:var(--text-muted)}
& .av-note{font-size:var(--fs-sm);color:var(--text-muted)}
& .av-group{gap:0}
& .av-group .av + .av{margin-left:-6px}
& .av-group .av{box-shadow:0 0 0 2px var(--surface)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Bloc carré, contour épais et ombre dure, initiales mono.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "sharp", depth: "hard", energy: "playful" },
      spec: ["Square tile with a 3px text-colored border, no radius, solid tone fill, and a 3px 3px hard offset shadow in the text color; initials in the monospace face at 800 weight.", "Grouped tiles overlap by 6px and the later one covers the earlier; the counter is an unfilled surface tile."],
      css: `
& .av{border-radius:0;border:3px solid var(--text);background:var(--tone);color:var(--tone-c);font-family:var(--font-mono);font-weight:800;box-shadow:3px 3px 0 var(--text)}
& .av-group{gap:0;padding-right:3px}
& .av-group .av + .av{margin-left:-6px}
& .av-more{background:var(--surface);color:var(--text)}
& .av-xs{border-width:2px;box-shadow:2px 2px 0 var(--text)}
& .av-row{gap:18px}`,
    },
  ],
};
