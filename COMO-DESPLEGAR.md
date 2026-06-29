# Cómo subir la landing (gratis)

Es un sitio **estático** (`index.html` + `style.css` + `app.js`). No necesita build ni Node.

## Probar en tu compu
Abrí una terminal en esta carpeta y levantá un servidor simple:

```bash
# con Python (ya viene en Windows si instalaste Python)
python -m http.server 5173
```

Después entrá a http://localhost:5173

> Importante: abrir el `index.html` con doble clic (file://) **no carga bien** la música ni las fotos, porque usan rutas que arrancan con `/`. Usá un servidor local o subilo directo.

## Opción A — Vercel (recomendado)
1. Entrá a https://vercel.com y logueate (con GitHub o email).
2. "Add New… → Project". Si no usás Git, podés arrastrar la carpeta en https://vercel.com/new (deploy por drag & drop).
3. Framework Preset: **Other** / Static. No hay build command. Output: la raíz.
4. Deploy. Te da una URL tipo `feliz-cumple-valen.vercel.app`.

## Opción B — Netlify (drag & drop, lo más rápido)
1. Entrá a https://app.netlify.com/drop
2. Arrastrá **toda esta carpeta** a la ventana.
3. Listo, te da una URL al instante.

## Opción C — GitHub Pages
1. Subí la carpeta a un repo de GitHub.
2. Settings → Pages → Source: rama `main`, carpeta `/root`.
3. Te queda en `usuario.github.io/repo`.

## Antes de mandarle el link a Valen
- [ ] Subí las 7 fotos a `/img` (ver `img/LEEME.txt`).
- [ ] Subí la canción a `/audio/cumple.mp3` (ver `audio/LEEME.txt`).
- [ ] (Opcional) Reemplazá el placeholder de video por tu `<iframe>` de YouTube en `index.html`.
- [ ] Releé el texto de la dedicatoria en `index.html` por si querés ajustar algo.

Una vez que ella lo vio, podés borrar el deploy desde el panel de Vercel/Netlify.
