/* =========================================================
   Ruta Rural · app principal (sin frameworks, funciona sin internet)
   Versión 1.1: contenido organizado por materias del pensum.
   ========================================================= */
(function () {
  'use strict';
  var VERSION = '1.1.0';
  var NUEVAS_POR_DIA = 20;
  var PREGUNTAS_POR_PARTIDA = 20;
  var KEY = 'rr_v1';
  var DIA = 864e5;

  var RR = window.RR, GEN = window.RR_GEN;
  var TARJETAS = RR.tarjetas, MATERIAS = RR.materias, ENFASIS = RR.enfasis;
  var TID = {}; TARJETAS.forEach(function (c) { TID[c.id] = c; });
  Object.keys(RR.juegos).forEach(function (k) { RR.juegos[k].forEach(function (g) { g.mat = k; }); });
  var TOTAL_JUEGOS = Object.keys(RR.juegos).reduce(function (a, k) { return a + RR.juegos[k].length; }, 0);
  var PERIODOS = []; MATERIAS.forEach(function (m) { if (PERIODOS.indexOf(m.periodo) < 0) PERIODOS.push(m.periodo); });

  var CLARA = {
    animo: ['¡Vamos bien, jefe {n}!', 'Un paso más hacia tu rural, jefe {n}.', 'Así se repasa, jefe {n}.', 'Cada tarjeta cuenta, jefe {n}.'],
    fallo: ['Tranquila, jefe {n}: equivocarse aquí es mejor que en el puesto de salud.', 'Casi, jefe {n}. Mira la explicación y la próxima sale.', 'No pasa nada, jefe {n}. Esta te la vuelvo a traer pronto.'],
    bien: ['¡Eso, jefe {n}!', '¡Correcto, jefe {n}!', '¡Muy bien, jefe {n}!', '¡Así es, jefe {n}!']
  };

  var vista = document.getElementById('vista');
  var navZona = document.getElementById('nav-zona');
  var toastZona = document.getElementById('toast-zona');

  /* ---------- Estado guardado en el celular ---------- */
  function estadoBase(nombre) { return { nombre: nombre || '', srs: {}, dias: [], vistosCaso: [], vistosJuego: [], nuevasHoy: { fecha: '', n: 0 }, stats: { tarjetas: 0, juegos: 0, casos: 0 }, mejores: {} }; }
  function cargar() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  var S = Object.assign(estadoBase(), cargar());
  if (!S.mejores) S.mejores = {};
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

  /* ---------- Utilidades ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function nom(s) { return s.replace(/\{n\}/g, esc(S.nombre || 'colega')); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function mezclar(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function mezclarDistinto(arr) { var a = arr; for (var i = 0; i < 12; i++) { a = mezclar(arr); if (a.some(function (x, k) { return x !== arr[k]; })) break; } return a; }
  function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function hoy() { return ymd(new Date()); }
  function saludo() { var h = new Date().getHours(); return h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches'); }
  function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }
  function dominada(c) { var s = S.srs[c.id]; return s && s.reps >= 2 && s.int >= 6; }
  function pct(cs) { return cs.length ? Math.round(cs.filter(dominada).length / cs.length * 100) : 0; }
  function yt(id) { return 'https://www.youtube.com/watch?v=' + encodeURIComponent(id); }
  function ytBuscar(q) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q); }

  /* Claves de filtro para tarjetas: '' (todas), 'm-<materia>' o 'e-<énfasis>' */
  function clave(cl) {
    if (!cl) return '';
    if (/^m-/.test(cl) && RR.mat[cl.slice(2)]) return cl;
    if (/^e-/.test(cl) && RR.enf[cl.slice(2)]) return cl;
    if (RR.enf[cl]) return 'e-' + cl;
    if (RR.mat[cl]) return 'm-' + cl;
    return '';
  }
  function tarjetasDe(cl) {
    if (!cl) return TARJETAS;
    var v = cl.slice(2), porMateria = cl.charAt(0) === 'm';
    return TARJETAS.filter(function (c) { return porMateria ? c.mat === v : c.e === v; });
  }
  function nombreDe(cl) { var v = cl.slice(2); return cl.charAt(0) === 'm' ? RR.mat[v].nombre : RR.enf[v].nombre; }
  function hrefDe(cl) { var v = cl.slice(2); return cl.charAt(0) === 'm' ? '#/materia/' + v : '#/enfasis/' + v; }

  /* Orden de las tarjetas nuevas en el repaso general: una de cada materia por turno,
     empezando por las materias clínicas (periodos altos), que son las del día a día del rural. */
  var ORDEN_GENERAL = (function () {
    var grupos = MATERIAS.slice().sort(function (a, b) { return b.periodo - a.periodo; }).map(function (m) { return tarjetasDe('m-' + m.id); });
    var out = [], i = 0, quedan = true;
    while (quedan) { quedan = false; grupos.forEach(function (g) { if (i < g.length) { out.push(g[i]); quedan = true; } }); i++; }
    return out;
  })();

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
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
    flask: '<path d="M9 3h6M10 3v6L4.6 18.4A1.8 1.8 0 0 0 6.2 21h11.6a1.8 1.8 0 0 0 1.6-2.6L14 9V3M7.5 15h9"/>',
    body: '<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7.5V14M6 10h12M12 14l-3.5 7M12 14l3.5 7"/>',
    brain: '<path d="M9.5 4A2.5 2.5 0 0 0 7 6.5 3 3 0 0 0 4.5 11a3 3 0 0 0 1 5A3 3 0 0 0 11 18.5V5.5A2 2 0 0 0 9.5 4zM14.5 4A2.5 2.5 0 0 1 17 6.5a3 3 0 0 1 2.5 4.5 3 3 0 0 1-1 5 3 3 0 0 1-5.5 2.5V5.5A2 2 0 0 1 14.5 4z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    chart: '<path d="M3 20h18M7 16v-5M12 16V6M17 16v-8"/>',
    pill: '<path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z"/><path d="m8.5 8.5 7 7"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 4 6"/>',
    stetho: '<path d="M6 3H5v6a5 5 0 0 0 10 0V3h-1M10 14v1a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="10" r="2"/>',
    baby: '<circle cx="12" cy="12" r="9"/><path d="M9 11h.01M15 11h.01M9.5 15a3.5 3.5 0 0 0 5 0M12 3a2 2 0 0 0 2 2"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4"/>',
    shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'
  };
  function ic(n, s, color) { return '<svg width="' + (s || 22) + '" height="' + (s || 22) + '" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || IC.book) + '</svg>'; }

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
  function atras(href, txt) { return '<a class="atras" href="' + (href || '#/inicio') + '">' + ic('left', 18) + esc(txt || 'Inicio') + '</a>'; }
  function barraProg(p, clase) { return '<span class="prog ' + (clase || '') + '"><span style="width:' + p + '%"></span></span>'; }

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
  function vencidas(cl) { var ahora = Date.now(); return tarjetasDe(cl).filter(function (c) { var s = S.srs[c.id]; return s && s.due <= ahora; }).sort(function (a, b) { return S.srs[a.id].due - S.srs[b.id].due; }); }
  function nuevas(cl) { return (cl ? tarjetasDe(cl) : ORDEN_GENERAL).filter(function (c) { return !S.srs[c.id]; }); }
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
  var NAV = [['inicio', 'home', 'Inicio'], ['tarjetas', 'cards', 'Tarjetas'], ['juegos', 'game', 'Juegos'], ['caso', 'case', 'Casos'], ['videos', 'play', 'Videos']];
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
  var mem = { sesion: null, partida: null, calc: null, caso: null, calMes: 0, confirmarReinicio: false };

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
    var d0 = new Date(); var dow = (d0.getDay() + 6) % 7; var lunes = new Date(d0.getTime() - dow * DIA);
    var set = {}; S.dias.forEach(function (x) { set[x] = 1; });
    var semana = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(function (l, i) {
      var d = new Date(lunes.getTime() + i * DIA); var k = ymd(d); var esHoy = k === hoy();
      var cls = esHoy ? (set[k] ? 'hecho' : 'hoy') : (set[k] ? 'hecho' : (d < d0 ? 'falta' : 'futuro'));
      return '<span class="dia">' + l + '<span class="punto ' + cls + '">' + (esHoy && !set[k] ? ic('flame', 18) : d.getDate()) + '</span></span>';
    }).join('');
    var venc = vencidas('').length; var nuev = Math.min(cupoNuevas(), nuevas('').length);
    var mods = ENFASIS.map(function (e) {
      return '<a class="modulo c-' + e.color + '" href="#/enfasis/' + e.id + '"><span class="ico">' + ic(e.icono, 20) + '</span><span class="nom">' + esc(e.nombre) + '</span><span class="sub">' + esc(e.sub) + '</span>' + barraProg(pct(tarjetasDe('e-' + e.id))) + '</a>';
    }).join('') + '<a class="modulo c-mauve" href="#/caso"><span class="ico">' + ic('hills', 20) + '</span><span class="nom">Casos del rural</span><span class="sub">Situaciones reales del puesto de salud</span>' + barraProg(Math.min(100, S.stats.casos * 5)) + '</a>';
    var html = '<div class="fila entre"><span class="marca">ruta<span>·</span>rural</span><span class="fila" style="gap:8px">' +
      '<a class="racha-pill" href="#/racha" aria-label="Racha de ' + r + ' días, ver calendario">' + ic('flame', 20) + r + '</a>' +
      '<a class="icono-btn" href="#/ajustes" aria-label="Ajustes">' + ic('gear', 20) + '</a></span></div>' +
      '<div style="display:flex;flex-direction:column;gap:4px"><p class="chico">' + fecha + '</p><h1 style="font-size:30px;line-height:1.08">' + saludo() + ',<br>jefe ' + esc(S.nombre) + '</h1>' +
      '<svg class="squiggle" width="132" height="12" viewBox="0 0 132 12" aria-hidden="true"><path d="M2 8c14-6 24 4 38-1s22-6 34 0 24 4 34-1 16-4 22-2" fill="none" stroke="#B9A8E8" stroke-width="4" stroke-linecap="round"/></svg></div>' +
      claraDice('<strong>Dato del día · ' + esc(RR.mat[dato.mat].nombre) + '</strong><br>' + esc(dato.q) + ' <strong>' + esc(dato.a) + '</strong>') +
      '<a class="semana" href="#/racha" aria-label="Tu semana de estudio">' + semana + '</a>' +
      '<div class="hoy-card"><span class="circulo" aria-hidden="true"></span><p class="sobre">Tu repaso de hoy</p>' +
      '<h2 style="font-size:24px;line-height:1.15">' + plural(venc + nuev, 'tarjeta', 'tarjetas') + ' · 1 reto<br>1 caso nuevo</h2>' +
      '<p style="font-size:14px;color:var(--soft)">' + venc + ' para repasar y ' + nuev + ' nuevas, mezcladas de todas tus materias.</p>' +
      '<div class="fila" style="flex-wrap:wrap;margin-top:4px"><a class="btn" href="#/tarjetas" style="min-height:48px">Empezar ' + ic('right', 18) + '</a><a class="btn suave" href="#/juego/mix" style="min-height:48px">' + ic('shuffle', 18) + 'Reto mixto</a></div></div>' +
      '<h2 class="titulo-sec">Énfasis para el rural</h2><div class="rejilla">' + mods + '</div>' +
      '<a class="fila-link" href="#/pensum"><span style="display:flex;flex-direction:column;gap:4px"><span class="t">Mis materias</span><span class="mini">' + MATERIAS.length + ' materias · ' + TARJETAS.length + ' tarjetas · ' + TOTAL_JUEGOS + ' juegos</span></span>' + ic('right', 20) + '</a>';
    return { html: html, nav: 'inicio', despues: function () {
      if (Math.random() < 0.35) setTimeout(function () {
        if (location.hash.indexOf('inicio') >= 0 || location.hash === '') { var c = pick(TARJETAS.filter(function (x) { return x.n; })); toast('<strong>¿Te acuerdas?</strong> ' + esc(c.n)); }
      }, 2500);
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
      '<div class="rejilla"><div class="stat c-mint"><b>' + enMes + '</b><span>días estudiados este mes</span></div><div class="stat c-sky"><b>' + S.stats.tarjetas + '</b><span>tarjetas repasadas en total</span></div>' +
      '<div class="stat c-butter"><b>' + S.stats.juegos + '</b><span>retos respondidos</span></div><div class="stat c-lav"><b>' + S.stats.casos + '</b><span>casos resueltos</span></div></div>' +
      claraDice(nom(msg));
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Temas agrupados (materia y énfasis) ---------- */
  function listaTemas(cs, conMateria) {
    var temas = {}, orden = [];
    cs.forEach(function (c) { if (!temas[c.t]) { temas[c.t] = []; orden.push(c.t); } temas[c.t].push(c); });
    return '<div style="display:flex;flex-direction:column;gap:8px">' + orden.map(function (t, i) {
      return '<details class="tema"><summary><span class="num">' + (i + 1) + '</span><span style="flex:1;display:flex;flex-direction:column;gap:2px"><b style="font-size:15px">' + esc(t) + '</b><span class="mini">' + plural(temas[t].length, 'tarjeta', 'tarjetas') + '</span></span>' + ic('right', 18) + '</summary>' +
        '<div class="qa">' + temas[t].map(function (c) {
          return '<div><b>' + esc(c.q) + '</b>' + esc(c.a) + (c.n ? '<br><span class="mini">' + esc(c.n) + '</span>' : '') +
            '<br><span class="mini">' + (conMateria ? esc(RR.mat[c.mat].nombre) + ' · ' : '') + 'Fuente: ' + esc(c.f) + '</span></div>';
        }).join('') + '</div></details>';
    }).join('') + '</div>';
  }
  function calcsDe(lista) {
    if (!lista.length) return '';
    return '<div class="chips-link">' + lista.map(function (k) {
      var n = GEN.nombresCalc[k]; return '<a class="chip c-' + n[2] + '" href="#/calc/' + k + '">' + ic('calc', 16) + esc(n[0]) + '</a>';
    }).join('') + '</div>';
  }

  /* ---------- Mis materias (pensum depurado) ---------- */
  function filaMateria(m, destino) {
    var cs = tarjetasDe('m-' + m.id), mejor = S.mejores[m.id], js = (RR.juegos[m.id] || []).length;
    var sub = destino === 'juego' ? (mejor != null ? 'Tu mejor puntaje: ' + mejor + '/' + js : js + ' retos sin jugar') : cs.length + ' tarjetas · ' + js + ' juegos' + (mejor != null ? ' · mejor ' + mejor + '/' + js : '');
    return '<a class="video" href="#/' + (destino || 'materia') + '/' + m.id + '"><span class="mini-ico c-' + m.color + '">' + ic(m.icono, 22) + '</span>' +
      '<span style="flex:1;display:flex;flex-direction:column;gap:4px;min-width:0"><b style="font-size:14.5px">' + esc(m.nombre) + '</b><span class="mini">' + sub + '</span>' +
      (destino === 'juego' ? barraProg(mejor != null ? Math.round(mejor / js * 100) : 0, 'gris') : barraProg(pct(cs), 'gris')) + '</span>' + ic('right', 18) + '</a>';
  }
  function porPeriodo(fn) {
    return PERIODOS.map(function (p) {
      return '<div class="grupo"><h2 class="titulo-p">Periodo ' + p + '</h2>' + MATERIAS.filter(function (m) { return m.periodo === p; }).map(fn).join('') + '</div>';
    }).join('');
  }
  V.pensum = function () {
    var html = atras() + '<h1 style="font-size:28px">Mis materias</h1>' +
      claraDice('Dejé las ' + MATERIAS.length + ' materias de tu pensum que más te sirven para el rural. Cada una tiene tarjetas, juegos y videos. La barrita muestra cuánto dominas.', 44) +
      porPeriodo(function (m) { return filaMateria(m); }) +
      '<p class="mini">Quedaron por fuera las electivas, el trabajo de grado y las materias de gestión, metodología o comunicación, que no se evalúan en el día a día del rural.</p>';
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Materia ---------- */
  V.materia = function (id) {
    var m = RR.mat[id]; if (!m) return V.pensum();
    var cs = tarjetasDe('m-' + id), dom = cs.filter(dominada).length, js = RR.juegos[id] || [], mejor = S.mejores[id];
    var vids = (window.RR_VIDEOS[id] || []).length;
    var calcs = []; js.forEach(function (g) { if (g.tipo === 'c' && calcs.indexOf(g.calc) < 0) calcs.push(g.calc); });
    var html = atras('#/pensum', 'Mis materias') +
      '<div class="cabecera-mod c-' + m.color + '"><span style="width:40px;height:40px;border-radius:14px;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center">' + ic(m.icono, 22) + '</span>' +
      '<p class="sobre">Periodo ' + m.periodo + '</p><h1 style="font-size:25px;line-height:1.1">' + esc(m.nombre) + '</h1>' +
      '<p style="font-size:14px;color:var(--soft);font-weight:600">' + dom + ' de ' + cs.length + ' tarjetas dominadas</p>' + barraProg(pct(cs)) + '</div>' +
      '<div class="acciones">' +
      '<a class="accion" href="#/tarjetas/m-' + id + '">' + ic('cards', 22) + '<b>Tarjetas</b><span>' + cs.length + ' para repasar</span></a>' +
      '<a class="accion" href="#/juego/' + id + '">' + ic('game', 22) + '<b>Juegos</b><span>' + (mejor != null ? 'Mejor: ' + mejor + '/' + js.length : js.length + ' retos') + '</span></a>' +
      '<a class="accion" href="#/videos/' + id + '">' + ic('play', 22) + '<b>Videos</b><span>' + plural(vids, 'video', 'videos') + '</span></a></div>' +
      (calcs.length ? '<div class="grupo"><p class="chico">Calculadoras de esta materia</p>' + calcsDe(calcs) + '</div>' : '') +
      claraDice('Toca un tema para leer sus tarjetas, jefe ' + esc(S.nombre) + '. Luego repásalas o ponte a prueba con los juegos.', 44) +
      listaTemas(cs, false) +
      '<p class="mini">Fuentes sugeridas: ' + esc(m.f) + '. Valida siempre con la guía vigente, el protocolo de tu institución y tus docentes.</p>';
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Énfasis para el rural ---------- */
  V.enfasis = function (id) {
    var e = RR.enf[id]; if (!e) return V.inicio();
    var cs = tarjetasDe('e-' + id), dom = cs.filter(dominada).length;
    var mats = []; cs.forEach(function (c) { if (mats.indexOf(c.mat) < 0) mats.push(c.mat); });
    var html = atras() +
      '<div class="cabecera-mod c-' + e.color + '"><span style="width:40px;height:40px;border-radius:14px;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center">' + ic(e.icono, 22) + '</span>' +
      '<p class="sobre">Énfasis para el rural</p><h1 style="font-size:25px;line-height:1.1">' + esc(e.nombre) + '</h1>' +
      '<p style="font-size:14px;color:var(--soft);font-weight:600">' + dom + ' de ' + cs.length + ' tarjetas dominadas</p>' + barraProg(pct(cs)) + '</div>' +
      '<a class="btn" href="#/tarjetas/e-' + id + '">' + ic('cards', 20) + 'Repasar estas tarjetas</a>' +
      '<div class="grupo"><p class="chico">Practica con calculadoras</p>' + calcsDe(e.calcs || []) + '</div>' +
      '<div class="grupo"><p class="chico">Materias relacionadas</p><div class="chips-link">' + mats.map(function (k) {
        var m = RR.mat[k]; return '<a class="chip c-' + m.color + '" href="#/materia/' + k + '">' + ic(m.icono, 16) + esc(m.nombre) + '</a>';
      }).join('') + '</div></div>' +
      listaTemas(cs, true);
    return { html: html, nav: 'inicio' };
  };

  /* ---------- Tarjetas ---------- */
  function nuevaSesion(cl, libre) {
    var cola;
    if (libre) cola = mezclar(tarjetasDe(cl)).slice(0, 20).map(function (c) { return c.id; });
    else cola = vencidas(cl).map(function (c) { return c.id; }).concat(nuevas(cl).slice(0, cupoNuevas()).map(function (c) { return c.id; }));
    mem.sesion = { cl: cl, libre: !!libre, cola: cola, i: 0, mostrada: false, pista: false, hechas: 0, total: cola.length };
  }
  V.tarjetas = function (param) {
    var cl = clave(param);
    if (!mem.sesion || mem.sesion.cl !== cl) nuevaSesion(cl);
    var s = mem.sesion;
    var volver = cl ? atras(hrefDe(cl), nombreDe(cl)) : atras();
    if (!s.cola.length || s.i >= s.cola.length) {
      var hubo = s.hechas > 0;
      var juego = cl && cl.charAt(0) === 'm' ? '#/juego/' + cl.slice(2) : '#/juegos';
      return { html: volver + (hubo ? claraDice('<strong>¡Listo por hoy, jefe ' + esc(S.nombre) + '!</strong> Repasaste ' + plural(s.hechas, 'tarjeta', 'tarjetas') + '. Las difíciles te las traigo antes y las fáciles dentro de unos días.', 56)
        : claraDice('<strong>¡Estás al día, jefe ' + esc(S.nombre) + '!</strong> No tienes tarjetas pendientes' + (cl ? ' en ' + esc(nombreDe(cl)) : '') + '. Si quieres, hacemos un repaso libre.', 56)) +
        '<div class="fila" style="flex-wrap:wrap;padding-left:66px"><button class="btn claro" data-acc="libre">Repaso libre</button><a class="btn" href="' + juego + '">Ir a los juegos ' + ic('right', 18) + '</a></div>' +
        (cl ? '' : '<a class="fila-link" href="#/pensum"><span class="t">Repasar una materia</span>' + ic('right', 20) + '</a>'), nav: 'tarjetas' };
    }
    var c = TID[s.cola[s.i]];
    var st = S.srs[c.id];
    var p = Math.round(s.i / s.total * 100);
    var html = '<div class="fila entre">' + volver + '<span class="chico">' + Math.min(s.i + 1, s.total) + ' / ' + s.total + (s.libre ? ' · libre' : '') + '</span></div>' +
      '<div class="barra" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del repaso"><span style="width:' + Math.max(p, 3) + '%"></span></div>' +
      '<div class="flash"><div class="banda">' + esc(RR.mat[c.mat].nombre) + ' · ' + esc(c.t) + '</div><div class="cuerpo"><h1>' + esc(c.q) + '</h1>' +
      (s.mostrada ? '<div class="respuesta pop"><p class="a">' + esc(c.a) + '</p>' + (c.n ? '<p class="n">' + esc(c.n) + '</p>' : '') + '<p class="mini">Fuente: ' + esc(c.f) + '</p></div>' : '') + '</div></div>' +
      (s.pista && !s.mostrada ? claraDice('<strong>Pista:</strong> ' + esc(c.h || 'piensa en lo esencial del tema.'), 44) : '');
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

  /* ---------- Juegos: centro de juegos ---------- */
  V.juegos = function () {
    var calcs = Object.keys(GEN.nombresCalc).map(function (k) {
      var n = GEN.nombresCalc[k];
      return '<a class="calc-tile c-' + n[2] + '" href="#/calc/' + k + '"><span class="ico">' + ic(n[1], 18) + '</span><span>' + esc(n[0]) + '</span></a>';
    }).join('');
    var mix = S.mejores.mix;
    var html = '<h1 style="font-size:28px">Juegos</h1>' +
      claraDice('Cada materia tiene 20 retos: opción múltiple, verdadero o falso, parejas y ordenar pasos. Las calculadoras te dan un ejercicio nuevo cada vez.', 44) +
      '<a class="hoy-card" href="#/juego/mix" style="text-decoration:none"><span class="circulo" aria-hidden="true"></span><p class="sobre">Reto mixto</p>' +
      '<h2 style="font-size:22px;line-height:1.15">20 preguntas de todas tus materias</h2><p style="font-size:14px;color:var(--soft)">' + (mix != null ? 'Tu mejor puntaje: ' + mix + '/20' : 'Ideal para un repaso general rápido.') + '</p>' +
      '<span class="btn" style="align-self:flex-start;min-height:46px">' + ic('shuffle', 18) + 'Jugar</span></a>' +
      '<h2 class="titulo-sec">Calculadoras</h2><div class="calc-grid">' + calcs + '</div>' +
      '<h2 class="titulo-sec">Por materia</h2>' + porPeriodo(function (m) { return filaMateria(m, 'juego'); });
    return { html: html, nav: 'juegos' };
  };

  /* ---------- Juegos: partida de 20 retos ---------- */
  var TIPO_TXT = { o: 'Opción múltiple', v: 'Verdadero o falso', p: 'Une las parejas', s: 'Ordena los pasos', c: 'Calculadora' };
  function nuevaPartida(id) {
    var pool = [];
    if (id === 'mix') Object.keys(RR.juegos).forEach(function (k) { pool = pool.concat(RR.juegos[k]); });
    else pool = RR.juegos[id];
    mem.partida = { id: id, cola: mezclar(pool).slice(0, PREGUNTAS_POR_PARTIDA), i: 0, puntos: 0, item: null, guardado: false };
  }
  function preparar(p) {
    if (p.item && p.item.idx === p.i) return p.item;
    var g = p.cola[p.i], it = { idx: p.i, g: g, tipo: g.tipo, listo: false, bien: false, errores: 0, malo: null };
    if (g.tipo === 'o') it.ops = mezclar(g.ops.map(function (t, k) { return { t: t, ok: k === g.ok }; }));
    else if (g.tipo === 'v') it.ops = [{ t: 'Verdadero', ok: g.v === true }, { t: 'Falso', ok: g.v === false }];
    else if (g.tipo === 'c') { it.c = GEN.calc[g.calc](S.vistosJuego); it.ops = it.c.opciones; }
    else if (g.tipo === 'p') { it.der = mezclarDistinto(g.pares.map(function (x, k) { return k; })); it.hechos = {}; it.sel = null; it.selD = null; }
    else if (g.tipo === 's') { it.orden = mezclarDistinto(g.pasos.map(function (x, k) { return k; })); it.colocados = []; }
    p.item = it;
    return it;
  }
  function cortas(ops) { return ops.every(function (o) { return String(o.t).length <= 18; }); }
  function bloqueOpciones(ops, estado, accion) {
    var clase = ops.length === 2 ? ' vf' : (cortas(ops) ? ' dos' : '');
    return '<div class="opciones' + clase + '" role="group" aria-label="Opciones de respuesta">' + ops.map(function (o, k) {
      var cls = estado.listo ? (o.ok ? 'ok' : (k === estado.elegida ? 'mal' : 'apagada')) : '';
      return '<button class="opcion ' + cls + '" data-acc="' + accion + '" data-i="' + k + '"' + (estado.listo ? ' disabled' : '') + '>' + esc(o.t) + '</button>';
    }).join('') + '</div>';
  }
  function bloqueCalc(c) {
    return '<h2 style="font-size:21px;line-height:1.15">' + esc(c.titulo) + '</h2>' + claraDice(nom(esc(c.intro)), 40) +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:12px"><p style="font-size:14.5px;line-height:1.45">' + esc(c.enunciado) + '</p>' +
      '<div class="cajas">' + c.cajas.map(function (b) {
        return '<div class="caja-dato c-' + b.c + '"><span class="k">' + esc(b.k) + '</span>' + b.items.map(function (x) { return '<span class="it"><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b></span>'; }).join('') + '</div>';
      }).join('') + '</div><p style="font-weight:800;font-size:15.5px">' + esc(c.pregunta) + '</p></div>';
  }
  function solucionCalc(c) { return c.solucion.map(esc).join('<br>') + (c.nota ? '<br><span class="mini">' + esc(c.nota) + '</span>' : ''); }
  function feedbackItem(it) {
    var g = it.g, cuerpo;
    if (g.tipo === 'c') cuerpo = solucionCalc(it.c);
    else if (g.tipo === 'v') cuerpo = '<b>' + (g.v ? 'Es verdadero.' : 'Es falso.') + '</b> ' + esc(g.exp || '');
    else if (g.tipo === 'p') cuerpo = it.bien ? 'Uniste todas las parejas sin errores.' : 'Las uniste con ' + plural(it.errores, 'error', 'errores') + '. Para sumar el punto hay que hacerlo sin errores.';
    else if (g.tipo === 's') cuerpo = (it.bien ? '' : 'Tuviste ' + plural(it.errores, 'error', 'errores') + '; el orden correcto quedó arriba. ') + esc(g.exp || '');
    else cuerpo = esc(g.exp || '');
    var titulo = nom(esc(pick(it.bien ? CLARA.bien : CLARA.fallo)));
    return '<div class="feedback">' + claraDice('<strong>' + titulo + '</strong>' + (cuerpo ? '<br>' + cuerpo : ''), 44) + '</div>';
  }
  function terminarItem(it, bien) {
    it.listo = true; it.bien = bien;
    if (bien) mem.partida.puntos++;
    S.stats.juegos++; marcarEstudio(); guardar();
  }
  function finPartida(p) {
    var total = p.cola.length, pts = p.puntos, id = p.id;
    if (!p.guardado) {
      p.guardado = true; var prev = S.mejores[id];
      p.record = prev != null && pts > prev;
      if (prev == null || pts > prev) S.mejores[id] = pts;
      guardar();
    }
    var r = pts / total;
    var msg = r >= 0.9 ? '¡Impresionante, jefe {n}! Esta materia ya es tuya.' : (r >= 0.7 ? '¡Muy bien, jefe {n}! Repasa las que fallaste y vas por el puntaje perfecto.' :
      (r >= 0.5 ? 'Vas bien, jefe {n}. Un repaso de tarjetas y lo vuelves a intentar.' : 'Esta materia necesita repaso, jefe {n}. Empecemos por las tarjetas y luego volvemos.'));
    var volver = id === 'mix' ? atras('#/juegos', 'Juegos') : atras('#/materia/' + id, RR.mat[id].nombre);
    var html = volver + '<div class="resultado c-lav"><span class="sobre">' + (id === 'mix' ? 'Reto mixto' : esc(RR.mat[id].nombre)) + '</span><b class="grande">' + pts + ' / ' + total + '</b>' +
      '<span style="font-weight:700;color:var(--soft)">' + (p.record ? '¡Nuevo récord!' : 'Tu mejor puntaje: ' + S.mejores[id] + '/' + total) + '</span></div>' +
      claraDice(nom(msg), 52) +
      '<div class="fila" style="flex-wrap:wrap"><button class="btn" data-acc="otraPartida">' + ic('shuffle', 18) + 'Jugar otra vez</button>' +
      (id === 'mix' ? '<a class="btn suave" href="#/juegos">Más juegos</a>' : '<a class="btn suave" href="#/tarjetas/m-' + id + '">' + ic('cards', 18) + 'Repasar tarjetas</a>') + '</div>';
    return { html: html, nav: 'juegos' };
  }
  V.juego = function (id) {
    if (!id || (id !== 'mix' && !RR.juegos[id])) return V.juegos();
    if (!mem.partida || mem.partida.id !== id) nuevaPartida(id);
    var p = mem.partida;
    if (p.i >= p.cola.length) return finPartida(p);
    var it = preparar(p), g = it.g;
    var volver = id === 'mix' ? atras('#/juegos', 'Juegos') : atras('#/materia/' + id, RR.mat[id].nombre);
    var avance = Math.round(p.i / p.cola.length * 100);
    var html = '<div class="fila entre">' + volver + '<span class="marcador" aria-label="Puntaje">' + ic('star', 16) + p.puntos + ' / ' + p.cola.length + '</span></div>' +
      '<div class="barra" role="progressbar" aria-valuenow="' + avance + '" aria-valuemin="0" aria-valuemax="100" aria-label="Avance del juego"><span style="width:' + Math.max(avance, 3) + '%"></span></div>' +
      '<p class="chico">' + (id === 'mix' ? esc(RR.mat[g.mat].nombre) + ' · ' : '') + 'Reto ' + (p.i + 1) + ' de ' + p.cola.length + ' · ' + TIPO_TXT[g.tipo] + '</p>';
    if (g.tipo === 'o' || g.tipo === 'v') {
      html += '<div class="tarjeta-blanca"><h1 class="preg">' + esc(g.q) + '</h1></div>' + bloqueOpciones(it.ops, it, 'responder');
    } else if (g.tipo === 'c') {
      html += bloqueCalc(it.c) + bloqueOpciones(it.ops, it, 'responder');
    } else if (g.tipo === 'p') {
      var malo = it.malo || {};
      html += '<div class="tarjeta-blanca"><h1 class="preg">' + esc(g.q) + '</h1><p class="mini" style="margin-top:6px">Toca un elemento de cada columna para unirlos.</p></div>' +
        '<div class="parejas"><div class="col">' + g.pares.map(function (par, k) {
          var hecho = !!it.hechos[k], cls = hecho ? 'ok' : (it.sel === k ? 'sel' : (malo.i === k ? 'mal' : ''));
          return '<button class="pz ' + cls + '" data-acc="parIzq" data-k="' + k + '"' + (hecho || it.listo ? ' disabled' : '') + (it.sel === k ? ' aria-pressed="true"' : '') + '>' + esc(par[0]) + '</button>';
        }).join('') + '</div><div class="col">' + it.der.map(function (k) {
          var hecho = !!it.hechos[k], cls = hecho ? 'ok' : (it.selD === k ? 'sel' : (malo.d === k ? 'mal' : ''));
          return '<button class="pz der ' + cls + '" data-acc="parDer" data-k="' + k + '"' + (hecho || it.listo ? ' disabled' : '') + (it.selD === k ? ' aria-pressed="true"' : '') + '>' + esc(g.pares[k][1]) + '</button>';
        }).join('') + '</div></div>';
    } else if (g.tipo === 's') {
      var quedan = it.orden.filter(function (k) { return it.colocados.indexOf(k) < 0; });
      html += '<div class="tarjeta-blanca"><h1 class="preg">' + esc(g.q) + '</h1></div>' +
        (it.colocados.length ? '<ol class="orden">' + it.colocados.map(function (k, n) { return '<li class="paso pop"><span class="n">' + (n + 1) + '</span><span>' + esc(g.pasos[k]) + '</span></li>'; }).join('') + '</ol>' : '') +
        (quedan.length ? '<p class="chico">' + (it.colocados.length ? 'Toca el paso que sigue:' : 'Toca el primer paso:') + '</p><div class="pasos">' + quedan.map(function (k) {
          return '<button class="pz' + (it.malo === k ? ' mal' : '') + '" data-acc="paso" data-k="' + k + '">' + esc(g.pasos[k]) + '</button>';
        }).join('') + '</div>' : '');
    }
    if (it.listo) {
      html += feedbackItem(it) + '<button class="btn" data-acc="siguiente" style="align-self:flex-end">' + (p.i + 1 < p.cola.length ? 'Siguiente reto ' : 'Ver mi resultado ') + ic('right', 18) + '</button>';
    }
    return { html: html, nav: 'juegos' };
  };

  /* ---------- Calculadoras sueltas ---------- */
  V.calc = function (tipo) {
    if (!GEN.calc[tipo]) return V.juegos();
    if (!mem.calc || mem.calc.tipo !== tipo) mem.calc = { tipo: tipo, c: GEN.calc[tipo](S.vistosJuego), listo: false, elegida: -1, n: 1 };
    var x = mem.calc, c = x.c;
    var html = '<div class="fila entre">' + atras('#/juegos', 'Juegos') + '<span class="etq c-sky" style="color:var(--sky-ink)">' + esc(c.tema) + '</span></div>' +
      bloqueCalc(c) + bloqueOpciones(c.opciones, x, 'respCalc');
    if (x.listo) {
      var bien = c.opciones[x.elegida].ok;
      html += '<div class="feedback">' + claraDice('<strong>' + nom(esc(pick(bien ? CLARA.bien : CLARA.fallo))) + '</strong><br>' + solucionCalc(c), 44) + '</div>' +
        '<button class="btn" data-acc="otroCalc" style="align-self:flex-end">Otro ejercicio ' + ic('right', 18) + '</button>';
    }
    return { html: html, nav: 'juegos' };
  };

  /* ---------- Casos (chat con Clara) ---------- */
  V.caso = function () {
    if (!mem.caso) mem.caso = GEN.caso(S.vistosCaso);
    var c = mem.caso; var resp = c.respondida;
    var cuerpo = c.mensajes.map(function (t, i) { return '<div class="msg pop d' + Math.min(i, 3) + '">' + nom(esc(t)) + '</div>'; }).join('') +
      '<div class="msg pop d2 chips">' + c.datos.map(function (d) { return '<span class="etq ' + d.tono + '">' + esc(d.t) + '</span>'; }).join('') + '</div>' +
      '<div class="msg pop d3"><strong>' + esc(c.pregunta) + '</strong></div>';
    if (!resp) {
      cuerpo += '<div class="opciones" role="group" aria-label="Opciones de respuesta" style="padding-left:24px;margin-top:4px">' + c.opciones.map(function (o, i) {
        return '<button class="opcion" style="min-height:48px;font-size:14px" data-acc="respCaso" data-i="' + i + '">' + esc(o.t) + '</button>';
      }).join('') + '</div>';
    } else {
      var o = c.opciones[c.elegida];
      cuerpo += '<div class="msg yo pop">' + esc(o.t) + '</div>' +
        '<div class="msg pop d1"><strong>' + (o.ok ? '¡Exacto, jefe ' + esc(S.nombre) + '!' : 'Esa no, jefe ' + esc(S.nombre) + '.') + '</strong> ' + esc(c.explicacion) + '</div>' +
        '<div class="msg pop d2"><strong>¿Qué haces?</strong> ' + esc(c.conducta) + '</div>' +
        '<button class="btn claro" data-acc="otroCaso" style="align-self:flex-start;min-height:44px;margin-top:4px">Plantéame otro caso</button>';
    }
    var html = '<div class="chat-cab"><a href="#/inicio" aria-label="Volver al inicio" class="icono-btn" style="background:transparent;margin-left:-10px">' + ic('left', 22) + '</a>' + clara(40) +
      '<span style="flex:1;display:flex;flex-direction:column"><b style="font-size:15px">Clara</b><span style="font-size:12px;color:var(--ok);font-weight:700">Caso nuevo · ' + esc(c.tema.split(' · ')[0]) + '</span></span></div><div class="chat">' + cuerpo + '</div>';
    return { html: html, nav: 'caso', sinPad: true };
  };

  /* ---------- Videos ---------- */
  function selectorMaterias(actual) {
    return '<label class="oculto" for="sel-mat">Materia</label><select id="sel-mat" class="campo selector" data-cambio="videos"><option value="">Elige una materia…</option>' +
      PERIODOS.map(function (p) {
        return '<optgroup label="Periodo ' + p + '">' + MATERIAS.filter(function (m) { return m.periodo === p; }).map(function (m) {
          return '<option value="' + m.id + '"' + (m.id === actual ? ' selected' : '') + '>' + esc(m.nombre) + '</option>';
        }).join('') + '</optgroup>';
      }).join('') + '</select>';
  }
  V.videos = function (id) {
    var VID = window.RR_VIDEOS || {}, m = id && RR.mat[id];
    var canales = (window.RR_CANALES || []).map(function (c) {
      return '<a class="canal" href="' + (c.url || ytBuscar(c.q)) + '" target="_blank" rel="noopener"><span class="lang"' + (c.lang === 'ES' ? ' style="background:var(--mint);color:var(--ok)"' : '') + '>' + (c.lang === 'ES' ? 'Español' : 'Inglés') + '</span><b>' + esc(c.nombre) + '</b><span class="mini">' + esc(c.foco) + '</span></a>';
    }).join('');
    var html;
    if (!m) {
      html = '<h1 style="font-size:28px">Videos</h1>' +
        claraDice('Elige una materia y te muestro videos, casi todos en español. Después de verlos, repasa las tarjetas del tema para que no se te olviden.', 44) +
        selectorMaterias('') +
        '<div class="chips-link">' + MATERIAS.map(function (x) {
          return '<a class="chip c-' + x.color + '" href="#/videos/' + x.id + '">' + ic(x.icono, 16) + esc(x.nombre) + ' <span class="cuenta">' + (VID[x.id] || []).length + '</span></a>';
        }).join('') + '</div>' +
        '<h2 class="titulo-sec">Canales recomendados</h2><div class="carrusel">' + canales + '</div>' +
        '<p class="mini">Muchos canales en español son de España: sirven para técnicas, pero las normas colombianas se revisan en las guías del MinSalud.</p>';
    } else {
      var lista = (VID[id] || []).map(function (v) {
        return '<a class="video" href="' + yt(v[1]) + '" target="_blank" rel="noopener"><span class="mini-ico c-' + m.color + '">' + ic('play', 22) + '</span>' +
          '<span style="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0"><b style="font-size:15px">' + esc(v[0]) + '</b><span class="mini">YouTube' + (v[2] === 'EN' ? ' · en inglés' : '') + '</span></span>' + ic('ext', 18) + '</a>';
      }).join('');
      var q = (window.RR_BUSCAR || {})[id] || m.nombre;
      html = atras('#/videos', 'Todas las materias') + '<h1 style="font-size:26px;line-height:1.1">' + esc(m.nombre) + '</h1>' + selectorMaterias(id) +
        '<div style="display:flex;flex-direction:column;gap:8px">' + lista +
        '<a class="video" href="' + ytBuscar(q) + '" target="_blank" rel="noopener"><span class="mini-ico" style="background:#fff;border:1.5px dashed var(--line2)">' + ic('search', 22) + '</span>' +
        '<span style="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0"><b style="font-size:15px">Buscar más videos</b><span class="mini">«' + esc(q) + '»</span></span>' + ic('ext', 18) + '</a></div>' +
        '<a class="btn claro" href="#/tarjetas/m-' + id + '">' + ic('cards', 20) + 'Repasar tarjetas de esta materia</a>' +
        '<p class="mini">Son videos públicos de YouTube. Si alguno ya no está disponible, usa «Buscar más videos».</p>';
    }
    return { html: html, nav: 'videos' };
  };

  /* ---------- Ajustes ---------- */
  V.ajustes = function () {
    var html = atras() + '<h1 style="font-size:28px">Ajustes</h1>' +
      '<form data-form="cambiarNombre" class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:10px"><label for="nuevo-nombre" style="font-weight:700">¿Cómo quieres que Clara te llame?</label>' +
      '<input id="nuevo-nombre" class="campo" type="text" maxlength="30" value="' + esc(S.nombre) + '" required><button class="btn" type="submit">Guardar nombre</button></form>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:10px"><b>Progreso</b><p class="mini">Racha, tarjetas, puntajes y casos se guardan solo en este celular.</p>' +
      (mem.confirmarReinicio ? '<p style="font-size:14px">¿Segura? Se borrará todo tu progreso (tu nombre se conserva).</p><div class="fila"><button class="btn peligro" data-acc="reiniciar">Sí, borrar</button><button class="btn suave" data-acc="cancelarReinicio">Cancelar</button></div>'
        : '<button class="btn suave" data-acc="pedirReinicio">Reiniciar progreso</button>') + '</div>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:8px"><b>Instalar en el celular</b><p style="font-size:14px;line-height:1.5"><b>Android (Chrome):</b> menú ⋮ → <i>Instalar app</i> o <i>Agregar a pantalla principal</i>.<br><b>iPhone (Safari):</b> botón Compartir → <i>Agregar a inicio</i>.</p></div>' +
      '<div class="tarjeta-blanca" style="display:flex;flex-direction:column;gap:8px"><b>Sobre el contenido</b><p style="font-size:14px;line-height:1.5">Esta app es una herramienta de repaso. Cada tarjeta indica su fuente sugerida; valida siempre con la guía vigente, el protocolo de tu institución y tus docentes.</p>' +
      '<p class="mini">Ruta Rural · versión ' + VERSION + ' · ' + MATERIAS.length + ' materias · ' + TARJETAS.length + ' tarjetas · ' + TOTAL_JUEGOS + ' juegos · ' + Object.keys(GEN.calc).length + ' calculadoras · ' + GEN.totalPlantillas + ' tipos de caso</p></div>';
    return { html: html, nav: 'inicio' };
  };

  /* =========================================================
     ACCIONES
     ========================================================= */
  function itemActual(tipo) { var p = mem.partida, it = p && p.item; return it && !it.listo && (!tipo || it.tipo === tipo) ? it : null; }
  function limpiarLuego(it) { setTimeout(function () { if (mem.partida && mem.partida.item === it && it.malo != null) { it.malo = null; render(); } }, 700); }
  function verFeedback() { var f = vista.querySelector('.feedback'); if (f && f.scrollIntoView) f.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  function recordarVisto(firma) { S.vistosJuego.push(firma); if (S.vistosJuego.length > 500) S.vistosJuego.shift(); }

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
      if (s.hechas % 5 === 0 && s.i < s.cola.length) toast(nom(pick(CLARA.animo)));
      render();
    },
    libre: function () { nuevaSesion(mem.sesion ? mem.sesion.cl : '', true); render(); },
    responder: function (el) {
      var it = itemActual(); if (!it || !it.ops) return;
      it.elegida = parseInt(el.getAttribute('data-i'), 10);
      if (it.tipo === 'c') recordarVisto(it.c.firma);
      terminarItem(it, !!it.ops[it.elegida].ok); render(); verFeedback();
    },
    parIzq: function (el) { tocarPar('i', parseInt(el.getAttribute('data-k'), 10)); },
    parDer: function (el) { tocarPar('d', parseInt(el.getAttribute('data-k'), 10)); },
    paso: function (el) {
      var it = itemActual('s'); if (!it) return;
      var k = parseInt(el.getAttribute('data-k'), 10);
      if (k === it.colocados.length) {
        it.colocados.push(k); it.malo = null;
        if (it.colocados.length === it.g.pasos.length) terminarItem(it, it.errores === 0);
      } else { it.errores++; it.malo = k; limpiarLuego(it); }
      render(); if (it.listo) verFeedback();
    },
    siguiente: function () {
      var p = mem.partida; if (!p) return;
      p.i++; p.item = null;
      if (p.i < p.cola.length && p.i % 5 === 0) toast(nom(pick(CLARA.animo)), null, null, 2500);
      render(); vista.scrollTop = 0;
    },
    otraPartida: function () { nuevaPartida(mem.partida.id); render(); vista.scrollTop = 0; },
    respCalc: function (el) {
      var x = mem.calc; if (!x || x.listo) return;
      x.listo = true; x.elegida = parseInt(el.getAttribute('data-i'), 10);
      recordarVisto(x.c.firma); S.stats.juegos++; marcarEstudio(); guardar(); render(); verFeedback();
    },
    otroCalc: function () { var t = mem.calc.tipo; mem.calc = { tipo: t, c: GEN.calc[t](S.vistosJuego), listo: false, elegida: -1 }; render(); vista.scrollTop = 0; },
    respCaso: function (el) {
      var c = mem.caso; if (c.respondida) return;
      c.respondida = true; c.elegida = parseInt(el.getAttribute('data-i'), 10);
      S.vistosCaso.push(c.firma); if (S.vistosCaso.length > 1000) S.vistosCaso.shift();
      S.stats.casos++; marcarEstudio(); guardar(); render();
      var chat = vista.querySelector('.chat'); if (chat) chat.scrollTop = chat.scrollHeight;
    },
    otroCaso: function () { mem.caso = null; render(); },
    pedirReinicio: function () { mem.confirmarReinicio = true; render(); },
    cancelarReinicio: function () { mem.confirmarReinicio = false; render(); },
    reiniciar: function () {
      var n = S.nombre; localStorage.removeItem(KEY);
      S = estadoBase(n);
      guardar(); mem.confirmarReinicio = false; mem.sesion = null; mem.partida = null; render(); toast('Listo, jefe ' + esc(n) + '. Empezamos de cero.');
    }
  };
  function tocarPar(lado, k) {
    var it = itemActual('p'); if (!it || it.hechos[k]) return;
    if (lado === 'i') it.sel = it.sel === k ? null : k; else it.selD = it.selD === k ? null : k;
    if (it.sel != null && it.selD != null) {
      if (it.sel === it.selD) { it.hechos[it.sel] = true; it.malo = null; }
      else { it.errores++; it.malo = { i: it.sel, d: it.selD }; limpiarLuego(it); }
      it.sel = null; it.selD = null;
      if (Object.keys(it.hechos).length === it.g.pares.length) terminarItem(it, it.errores === 0);
    }
    render(); if (it.listo) verFeedback();
  }
  var FORMS = {
    nombre: function (f) { var v = f.querySelector('input').value.trim(); if (!v) return; S.nombre = v; guardar(); render(); },
    cambiarNombre: function (f) { var v = f.querySelector('input').value.trim(); if (!v) return; S.nombre = v; guardar(); toast('¡Listo! Desde ahora te digo jefe ' + esc(v) + '.'); render(); }
  };
  var app = document.getElementById('app');
  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-acc]'); if (!el) return;
    var fn = A[el.getAttribute('data-acc')]; if (fn) { e.preventDefault(); fn(el); }
  });
  app.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-form]'); if (!f) return;
    e.preventDefault(); var fn = FORMS[f.getAttribute('data-form')]; if (fn) fn(f);
  });
  app.addEventListener('change', function (e) {
    if (e.target.getAttribute('data-cambio') === 'videos') location.hash = '#/videos' + (e.target.value ? '/' + e.target.value : '');
  });

  /* =========================================================
     ENRUTADOR
     ========================================================= */
  var ultimaRuta = '';
  function ruta() { var partes = location.hash.replace(/^#\/?/, '').split('/'); if (partes[0] === 'modulo') partes[0] = 'enfasis'; return partes; }
  function render() {
    var partes = ruta();
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
    var partes = ruta(), r = partes[0];
    if (r === 'tarjetas') mem.sesion = null;
    if (r === 'juego' && mem.partida && (mem.partida.i >= mem.partida.cola.length || mem.partida.id !== partes[1])) mem.partida = null;
    if (r === 'calc' && mem.calc && mem.calc.listo) mem.calc = null;
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
