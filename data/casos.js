/* =========================================================
   Ruta Rural · Generadores de casos y juegos (opción A, sin IA)
   Cada plantilla mezcla variables al azar (persona, vereda, hora,
   signos, laboratorios, antecedentes) para que los casos no se repitan.
   ========================================================= */
(function () {
  function rnd(a, b, paso) { paso = paso || 1; var n = Math.floor((b - a) / paso) + 1; return a + Math.floor(Math.random() * n) * paso; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function mezclar(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmt(n) { return String(n).replace('.', ','); }
  function miles(n) { var s = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return (n < 0 ? '−' : '') + s; }
  function signo(n) { return (n > 0 ? '+' : '') + miles(n); }

  var VEREDAS = ['La Esperanza', 'El Retiro', 'San Isidro', 'La Palma', 'El Carmen', 'Buenavista', 'Santa Rosa', 'La Florida', 'El Paraíso', 'Monte Bello', 'La Cabaña', 'Alto Bonito', 'El Porvenir', 'Las Mercedes'];
  var HORAS = ['las 7 de la mañana', 'las 8 de la mañana', 'las 9 de la mañana', 'las 10 de la mañana', 'las 11 de la mañana', 'las 2 de la tarde', 'las 3 de la tarde', 'las 4 de la tarde'];
  var MAYORES_M = ['don Arturo', 'don Jairo', 'don Hernando', 'don Efraín', 'don Álvaro', 'don Rubén', 'don Gustavo', 'don Octavio', 'don Luis Alfonso', 'don Ramiro'];
  var MAYORES_F = ['doña Rosa', 'doña Carmen', 'doña Luz Marina', 'doña Blanca', 'doña Gloria', 'doña Esperanza', 'doña Inés', 'doña Fanny', 'doña Myriam', 'doña Aurora'];
  var JOVENES_F = ['Yuliana', 'Daniela', 'Katherine', 'Marcela', 'Leidy', 'Paola', 'Natalia', 'Viviana', 'Sandra', 'Luisa', 'Tatiana', 'Erika', 'Lorena', 'Yesenia'];

  function persona() {
    var mujer = Math.random() < 0.5;
    return { nombre: pick(mujer ? MAYORES_F : MAYORES_M), mujer: mujer };
  }
  function entorno() { return 'Jefe {n}, son ' + pick(HORAS) + ' en el puesto de salud de la vereda ' + pick(VEREDAS) + '.'; }

  /* ---------- Plantillas de casos ---------- */
  var PLANTILLAS = [
    /* 1. Hiperpotasemia en paciente hipertenso */
    function () {
      var p = persona(); var edad = rnd(55, 79);
      var ant = pick(['hipertensión y enfermedad renal crónica', 'hipertensión y diabetes con daño renal', 'hipertensión de muchos años y enfermedad renal crónica']);
      var med = pick(['losartán', 'enalapril', 'losartán y espironolactona', 'enalapril y espironolactona']);
      var sint = pick(['siente las piernas débiles', 'dice que siente el corazón acelerado', 'se siente muy cansad' + (p.mujer ? 'a' : 'o') + ' desde ayer', 'tiene hormigueo en las manos']);
      var k = (rnd(59, 69) / 10).toFixed(1);
      var variante = Math.random() < 0.6 ? 'ecg' : 'med';
      var base = {
        tema: 'HTA · Electrolitos', firma: 'hk|' + p.nombre + edad + med + k + variante,
        mensajes: [entorno(), 'Llega ' + p.nombre + ', ' + edad + ' años. Tiene ' + ant + ' y toma ' + med + '. Hoy ' + sint + '.'],
        datos: [{ t: 'PA ' + rnd(130, 158) + '/' + rnd(80, 96) + ' mmHg', tono: 'neutro' }, { t: 'K⁺ ' + fmt(k) + ' mEq/L', tono: 'alerta' }],
        conducta: 'Avisas de inmediato al médico, tomas ECG si hay equipo y activas la remisión según el protocolo. Mientras tanto, monitorizas signos vitales.'
      };
      if (variante === 'ecg') {
        base.pregunta = '¿Qué hallazgo esperas en el electrocardiograma?';
        base.opciones = [{ t: 'Ondas T altas y picudas', ok: true }, { t: 'Onda U prominente' }, { t: 'Intervalo QT prolongado' }, { t: 'Onda delta' }];
        base.explicacion = 'La hiperpotasemia produce ondas T altas y picudas; si avanza, el QRS se ensancha y aparecen arritmias. La onda U va con potasio bajo y el QT prolongado con calcio bajo.';
      } else {
        var culpable = med.indexOf('espironolactona') >= 0 ? 'La combinación con espironolactona' : (med.indexOf('losartán') >= 0 ? 'El losartán' : 'El enalapril');
        base.pregunta = '¿Qué puede estar contribuyendo a que el potasio esté alto?';
        base.opciones = [{ t: culpable + ', junto con la enfermedad renal', ok: true }, { t: 'Haber tomado mucha agua' }, { t: 'Una dieta baja en sal' }, { t: 'La hidroclorotiazida' }];
        base.explicacion = 'Los IECA, los ARA II y la espironolactona retienen potasio, y el riñón enfermo no logra eliminarlo. La hidroclorotiazida hace lo contrario: baja el potasio.';
      }
      return base;
    },
    /* 2. Hipoglucemia */
    function () {
      var p = persona(); var edad = rnd(48, 80);
      var med = pick(['insulina NPH', 'glibenclamida', 'insulina NPH y metformina']);
      var razon = pick(['no desayunó porque madrugó a ordeñar', 'vomitó en la mañana y no pudo comer', 'se aplicó la insulina y no alcanzó a almorzar', 'caminó una hora desde la finca sin comer']);
      var g = rnd(42, 66);
      var inconsciente = Math.random() < 0.3;
      var b = {
        tema: 'Procedimientos · Glucometría', firma: 'hg|' + p.nombre + edad + med + g + inconsciente,
        mensajes: [entorno(), 'Traen a ' + p.nombre + ', ' + edad + ' años, con diabetes en tratamiento con ' + med + '. Hoy ' + razon + '.',
          inconsciente ? 'No responde al llamado, aunque respira bien.' : 'Está sudoros' + (p.mujer ? 'a' : 'o') + ', tembloros' + (p.mujer ? 'a' : 'o') + ' y algo confundid' + (p.mujer ? 'a' : 'o') + ', pero responde y puede tragar.'],
        datos: [{ t: 'Glucometría ' + g + ' mg/dL', tono: 'alerta' }],
        pregunta: '¿Qué haces primero?'
      };
      if (!inconsciente) {
        b.opciones = [{ t: 'Darle 15 g de azúcar de absorción rápida y repetir la glucometría en 15 minutos', ok: true }, { t: 'Aplicarle su dosis de insulina' }, { t: 'Esperar 1 hora y repetir la glucometría' }, { t: 'Darle solo agua y dejarlo en reposo' }];
        b.explicacion = 'Es la regla de los 15: 15 g de carbohidratos rápidos (medio vaso de jugo o gaseosa normal, o 3–4 cucharaditas de azúcar en agua) y control a los 15 minutos. Se repite si sigue por debajo de 70 mg/dL.';
        b.conducta = 'Cuando se recupere, que coma algo con carbohidratos complejos. Informa al médico para revisar la dosis de su medicamento.';
      } else {
        b.opciones = [{ t: 'No darle nada por boca; glucagón IM o dextrosa IV según protocolo y avisar', ok: true }, { t: 'Ponerle azúcar en la boca' }, { t: 'Darle jugo con una jeringa' }, { t: 'Aplicarle insulina' }];
        b.explicacion = 'Con alteración de la conciencia no se da nada por boca por el riesgo de broncoaspiración. Se usa glucagón IM o dextrosa IV, según disponibilidad y protocolo.';
        b.conducta = 'Colócalo de lado, protege la vía aérea, avisa al médico y prepara la remisión.';
      }
      return b;
    },
    /* 3. Crisis hipertensiva */
    function () {
      var p = persona(); var edad = rnd(50, 82);
      var pas = rnd(182, 214); var pad = rnd(112, 132);
      var conDano = Math.random() < 0.5;
      var sint = conDano ? pick(['tiene dolor opresivo en el pecho desde hace media hora', 'le cuesta hablar y tiene debilidad en el brazo derecho', 'tiene mucha dificultad para respirar y se le escuchan crépitos', 'tiene visión borrosa, confusión y cefalea muy intensa'])
        : pick(['no tiene síntomas: dejó de tomar las pastillas hace 4 días porque se le acabaron', 'tiene un dolor de cabeza leve y no tiene otros síntomas', 'viene a su control y dice sentirse bien, pero no ha tomado la pastilla en una semana']);
      return {
        tema: 'HTA en el paciente crónico', firma: 'cr|' + p.nombre + edad + pas + pad + conDano + sint.length,
        mensajes: [entorno(), p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1) + ', ' + edad + ' años, hipertens' + (p.mujer ? 'a' : 'o') + ' conocid' + (p.mujer ? 'a' : 'o') + '. ' + sint.charAt(0).toUpperCase() + sint.slice(1) + '.', 'Tomaste la presión dos veces, con técnica correcta.'],
        datos: [{ t: 'PA ' + pas + '/' + pad + ' mmHg', tono: 'alerta' }, { t: 'FC ' + rnd(72, 104) + ' lpm', tono: 'neutro' }],
        pregunta: '¿Cómo clasificas esta situación?',
        opciones: [{ t: 'Emergencia hipertensiva', ok: conDano }, { t: 'Urgencia hipertensiva (sin daño agudo de órgano)', ok: !conDano }, { t: 'Hipertensión controlada' }, { t: 'Hipotensión ortostática' }],
        explicacion: conDano ? 'Hay cifras muy altas con signos de daño agudo de órgano blanco (corazón, cerebro, pulmón u ojos): es una emergencia hipertensiva.'
          : 'Las cifras son muy altas, pero no hay signos de daño agudo de órgano blanco: es una urgencia hipertensiva (o HTA severa sin daño de órgano).',
        conducta: conDano ? 'Avisas al médico de inmediato y activas la remisión urgente. Monitorizas signos vitales; no se busca bajar la presión de golpe por vía oral.'
          : 'Reposo y nueva toma; informas al médico para ajustar el tratamiento según protocolo. Revisas la adherencia y por qué se le acabaron los medicamentos.'
      };
    },
    /* 4. Cistoirrigación */
    function () {
      var edad = rnd(60, 84); var nombre = pick(MAYORES_M);
      var horas = pick([6, 8, 12]);
      var irr = rnd(3000, 9000, 500); var real = rnd(300, 950, 50); var total = irr + real;
      var opts = mezclar([{ t: miles(real) + ' ml', ok: true }, { t: miles(total) + ' ml' }, { t: miles(irr) + ' ml' }, { t: miles(total + irr) + ' ml' }]);
      return {
        tema: 'Procedimientos · Cistoirrigación', firma: 'ci|' + nombre + edad + horas + irr + real,
        mensajes: ['Jefe {n}, estás de turno en el hospital local. ' + nombre.charAt(0).toUpperCase() + nombre.slice(1) + ', ' + edad + ' años, está en posoperatorio de resección transuretral de próstata con cistoirrigación continua.', 'Al cierre de tu turno de ' + horas + ' horas registras lo siguiente:'],
        datos: [{ t: 'Irrigación infundida: ' + miles(irr) + ' ml', tono: 'neutro' }, { t: 'Total drenado: ' + miles(total) + ' ml', tono: 'neutro' }],
        pregunta: '¿Cuál es la diuresis real del turno?',
        opciones: opts,
        explicacion: 'Diuresis real = total drenado − irrigación infundida = ' + miles(total) + ' − ' + miles(irr) + ' = ' + miles(real) + ' ml.',
        conducta: 'Registra la diuresis real en el balance (no el total drenado) y vigila color del drenaje, coágulos y dolor suprapúbico.'
      };
    },
    /* 5. Tamizaje de cuello uterino */
    function () {
      var nombre = pick(JOVENES_F);
      var edad = pick([rnd(21, 24), rnd(25, 29), rnd(30, 45), rnd(46, 64)]);
      var motivo = pick(['viene a consulta de planificación familiar', 'acompaña a su mamá y aprovecha para preguntar por "la citología"', 'viene a su control y dice que nunca se ha hecho la prueba', 'pregunta qué examen le toca para prevenir el cáncer de cuello uterino']);
      var correcta = edad < 25 ? 'Ninguna de rutina por ahora (solo si hay factores de riesgo)' : (edad < 30 ? 'Citología, esquema 1-3-3' : 'Prueba de ADN-VPH, esquema 1-5-5');
      var todas = ['Ninguna de rutina por ahora (solo si hay factores de riesgo)', 'Citología, esquema 1-3-3', 'Prueba de ADN-VPH, esquema 1-5-5', 'Colposcopia directa'];
      return {
        tema: 'Planificación familiar · Tamizaje', firma: 'tz|' + nombre + edad + motivo.length,
        mensajes: [entorno(), nombre + ', ' + edad + ' años, ' + motivo + '.', 'No tiene tamizajes previos ni factores de riesgo especiales.'],
        datos: [{ t: edad + ' años', tono: 'neutro' }],
        pregunta: 'Según la Resolución 3280, ¿qué tamizaje le corresponde?',
        opciones: todas.map(function (t) { return { t: t, ok: t === correcta }; }),
        explicacion: 'Menores de 25: no se tamizan de rutina. De 25 a 29: citología 1-3-3. De 30 a 65: ADN-VPH 1-5-5 ante resultados negativos.',
        conducta: edad < 25 ? 'Aprovecha la consulta para educar sobre vacunación contra el VPH, uso del condón y signos de alarma.' : 'Explica la prueba, resuelve dudas y deja registrado cuándo le toca la siguiente.'
      };
    },
    /* 6. Implante subdérmico */
    function () {
      var nombre = pick(JOVENES_F); var edad = rnd(19, 38);
      var jad = Math.random() < 0.5; var tipo = jad ? 'Jadelle (2 varillas)' : 'Implanon NXT (1 varilla)';
      var dur = jad ? 5 : 3; var anos = rnd(1, dur + 2); var vigente = anos < dur;
      return {
        tema: 'Planificación familiar · Implante', firma: 'im|' + nombre + edad + jad + anos,
        mensajes: [entorno(), nombre + ', ' + edad + ' años, viene a control de planificación. Tiene un implante ' + tipo + ' que le pusieron hace ' + anos + ' año' + (anos > 1 ? 's' : '') + '.', 'Pregunta si todavía está protegida.'],
        datos: [{ t: tipo, tono: 'neutro' }, { t: 'Colocado hace ' + anos + ' año' + (anos > 1 ? 's' : ''), tono: 'neutro' }],
        pregunta: '¿Qué le respondes?',
        opciones: [{ t: 'Sí, sigue protegida', ok: vigente }, { t: 'Ya venció: ofrecer retiro y colocación de uno nuevo u otro método', ok: !vigente }, { t: 'Debe retirarlo ya porque produce infección' }, { t: 'Depende de si le llega la menstruación' }],
        explicacion: 'Jadelle protege 5 años e Implanon NXT 3 años. ' + (vigente ? 'Todavía está dentro del tiempo de protección.' : 'Ya cumplió su tiempo y debe cambiarse.'),
        conducta: vigente ? 'Palpa el implante, revisa el patrón de sangrado y deja anotada la fecha de recambio.' : 'Mientras se hace el recambio, recomienda condón. Palpa el implante y programa el procedimiento.'
      };
    }
  ];
  /* =========================================================
     Calculadoras: ejercicios numéricos generados al azar.
     Todas devuelven { calc, titulo, tema, intro, enunciado, cajas, pregunta,
     opciones, solucion, nota, firma } con UNA sola opción correcta.
     ========================================================= */
  var DIA = 864e5;
  function dec(n, d) { var f = Math.pow(10, d == null ? 1 : d); return Math.round(n * f) / f; }
  function num(n, d) {
    var r = dec(n, d == null ? 1 : d);
    var partes = Math.abs(r).toString().split('.');
    return (r < 0 ? '−' : '') + partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (partes[1] ? ',' + partes[1] : '');
  }
  function opcionesDe(correcta, otras, f, relleno) {
    var vistos = {}, ops = [];
    function add(v, ok) {
      if (typeof v === 'number' && !isFinite(v)) return;
      var t = f(v); if (vistos[t]) return;
      vistos[t] = 1; ops.push({ t: t, ok: !!ok });
    }
    add(correcta, true);
    otras.forEach(function (v) { if (ops.length < 4) add(v, false); });
    for (var g = 0; ops.length < 4 && g < 300; g++) add(relleno(), false);
    return mezclar(ops);
  }

  /* ---------- Balance de líquidos ---------- */
  function calcBalance() {
    var kg = rnd(48, 95), h = pick([6, 8, 12]);
    var lev = rnd(300, 1500, 50), vo = rnd(0, 900, 50), dil = Math.random() < 0.4 ? rnd(50, 200, 50) : 0;
    var diu = rnd(300, 1600, 50), dep = Math.random() < 0.35 ? rnd(100, 300, 50) : 0, vom = Math.random() < 0.2 ? rnd(100, 300, 50) : 0;
    var pi = kg * h / 2;
    var ing = lev + vo + dil, egrSin = diu + dep + vom, egr = egrSin + pi, bal = ing - egr;
    var ingresos = [['LEV', lev]]; if (vo) ingresos.push(['Vía oral', vo]); if (dil) ingresos.push(['Medicamentos diluidos', dil]);
    var egresos = [['Diuresis', diu]]; if (dep) egresos.push(['Deposición', dep]); if (vom) egresos.push(['Vómito', vom]);
    function f(v) { return signo(v) + ' ml'; }
    return {
      calc: 'balance', titulo: 'Calcula el balance del turno', tema: 'Balance de líquidos', firma: 'bj|' + [kg, h, lev, vo, dil, diu, dep, vom].join('-'),
      intro: 'Jefe {n}, este es de balance hídrico. Lo que entra menos lo que sale, sin olvidar las pérdidas que no se ven.',
      enunciado: 'Adulto de ' + kg + ' kg, turno de ' + h + ' horas. Tu servicio calcula las pérdidas insensibles con 0,5 ml/kg/h.',
      cajas: [{ k: 'Ingresos', c: 'sky', items: ingresos.map(function (x) { return [x[0], miles(x[1]) + ' ml']; }) },
        { k: 'Egresos', c: 'peach', items: egresos.map(function (x) { return [x[0], miles(x[1]) + ' ml']; }).concat([['Insensibles', '?']]) }],
      pregunta: '¿Cuál es el balance del turno?',
      opciones: opcionesDe(bal, [ing - egrSin, -bal, ing + pi - egrSin, dil ? bal - dil : bal + 100], f, function () { return bal + rnd(-4, 4) * 50; }),
      solucion: ['Ingresos: ' + ingresos.map(function (x) { return miles(x[1]); }).join(' + ') + ' = ' + miles(ing) + ' ml',
        'Insensibles: 0,5 × ' + kg + ' × ' + h + ' = ' + miles(pi) + ' ml',
        'Egresos: ' + egresos.map(function (x) { return miles(x[1]); }).concat([miles(pi)]).join(' + ') + ' = ' + miles(egr) + ' ml',
        'Balance: ' + miles(ing) + ' − ' + miles(egr) + ' = ' + f(bal)]
    };
  }

  /* ---------- Goteo ---------- */
  function calcGoteo() {
    var vol = pick([250, 500, 1000, 1500]), horas = pick([2, 4, 6, 8, 10, 12]), macro = Math.random() < 0.75;
    var factor = macro ? 20 : 60, u = macro ? ' gotas/min' : ' microgotas/min', mlh = vol / horas;
    var correcto = Math.round(vol * factor / (horas * 60));
    function f(v) { return Math.round(v) + u; }
    return {
      calc: 'goteo', titulo: 'Calcula el goteo', tema: 'Cálculo de goteo', firma: 'gt|' + vol + '-' + horas + '-' + macro,
      intro: 'Jefe {n}, toca programar un goteo sin bomba de infusión. Fórmula: volumen × factor ÷ minutos.',
      enunciado: 'Orden médica: pasar ' + miles(vol) + ' ml de solución salina 0,9 % en ' + horas + ' horas, con equipo de ' + (macro ? 'macrogoteo (20 gotas/ml)' : 'microgoteo (60 microgotas/ml)') + '.',
      cajas: [{ k: 'Orden', c: 'sky', items: [['Volumen', miles(vol) + ' ml'], ['Tiempo', horas + ' h = ' + horas * 60 + ' min']] },
        { k: 'Equipo', c: 'peach', items: [['Factor', factor + (macro ? ' gotas/ml' : ' microgotas/ml')]] }],
      pregunta: '¿A cuántas ' + (macro ? 'gotas' : 'microgotas') + ' por minuto lo programas?',
      opciones: opcionesDe(correcto, [mlh, vol * (macro ? 60 : 20) / (horas * 60), vol / (horas * 60) * 10], f, function () { return correcto + rnd(-6, 6); }),
      solucion: [miles(vol) + ' × ' + factor + ' ÷ ' + (horas * 60) + ' = ' + num(vol * factor / (horas * 60), 1) + ' → ' + correcto + u,
        macro ? 'Atajo: ' + num(mlh, 1) + ' ml/h ÷ 3 ≈ ' + Math.round(mlh / 3) + ' gotas/min' : 'En microgoteo, microgotas/min = ml/h = ' + num(mlh, 1)]
    };
  }

  /* ---------- Dosis en ml ---------- */
  var MEDS = [
    ['Metoclopramida', 10, 2, [5, 10]], ['Furosemida', 20, 2, [10, 20, 40]], ['Dipirona', 1000, 2, [500, 1000]],
    ['Gentamicina', 80, 2, [40, 80, 160]], ['Ondansetrón', 8, 4, [4, 8]], ['Diclofenaco', 75, 3, [50, 75]],
    ['Dexametasona', 8, 2, [4, 8]], ['Tramadol', 100, 2, [50, 100]]
  ];
  function calcDosis() {
    var m = pick(MEDS), orden = pick(m[3]), ml = orden * m[2] / m[1];
    var amp = (m[1] >= 1000 ? num(m[1] / 1000, 1) + ' g' : m[1] + ' mg') + ' en ' + m[2] + ' ml';
    function f(v) { return num(v, 2) + ' ml'; }
    return {
      calc: 'dosis', titulo: 'Calcula la dosis en ml', tema: 'Cálculo de dosis', firma: 'ds|' + m[0] + '-' + orden,
      intro: 'Jefe {n}, toca preparar un medicamento. Regla de tres: dosis ordenada × volumen de la ampolla ÷ lo que trae la ampolla.',
      enunciado: 'Orden médica: ' + m[0] + ' ' + miles(orden) + ' mg. En el servicio hay ampollas de ' + amp + '.',
      cajas: [{ k: 'Orden', c: 'sky', items: [['Dosis', miles(orden) + ' mg']] }, { k: 'Presentación', c: 'peach', items: [['Ampolla', amp]] }],
      pregunta: '¿Cuántos ml debes cargar?',
      opciones: opcionesDe(ml, [orden / m[1], m[2], ml * 2, ml / 2], f, function () { return Math.max(0.25, ml + rnd(-4, 4) * 0.5); }),
      solucion: [miles(orden) + ' mg × ' + m[2] + ' ml ÷ ' + miles(m[1]) + ' mg = ' + f(ml),
        ml > m[2] ? 'Necesitas ' + num(ml / m[2], 2) + ' ampollas.' : (ml === m[2] ? 'Es la ampolla completa.' : 'Es una parte de la ampolla.')],
      nota: 'Verifica siempre la presentación disponible en tu servicio: las concentraciones pueden variar.'
    };
  }

  /* ---------- Acetaminofén en jarabe ---------- */
  function calcParacetamol() {
    var kg = rnd(6, 30), mg = kg * 15, ml = mg / 30;
    function f(v) { return num(v, 1) + ' ml'; }
    return {
      calc: 'paracetamol', titulo: 'Acetaminofén en jarabe', tema: 'Dosis pediátrica', firma: 'pc|' + kg,
      intro: 'Jefe {n}, la mamá pregunta cuánto jarabe darle al niño para la fiebre. Calcula por peso.',
      enunciado: 'Niño de ' + kg + ' kg con fiebre. Dosis indicada: 15 mg/kg. Tienes jarabe de acetaminofén de 150 mg/5 ml.',
      cajas: [{ k: 'Paciente', c: 'sky', items: [['Peso', kg + ' kg'], ['Dosis', '15 mg/kg']] }, { k: 'Jarabe', c: 'peach', items: [['Presentación', '150 mg / 5 ml']] }],
      pregunta: '¿Cuántos ml le das por dosis?',
      opciones: opcionesDe(ml, [mg / 150, mg / 5, ml * 2, ml / 2], f, function () { return Math.max(0.5, ml + rnd(-6, 6) * 0.5); }),
      solucion: ['Dosis: ' + kg + ' kg × 15 mg = ' + miles(mg) + ' mg', 'Concentración: 150 mg ÷ 5 ml = 30 mg/ml', miles(mg) + ' mg ÷ 30 mg/ml = ' + f(ml)],
      nota: 'Verifica la concentración del frasco (las gotas suelen ser de 100 mg/ml). No más de 5 dosis en 24 horas.'
    };
  }

  /* ---------- IMC ---------- */
  var CLASES_IMC = ['Bajo peso', 'Normal', 'Sobrepeso', 'Obesidad'];
  function calcImc() {
    var kg, t, imc, g = 0;
    do { kg = rnd(45, 120); t = rnd(145, 190) / 100; imc = kg / (t * t); g++; }
    while (g < 200 && [18.5, 25, 30].some(function (c) { return Math.abs(imc - c) < 0.3; }));
    var k = imc < 18.5 ? 0 : (imc < 25 ? 1 : (imc < 30 ? 2 : 3));
    return {
      calc: 'imc', titulo: 'Calcula y clasifica el IMC', tema: 'Antropometría', firma: 'im|' + kg + '-' + t,
      intro: 'Jefe {n}, en la consulta de riesgo cardiovascular toca calcular el IMC.',
      enunciado: 'Adulto de ' + kg + ' kg y ' + num(t, 2) + ' m de talla.',
      cajas: [{ k: 'Datos', c: 'sky', items: [['Peso', kg + ' kg'], ['Talla', num(t, 2) + ' m']] }],
      pregunta: '¿Cómo se clasifica su IMC según la OMS?',
      opciones: mezclar(CLASES_IMC.map(function (c, i) { return { t: c, ok: i === k }; })),
      solucion: ['IMC = ' + kg + ' ÷ (' + num(t, 2) + ' × ' + num(t, 2) + ') = ' + num(imc, 1) + ' kg/m²',
        'Cortes de la OMS: menos de 18,5 bajo peso; 18,5–24,9 normal; 25–29,9 sobrepeso; 30 o más obesidad.', 'Clasificación: ' + CLASES_IMC[k] + '.']
    };
  }

  /* ---------- Presión arterial media ---------- */
  function calcPam() {
    var pas = rnd(86, 190, 2), pad = rnd(46, Math.min(pas - 26, 114), 2), exacta = (pas + 2 * pad) / 3, pam = Math.round(exacta);
    function f(v) { return Math.round(v) + ' mmHg'; }
    return {
      calc: 'pam', titulo: 'Calcula la presión arterial media', tema: 'Hemodinamia', firma: 'pm|' + pas + '-' + pad,
      intro: 'Jefe {n}, en el paciente grave la PAM dice si los órganos están bien perfundidos.',
      enunciado: 'Paciente con presión arterial de ' + pas + '/' + pad + ' mmHg.',
      cajas: [{ k: 'Presión arterial', c: 'sky', items: [['Sistólica', pas + ' mmHg'], ['Diastólica', pad + ' mmHg']] }],
      pregunta: '¿Cuál es su presión arterial media (PAM)?',
      opciones: opcionesDe(pam, [(pas + pad) / 2, pas - pad, (2 * pas + pad) / 3], f, function () { return pam + rnd(-9, 9); }),
      solucion: ['PAM = (PAS + 2 × PAD) ÷ 3', '(' + pas + ' + 2 × ' + pad + ') ÷ 3 = ' + num(exacta, 1) + ' ≈ ' + pam + ' mmHg',
        pam >= 65 ? 'Está en 65 mmHg o más, la meta habitual en el paciente con sepsis.' : 'Está por debajo de 65 mmHg: en sepsis indica hipoperfusión y exige actuar.']
    };
  }

  /* ---------- Gases arteriales ---------- */
  var GASES = [
    { n: 'Acidosis respiratoria', co2: [48, 75], hco3: [22, 32], ph: [7.10, 7.34], causa: 'hipoventilación: EPOC descompensado, sedación excesiva o sobredosis de opioides.' },
    { n: 'Alcalosis respiratoria', co2: [18, 33], hco3: [16, 25], ph: [7.46, 7.65], causa: 'hiperventilación: ansiedad, dolor, fiebre o hipoxemia.' },
    { n: 'Acidosis metabólica', co2: [18, 40], hco3: [6, 20], ph: [7.05, 7.34], causa: 'diarrea, cetoacidosis diabética, falla renal o hipoperfusión (lactato).' },
    { n: 'Alcalosis metabólica', co2: [38, 52], hco3: [28, 42], ph: [7.46, 7.62], causa: 'vómito persistente, succión gástrica o diuréticos.' }
  ];
  function calcGases() {
    var tipo = pick(GASES), co2, hco3, ph, g = 0;
    do { co2 = rnd(tipo.co2[0], tipo.co2[1]); hco3 = rnd(tipo.hco3[0], tipo.hco3[1]); ph = dec(6.1 + Math.log(hco3 / (0.03 * co2)) / Math.LN10, 2); g++; }
    while (g < 400 && (ph < tipo.ph[0] || ph > tipo.ph[1]));
    if (ph < tipo.ph[0] || ph > tipo.ph[1]) { var fijo = [[60, 26, 7.26], [28, 22, 7.52], [28, 12, 7.25], [46, 34, 7.49]][GASES.indexOf(tipo)]; co2 = fijo[0]; hco3 = fijo[1]; ph = fijo[2]; }
    var resp = tipo.n.indexOf('respiratoria') >= 0, acid = ph < 7.35, phTxt = ph.toFixed(2).replace('.', ',');
    var comp = resp ? (hco3 > 26 ? 'El HCO₃⁻ alto muestra compensación renal.' : (hco3 < 22 ? 'El HCO₃⁻ bajo muestra compensación renal.' : 'El HCO₃⁻ normal sugiere un trastorno agudo, aún sin compensación renal.'))
      : (co2 < 35 ? 'La PaCO₂ baja muestra compensación respiratoria.' : (co2 > 45 ? 'La PaCO₂ alta muestra compensación respiratoria.' : 'La PaCO₂ normal indica que aún no hay compensación respiratoria.'));
    return {
      calc: 'gases', titulo: 'Interpreta los gases arteriales', tema: 'Equilibrio ácido-base', firma: 'ga|' + tipo.n + '-' + co2 + '-' + hco3,
      intro: 'Jefe {n}, llegaron los gases arteriales. Paso a paso: pH, luego quién lo explica (PaCO₂ o HCO₃⁻) y al final la compensación.',
      enunciado: 'Gases arteriales de un paciente de urgencias (valores de referencia a nivel del mar).',
      cajas: [{ k: 'Resultado', c: 'sky', items: [['pH', phTxt], ['PaCO₂', co2 + ' mmHg'], ['HCO₃⁻', hco3 + ' mEq/L']] },
        { k: 'Referencia', c: 'peach', items: [['pH', '7,35–7,45'], ['PaCO₂', '35–45'], ['HCO₃⁻', '22–26']] }],
      pregunta: '¿Cuál es el trastorno ácido-base primario?',
      opciones: mezclar(GASES.map(function (x) { return { t: x.n, ok: x === tipo }; })),
      solucion: ['pH ' + phTxt + (acid ? ' (menor de 7,35): acidemia.' : ' (mayor de 7,45): alcalemia.'),
        resp ? 'La PaCO₂ de ' + co2 + ' mmHg (' + (co2 > 45 ? 'alta' : 'baja') + ') explica el pH: el origen es respiratorio.' : 'El HCO₃⁻ de ' + hco3 + ' mEq/L (' + (hco3 < 22 ? 'bajo' : 'alto') + ') explica el pH: el origen es metabólico.',
        comp, 'Diagnóstico: ' + tipo.n.toLowerCase() + '. Causas típicas: ' + tipo.causa],
      nota: 'En ciudades de altura, como Bogotá, la PaCO₂ normal es más baja que a nivel del mar.'
    };
  }

  /* ---------- SRO en el Plan B ---------- */
  function calcSro() {
    var kg = rnd(40, 200, 5) / 10, total = Math.round(75 * kg);
    function f(v) { return miles(Math.round(v)) + ' ml'; }
    return {
      calc: 'sro', titulo: 'Sales de rehidratación oral', tema: 'Diarrea · Plan B', firma: 'sr|' + kg,
      intro: 'Jefe {n}, llega un niño con diarrea y algún grado de deshidratación: toca Plan B.',
      enunciado: 'Niño de ' + num(kg, 1) + ' kg con diarrea y algún grado de deshidratación. Está alerta y puede beber.',
      cajas: [{ k: 'Paciente', c: 'sky', items: [['Peso', num(kg, 1) + ' kg'], ['Plan', 'B: SRO en el servicio']] }],
      pregunta: '¿Cuánta SRO debe recibir en las 4 horas?',
      opciones: opcionesDe(total, [50 * kg, 100 * kg, total / 4, 30 * kg], f, function () { return total + rnd(-6, 6) * 25; }),
      solucion: ['Plan B: 75 ml/kg en 4 horas.', '75 × ' + num(kg, 1) + ' = ' + f(total) + ' en 4 horas (unos ' + f(total / 4) + ' por hora).', 'A las 4 horas reevalúas y eliges el plan según cómo esté.'],
      nota: 'Si el niño pide más, se le da más. Continúa la lactancia materna.'
    };
  }

  /* ---------- Parkland ---------- */
  function calcParkland() {
    var kg = rnd(50, 95), scq = rnd(10, 50, 5), total = 4 * kg * scq, ocho = total / 2;
    function f(v) { return miles(Math.round(v)) + ' ml'; }
    return {
      calc: 'parkland', titulo: 'Líquidos en el paciente quemado', tema: 'Quemaduras · Parkland', firma: 'pk|' + kg + '-' + scq,
      intro: 'Jefe {n}, llega un adulto quemado. Calcula los líquidos de las primeras horas con la fórmula de Parkland.',
      enunciado: 'Adulto de ' + kg + ' kg con quemaduras de 2.º y 3.er grado en el ' + scq + ' % de la superficie corporal.',
      cajas: [{ k: 'Paciente', c: 'sky', items: [['Peso', kg + ' kg'], ['Superficie quemada', scq + ' %']] }, { k: 'Fórmula', c: 'peach', items: [['Parkland', '4 ml × kg × % SCQ en 24 h']] }],
      pregunta: '¿Cuánto lactato de Ringer debe recibir en las primeras 8 horas desde la quemadura?',
      opciones: opcionesDe(ocho, [total, ocho / 2, ocho / 8, ocho * 1.5], f, function () { return ocho + rnd(-6, 6) * 100; }),
      solucion: ['Total en 24 h: 4 × ' + kg + ' × ' + scq + ' = ' + f(total), 'Primeras 8 h (la mitad): ' + f(ocho) + ' (unos ' + f(ocho / 8) + ' por hora).', 'Las 16 horas siguientes: ' + f(total - ocho) + '.'],
      nota: 'Solo cuentan las quemaduras de 2.º y 3.er grado. Ajusta según la diuresis (meta 0,5 ml/kg/h en el adulto) y sigue el protocolo de tu servicio.'
    };
  }

  /* ---------- Fecha probable de parto ---------- */
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function fecha(d) { return d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear(); }
  function masMeses(d, m) { return new Date(d.getFullYear(), d.getMonth() + m, d.getDate()); }
  function calcFpp() {
    var hoyD = new Date(), fum = new Date(hoyD.getFullYear(), hoyD.getMonth(), hoyD.getDate() - rnd(4, 38) * 7);
    if (fum.getDate() > 21) fum = new Date(fum.getFullYear(), fum.getMonth(), fum.getDate() - 10);
    var y = fum.getFullYear(), m = fum.getMonth(), d = fum.getDate();
    var mas7 = new Date(y, m, d + 7), fpp = masMeses(mas7, 9);
    var otras = [masMeses(new Date(y, m, d - 7), 9), masMeses(mas7, 10), masMeses(fum, 9), masMeses(mas7, 8)];
    return {
      calc: 'fpp', titulo: 'Calcula la fecha probable de parto', tema: 'Control prenatal', firma: 'fp|' + ymdTxt(fum),
      intro: 'Jefe {n}, una gestante llega a su primer control. Calcula la FPP con la regla de Naegele.',
      enunciado: 'La gestante recuerda con seguridad el primer día de su última menstruación (FUM): ' + fecha(fum) + '. Tiene ciclos regulares.',
      cajas: [{ k: 'Dato', c: 'sky', items: [['FUM', fecha(fum)]] }, { k: 'Regla de Naegele', c: 'peach', items: [['Fórmula', '+7 días, −3 meses, +1 año']] }],
      pregunta: '¿Cuál es la fecha probable de parto?',
      opciones: opcionesDe(fpp, otras, fecha, function () { return new Date(fpp.getTime() + rnd(-12, 12) * DIA); }),
      solucion: ['FUM: ' + fecha(fum), '+ 7 días: ' + fecha(mas7), '− 3 meses y + 1 año: ' + fecha(fpp)],
      nota: 'Si la FUM no es confiable, la edad gestacional se confirma con la ecografía del primer trimestre.'
    };
  }
  function ymdTxt(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

  /* ---------- Incidencia y prevalencia ---------- */
  function calcIncidencia() {
    if (Math.random() < 0.5) {
      var N = rnd(2000, 20000, 500), P = Math.round(N * rnd(6, 15) / 100), c = rnd(12, 200), riesgo = N - P, inc = c / riesgo * 1000;
      var f = function (v) { return num(v, 1) + ' por 1.000'; };
      return {
        calc: 'incidencia', titulo: 'Calcula la incidencia acumulada', tema: 'Epidemiología', firma: 'ic|' + N + '-' + P + '-' + c,
        intro: 'Jefe {n}, la secretaría de salud te pide un indicador para el informe de la vereda.',
        enunciado: 'Un municipio tiene ' + miles(N) + ' adultos. Al iniciar el año, ' + miles(P) + ' ya tenían diagnóstico de hipertensión. Durante el año se diagnosticaron ' + c + ' casos nuevos.',
        cajas: [{ k: 'Datos', c: 'sky', items: [['Adultos', miles(N)], ['Ya tenían hipertensión', miles(P)], ['Casos nuevos en el año', String(c)]] }],
        pregunta: '¿Cuál es la incidencia acumulada de hipertensión en el año?',
        opciones: opcionesDe(inc, [c / N * 1000, (c + P) / N * 1000, inc / 10], f, function () { return inc * (1 + rnd(-35, 35) / 100); }),
        solucion: ['Población en riesgo: ' + miles(N) + ' − ' + miles(P) + ' = ' + miles(riesgo) + ' (quien ya estaba enfermo no puede ser caso nuevo).', c + ' ÷ ' + miles(riesgo) + ' × 1.000 = ' + f(inc) + ' adultos en riesgo.']
      };
    }
    var M = rnd(200, 1200, 50), h = Math.round(M * rnd(8, 30) / 100), k = Math.max(2, Math.round(h * rnd(15, 40) / 100)), prev = h / M * 100;
    var g = function (v) { return num(v, 1) + ' %'; };
    return {
      calc: 'incidencia', titulo: 'Calcula la prevalencia', tema: 'Epidemiología', firma: 'pv|' + M + '-' + h + '-' + k,
      intro: 'Jefe {n}, terminó la jornada de tamizaje. Calcula la prevalencia para el informe.',
      enunciado: 'En una jornada se tomó la presión a ' + miles(M) + ' adultos. ' + h + ' tienen hipertensión: ' + k + ' se diagnosticaron por primera vez ese día y los demás ya sabían que la tenían.',
      cajas: [{ k: 'Datos', c: 'sky', items: [['Adultos tamizados', miles(M)], ['Con hipertensión (total)', String(h)], ['Diagnosticados ese día', String(k)]] }],
      pregunta: '¿Cuál es la prevalencia de hipertensión en el grupo tamizado?',
      opciones: opcionesDe(prev, [k / M * 100, (h - k) / M * 100, prev * 10], g, function () { return prev * (1 + rnd(-35, 35) / 100); }),
      solucion: ['La prevalencia cuenta todos los casos, nuevos y antiguos.', h + ' ÷ ' + miles(M) + ' × 100 = ' + g(prev)]
    };
  }

  /* ---------- Pruebas diagnósticas (tabla 2 × 2) ---------- */
  function calcPruebas() {
    var vp = rnd(40, 95), fn = rnd(3, 20), fp = rnd(5, 40), vn = rnd(100, 400);
    var M = [
      ['la sensibilidad', vp / (vp + fn) * 100, 'VP ÷ (VP + FN) = ' + vp + ' ÷ ' + (vp + fn)],
      ['la especificidad', vn / (vn + fp) * 100, 'VN ÷ (VN + FP) = ' + vn + ' ÷ ' + (vn + fp)],
      ['el valor predictivo positivo', vp / (vp + fp) * 100, 'VP ÷ (VP + FP) = ' + vp + ' ÷ ' + (vp + fp)],
      ['el valor predictivo negativo', vn / (vn + fn) * 100, 'VN ÷ (VN + FN) = ' + vn + ' ÷ ' + (vn + fn)]
    ];
    var i = rnd(0, 3), x = M[i];
    function f(v) { return num(v, 1) + ' %'; }
    return {
      calc: 'pruebas', titulo: 'Evalúa la prueba diagnóstica', tema: 'Epidemiología', firma: 'pr|' + [vp, fn, fp, vn, i].join('-'),
      intro: 'Jefe {n}, se está evaluando una prueba rápida en el puesto. Interpreta la tabla 2 × 2.',
      enunciado: 'Se aplicó una prueba rápida a ' + miles(vp + fn + fp + vn) + ' personas y se comparó con la prueba de referencia.',
      cajas: [{ k: 'Enfermos', c: 'peach', items: [['Prueba + (VP)', String(vp)], ['Prueba − (FN)', String(fn)]] }, { k: 'Sanos', c: 'mint', items: [['Prueba + (FP)', String(fp)], ['Prueba − (VN)', String(vn)]] }],
      pregunta: '¿Cuál es ' + x[0] + ' de la prueba?',
      opciones: opcionesDe(x[1], M.filter(function (y, j) { return j !== i; }).map(function (y) { return y[1]; }), f, function () { return Math.min(99.9, Math.max(1, x[1] + rnd(-90, 90) / 10)); }),
      solucion: [x[0].charAt(0).toUpperCase() + x[0].slice(1) + ' = ' + x[2] + ' × 100 = ' + f(x[1])]
    };
  }

  /* ---------- Media y mediana ---------- */
  var CONTEXTOS_MEDIA = [
    ['Glucemias en ayunas de pacientes del programa de crónicos', 75, 180, 'mg/dL'],
    ['Edades de las gestantes del control prenatal de hoy', 15, 42, 'años'],
    ['Días de estancia de los pacientes hospitalizados', 1, 15, 'días'],
    ['Presión sistólica de los asistentes al club de hipertensos', 110, 170, 'mmHg']
  ];
  function calcMedia() {
    var ctx = pick(CONTEXTOS_MEDIA), n = pick([5, 7]), datos = [];
    for (var i = 0; i < n; i++) datos.push(rnd(ctx[1], ctx[2]));
    var ord = datos.slice().sort(function (a, b) { return a - b; });
    var suma = datos.reduce(function (a, b) { return a + b; }, 0), media = suma / n, mediana = ord[(n - 1) / 2], rango = ord[n - 1] - ord[0], medioSin = datos[(n - 1) / 2];
    var pideMedia = Math.random() < 0.5, correcta = pideMedia ? media : mediana;
    function f(v) { return num(v, 1) + ' ' + ctx[3]; }
    return {
      calc: 'media', titulo: pideMedia ? 'Calcula la media' : 'Calcula la mediana', tema: 'Bioestadística', firma: 'md|' + datos.join('-') + (pideMedia ? 'm' : 'd'),
      intro: 'Jefe {n}, toca resumir los datos del programa para el informe mensual.',
      enunciado: ctx[0] + ' (' + ctx[3] + '):',
      cajas: [{ k: 'Datos', c: 'sky', items: [['Valores', datos.join(' · ')]] }],
      pregunta: '¿Cuál es la ' + (pideMedia ? 'media' : 'mediana') + '?',
      opciones: opcionesDe(correcta, pideMedia ? [mediana, rango, medioSin] : [media, medioSin, rango], f, function () { return Math.max(ctx[1], correcta + rnd(-10, 10)); }),
      solucion: pideMedia ? ['Suma: ' + datos.join(' + ') + ' = ' + suma, 'Media: ' + suma + ' ÷ ' + n + ' = ' + f(media)]
        : ['Ordena de menor a mayor: ' + ord.join(' · '), 'La mediana es el valor del centro (posición ' + ((n + 1) / 2) + '): ' + f(mediana)]
    };
  }

  /* ---------- Escala de Glasgow ---------- */
  var GO = ['Ninguna', 'Al dolor', 'Al llamado', 'Espontánea'];
  var GV = ['Ninguna', 'Sonidos incomprensibles', 'Palabras inapropiadas', 'Confuso', 'Orientado'];
  var GM = ['Ninguna', 'Extensión anormal', 'Flexión anormal', 'Retira al dolor', 'Localiza el dolor', 'Obedece órdenes'];
  function calcGlasgow() {
    var o = rnd(1, 4), v = rnd(1, 5), m = rnd(1, 6), t = o + v + m;
    function f(x) { return x + ' / 15'; }
    return {
      calc: 'glasgow', titulo: 'Calcula la escala de Glasgow', tema: 'Valoración neurológica', firma: 'gw|' + o + v + m,
      intro: 'Jefe {n}, valora el nivel de conciencia del paciente que acaba de llegar.',
      enunciado: 'Al valorarlo encuentras:',
      cajas: [{ k: 'Hallazgos', c: 'sky', items: [['Apertura ocular', GO[o - 1]], ['Respuesta verbal', GV[v - 1]], ['Respuesta motora', GM[m - 1]]] }],
      pregunta: '¿Cuál es su puntaje en la escala de Glasgow?',
      opciones: opcionesDe(t, [t - 1, t + 1, t - 2, t + 2].filter(function (x) { return x >= 3 && x <= 15; }), f, function () { return Math.max(3, Math.min(15, t + rnd(-3, 3))); }),
      solucion: ['Ocular: ' + GO[o - 1].toLowerCase() + ' = ' + o + '; verbal: ' + GV[v - 1].toLowerCase() + ' = ' + v + '; motora: ' + GM[m - 1].toLowerCase() + ' = ' + m + '.',
        'Total: ' + o + ' + ' + v + ' + ' + m + ' = ' + t + '/15.',
        t <= 8 ? 'Con 8 o menos hay que proteger la vía aérea.' : (t <= 12 ? 'Compromiso moderado: vigílalo de cerca.' : 'Compromiso leve o conciencia normal.')]
    };
  }

  var CALC = { balance: calcBalance, goteo: calcGoteo, dosis: calcDosis, paracetamol: calcParacetamol, imc: calcImc, pam: calcPam, gases: calcGases, sro: calcSro, parkland: calcParkland, fpp: calcFpp, incidencia: calcIncidencia, pruebas: calcPruebas, media: calcMedia, glasgow: calcGlasgow };
  var NOMBRES_CALC = {
    balance: ['Balance de líquidos', 'drop', 'sky'], goteo: ['Cálculo de goteo', 'drop', 'mint'], dosis: ['Dosis en ml', 'syringe', 'lav'],
    paracetamol: ['Acetaminofén pediátrico', 'baby', 'peach'], imc: ['IMC', 'body', 'butter'], pam: ['Presión arterial media', 'heart', 'mauve'],
    gases: ['Gases arteriales', 'bolt', 'butter'], sro: ['SRO · Plan B', 'drop', 'mint'], parkland: ['Quemados · Parkland', 'flame', 'peach'],
    fpp: ['Fecha probable de parto', 'venus', 'lav'], incidencia: ['Incidencia y prevalencia', 'chart', 'sky'], pruebas: ['Pruebas diagnósticas', 'chart', 'mint'],
    media: ['Media y mediana', 'chart', 'butter'], glasgow: ['Escala de Glasgow', 'brain', 'mauve']
  };

  function generarUnico(fn, vistos) {
    var c;
    for (var i = 0; i < 40; i++) { c = fn(); if (vistos.indexOf(c.firma) < 0) return c; }
    return c;
  }
  var calc = {};
  Object.keys(CALC).forEach(function (k) { calc[k] = function (vistos) { return generarUnico(CALC[k], vistos || []); }; });

  window.RR_GEN = {
    caso: function (vistos) {
      var c = generarUnico(function () { return pick(PLANTILLAS)(); }, vistos || []);
      if (!c.opciones.some(function (o) { return o.ok; })) c.opciones[0].ok = true;
      c.opciones = c.opciones.length && c.tema.indexOf('Tamizaje') >= 0 ? c.opciones : mezclar(c.opciones);
      return c;
    },
    calc: calc,
    nombresCalc: NOMBRES_CALC,
    juego: function (vistos) { var k = pick(Object.keys(CALC)); return calc[k](vistos); },
    totalPlantillas: PLANTILLAS.length
  };
})();
