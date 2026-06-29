# Handoff: Landing de cumpleaños "Feliz cumple, Valen"

## Overview
Landing de una sola página, scroll vertical, pensada como un **momento emocional dirigido** (no una plantilla genérica de cumpleaños). El corazón de la experiencia es el instante **"tap → todo explota"**: la página arranca con una pantalla de entrada (gate) y, al tocar el botón, se disparan al mismo tiempo música, confeti, globos y la animación de entrada del hero. Estética editorial, elegante, verde agua, mobile-first.

Destinataria: **Valentina ("Valen")**. La firman tres amigos: Diego, Fede y Alan.

## About the Design Files
El archivo de este bundle (`Feliz cumple, Valen.dc.html`) es una **referencia de diseño hecha en HTML** — un prototipo que muestra el look y el comportamiento buscados, **no código de producción para copiar tal cual**. Está construido sobre un runtime propio (`support.js`, etiquetas `<x-dc>`, `<sc-if>`, `{{ }}`); **ignorá ese runtime**.

La tarea es **recrear este diseño como un sitio estático estándar**. Como el usuario pidió explícitamente "HTML + CSS + JS standalone, sin frameworks, listo para subir a Vercel/Netlify", el target ideal es exactamente eso: **un `index.html` plano + `style.css` + `app.js`**, con `canvas-confetti` por CDN. No hace falta React ni ningún framework. Todo el CSS del prototipo está inline; al portarlo, podés moverlo a clases en un `.css`.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografías, tamaños (con `clamp()`), radios, sombras y timings de animación son finales. Recrear pixel-perfect. Los únicos elementos no finales son los **placeholders** que el usuario reemplaza (ver sección Assets).

---

## Design Tokens

### Colores
| Token | Hex | Uso |
|---|---|---|
| Fondo crema (base) | `#F4F0E6` | Fondo principal del body y secciones |
| Verde profundo (tinta) | `#16443D` | Texto principal, "Valen", títulos |
| Teal medio (acento) | `#2E8C7A` | Eyebrows/labels, "Feliz cumple,", "liviano", CTAs (gradiente) |
| Verde agua (protagonista) | `#7FD4C1` | Globos, confeti, selección de texto, halo |
| Verde agua claro | `#9FE0D2` | Globos/confeti, lightbox |
| Coral apagado (acento cálido) | `#E2A38F` | Corazón ♥, confeti, una foto |
| Blanco cálido | `#FBF9F3` | Texto sobre CTA, pills, fondos de label |
| Gris-verde texto sec. | `#4b6f67` | Subtítulos, firma |
| Gris-verde mono | `#6b8a83` / `#3a5f58` | Captions monoespaciadas |

Gradientes:
- **CTA / botones**: `linear-gradient(135deg, #2E8C7A, #16443D)`
- **Fondo gate**: `radial-gradient(120% 90% at 50% 18%, #FBF9F3 0%, #EAF4F0 55%, #DCEFE8 100%)`
- **Fondo dedicatoria**: `linear-gradient(180deg, #F4F0E6 0%, #EFF6F2 100%)`
- **Fondo cierre**: `linear-gradient(180deg, #EFF6F2 0%, #DCEFE8 100%)`
- **Halo del hero (haze)**: `radial-gradient(closest-side, rgba(127,212,193,.45), rgba(127,212,193,0))`, con `filter: blur(8px)`

