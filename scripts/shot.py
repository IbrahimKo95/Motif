"""Capture d'une famille pour vérification visuelle.
Usage : python3 scripts/shot.py <port> <famId> [light|dark] [sortie.png]
Prérequis : `npx vite --port <port>` lancé dans le projet."""
import sys, json
from playwright.sync_api import sync_playwright
port, fam = sys.argv[1], sys.argv[2]
mode = sys.argv[3] if len(sys.argv) > 3 else "light"
out = sys.argv[4] if len(sys.argv) > 4 else f"/tmp/shot_{fam}_{mode}.png"
state = json.dumps({"view": f"fam:{fam}", "mode": mode})
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1440, "height": 3600})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.add_init_script(f"localStorage.setItem('motif:v2', {json.dumps(state)})")
    pg.goto(f"http://localhost:{port}/"); pg.wait_for_timeout(1500)
    pg.screenshot(path=out, clip={"x": 268, "y": 56, "width": 1172, "height": 3544})
    print("erreurs:", errs or "aucune", "->", out)
    b.close()
