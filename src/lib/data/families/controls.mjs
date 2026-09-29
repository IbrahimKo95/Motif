const base = `
& .check{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font:400 var(--fs-ctl)/1.3 var(--font-body);color:var(--text);position:relative;user-select:none}
& .check input{position:absolute;opacity:0;width:0;height:0}
& .check .box{flex:none;position:relative;width:20px;height:20px;transition:all var(--dur) var(--ease)}
& .check input:focus-visible + .box{outline:2px solid var(--focus);outline-offset:2px}
& .check input:disabled ~ *{opacity:.5}
& .check input:disabled + .box{cursor:not-allowed}
`;

const demo = (c) => `<div class="stack" style="align-items:flex-start">
<label class="check"><input type="checkbox" checked><span class="box"></span><span>Recevoir les alertes</span></label>
<label class="check"><input type="checkbox"><span class="box"></span><span>Résumé hebdomadaire</span></label>
<div class="row"><label class="check radio"><input type="radio" name="${c.uid}r" checked><span class="box"></span><span>Mensuel</span></label><label class="check radio"><input type="radio" name="${c.uid}r"><span class="box"></span><span>Annuel</span></label></div>
<label class="check switch"><input type="checkbox" role="switch" checked><span class="box"></span><span>Synchronisation</span></label>
<label class="check switch"><input type="checkbox" role="switch"><span class="box"></span><span>Mode discret</span></label>
</div>`;