### Tipografía (Google Fonts)
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap
```
- **Display**: `'Cormorant Garamond', serif` — usado en italic 500/600 para "Valen", hero, dedicatoria, títulos de sección y cierre.
- **Sans (UI/texto)**: `'Hanken Grotesk', sans-serif` — labels, botones, subtítulos.
- **Mono (captions de placeholder)**: `ui-monospace, Menlo, monospace`.

### Espaciado / radios / sombras
- Radios: botones `999px` (pill), tarjetas galería `14px`, lightbox/video `18px`.
- Sombra CTA: `0 12px 30px rgba(22,68,61,.18)`.
- Sombra hover tarjeta: `0 18px 40px rgba(22,68,61,.18)`.
- Sombra pill música: `0 6px 20px rgba(22,68,61,.12)`.
- Easing estándar: `cubic-bezier(.2,.7,.2,1)`.

---

## Screens / Views (secciones, en orden de scroll)

### 0. Gate de entrada (overlay fijo, z-index 50)
- **Propósito**: cumplir el requisito de autoplay de audio (los navegadores bloquean sonido sin gesto del usuario). Nada se dispara hasta que se toca el botón.
- **Layout**: `position:fixed; inset:0`, flex columna centrada, `text-align:center`, `padding:32px`. Fondo: el `radial-gradient` del gate.
- **Componentes** (de arriba a abajo):
  - Eyebrow: "Algo preparado para vos" — Hanken 12px, `letter-spacing:.32em`, uppercase, `#2E8C7A`, weight 600, `margin-bottom:22px`.
  - Nombre: "Valen" — Cormorant italic 600, `font-size:clamp(64px,18vw,150px)`, `line-height:.92`, `#16443D`.
  - Subtítulo: "Subí el volumen. Cuando estés lista, tocá el botón y dejá que pase." — 15px, `line-height:1.6`, `#4b6f67`, `max-width:300px`, `margin:24px 0 36px`.
  - Botón **"Abrir 🤍"** — pill, `padding:18px 40px`, Hanken 16px/600, color `#FBF9F3`, fondo gradiente CTA. Animación de respiración `gateGlow` (sombra pulsante, 3.4s infinita). Hover: `translateY(-3px) scale(1.03)` + `brightness(1.08)`.
- **Entrada**: cada elemento entra con `gateUp` (translateY 16px→0) escalonado (delays .05s / .18s / .34s / .48s).
- **Al tocar el botón** dispara `open()` (ver Interactions) y el gate se desmonta.

### 1. Hero (min-height 100vh, z-index 3)
- Flex columna centrada, `padding:90px 24px 70px`, `overflow:hidden`.
- **Halo `haze`**: div absoluto arriba-centro, `width:min(900px,120vw)`, `height:70vh`, gradiente verde agua, `filter:blur(8px)`, animación `haze` 14s (drift sutil).
- **Eyebrow / fecha**: "30 · junio · feliz vuelta al sol" — Hanken 12px, `letter-spacing:.34em`, uppercase, `#2E8C7A`/600, `margin-bottom:26px`.  ⚠️ La fecha es **30 de junio**.
- **Título `<h1>`** (Cormorant, `line-height:.9`, `#16443D`):
  - Línea 1: "Feliz cumple," — italic 500, `clamp(34px,9vw,76px)`, color `#2E8C7A`. Dos palabras (`Feliz` + `cumple,`).
  - Línea 2: "Valen" — italic 600, `clamp(96px,30vw,260px)`, `letter-spacing:-.01em`.
  - Las 3 palabras tienen `data-hero-word` y entran escalonadas con `heroRise` (translateY 26px + scale .97→1), delay `i*0.15+0.08s`. Se aplica al abrir.
- **Scroll hint**: "deslizá para ver más" + flecha ↓ con animación `scrollHint` (bob vertical, 1.8s).

### 2. Dedicatoria (z-index 3, fondo gradiente dedicatoria)
- `padding:clamp(70px,12vw,140px) 24px`, contenido `max-width:760px`, centrado.
- Eyebrow "Para vos".
- Párrafo (Cormorant 500, `clamp(25px,4.4vw,42px)`, `line-height:1.42`, `#16443D`, `text-wrap:pretty`):
  > **"Feliz cumple, amigaa!!"** *(en italic, color `#2E8C7A`)* Te armamos esto entre los tres porque un "feliz cumple" por WhatsApp nos parecía poco para vos. Gracias por ser así, por el aguante de siempre y por bancarnos en todas. Que tengas un hermoso día **♥** *(color `#E2A38F`)*. Te queremos un montón.
- Firma: "— Diego, Fede y Alan" — Cormorant italic, `clamp(20px,3vw,28px)`, `#4b6f67`, `margin-top:40px`.

