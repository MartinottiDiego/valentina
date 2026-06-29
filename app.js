/* ===================================================================
   Feliz cumple, Valen — lógica
   El instante "tap → todo explota": música + confeti + globos + hero.
   =================================================================== */
(function () {
  'use strict';

  // ---- Config (equivalente a los props del prototipo) ----
  var CONFIG = {
    enableBalloons: true,
    enableConfetti: true,
    musicVolume: 0.55
  };

  // Paleta de confeti/globos: verde agua + neutro + coral (NO arcoíris)
  var CONFETTI_COLORS = ['#7FD4C1', '#3E9E8C', '#9FE0D2', '#E2A38F', '#F4F0E6'];
  var BALLOON_TONES = ['#7FD4C1', '#9FE0D2', '#3E9E8C', '#E2A38F'];

  function reduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  var state = { opened: false, muted: false, lightbox: null };
  var balloonTimer = null;

  // ---- Elementos ----
  var gate = document.getElementById('gate');
  var gateBtn = document.getElementById('gate-btn');
  var audio = document.getElementById('bg-audio');
  var musicToggle = document.getElementById('music-toggle');
  var repeatBtn = document.getElementById('repeat-btn');
  var balloonLayer = document.getElementById('balloon-layer');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  // ===================================================================
  // Revelado al hacer scroll (solo transform; la opacidad nunca baja)
  // ===================================================================
  function setupReveal() {
    if (reduced()) return;
    requestAnimationFrame(function () {
      var els = document.querySelectorAll('[data-reveal]');
      els.forEach(function (el) {
        el.style.transform = 'translateY(26px)';
        el.style.transition = 'transform .9s cubic-bezier(.2,.7,.2,1)';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var t = e.target;
            t.style.transform = 'none';
            setTimeout(function () {
              t.style.transition = 'none';
              t.style.transform = 'none';
            }, 1000);
            io.unobserve(t);
          }
        });
      }, { threshold: 0.16 });
      els.forEach(function (el) { io.observe(el); });
    });
  }

  // ===================================================================
  // open() — el instante "tap → todo explota"
  // ===================================================================
  function open() {
    if (state.opened) return;
    state.opened = true;

    // Desmontar gate, liberar el scroll y mostrar control de música
    gate.classList.add('is-hidden');
    setTimeout(function () { gate.hidden = true; }, 800);
    document.body.classList.remove('is-locked');
    musicToggle.hidden = false;

    // 1. Música (autoplay desbloqueado por el gesto del usuario)
    if (audio) {
      audio.volume = 0;
      var p = audio.play();
      if (p && p.then) {
        p.then(function () { fade(audio, CONFIG.musicVolume, 900); }).catch(function () {});
      }
    }

    // 2. Confeti + globos + entrada del hero
    if (reduced()) {
      if (CONFIG.enableConfetti) gentleBurst();
      return;
    }
    if (CONFIG.enableConfetti) { burst(); shower(2800); }
    if (CONFIG.enableBalloons) balloons();
    heroIn();
  }

  function heroIn() {
    var words = document.querySelectorAll('[data-hero-word]');
    words.forEach(function (el, i) {
      el.style.animation = 'heroRise .9s cubic-bezier(.2,.7,.2,1) ' + (i * 0.15 + 0.08) + 's both';
    });
  }

  // ===================================================================
  // Confeti
  // ===================================================================
  function burst() {
    if (!window.confetti) return;
    var colors = CONFETTI_COLORS;
    window.confetti({ particleCount: 130, spread: 78, startVelocity: 42, origin: { y: 0.58 }, colors: colors, scalar: 0.9 });
    window.confetti({ particleCount: 55, angle: 60, spread: 55, origin: { x: 0, y: 0.62 }, colors: colors });
    window.confetti({ particleCount: 55, angle: 120, spread: 55, origin: { x: 1, y: 0.62 }, colors: colors });
  }

  function gentleBurst() {
    if (!window.confetti) return;
    window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: CONFETTI_COLORS, scalar: 0.8 });
  }

  function shower(duration) {
    if (!window.confetti) return;
    var end = Date.now() + duration;
    var colors = CONFETTI_COLORS;
    function tick() {
      window.confetti({
        particleCount: 3, startVelocity: 0, ticks: 320, gravity: 0.42, scalar: 0.78,
        drift: 0.4, origin: { x: Math.random(), y: -0.08 }, colors: colors, shapes: ['circle']
      });
      if (Date.now() < end) requestAnimationFrame(tick);
    }
    tick();
  }

  // ===================================================================
  // Globos
  // ===================================================================
  function balloons() {
    if (!balloonLayer) return;
    spawn(balloonLayer, 12);
    var waves = 0;
    balloonTimer = setInterval(function () {
      if (waves++ > 5 || !state.opened) { clearInterval(balloonTimer); return; }
      spawn(balloonLayer, 3);
    }, 2700);
  }

  function spawn(layer, count) {
    for (var i = 0; i < count; i++) {
      var b = document.createElement('div');
      var size = 38 + Math.random() * 42;
      var tone = BALLOON_TONES[(Math.random() * BALLOON_TONES.length) | 0];
      var left = Math.random() * 100;
      var dur = 9 + Math.random() * 7;
      var delay = Math.random() * 1.6;
      var sway = (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 14);
      b.style.cssText =
        'position:absolute;left:' + left + 'vw;bottom:-150px;width:' + size + 'px;height:' + (size * 1.2) + 'px;' +
        'border-radius:50% 50% 48% 48%;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.6),' + tone + ');' +
        'box-shadow:inset -6px -9px 16px rgba(0,0,0,.08);opacity:.92;--sway:' + sway + 'px;' +
        'animation:floatUp ' + dur + 's cubic-bezier(.42,0,.5,1) ' + delay + 's forwards';
      var str = document.createElement('div');
      str.style.cssText = 'position:absolute;top:100%;left:50%;width:1px;height:42px;background:rgba(22,68,61,.28);transform:translateX(-50%)';
      b.appendChild(str);
      layer.appendChild(b);
      (function (node) {
        setTimeout(function () { node.remove(); }, (dur + delay) * 1000 + 300);
      })(b);
    }
  }

  // ===================================================================
  // Audio fade + toggle
  // ===================================================================
  function fade(a, target, ms) {
    var start = a.volume, t0 = performance.now();
    function step(t) {
      var k = Math.min(1, (t - t0) / ms);
      a.volume = start + (target - start) * k;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function toggleMute() {
    if (!audio) return;
    audio.muted = !audio.muted;
    state.muted = audio.muted;
    musicToggle.querySelector('.music__on').hidden = state.muted;
    musicToggle.querySelector('.music__off').hidden = !state.muted;
  }

  // ===================================================================
  // Repetir la magia
  // ===================================================================
  function repeat() {
    if (reduced()) { gentleBurst(); return; }
    burst();
    shower(1900);
    if (CONFIG.enableBalloons && balloonLayer) spawn(balloonLayer, 8);
  }

  // ===================================================================
  // Lightbox
  // ===================================================================
  function openLightbox(src) {
    state.lightbox = { src: src };
    lightboxImg.src = src;
    lightbox.hidden = false;
  }
  function closeLightbox() {
    state.lightbox = null;
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  // ===================================================================
  // Wiring
  // ===================================================================
  gateBtn.addEventListener('click', open);
  musicToggle.addEventListener('click', toggleMute);
  repeatBtn.addEventListener('click', repeat);

  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      openLightbox(card.dataset.src);
    });
  });

  lightbox.addEventListener('click', function (e) {
    // Cerrar al clickear el overlay o el ✕ (no la imagen ampliada)
    if (e.target !== lightboxImg) closeLightbox();
  });
  lightboxClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.lightbox) closeLightbox();
  });

  setupReveal();
})();