export default {
  id: "controls", label: "Cases & interrupteurs", group: "Composants", icon: "f_controls", size: "sm",
  desc: "Cases à cocher, boutons radio et interrupteurs : la petite touche qui trahit le style.",
  base,
  snippet: `<label class="check"><input type="checkbox" checked><span class="box"></span><span>Email alerts</span></label>
<label class="check radio"><input type="radio" name="plan" checked><span class="box"></span><span>Monthly</span></label>
<label class="check switch"><input type="checkbox" role="switch" checked><span class="box"></span><span>Sync</span></label>`,
  rules: [
    "Always render the native input inside the label, visually hidden, followed by .box. Never fake it with div and click handlers.",
    "Label text is clickable. Hit area is at least 44px tall on touch (add padding to .check).",
    "Switches apply immediately; checkboxes are submitted with a form. Use role=\"switch\" on switches.",
    "States: unchecked, checked, focus-visible, disabled. Indeterminate checkboxes show a dash in the same style.",
  ],
  demo,
  variants: [
    {
      id: "classic", name: "Classique", desc: "Case carrée pleine, interrupteur en pilule.", tags: ["Net", "Standard"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Checkbox is a 20px square with radius 5px, filled with accent and a white tick when checked.", "Radio is a circle with a centered dot; switch is a 38×22 pill with a white knob that slides 16px.", "Off state uses border-strong."],
      css: `
& .check .box{border:var(--border-w) solid var(--border-strong);border-radius:5px;background:var(--surface)}
& .check input:checked + .box{background:var(--accent);border-color:var(--accent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid var(--accent-contrast);border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--accent-contrast);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:38px;height:22px;border-radius:999px;border:0;background:var(--border-strong)}
& .check.switch .box::after{content:'';position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3);transition:transform var(--dur) var(--ease)}
& .check.switch input:checked + .box{background:var(--accent)}
& .check.switch input:checked + .box::after{transform:translateX(16px)}`,
    },
    {
      id: "tint", name: "Teinté", desc: "Fond doux, bordure et coche d'accent.", tags: ["Doux", "Discret"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Checked state uses accent-soft as fill, an accent border and an accent-text tick, not a solid fill.", "Switch track is accent-soft with an accent border and an accent knob.", "Everything keeps a hairline border."],
      css: `
& .check .box{border:var(--border-w) solid var(--border-strong);border-radius:6px;background:var(--surface)}
& .check input:checked + .box{background:var(--accent-soft);border-color:var(--accent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid var(--accent-text);border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--accent);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:38px;height:22px;border-radius:999px;background:var(--bg-subtle)}
& .check.switch .box::after{content:'';position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:var(--border-strong);transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
& .check.switch input:checked + .box{background:var(--accent-soft);border-color:var(--accent)}
& .check.switch input:checked + .box::after{transform:translateX(16px);background:var(--accent)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Boîtes carrées épaisses, ombre dure, interrupteur rectangulaire.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "sharp", depth: "hard", energy: "playful" },
      spec: ["2px text border, square corners and a 2px hard shadow on every control, including radios.", "Checked fills with accent and shows a thick tick in accent-contrast.", "Switch is a rectangle with a square knob."],
      css: `
& .check .box{border:2px solid var(--text);border-radius:0;background:var(--surface);box-shadow:2px 2px 0 var(--text)}
& .check input:checked + .box{background:var(--accent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:5px;top:1px;width:5px;height:10px;border:solid var(--accent-contrast);border-width:0 3px 3px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;background:var(--accent-contrast);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:42px;height:24px}
& .check.switch .box::after{content:'';position:absolute;left:2px;top:2px;width:16px;height:16px;background:var(--text);transition:transform var(--dur) var(--ease)}
& .check.switch input:checked + .box::after{transform:translateX(18px)}`,
    },
    {
      id: "ios", name: "Rond", desc: "Case ronde, gros interrupteur avec ombre sous le bouton.", tags: ["Amical", "Tactile"],
      attrs: { shape: "round", depth: "soft", energy: "friendly" },
      spec: ["Checkboxes are circles that fill with accent and show a tick.", "Switch is 48×28 with a 24px white knob and a soft shadow.", "Off track uses border-strong at 60% mix."],
      css: `
& .check .box{width:22px;height:22px;border:var(--border-w) solid var(--border-strong);border-radius:50%;background:var(--surface)}
& .check input:checked + .box{background:var(--accent);border-color:var(--accent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:7px;top:3px;width:5px;height:10px;border:solid var(--accent-contrast);border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--accent-contrast);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:48px;height:28px;border:0;border-radius:999px;background:color-mix(in srgb,var(--border-strong) 60%,var(--bg-subtle))}
& .check.switch .box::after{content:'';position:absolute;left:2px;top:2px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.28);transition:transform var(--dur) var(--ease)}
& .check.switch input:checked + .box{background:var(--accent)}
& .check.switch input:checked + .box::after{transform:translateX(20px)}`,
    },
    {
      id: "bare", name: "Trait fin", desc: "Contour fin, coche nue sans remplissage.", tags: ["Minimal", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Unchecked is a 1px outlined square; checked keeps the outline and shows only an accent-text tick, no fill.", "Switch is a thin outlined pill whose dot fills with accent when on.", "Radio shows a ring with a small accent dot."],
      css: `
& .check .box{border:1px solid var(--text);border-radius:2px;background:transparent}
& .check input:checked + .box{border-color:var(--accent-text)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid var(--accent-text);border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--accent-text);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:38px;height:20px;border-radius:999px;border:1px solid var(--text)}
& .check.switch .box::after{content:'';position:absolute;left:3px;top:3px;width:12px;height:12px;border-radius:50%;background:var(--text);transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
& .check.switch input:checked + .box{border-color:var(--accent-text)}
& .check.switch input:checked + .box::after{transform:translateX(18px);background:var(--accent-text)}`,
    },
    {
      id: "console", name: "Console", desc: "Crochets en texte : [x], (•), [on ].", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["No boxes: controls are monospace text glyphs, '[ ]' and '[x]' for checkboxes, '( )' and '(•)' for radios, '[off]' and '[ on]' for switches.", "Checked glyphs turn accent-text.", "Label text is monospace as well."],
      css: `
& .check{font-family:var(--font-mono)}
& .check .box{width:auto;height:auto;font-family:var(--font-mono);color:var(--text-muted);white-space:pre}
& .check .box::before{content:'[ ]'}
& .check input:checked + .box{color:var(--accent-text)}
& .check input:checked + .box::before{content:'[x]'}
& .check.radio .box::before{content:'( )'}
& .check.radio input:checked + .box::before{content:'(•)'}
& .check.switch .box::before{content:'[off]'}
& .check.switch input:checked + .box::before{content:'[ on]'}`,
    },
    {
      id: "tile", name: "Tuile", desc: "Toute la ligne devient une tuile sélectionnable.", tags: ["Tactile", "Lisible"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["The whole label is a bordered tile (padding 10px 14px, control radius) so the hit area is the full row; checked tiles switch to an accent border and an accent-soft fill via :has().", "The inner box is a small 18px rounded control filled with accent when checked; radios use a circle, switches a compact 34×20 pill.", "Focus-visible outlines the tile itself rather than the tiny box."],
      css: `
& .check{padding:10px 14px;border:var(--border-w) solid var(--border);border-radius:var(--r-control);background:var(--surface);transition:border-color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .check:hover{border-color:var(--border-strong)}
& .check:has(input:checked){border-color:var(--accent);background:var(--accent-soft)}
& .check:has(input:focus-visible){outline:2px solid var(--focus);outline-offset:2px}
& .check input:focus-visible + .box{outline:0}
& .check .box{width:18px;height:18px;border:var(--border-w) solid var(--border-strong);border-radius:5px;background:var(--surface)}
& .check input:checked + .box{background:var(--accent);border-color:var(--accent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:5px;top:1px;width:5px;height:9px;border:solid var(--accent-contrast);border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio .box::after{left:50%;top:50%;width:7px;height:7px;border:0;border-radius:50%;background:var(--accent-contrast);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:34px;height:20px;border:0;border-radius:999px;background:var(--border-strong)}
& .check.switch .box::after{content:'';position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3);transition:transform var(--dur) var(--ease)}
& .check.switch input:checked + .box{background:var(--accent)}
& .check.switch input:checked + .box::after{transform:translateX(14px)}`,
    },
    {
      id: "ink", name: "Encre", desc: "Inversé façon interrupteur mécanique : I / O, noir sur blanc.", tags: ["Contrasté", "Industriel"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Checked controls are filled with the text color and drawn in the page background color (inverted tick, dot or knob); unchecked ones are a 2px text-colored outline.", "Switch is a 46×24 rectangle with a square knob and a mono 'I' or 'O' glyph printed on the empty side of the track.", "Radius is 2px everywhere; radios keep a circle but use the same inversion."],
      css: `
& .check .box{border:2px solid var(--text);border-radius:2px;background:transparent}
& .check input:checked + .box{background:var(--text)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:5px;top:1px;width:5px;height:10px;border:solid var(--bg);border-width:0 2.5px 2.5px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--bg);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:46px;height:24px;border-radius:2px;overflow:hidden}
& .check.switch .box::before{content:'O';position:absolute;right:8px;top:50%;transform:translateY(-50%);font:700 11px/1 var(--font-mono);color:var(--text)}
& .check.switch input:checked + .box::before{content:'I';right:auto;left:9px;color:var(--bg)}
& .check.switch .box::after{content:'';position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:1px;background:var(--text);transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
& .check.switch input:checked + .box::after{transform:translateX(22px);background:var(--bg)}`,
    },
    {
      id: "halo", name: "Halo", desc: "Fines pistes, grosse poignée et halo circulaire au survol.", tags: ["Fluide", "Moderne"],
      attrs: { shape: "round", depth: "soft", energy: "calm" },
      spec: ["Checkbox is an 18px rounded square; on hover or focus a 34px translucent accent halo blooms behind it (box-shadow spread, 14% accent).", "Switch is a thin 34×14 track in a 40% border-strong tone with a 20px knob that overflows it and carries a shadow; when on, the track turns accent-soft and the knob accent.", "Radio is a 18px ring with an inner dot that scales in."],
      css: `
& .check .box{width:18px;height:18px;border:2px solid var(--border-strong);border-radius:4px;background:transparent}
& .check:hover input:not(:disabled) + .box,& .check input:focus-visible + .box{box-shadow:0 0 0 8px color-mix(in srgb,var(--accent) 14%,transparent)}
& .check input:checked + .box{background:var(--accent);border-color:var(--accent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:4px;top:0;width:5px;height:10px;border:solid var(--accent-contrast);border-width:0 2px 2px 0;transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%;background:transparent}
& .check.radio input:checked + .box{background:transparent}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--accent);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch{margin-left:3px}
& .check.switch .box{width:34px;height:14px;border:0;border-radius:999px;background:color-mix(in srgb,var(--border-strong) 40%,var(--bg-subtle));overflow:visible}
& .check.switch .box::after{content:'';position:absolute;left:-3px;top:-3px;width:20px;height:20px;border-radius:50%;background:var(--surface-raised);box-shadow:0 1px 4px rgba(0,0,0,.35);transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
& .check.switch input:checked + .box{background:var(--accent-soft)}
& .check.switch input:checked + .box::after{transform:translateX(17px);background:var(--accent)}
& .check.switch:hover input:not(:disabled) + .box::after{box-shadow:0 0 0 8px color-mix(in srgb,var(--accent) 14%,transparent),0 1px 4px rgba(0,0,0,.35)}`,
    },
    {
      id: "pop", name: "Rebond", desc: "Formes de bonbon inclinées, la coche rebondit en s'affichant.", tags: ["Ludique", "Vivant"],
      attrs: { shape: "round", depth: "lift", energy: "playful" },
      spec: ["Checkbox is a 22px squircle (radius 8px) tilted -6deg with a bottom-heavy accent gradient when checked and a 2px lift shadow; the tick pops in with an overshoot easing (cubic-bezier .34,1.56,.64,1).", "Radio is a 22px circle whose dot pops the same way; switch is a 46×26 pill with a knob that stretches to 28px wide while moving.", "Unchecked controls sit flat and level, so the tilt itself signals the checked state."],
      css: `
& .check .box{width:22px;height:22px;border:2px solid var(--border-strong);border-radius:8px;background:var(--surface);transition:transform 260ms cubic-bezier(.34,1.56,.64,1),background var(--dur) var(--ease),border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .check input:checked + .box{transform:rotate(-6deg);background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 82%,white),var(--accent));border-color:color-mix(in srgb,var(--accent) 70%,black);box-shadow:0 2px 0 color-mix(in srgb,var(--accent) 60%,black)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid var(--accent-contrast);border-width:0 3px 3px 0;transform:rotate(45deg) scale(0);transition:transform 320ms cubic-bezier(.34,1.56,.64,1)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio input:checked + .box{transform:none}
& .check.radio .box::after{left:50%;top:50%;width:8px;height:8px;border:0;border-radius:50%;background:var(--accent-contrast);transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:46px;height:26px;border-radius:999px}
& .check.switch input:checked + .box{transform:none;box-shadow:none}
& .check.switch .box::after{content:'';position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:999px;background:var(--text-muted);transition:transform 300ms cubic-bezier(.34,1.56,.64,1),width 300ms var(--ease),background var(--dur) var(--ease)}
& .check.switch:active input:not(:disabled) + .box::after{width:24px}
& .check.switch input:checked + .box::after{transform:translateX(20px);background:var(--accent-contrast)}`,
    },
    {
      id: "soft-ui", name: "Relief", desc: "Cuvettes creusées dans la page, le repère s'allume en accent.", tags: ["Doux", "Tactile"],
      attrs: { shape: "soft", depth: "soft", energy: "calm" },
      spec: ["Every control is a bg-subtle well with an inner dark/light shadow pair (inset 2px 2px 4px dark, inset -2px -2px 4px light) and no border.", "Checked state raises a small accent tick, dot or knob out of the well with a glow; the well itself does not change color.", "Switch is a 44×24 trench with a raised 18px knob (dual outer shadow) that slides 20px and lights accent."],
      css: `
& .check .box{--sh-d:color-mix(in srgb,black 34%,transparent);--sh-l:color-mix(in srgb,var(--surface-raised) 70%,white);border:0;border-radius:7px;background:color-mix(in srgb,var(--text) 6%,var(--bg-subtle));box-shadow:inset 2px 2px 4px var(--sh-d),inset -2px -2px 4px var(--sh-l),0 0 0 1px color-mix(in srgb,var(--text) 8%,transparent)}
& .check:not(.switch) .box::after{content:'';position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid var(--accent);border-width:0 3px 3px 0;border-radius:1px;filter:drop-shadow(0 0 3px color-mix(in srgb,var(--accent) 60%,transparent));transform:rotate(45deg) scale(0);transition:transform var(--dur) var(--ease)}
& .check:not(.switch) input:checked + .box::after{transform:rotate(45deg) scale(1)}
& .check.radio .box{border-radius:50%}
& .check.radio .box::after{left:50%;top:50%;width:10px;height:10px;border:0;border-radius:50%;background:var(--accent);box-shadow:0 0 8px color-mix(in srgb,var(--accent) 70%,transparent);filter:none;transform:translate(-50%,-50%) scale(0)}
& .check.radio input:checked + .box::after{transform:translate(-50%,-50%) scale(1)}
& .check.switch .box{width:44px;height:24px;border-radius:999px}
& .check.switch .box::after{content:'';position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:var(--bg-subtle);border:0;filter:none;box-shadow:2px 2px 4px var(--sh-d),-1px -1px 3px var(--sh-l);transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
& .check.switch input:checked + .box::after{transform:translateX(20px);background:var(--accent)}`,
    },
  ],
};
