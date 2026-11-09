/* =========================================================
   Ruta Rural · app principal (sin frameworks, funciona sin internet)
   ========================================================= */
(function () {
  'use strict';
  var VERSION = '1.0.0';
  var NUEVAS_POR_DIA = 15;
  var KEY = 'rr_v1';
  var DIA = 864e5;

  var TARJETAS = window.RR_TARJETAS, MODULOS = window.RR_MODULOS;
  var vista = document.getElementById('vista');
  var navZona = document.getElementById('nav-zona');
  var toastZona = document.getElementById('toast-zona');

  /* ---------- Estado guardado en el celular ---------- */
  function cargar() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  var S = Object.assign({ nombre: '', srs: {}, dias: [], vistosCaso: [], vistosJuego: [], nuevasHoy: { fecha: '', n: 0 }, stats: { tarjetas: 0, juegos: 0, casos: 0 } }, cargar());
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

  /* ---------- Utilidades ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function nom(s) { return s.replace(/\{n\}/g, esc(S.nombre || 'colega')); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function mezclar(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function hoy() { return ymd(new Date()); }
  function saludo() { var h = new Date().getHours(); return h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches'); }
  function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function modulo(id) { return MODULOS.filter(function (m) { return m.id === id; })[0]; }
  function tarjetasDe(mod) { return TARJETAS.filter(function (c) { return !mod || c.m === mod; }); }
  function dominada(c) { var s = S.srs[c.id]; return s && s.reps >= 2 && s.int >= 6; }

  /* ---------- Íconos y Clara ---------- */
  var IC = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
    cards: '<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/>',
    game: '<rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/>',
    case: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h4"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/>',
    venus: '<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>',
    syringe: '<path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6"/>',
    heart: '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    hills: '<path d="m3 20 6-9 4 5 3-4 5 8z"/><circle cx="17" cy="6" r="2"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 1 1 1.5 2 2 2.5C11.5 8 11 5.5 12 3z"/>',
    left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    ext: '<path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>'
  };
  function ic(n, s, color) { return '<svg width="' + (s || 22) + '" height="' + (s || 22) + '" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[n] + '</svg>'; }

  function clara(size, etiqueta) {
    var aria = etiqueta === false ? 'aria-hidden="true"' : 'role="img" aria-label="Clara, tu enfermera asistente"';
    return '<svg class="clara" width="' + size + '" height="' + size + '" viewBox="0 0 120 120" ' + aria + '>' +
      '<circle cx="60" cy="60" r="58" fill="#DCD3F5"/><path d="M22 120c2-22 18-34 38-34s36 12 38 34z" fill="#B9A8E8"/>' +
      '<rect x="52" y="74" width="16" height="15" rx="6" fill="#D49C78"/><path d="M50 88l10 13 10-13" fill="none" stroke="#8E7CC9" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M44 92c-2 9 3 17 12 19M76 92c2 9-3 17-12 19" fill="none" stroke="#2A1E3F" stroke-width="2.5" stroke-linecap="round"/><circle cx="60" cy="111" r="4" fill="#2A1E3F"/>' +
      '<circle cx="60" cy="19" r="11" fill="#3B2420"/><path d="M31 58c0-20 13-34 29-34s29 14 29 34c0 9-2 16-5 22H36c-3-6-5-13-5-22z" fill="#3B2420"/>' +
      '<ellipse cx="60" cy="57" rx="22" ry="25" fill="#E3AE89"/><path d="M38 53c4-14 14-21 26-21 8 0 14 4 18 10-8 2-20 2-28-4-4 8-10 13-16 15z" fill="#3B2420"/>' +
      '<g class="clara-eyes"><ellipse cx="51" cy="58" rx="2.6" ry="3.2" fill="#2A1E3F"/><ellipse cx="69" cy="58" rx="2.6" ry="3.2" fill="#2A1E3F"/></g>' +
      '<circle cx="46" cy="66" r="4" fill="#EE9E92" opacity=".55"/><circle cx="74" cy="66" r="4" fill="#EE9E92" opacity=".55"/>' +
      '<path d="M53 68c4 4 10 4 14 0" fill="none" stroke="#7A3B2E" stroke-width="2.5" stroke-linecap="round"/></svg>';
  }
  function claraDice(html, size, clase) { return '<div class="clara-dice pop ' + (clase || '') + '">' + clara(size || 48) + '<div class="burbuja">' + html + '</div></div>'; }
  function atras(href, txt) { return '<a class="atras" href="' + (href || '#/inicio') + '">' + ic('left', 18) + (txt || 'Inicio') + '</a>'; }

  /* ---------- Toasts de Clara ---------- */
  function toast(html, boton, accion, ms) {
    var el = document.createElement('div');
    el.className = 'toast pop';
    el.innerHTML = clara(36, false) + '<span>' + html + '</span>' + (boton ? '<button type="button">' + boton + '</button>' : '');
    toastZona.innerHTML = ''; toastZona.appendChild(el);
    var b = el.querySelector('button');
    if (b) b.onclick = function () { el.remove(); if (accion) accion(); };
    if (ms !== 0) setTimeout(function () { if (el.parentNode) el.remove(); }, ms || 6000);
  }

  /* ---------- Racha ---------- */
  function marcarEstudio() { var d = hoy(); if (S.dias.indexOf(d) < 0) { S.dias.push(d); guardar(); } }
  function rachaActual() {
    var set = {}; S.dias.forEach(function (d) { set[d] = 1; });
    var d = new Date(); if (!set[ymd(d)]) d = new Date(d.getTime() - DIA);
    var n = 0; while (set[ymd(d)]) { n++; d = new Date(d.getTime() - DIA); }
    return n;
  }
  function mejorRacha() {
    var ds = S.dias.slice().sort(); var mejor = 0, act = 0, prev = null;
    ds.forEach(function (s) { var t = new Date(s + 'T12:00:00').getTime(); act = (prev && Math.round((t - prev) / DIA) === 1) ? act + 1 : 1; prev = t; if (act > mejor) mejor = act; });
    return mejor;
  }

  /* ---------- Repetición espaciada (estilo SM-2) ---------- */
  function cupoNuevas() { if (S.nuevasHoy.fecha !== hoy()) S.nuevasHoy = { fecha: hoy(), n: 0 }; return Math.max(0, NUEVAS_POR_DIA - S.nuevasHoy.n); }
  function vencidas(mod) { var ahora = Date.now(); return tarjetasDe(mod).filter(function (c) { var s = S.srs[c.id]; return s && s.due <= ahora; }).sort(function (a, b) { return S.srs[a.id].due - S.srs[b.id].due; }); }
  function nuevas(mod) { return tarjetasDe(mod).filter(function (c) { return !S.srs[c.id]; }); }
  function siguiente(st, q) {
    var s = Object.assign({ ef: 2.5, int: 0, reps: 0, due: 0 }, st || {});
    if (q < 3) { s.reps = 0; s.int = 0; s.due = Date.now() + 60000; return s; }
    if (s.reps === 0) s.int = q === 5 ? 4 : 1;
    else if (s.reps === 1) s.int = q === 3 ? 3 : (q === 4 ? 6 : 10);
    else s.int = Math.max(1, Math.round(s.int * s.ef * (q === 3 ? 0.8 : (q === 5 ? 1.3 : 1))));
    s.reps++;
    s.ef = Math.max(1.3, s.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    s.due = Date.now() + s.int * DIA;
    return s;
  }
  function etiquetaIntervalo(st, q) {
    if (q < 3) return '1 min';
    var d = siguiente(st, q).int;
    if (d < 7) return d + (d === 1 ? ' día' : ' días');
    if (d < 30) return Math.round(d / 7) + ' sem';
    return Math.round(d / 30) + (Math.round(d / 30) === 1 ? ' mes' : ' meses');
  }

  /* ---------- Navegación ---------- */
  var NAV = [['inicio', 'home', 'Inicio'], ['tarjetas', 'cards', 'Tarjetas'], ['juego', 'game', 'Juegos'], ['caso', 'case', 'Casos'], ['videos', 'play', 'Videos']];
  function pintarNav(activo) {
    if (!activo) { navZona.innerHTML = ''; return; }
    navZona.innerHTML = '<div class="nav-wrap"><nav class="nav" aria-label="Navegación principal">' + NAV.map(function (n) {
      return '<a href="#/' + n[0] + '"' + (n[0] === activo ? ' aria-current="page"' : '') + '>' + ic(n[1], 21) + n[2] + '</a>';
    }).join('') + '</nav></div>';
  }

  /* =========================================================
     VISTAS
     ========================================================= */
  var V = {};
  var mem = { sesion: null, juego: null, caso: null, calMes: 0, nombreTmp: '', confirmarReinicio: false, filtroVideo: '' };

  /* ---------- Bienvenida (solo la primera vez) ---------- */
  V.bienvenida = function () {
    var listo = !!S.nombre;
    var html = '<div class="fila entre"><span class="marca">ruta<span>·</span>rural</span><span class="chico">Paso ' + (listo ? 2 : 1) + ' de 2</span></div>' +
      '<div class="bienvenida-hero"><svg class="mancha" width="300" height="230" viewBox="0 0 300 230" aria-hidden="true"><path d="M54 40c40-38 150-44 196 0 40 38 40 120-6 158-46 38-150 40-196 2C4 160 14 78 54 40z" fill="#F8D8C2" opacity=".7"/><circle cx="258" cy="46" r="10" fill="#CFE6DA"/><circle cx="34" cy="176" r="7" fill="#F4E6B5"/></svg><div style="position:relative">' + clara(180) + '</div></div>';
    if (!listo) {
      html += '<div class="burbuja pop" style="font-size:16px"><strong>¡Hola! Soy Clara.</strong> Voy a acompañarte a repasar todo lo que necesitas para tu rural.</div>' +
        '<div class="burbuja pop d1" style="font-size:16px">¿Cómo quieres que te llame?</div>' +
        '<form data-form="nombre" style="display:flex;flex-direction:column;gap:8px"><label for="nombre" style="font-size:13px;font-weight:700">Tu nombre</label>' +
        '<div class="fila"><input id="nombre" class="campo" type="text" maxlength="30" autocomplete="given-name" placeholder="Escribe tu nombre" required style="flex:1;min-width:0">' +
        '<button class="btn" type="submit">Listo</button></div><p class="mini">Tu nombre se guarda solo en este celular. Puedes cambiarlo en Ajustes.</p></form>';
    } else {
      html += '<div class="burbuja pop" style="font-size:16px"><strong>' + saludo() + ', jefe ' + esc(S.nombre) + '.</strong> Desde hoy te voy a llamar así.</div>' +
        '<div class="burbuja pop d1" style="font-size:16px">Cada día te espero con un repaso corto. Si te surge una duda, búscame: siempre estoy por aquí. ¿Arrancamos?</div>' +
        '<a class="btn" href="#/inicio">Entrar a mi repaso ' + ic('right', 20) + '</a>';
    }
    return { html: html, nav: null };
  };

  /* ---------- Inicio ---------- */
  V.inicio = function () {
    var r = rachaActual();
    var fecha = capital(new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }));
    var dato = TARJETAS[Math.floor(Date.now() / DIA) % TARJETAS.length];
    // semana actual (lunes a domingo)
    var d0 = new Date(); var dow = (d0.getDay() + 6) % 7; var lunes = new Date(d0.getTime() - dow * DIA);
    var set = {}; S.dias.forEach(function (x) { set[x] = 1; });
    var letras = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    var semana = letras.map(function (l, i) {
      var d = new Date(lunes.getTime() + i * DIA); var k = ymd(d); var esHoy = k === hoy();
      var cls = esHoy ? (set[k] ? 'hecho' : 'hoy') : (set[k] ? 'hecho' : (d < d0 ? 'falta' : 'futuro'));
      var dentro = esHoy && !set[k] ? ic('flame', 18) : d.getDate();
      return '<span class="dia">' + l + '<span class="punto ' + cls + '">' + dentro + '</span></span>';
    }).join('');
    var venc = vencidas().length; var nuev = Math.min(cupoNuevas(), nuevas().length);
    var mods = MODULOS.filter(function (m) { return m.enfasis; }).map(function (m) {
      var cs = tarjetasDe(m.id); var pct = cs.length ? Math.round(cs.filter(dominada).length / cs.length * 100) : 0;
      return '<a class="modulo c-' + m.color + '" href="#/modulo/' + m.id + '"><span class="ico">' + ic(m.icono, 20) + '</span><span class="nom">' + m.nombre + '</span><span class="sub">' + m.sub + '</span><span class="prog"><span style="width:' + pct + '%"></span></span></a>';
    }).join('') + '<a class="modulo c-mauve" href="#/caso"><span class="ico">' + ic('hills', 20) + '</span><span class="nom">Casos del rural</span><span class="sub">Situaciones reales del puesto de salud</span><span class="prog"><span style="width:' + Math.min(100, S.stats.casos * 5) + '%"></span></span></a>';
    var html = '<div class="fila entre"><span class="marca">ruta<span>·</span>rural</span><span class="fila" style="gap:8px">' +
      '<a class="racha-pill" href="#/racha" aria-label="Racha de ' + r + ' días, ver calendario">' + ic('flame', 20) + r + '</a>' +
      '<a class="icono-btn" href="#/ajustes" aria-label="Ajustes">' + ic('gear', 20) + '</a></span></div>' +
      '<div style="display:flex;flex-direction:column;gap:4px"><p class="chico">' + fecha + '</p><h1 style="font-size:30px;line-height:1.08">' + saludo() + ',<br>jefe ' + esc(S.nombre) + '</h1>' +
      '<svg class="squiggle" width="132" height="12" viewBox="0 0 132 12" aria-hidden="true"><path d="M2 8c14-6 24 4 38-1s22-6 34 0 24 4 34-1 16-4 22-2" fill="none" stroke="#B9A8E8" stroke-width="4" stroke-linecap="round"/></svg></div>' +
      claraDice('<strong>Dato del día · ' + dato.t + '</strong><br>' + dato.q + ' <strong>' + dato.a + '</strong>') +
      '<a class="semana" href="#/racha" aria-label="Tu semana de estudio">' + semana + '</a>' +
      '<div class="hoy-card"><span class="circulo" aria-hidden="true"></span><p class="sobre">Tu repaso de hoy</p>' +
      '<h2 style="font-size:24px;line-height:1.15">' + (venc + nuev) + ' tarjetas · 1 reto<br>1 caso nuevo</h2>' +
      '<p style="font-size:14px;color:var(--soft)">' + venc + ' para repasar y ' + nuev + ' nuevas.</p>' +
      '<a class="btn" href="#/tarjetas" style="align-self:flex-start;min-height:48px;margin-top:4px">Empezar ' + ic('right', 18) + '</a></div>' +
      '<h2 class="titulo-sec">Énfasis para el rural</h2><div class="rejilla">' + mods + '</div>' +
      '<a class="fila-link" href="#/pensum"><span style="display:flex;flex-direction:column;gap:4px"><span class="t">Todo el pensum</span><span class="mini">8 periodos · tu malla curricular completa</span></span>' + ic('right', 20) + '</a>';
    return { html: html, nav: 'inicio', despues: function () {
      if (Math.random() < 0.35) setTimeout(function () { if (location.hash.indexOf('inicio') >= 0 || location.hash === '') { var c = pick(TARJETAS); toast('<strong>¿Te acuerdas?</strong> ' + c.n); } }, 2500);
    } };
  };

  /* ---------- Racha ---------- */
  V.racha = function () {
    var base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + mem.calMes);
    var mes = capital(base.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }));
    var primero = (base.getDay() + 6) % 7; var diasMes = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    var set = {}; S.dias.forEach(function (x) { set[x] = 1; });
    var hoyD = new Date(); var celdas = '';
    for (var b = 0; b < primero; b++) celdas += '<span></span>';
    var enMes = 0;
    for (var d = 1; d <= diasMes; d++) {
      var f = new Date(base.getFullYear(), base.getMonth(), d); var k = ymd(f);
      var cls = k === hoy() ? (set[k] ? 'hecho' : 'hoy') : (set[k] ? 'hecho' : (f < hoyD ? 'falta' : 'futuro'));
      if (set[k]) enMes++;
      celdas += '<span class="punto ' + cls + '"' + (k === hoy() ? ' aria-current="date"' : '') + '>' + d + '</span>';
    }
    var r = rachaActual();
    var msg = r === 0 ? 'Hoy es un buen día para empezar tu racha, jefe {n}. Con un repaso corto ya cuenta.' :
      (S.dias.indexOf(hoy()) >= 0 ? '¡' + r + (r === 1 ? ' día' : ' días seguidos') + ', jefe {n}! Mañana te espero para seguir sumando.' : 'Llevas ' + r + (r === 1 ? ' día' : ' días') + ', jefe {n}. Repasa hoy para no perder la racha.');
    var html = atras() + '<h1 style="font-size:28px">Tu racha</h1>' +
      '<div class="c-peach fila" style="border-radius:26px 26px 26px 10px;padding:18px 20px;gap:16px"><span style="width:64px;height:64px;border-radius:22px;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;flex:none">' + ic('flame', 36) + '</span>' +
      '<span style="display:flex;flex-direction:column;gap:2px"><span style="font-family:var(--display);font-weight:800;font-size:34px;line-height:1">' + r + (r === 1 ? ' día' : ' días') + '</span><span style="font-size:14px;color:var(--soft);font-weight:600">seguidos · tu mejor racha: ' + mejorRacha() + '</span></span></div>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:12px"><div class="fila entre">' +
      '<button class="icono-btn" style="background:var(--ground)" data-acc="mes" data-d="-1" aria-label="Mes anterior">' + ic('left', 20) + '</button><h2 style="font-size:18px">' + mes + '</h2>' +
      '<button class="icono-btn" style="background:var(--ground)" data-acc="mes" data-d="1" aria-label="Mes siguiente">' + ic('right', 20) + '</button></div>' +
      '<div class="cal-cab"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div><div class="cal">' + celdas + '</div>' +
      '<div class="leyenda"><span><span class="punto hecho" style="width:12px;height:12px"></span>Estudiaste</span><span><span class="punto hoy" style="width:12px;height:12px;box-shadow:0 0 0 2px var(--ink)"></span>Hoy</span><span><span class="punto falta" style="width:12px;height:12px"></span>Sin repaso</span></div></div>' +
      '<div class="rejilla"><div class="stat c-mint"><b>' + enMes + '</b><span>días estudiados este mes</span></div><div class="stat c-sky"><b>' + S.stats.tarjetas + '</b><span>tarjetas repasadas en total</span></div></div>' +
      claraDice(nom(msg));
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Módulo ---------- */
  V.modulo = function (id) {
    var m = modulo(id); if (!m) return V.inicio();
    var cs = tarjetasDe(id); var dom = cs.filter(dominada).length;
    var temas = {}; cs.forEach(function (c) { (temas[c.t] = temas[c.t] || []).push(c); });
    var lista = Object.keys(temas).map(function (t, i) {
      return '<details class="tema"><summary><span class="num">' + (i + 1) + '</span><span style="flex:1;display:flex;flex-direction:column;gap:2px"><b style="font-size:15px">' + t + '</b><span class="mini">' + temas[t].length + ' tarjeta' + (temas[t].length > 1 ? 's' : '') + '</span></span>' + ic('right', 18) + '</summary>' +
        '<div class="qa">' + temas[t].map(function (c) { return '<div><b>' + c.q + '</b>' + c.a + (c.n ? '<br><span class="mini">' + c.n + '</span>' : '') + '<br><span class="mini">Fuente: ' + c.f + '</span></div>'; }).join('') + '</div></details>';
    }).join('');
    var html = atras() +
      '<div class="cabecera-mod c-' + m.color + '"><span style="width:40px;height:40px;border-radius:14px;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center">' + ic(m.icono, 22) + '</span>' +
      '<h1 style="font-size:25px;line-height:1.1">' + m.nombre + '</h1><p style="font-size:14px;color:var(--soft);font-weight:600">' + dom + ' de ' + cs.length + ' tarjetas dominadas</p></div>' +
      '<div class="fila" style="flex-wrap:wrap"><a class="btn" href="#/tarjetas/' + id + '">' + ic('cards', 20) + 'Repasar tarjetas</a>' +
      (m.juego || id === 'proc' ? '<a class="btn suave" href="#/juego">' + ic('game', 20) + 'Jugar</a>' : '') +
      '<a class="btn suave" href="#/videos/' + id + '">' + ic('play', 20) + 'Videos</a></div>' +
      claraDice('Toca un tema para leer sus tarjetas, jefe ' + esc(S.nombre) + '. Cuando te sientas lista, repásalas para que se te queden.', 44) +
      '<div style="display:flex;flex-direction:column;gap:8px">' + lista + '</div>';
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Tarjetas ---------- */
  function nuevaSesion(mod, libre) {
    var cola;
    if (libre) cola = mezclar(tarjetasDe(mod)).slice(0, 20).map(function (c) { return c.id; });
    else cola = vencidas(mod).map(function (c) { return c.id; }).concat(nuevas(mod).slice(0, cupoNuevas()).map(function (c) { return c.id; }));
    mem.sesion = { mod: mod || '', libre: !!libre, cola: cola, i: 0, mostrada: false, pista: false, hechas: 0, total: cola.length };
  }
  V.tarjetas = function (mod) {
    mod = mod || '';
    if (!mem.sesion || mem.sesion.mod !== mod) nuevaSesion(mod);
    var s = mem.sesion; var m = modulo(mod);
    var volver = mod ? atras('#/modulo/' + mod, m ? m.nombre : 'Módulo') : atras();
    if (!s.cola.length || s.i >= s.cola.length) {
      var hubo = s.hechas > 0;
      return { html: volver + (hubo ? claraDice('<strong>¡Listo por hoy, jefe ' + esc(S.nombre) + '!</strong> Repasaste ' + s.hechas + ' tarjeta' + (s.hechas > 1 ? 's' : '') + '. Las difíciles te las traigo antes y las fáciles dentro de unos días.', 56)
        : claraDice('<strong>¡Estás al día, jefe ' + esc(S.nombre) + '!</strong> No tienes tarjetas pendientes' + (m ? ' en este módulo' : '') + '. Si quieres, hacemos un repaso libre.', 56)) +
        '<div class="fila" style="flex-wrap:wrap;padding-left:66px"><button class="btn claro" data-acc="libre">Repaso libre</button><a class="btn" href="#/juego">Ir al reto ' + ic('right', 18) + '</a></div>', nav: 'tarjetas' };
    }
    var c = TARJETAS.filter(function (x) { return x.id === s.cola[s.i]; })[0];
    var st = S.srs[c.id];
    var pct = Math.round(s.i / s.total * 100);
    var html = '<div class="fila entre">' + volver + '<span class="chico">' + Math.min(s.i + 1, s.total) + ' / ' + s.total + (s.libre ? ' · libre' : '') + '</span></div>' +
      '<div class="barra" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del repaso"><span style="width:' + Math.max(pct, 3) + '%"></span></div>' +
      '<div class="flash"><div class="banda">' + modulo(c.m).nombre + ' · ' + c.t + '</div><div class="cuerpo"><h1>' + c.q + '</h1>' +
      (s.mostrada ? '<div class="respuesta pop"><p class="a">' + c.a + '</p>' + (c.n ? '<p class="n">' + c.n + '</p>' : '') + '<p class="mini">Fuente: ' + c.f + '</p></div>' : '') + '</div></div>' +
      (s.pista && !s.mostrada ? claraDice('<strong>Pista:</strong> ' + c.h, 44) : '');
    if (!s.mostrada) {
      html += '<div class="fila"><button class="btn suave" data-acc="pista" style="padding:0 14px 0 8px">' + clara(38, false) + 'Pista</button><button class="btn" data-acc="mostrar" style="flex:1">Mostrar respuesta</button></div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;gap:8px"><p class="chico" style="text-align:center">¿Qué tan bien la recordaste?</p><div class="calif">' +
        [[1, 'Otra vez', 'var(--bad-bg)', 'var(--bad)'], [3, 'Difícil', 'var(--peach)', 'var(--peach-ink)'], [4, 'Bien', 'var(--mint)', 'var(--ok)'], [5, 'Fácil', 'var(--sky)', 'var(--sky-ink)']].map(function (b) {
          return '<button data-acc="calificar" data-q="' + b[0] + '" style="background:' + b[2] + ';color:' + b[3] + '">' + b[1] + '<small>' + etiquetaIntervalo(st, b[0]) + '</small></button>';
        }).join('') + '</div></div>';
    }
    return { html: html, nav: 'tarjetas' };
  };

  /* ---------- Juegos ---------- */
  V.juego = function () {
    if (!mem.juego) mem.juego = window.RR_GEN.juego(S.vistosJuego);
    var j = mem.juego; var resp = j.respondida;
    var etq = j.etiquetas || ['Ingresos', 'Egresos'];
    function lista(arr) { return arr.map(function (x) { return '<span>' + x[0] + ': ' + (typeof x[1] === 'number' ? x[1].toLocaleString('es-CO') + (j.tipo === 'goteo' && x[0] === 'Factor' ? '' : ' ml') : x[1]) + '</span>'; }).join(''); }
    var html = '<div class="fila entre">' + atras() + '<span class="etq c-sky" style="color:var(--sky-ink)">' + j.tema + '</span></div>' +
      '<h1 style="font-size:26px;line-height:1.1">' + j.titulo + '</h1>' + claraDice(nom(j.intro), 44) +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:12px"><p style="font-size:14.5px;line-height:1.45">' + j.enunciado + '</p>' +
      '<div class="datos"><div class="caja-dato c-sky"><span class="k" style="color:var(--sky-ink)">' + etq[0] + '</span>' + lista(j.ingresos) + '</div>' +
      '<div class="caja-dato c-peach"><span class="k" style="color:var(--peach-ink)">' + etq[1] + '</span>' + lista(j.egresos) + '</div></div></div>' +
      '<div class="opciones" role="group" aria-label="Opciones de respuesta" style="grid-template-columns:repeat(2,minmax(0,1fr))">' + j.opciones.map(function (o, i) {
        var cls = resp ? (o.ok ? 'ok' : (i === j.elegida ? 'mal' : 'apagada')) : '';
        return '<button class="opcion ' + cls + '" data-acc="respJuego" data-i="' + i + '"' + (resp ? ' disabled' : '') + '>' + o.t + '</button>';
      }).join('') + '</div>';
    if (resp) {
      var bien = j.opciones[j.elegida].ok;
      html += claraDice('<strong>' + (bien ? '¡Eso, jefe ' + esc(S.nombre) + '!' : nom(pick(window.RR_CLARA.fallo))) + '</strong><br>' + j.solucion.join('<br>'), 44) +
        '<button class="btn" data-acc="otroJuego" style="align-self:flex-end">Siguiente reto ' + ic('right', 18) + '</button>';
    }
    return { html: html, nav: 'juego' };
  };

  /* ---------- Casos (chat con Clara) ---------- */
  V.caso = function () {
    if (!mem.caso) mem.caso = window.RR_GEN.caso(S.vistosCaso);
    var c = mem.caso; var resp = c.respondida;
    var msgs = c.mensajes.map(function (t, i) { return '<div class="msg pop d' + Math.min(i, 3) + '">' + nom(t) + '</div>'; }).join('') +
      '<div class="msg pop d2 chips">' + c.datos.map(function (d) { return '<span class="etq ' + d.tono + '">' + d.t + '</span>'; }).join('') + '</div>' +
      '<div class="msg pop d3"><strong>' + c.pregunta + '</strong></div>';
    var cuerpo = msgs;
    if (!resp) {
      cuerpo += '<div class="opciones" role="group" aria-label="Opciones de respuesta" style="padding-left:24px;margin-top:4px">' + c.opciones.map(function (o, i) {
        return '<button class="opcion" style="min-height:48px;font-size:14px" data-acc="respCaso" data-i="' + i + '">' + o.t + '</button>';
      }).join('') + '</div>';
    } else {
      var o = c.opciones[c.elegida];
      cuerpo += '<div class="msg yo pop">' + o.t + '</div>' +
        '<div class="msg pop d1"><strong>' + (o.ok ? '¡Exacto, jefe ' + esc(S.nombre) + '!' : 'Esa no, jefe ' + esc(S.nombre) + '.') + '</strong> ' + c.explicacion + '</div>' +
        '<div class="msg pop d2"><strong>¿Qué haces?</strong> ' + c.conducta + '</div>' +
        '<button class="btn claro" data-acc="otroCaso" style="align-self:flex-start;min-height:44px;margin-top:4px">Plantéame otro caso</button>';
    }
    var html = '<div class="chat-cab"><a href="#/inicio" aria-label="Volver al inicio" class="icono-btn" style="background:transparent;margin-left:-10px">' + ic('left', 22) + '</a>' + clara(40) +
      '<span style="flex:1;display:flex;flex-direction:column"><b style="font-size:15px">Clara</b><span style="font-size:12px;color:var(--ok);font-weight:700">Caso nuevo · ' + c.tema.split(' · ')[0] + '</span></span></div><div class="chat">' + cuerpo + '</div>';
    return { html: html, nav: 'caso', sinPad: true };
  };

  /* ---------- Videos ---------- */
  V.videos = function (mod) {
    if (mod !== undefined) mem.filtroVideo = mod || '';
    var f = mem.filtroVideo;
    var mods = MODULOS.filter(function (m) { return window.RR_VIDEOS.some(function (v) { return v.m === m.id; }); });
    var filtros = '<button class="filtro" data-acc="filtroVideo" data-m="" aria-pressed="' + (!f) + '">Todos</button>' + mods.map(function (m) {
      return '<button class="filtro" data-acc="filtroVideo" data-m="' + m.id + '" aria-pressed="' + (f === m.id) + '">' + m.nombre + '</button>';
    }).join('');
    var lista = window.RR_VIDEOS.filter(function (v) { return !f || v.m === f; }).map(function (v) {
      var m = modulo(v.m);
      return '<a class="video" href="' + v.url + '" target="_blank" rel="noopener"><span class="mini-ico c-' + m.color + '">' + ic(m.icono, 22) + '</span>' +
        '<span style="flex:1;display:flex;flex-direction:column;gap:2px"><b style="font-size:15px">' + v.titulo + '</b><span class="mini">' + m.nombre + ' · buscar en YouTube</span></span>' + ic('ext', 18) + '</a>';
    }).join('');
    var canales = window.RR_CANALES.map(function (c) {
      return '<a class="canal" href="' + c.url + '" target="_blank" rel="noopener"><span class="lang"' + (c.lang === 'ES' ? ' style="background:var(--mint);color:var(--ok)"' : '') + '>' + (c.lang === 'ES' ? 'Español' : 'Inglés') + '</span><b>' + c.nombre + '</b><span class="mini">' + c.foco + '</span></a>';
    }).join('');
    var html = '<h1 style="font-size:28px">Videos</h1>' +
      claraDice('Mira el video, jefe ' + esc(S.nombre) + ', y luego repasa las tarjetas del tema para que no se te olvide.', 44) +
      '<div class="filtros">' + filtros + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' + lista + '</div>' +
      (f ? '<a class="btn claro" href="#/tarjetas/' + f + '">' + ic('cards', 20) + 'Repasar tarjetas de este tema</a>' : '') +
      '<h2 class="titulo-sec">Canales recomendados</h2><div class="carrusel">' + canales + '</div>' +
      '<p class="mini">Muchos canales en español son de España: sirven para técnicas, pero las normas colombianas se revisan en las guías del MinSalud.</p>';
    return { html: html, nav: 'videos' };
  };

  /* ---------- Pensum ---------- */
  V.pensum = function () {
    var html = atras() + '<h1 style="font-size:28px">Todo el pensum</h1>' +
      claraDice('Aquí está tu malla completa. Las materias con módulos ya tienen tarjetas; las demás las vamos llenando por tandas.', 44) +
      window.RR_PENSUM.map(function (p) {
        return '<div style="display:flex;flex-direction:column;gap:8px"><h2 style="font-size:17px">Periodo ' + p.periodo + '</h2>' + p.materias.map(function (mt) {
          var n = mt[1].reduce(function (a, id) { return a + tarjetasDe(id).length; }, 0);
          var dest = mt[1].length ? '#/modulo/' + mt[1][0] : null;
          var inner = '<span style="flex:1;display:flex;flex-direction:column;gap:2px"><b style="font-size:14.5px">' + mt[0] + '</b><span class="mini">' + (n ? n + ' tarjetas relacionadas' : 'Contenido en preparación') + '</span></span>';
          return dest ? '<a class="video" href="' + dest + '">' + inner + ic('right', 18) + '</a>' : '<div class="video" style="opacity:.75">' + inner + '</div>';
        }).join('') + '</div>';
      }).join('');
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Ajustes ---------- */
  V.ajustes = function () {
    var html = atras() + '<h1 style="font-size:28px">Ajustes</h1>' +
      '<form data-form="cambiarNombre" class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:10px"><label for="nuevo-nombre" style="font-weight:700">¿Cómo quieres que Clara te llame?</label>' +
      '<input id="nuevo-nombre" class="campo" type="text" maxlength="30" value="' + esc(S.nombre) + '" required><button class="btn" type="submit">Guardar nombre</button></form>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:10px"><b>Progreso</b><p class="mini">Racha, tarjetas y casos se guardan solo en este celular.</p>' +
      (mem.confirmarReinicio ? '<p style="font-size:14px">¿Segura? Se borrará todo tu progreso (tu nombre se conserva).</p><div class="fila"><button class="btn peligro" data-acc="reiniciar">Sí, borrar</button><button class="btn suave" data-acc="cancelarReinicio">Cancelar</button></div>'
        : '<button class="btn suave" data-acc="pedirReinicio">Reiniciar progreso</button>') + '</div>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:8px"><b>Instalar en el celular</b><p style="font-size:14px;line-height:1.5"><b>Android (Chrome):</b> menú ⋮ → <i>Instalar app</i> o <i>Agregar a pantalla principal</i>.<br><b>iPhone (Safari):</b> botón Compartir → <i>Agregar a inicio</i>.</p></div>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:8px"><b>Sobre el contenido</b><p style="font-size:14px;line-height:1.5">Esta app es una herramienta de repaso. Cada tarjeta indica su fuente sugerida; valida siempre con la guía vigente, el protocolo de tu institución y tus docentes.</p>' +
      '<p class="mini">Ruta Rural · versión ' + VERSION + ' · ' + TARJETAS.length + ' tarjetas · ' + window.RR_GEN.totalPlantillas + ' tipos de caso</p></div>';
    return { html: html, nav: 'inicio' };
  };

  /* =========================================================
     ACCIONES
     ========================================================= */
  var A = {
    mes: function (el) { mem.calMes += parseInt(el.getAttribute('data-d'), 10); render(); },
    pista: function () { mem.sesion.pista = !mem.sesion.pista; render(); },
    mostrar: function () { mem.sesion.mostrada = true; render(); },
    calificar: function (el) {
      var s = mem.sesion; var q = parseInt(el.getAttribute('data-q'), 10); var id = s.cola[s.i];
      if (!S.srs[id] && !s.libre) { cupoNuevas(); S.nuevasHoy.n++; }
      if (!s.libre) S.srs[id] = siguiente(S.srs[id], q);
      if (q < 3) s.cola.push(id);
      s.i++; s.hechas++; s.mostrada = false; s.pista = false; s.total = s.cola.length;
      S.stats.tarjetas++; marcarEstudio(); guardar();
      if (s.hechas % 5 === 0 && s.i < s.cola.length) toast(nom(pick(window.RR_CLARA.animo)));
      render();
    },
    libre: function () { nuevaSesion(mem.sesion ? mem.sesion.mod : '', true); render(); },
    respJuego: function (el) {
      var j = mem.juego; if (j.respondida) return;
      j.respondida = true; j.elegida = parseInt(el.getAttribute('data-i'), 10);
      S.vistosJuego.push(j.firma); if (S.vistosJuego.length > 500) S.vistosJuego.shift();
      S.stats.juegos++; marcarEstudio(); guardar(); render();
    },
    otroJuego: function () { mem.juego = null; render(); vista.scrollTop = 0; },
    respCaso: function (el) {
      var c = mem.caso; if (c.respondida) return;
      c.respondida = true; c.elegida = parseInt(el.getAttribute('data-i'), 10);
      S.vistosCaso.push(c.firma); if (S.vistosCaso.length > 1000) S.vistosCaso.shift();
      S.stats.casos++; marcarEstudio(); guardar(); render();
      var chat = vista.querySelector('.chat'); if (chat) chat.scrollTop = chat.scrollHeight;
    },
    otroCaso: function () { mem.caso = null; render(); },
    filtroVideo: function (el) { mem.filtroVideo = el.getAttribute('data-m'); location.hash = '#/videos' + (mem.filtroVideo ? '/' + mem.filtroVideo : ''); },
    pedirReinicio: function () { mem.confirmarReinicio = true; render(); },
    cancelarReinicio: function () { mem.confirmarReinicio = false; render(); },
    reiniciar: function () {
      var n = S.nombre; localStorage.removeItem(KEY);
      S = Object.assign({ nombre: n, srs: {}, dias: [], vistosCaso: [], vistosJuego: [], nuevasHoy: { fecha: '', n: 0 }, stats: { tarjetas: 0, juegos: 0, casos: 0 } });
      guardar(); mem.confirmarReinicio = false; mem.sesion = null; render(); toast('Listo, jefe ' + esc(n) + '. Empezamos de cero.');
    }
  };
  var FORMS = {
    nombre: function (f) { var v = f.querySelector('input').value.trim(); if (!v) return; S.nombre = v; guardar(); render(); },
    cambiarNombre: function (f) { var v = f.querySelector('input').value.trim(); if (!v) return; S.nombre = v; guardar(); toast('¡Listo! Desde ahora te digo jefe ' + esc(v) + '.'); render(); }
  };
  document.getElementById('app').addEventListener('click', function (e) {
    var el = e.target.closest('[data-acc]'); if (!el) return;
    var fn = A[el.getAttribute('data-acc')]; if (fn) { e.preventDefault(); fn(el); }
  });
  document.getElementById('app').addEventListener('submit', function (e) {
    var f = e.target.closest('[data-form]'); if (!f) return;
    e.preventDefault(); var fn = FORMS[f.getAttribute('data-form')]; if (fn) fn(f);
  });

  /* =========================================================
     ENRUTADOR
     ========================================================= */
  var ultimaRuta = '';
  function render() {
    var partes = location.hash.replace(/^#\/?/, '').split('/');
    var r = partes[0] || 'inicio';
    if (!S.nombre && r !== 'bienvenida') { location.replace('#/bienvenida'); return; }
    if (S.nombre && r === 'bienvenida' && ultimaRuta !== 'bienvenida') { location.replace('#/inicio'); return; }
    var fn = V[r] || V.inicio;
    var out = fn(partes[1]);
    vista.className = 'vista' + (out.sinPad ? ' sin-pad' : '');
    vista.innerHTML = out.html;
    pintarNav(out.nav);
    var cambio = r + (partes[1] || '') !== ultimaRuta;
    if (cambio) { vista.scrollTop = 0; toastZona.innerHTML = ''; }
    ultimaRuta = r === 'bienvenida' ? 'bienvenida' : r + (partes[1] || '');
    if (out.despues && cambio) out.despues();
  }
  window.addEventListener('hashchange', function () {
    var r = location.hash.replace(/^#\/?/, '').split('/')[0];
    if (r === 'tarjetas') mem.sesion = null;
    render();
  });
  render();

  /* =========================================================
     ACTUALIZACIONES AUTOMÁTICAS (service worker)
     ========================================================= */
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    var recargando = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () { if (!recargando) { recargando = true; location.reload(); } });
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      function avisar(w) { toast('<strong>Hay una versión nueva de la app.</strong>', 'Actualizar', function () { w.postMessage('activar'); }, 0); }
      if (reg.waiting && navigator.serviceWorker.controller) avisar(reg.waiting);
      reg.addEventListener('updatefound', function () {
        var w = reg.installing;
        w.addEventListener('statechange', function () { if (w.state === 'installed' && navigator.serviceWorker.controller) avisar(w); });
      });
      setInterval(function () { reg.update(); }, 60 * 60 * 1000);
    }).catch(function () { });
  }
})();