### 3. Galería (z-index 3) — masonry + lightbox
- Eyebrow "Momentos" + título "Un poco de todo lo lindo" (Cormorant italic 600, `clamp(36px,7vw,64px)`).
- **Masonry sin media queries**: contenedor `max-width:1080px; column-width:230px; column-gap:18px`. Cada tarjeta: `width:100%; break-inside:avoid; display:inline-block; margin-bottom:18px`.
- 7 tarjetas (alturas y tonos variados, ver tabla). Cada una es un placeholder con franjas (`repeating-linear-gradient(135deg, ...)`) y una caption mono con la ruta de la imagen.

| # | altura | tono base | caption |
|---|---|---|---|
| 01 | 280px | `#7FD4C1` | `/img/foto-01.jpg` |
| 02 | 200px | `#E2A38F` | `/img/foto-02.jpg` |
| 03 | 320px | `#2E8C7A` | `/img/foto-03.jpg` |
| 04 | 230px | `#9FE0D2` | `/img/foto-04.jpg` |
| 05 | 300px | `#7FD4C1` | `/img/foto-05.jpg` |
| 06 | 215px | `#E2A38F` | `/img/foto-06.jpg` |
| 07 | 260px | `#2E8C7A` | `/img/foto-07.jpg` |

- Hover tarjeta: `translateY(-4px)` + sombra `0 18px 40px rgba(22,68,61,.18)`, transición `.45s`.
- **Lightbox** (al hacer click): overlay fijo z-60, fondo `rgba(16,54,47,.82)` + `backdrop-filter:blur(8px)`, `cursor:zoom-out`. Imagen ampliada `width:min(78vw,640px); height:min(72vh,640px)`, radio 18px. Botón cerrar ✕ arriba-derecha (círculo 44×44). Click en overlay o en ✕ cierra. (En producción, mostrar la `<img>` real ampliada en lugar del placeholder.)

### 4. Video (opcional, z-index 3)
- Eyebrow "Un video para vos".
- Placeholder 16:9 (`aspect-ratio:16/9`, radio 18px, gradiente verde agua, borde `1px rgba(46,140,122,.18)`) con un botón play triangular y caption mono.
- En el HTML hay un `<iframe>` de ejemplo comentado. En producción: reemplazar el placeholder por el `<iframe>` de YouTube/Vimeo o un `<video src>`.

### 5. Cierre (z-index 3, fondo gradiente cierre)
- Frase (Cormorant italic 500, `clamp(28px,5.4vw,52px)`, `#16443D`): "Que sea un año tan lindo como vos lo hacés todo."
- Botón **"repetir la magia ✦"** (mismo estilo CTA) → re-dispara confeti (+ globos).
- Footer mono: "hecho con cariño · verde agua".

### Control de música (fijo, z-index 40, aparece tras abrir)
- Pill abajo-derecha (`bottom:20px; right:20px`), fondo `rgba(251,249,243,.82)` + `backdrop-filter:blur(10px)`, borde `1px rgba(22,68,61,.14)`.
- Dos estados: **"Música"** (punto `#2E8C7A` con halo) cuando suena / **"Silencio"** (punto gris, opacidad .65) cuando está muteado. Toggle al click.

---

## Interactions & Behavior

### `open()` — el instante "tap → todo explota" (al tocar "Abrir 🤍")
Dispara **simultáneamente**:
1. **Música**: `audio.play()` con volumen 0 → fade in hasta `musicVolume` (default 0.55) en 900ms. El gesto del usuario desbloquea el autoplay. `.catch()` silencioso si falla.
2. **Confeti burst**: `canvas-confetti` — 1 estallido central (130 partículas, spread 78, startVelocity 42, y:0.58) + 2 laterales (55 c/u, ángulos 60° y 120°).
3. **Confeti fino cayendo** (`shower`): 2800ms, 3 partículas por frame, `gravity:0.42`, `startVelocity:0`, círculos pequeños cayendo desde arriba (`y:-0.08`, x random).
4. **Globos** (`balloons`): 12 globos iniciales + olas de 3 cada 2700ms (×5). Cada globo: tamaño 38–80px, tono random de `['#7FD4C1','#9FE0D2','#3E9E8C','#E2A38F']`, gradiente radial con highlight, hilo de 42px. Animación `floatUp` (sube de `bottom:-150px` hasta `translateY(-128vh)`, con `--sway` lateral y rotación), 9–16s, luego se elimina del DOM.
5. **Entrada del hero** (`heroRise` escalonado en las palabras).

### Confeti — paleta (NO arcoíris)
`['#7FD4C1', '#3E9E8C', '#9FE0D2', '#E2A38F', '#F4F0E6']` (verde agua + coral + crema).

### `repeat()` — botón "repetir la magia"
Re-dispara `burst()` + `shower(1900)` + 8 globos.

### Toggle música
`audio.muted = !audio.muted`, actualiza el estado del pill.

### Revelado al hacer scroll
Cada `<section>` entra con `translateY(26px) → 0` (transición `.9s`) vía `IntersectionObserver` (threshold 0.16), una sola vez. **Importante**: la opacidad nunca baja, sólo se traslada — así el contenido nunca queda oculto si las animaciones no corren.

### `prefers-reduced-motion: reduce`
- Sin confeti fino continuo ni globos; sólo un `gentleBurst` suave (60 partículas).
- Sin entrada escalonada del hero (palabras visibles directo).
- Sin revelado al scroll. CSS: `animation-duration` y `transition-duration` forzados a `.001ms`.

### Responsive
Mobile-first. Todos los tamaños grandes usan `clamp()`. Paddings con `clamp()`. La galería masonry se adapta sola por `column-width`. Sin breakpoints manuales necesarios.

---

## State Management
Estado mínimo:
- `opened` (bool) — controla gate vs. contenido y la aparición del pill de música.
- `muted` (bool) — estado del control de música.
- `lightbox` ({label} | null) — foto abierta en el lightbox.

En un port vanilla, esto se resuelve con un par de variables y `classList`/`hidden` toggles; no hace falta una librería de estado.

---

## Animaciones (keyframes exactos)
```css
@keyframes heroRise{0%{transform:translateY(26px) scale(.97)}100%{transform:translateY(0) scale(1)}}
@keyframes floatUp{0%{transform:translateY(0) translateX(0) rotate(-3deg)}
  50%{transform:translateY(-55vh) translateX(var(--sway,10px)) rotate(3deg)}
  100%{transform:translateY(-128vh) translateX(0) rotate(-2deg);opacity:.78}}
@keyframes gateUp{0%{transform:translateY(16px)}100%{transform:translateY(0)}}
@keyframes gateGlow{0%,100%{box-shadow:0 12px 32px rgba(22,68,61,.16)}
  50%{box-shadow:0 16px 48px rgba(46,140,122,.34)}}
@keyframes scrollHint{0%,100%{transform:translateY(0);opacity:.45}50%{transform:translateY(7px);opacity:.95}}
@keyframes haze{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(3%,-2%) scale(1.08)}}
```
Easing estándar de transiciones: `cubic-bezier(.2,.7,.2,1)`.

---

## Assets (placeholders que reemplaza el usuario)
1. **Audio**: `<audio src="/audio/cumple.mp3" loop preload="none">`. El usuario sube su MP3 a `/audio/cumple.mp3`. **No incluir audio generado.**
2. **Fotos galería**: 7 imágenes en `/img/foto-01.jpg` … `/img/foto-07.jpg`. Reemplazar cada placeholder por `<img src="/img/foto-0X.jpg">` (cover, mismo radio). El lightbox debe mostrar la imagen real ampliada.
3. **Video**: reemplazar el placeholder 16:9 por un `<iframe>` (YouTube/Vimeo) o `<video src>`.
4. **Texto dedicatoria**: ya tiene el mensaje final (Diego, Fede y Alan). Editable.

Dependencia externa: `canvas-confetti@1.9.3` (CDN: `https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js`).

## Files
- `Feliz cumple, Valen.dc.html` — prototipo de referencia (incluido en este bundle). Contiene todo el markup inline, los keyframes y la lógica JS (clase `Component`). Al portar: ignorá `<x-dc>`/`<sc-if>`/`{{ }}`/`support.js`; quedate con el HTML, el CSS inline y la lógica de los métodos `open/burst/shower/balloons/heroIn/toggleMute/repeat/openLightbox`.
# valentina
